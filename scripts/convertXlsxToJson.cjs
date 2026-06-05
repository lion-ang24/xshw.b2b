const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('AZX產品型錄.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

const headers = rows[0];

// Define English keys mapping based on indices
// 0: '序' (Ignore)
// 1: '產品大類 - categories' -> category
// 2: '產品子類 - subcategories' -> subcategory
// 3: '品牌 - brands' -> brand
// 4: '產品名稱(en-US) - product name' -> name['en-US']
// 5: '產品名稱(zh-TW) - product name' -> name['zh-TW']
// 6: '料號 - Sku No.' -> sku
// 7: '規格名稱(en-US) - spec name' -> specName['en-US']
// 8: '規格名稱(zh-TW) - spec name' -> specName['zh-TW']
// 9: '規格明細(en-US) - spec detail' -> specDetail['en-US']
// 10: '規格明細(zh-TW) - spec detail' -> specDetail['zh-TW']
// 11: '價格 - US price' -> price
// 12: '數量 - Stock Qty' -> stockQty
// 13: '圖片連結(google drive)' -> imageUrl

const dataRows = rows.slice(2); // Skip header (row 0) and example row (row 1)

const productsMap = new Map();

for (const row of dataRows) {
  // If row is completely empty, skip it
  if (!row || row.length === 0) continue;

  // Extract fields (handle undefined as empty string)
  const category = (row[1] || '').toString().trim();
  const subcategory = (row[2] || '').toString().trim();
  const brand = (row[3] || '').toString().trim();
  const nameEn = (row[4] || '').toString().trim();
  const nameZh = (row[5] || '').toString().trim();
  const sku = (row[6] || '').toString().trim();
  const specNameEn = (row[7] || '').toString().trim();
  const specNameZh = (row[8] || '').toString().trim();
  const specDetailEn = (row[9] || '').toString().trim();
  const specDetailZh = (row[10] || '').toString().trim();
  const price = row[11] !== undefined ? row[11] : '';
  const stockQty = row[12] !== undefined ? row[12] : '';
  const imageUrl = (row[13] || '').toString().trim();

  // We need a product name to group by
  if (!nameZh) continue;

  if (!productsMap.has(nameZh)) {
    productsMap.set(nameZh, {
      name: { 'en-US': nameEn, 'zh-TW': nameZh },
      category,
      subcategory: subcategory === '無' ? '' : subcategory,
      brand,
      imageUrl: '',
      specs: []
    });
  }

  const product = productsMap.get(nameZh);
  
  // Push the spec
  product.specs.push({
    sku,
    specName: { 'en-US': specNameEn, 'zh-TW': specNameZh },
    specDetail: { 'en-US': specDetailEn, 'zh-TW': specDetailZh },
    price,
    stockQty,
    imageUrl
  });
}

const catalog = {
  products: Array.from(productsMap.values())
};

fs.writeFileSync('src/data/catalog.json', JSON.stringify(catalog, null, 2), 'utf-8');
console.log('Conversion completed! src/data/catalog.json has been created.');
