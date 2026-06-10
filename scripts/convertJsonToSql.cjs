const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Helpers for UUID generation
function generateUUID() {
  try {
    return crypto.randomUUID();
  } catch (e) {
    // Fallback if older node version
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// Helper to escape SQL single quotes
function escapeSQL(str) {
  if (str === null || str === undefined) return '';
  return str.toString().replace(/'/g, "''");
}

function run() {
  const jsonPath = path.join(__dirname, '../src/data/catalog.json');
  const sqlOutputDir = path.join(__dirname, '../../xshw.b2b.db/db');
  const sqlOutputPath = path.join(sqlOutputDir, 'insert_catalog.sql');

  console.log(`Reading JSON from: ${jsonPath}`);
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: Source JSON file does not exist at: ${jsonPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const catalog = JSON.parse(rawData);

  const categories = new Map();     // id -> name
  const subcategories = new Map();  // id -> { category_id, name }
  const brands = new Map();         // id -> name
  const products = [];              // Array of product inserts
  const productAttributes = [];     // Array of attribute inserts
  const productImages = [];         // Array of image inserts

  for (const product of catalog.products) {
    // 1. Category Parsing
    let catId = 'OTHER';
    let catName = '其它';
    if (product.category) {
      const catMatch = product.category.match(/^(\d+)\s*-\s*(.+)$/);
      if (catMatch) {
        catId = catMatch[1].trim();
        catName = catMatch[2].trim();
      } else {
        catId = product.category.trim();
        catName = product.category.trim();
      }
    }
    categories.set(catId, catName);

    // 2. Subcategory Parsing
    let subId = null;
    // IMPORTANT: Subcategories only exist for category '15' (機械及零配件)
    if (catId === '15' && product.subcategory && product.subcategory.trim() !== '' && product.subcategory !== '無') {
      const subMatch = product.subcategory.match(/^([A-Za-z0-9]+)\s*-\s*(.+)$/);
      let subIdCode = '';
      let subName = '';
      if (subMatch) {
        subIdCode = subMatch[1].trim();
        subName = subMatch[2].trim();
      } else {
        subIdCode = product.subcategory.trim();
        subName = product.subcategory.trim();
      }
      subId = `${catId}_${subIdCode}`;
      subcategories.set(subId, { category_id: catId, name: subName });
    }

    // 3. Brand Parsing
    let brandId = null;
    if (product.brand && product.brand.trim() !== '') {
      const bName = product.brand.trim();
      brandId = bName.toUpperCase().replace(/[^A-Z0-9_]/g, '_').replace(/_+/g, '_');
      if (brandId.endsWith('_')) brandId = brandId.slice(0, -1);
      if (brandId.startsWith('_')) brandId = brandId.slice(1);
      if (brandId === '') brandId = 'BRAND_' + generateUUID().split('-')[0].toUpperCase();
      brands.set(brandId, bName);
    }

    // 4. Product Generation
    const productId = generateUUID();
    const nameZh = product.name?.['zh-TW'] || '';
    const nameEn = product.name?.['en-US'] || '';
    const descZh = '';
    const descEn = '';

    // 二擇一填寫邏輯 (XOR)
    const productCategoryId = subId ? null : catId;

    products.push({
      id: productId,
      subcategory_id: subId,
      category_id: productCategoryId,
      brand_id: brandId,
      name_zh: nameZh,
      name_en: nameEn,
      description_zh: descZh,
      description_en: descEn,
      status: 'active'
    });

    // 5. Specs (Product Attributes & Images) Generation
    const specs = product.specs || [];
    for (const spec of specs) {
      const attrId = generateUUID();
      const sku = spec.sku || '';
      const specNameZh = spec.specName?.['zh-TW'] || '預設規格';
      const specNameEn = spec.specName?.['en-US'] || 'Default';
      const specDetailZh = spec.specDetail?.['zh-TW'] || '';
      const specDetailEn = spec.specDetail?.['en-US'] || '';
      
      let price = 0.00;
      if (spec.price !== undefined && spec.price !== '') {
        const parsedPrice = parseFloat(spec.price);
        if (!isNaN(parsedPrice)) price = parsedPrice;
      }

      let stockQty = 0;
      if (spec.stockQty !== undefined && spec.stockQty !== '') {
        const parsedQty = parseInt(spec.stockQty, 10);
        if (!isNaN(parsedQty)) stockQty = parsedQty;
      }

      productAttributes.push({
        id: attrId,
        product_id: productId,
        sku: sku,
        spec_name_zh: specNameZh,
        spec_name_en: specNameEn,
        spec_detail_zh: specDetailZh,
        spec_detail_en: specDetailEn,
        price: price,
        stock_qty: stockQty
      });

      // 6. Image Parsing
      const imgUrl = spec.imageUrl || product.imageUrl || '';
      if (imgUrl.trim() !== '') {
        const imageId = generateUUID();
        // Simple file extension extraction
        let fileExt = 'png';
        try {
          const cleanUrl = imgUrl.split('?')[0];
          const extMatch = cleanUrl.match(/\.([a-zA-Z0-9]+)$/);
          if (extMatch && extMatch[1].length <= 10) {
            fileExt = extMatch[1].toLowerCase();
          }
        } catch (e) {
          // Fallback to png
        }

        productImages.push({
          id: imageId,
          product_attribute_id: attrId,
          image_url: imgUrl,
          file_extension: fileExt,
          is_primary: true
        });
      }
    }
  }

  // Compile SQL script contents
  const sqlLines = [];
  sqlLines.push('-- ============================================================');
  sqlLines.push('-- 翔盛五金 B2B 平台 - 產品目錄資料初始化腳本');
  sqlLines.push(`-- 產生日期: ${new Date().toISOString().split('T')[0]}`);
  sqlLines.push('-- 說明: 此檔案由自動化腳本從 catalog.json 轉換生成');
  sqlLines.push('-- ============================================================');
  sqlLines.push('');
  sqlLines.push('BEGIN;');
  sqlLines.push('');
  sqlLines.push('-- 1. 清理舊資料 (依外鍵約束相反順序)');
  sqlLines.push('DELETE FROM product_images;');
  sqlLines.push('DELETE FROM product_attributes;');
  sqlLines.push('DELETE FROM products;');
  sqlLines.push('DELETE FROM brands;');
  sqlLines.push('DELETE FROM subcategories;');
  sqlLines.push('DELETE FROM categories;');
  sqlLines.push('');

  // Insert Categories
  sqlLines.push('-- 2. 插入產品大類別 (categories)');
  let catSort = 10;
  for (const [id, name] of categories.entries()) {
    sqlLines.push(`INSERT INTO categories (id, name, sort_order) VALUES ('${escapeSQL(id)}', '${escapeSQL(name)}', ${catSort});`);
    catSort += 10;
  }
  sqlLines.push('');

  // Insert Subcategories
  sqlLines.push('-- 3. 插入產品子類別 (subcategories)');
  let subSort = 10;
  for (const [id, info] of subcategories.entries()) {
    sqlLines.push(`INSERT INTO subcategories (id, category_id, name, sort_order) VALUES ('${escapeSQL(id)}', '${escapeSQL(info.category_id)}', '${escapeSQL(info.name)}', ${subSort});`);
    subSort += 10;
  }
  sqlLines.push('');

  // Insert Brands
  sqlLines.push('-- 4. 插入品牌 (brands)');
  for (const [id, name] of brands.entries()) {
    sqlLines.push(`INSERT INTO brands (id, name) VALUES ('${escapeSQL(id)}', '${escapeSQL(name)}');`);
  }
  sqlLines.push('');

  // Insert Products
  sqlLines.push('-- 5. 插入產品明細 (products)');
  for (const p of products) {
    const subVal = p.subcategory_id ? `'${escapeSQL(p.subcategory_id)}'` : 'NULL';
    const catVal = p.category_id ? `'${escapeSQL(p.category_id)}'` : 'NULL';
    const brandVal = p.brand_id ? `'${escapeSQL(p.brand_id)}'` : 'NULL';
    sqlLines.push(`INSERT INTO products (id, subcategory_id, category_id, brand_id, name_zh, name_en, description_zh, description_en, status) VALUES ('${p.id}', ${subVal}, ${catVal}, ${brandVal}, '${escapeSQL(p.name_zh)}', '${escapeSQL(p.name_en)}', '${escapeSQL(p.description_zh)}', '${escapeSQL(p.description_en)}', '${p.status}');`);
  }
  sqlLines.push('');

  // Insert Attributes
  sqlLines.push('-- 6. 插入產品規格/屬性 (product_attributes)');
  for (const attr of productAttributes) {
    sqlLines.push(`INSERT INTO product_attributes (id, product_id, sku, spec_name_zh, spec_name_en, spec_detail_zh, spec_detail_en, price, stock_qty) VALUES ('${attr.id}', '${attr.product_id}', '${escapeSQL(attr.sku)}', '${escapeSQL(attr.spec_name_zh)}', '${escapeSQL(attr.spec_name_en)}', '${escapeSQL(attr.spec_detail_zh)}', '${escapeSQL(attr.spec_detail_en)}', ${attr.price.toFixed(2)}, ${attr.stock_qty});`);
  }
  sqlLines.push('');

  // Insert Images
  sqlLines.push('-- 7. 插入產品圖片 (product_images)');
  for (const img of productImages) {
    sqlLines.push(`INSERT INTO product_images (id, product_attribute_id, image_url, file_extension, is_primary) VALUES ('${img.id}', '${img.product_attribute_id}', '${escapeSQL(img.image_url)}', '${escapeSQL(img.file_extension)}', ${img.is_primary});`);
  }
  sqlLines.push('');
  sqlLines.push('COMMIT;');

  // Ensure output directory exists
  if (!fs.existsSync(sqlOutputDir)) {
    fs.mkdirSync(sqlOutputDir, { recursive: true });
  }

  console.log(`Writing SQL to: ${sqlOutputPath}`);
  fs.writeFileSync(sqlOutputPath, sqlLines.join('\n'), 'utf8');
  console.log('SQL file generation completed successfully!');
}

run();
