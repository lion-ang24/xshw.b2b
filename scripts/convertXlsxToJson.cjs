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
// 4: '產品名稱 - product name' -> name
// 5: '料號 - Sku No.' -> sku
// 6: '規格名稱 - spec name' -> specName
// 7: '規格明細 - spec detail' -> specDetail
// 8: '價格 - US price' -> price
// 9: '數量 - ' (Ignore)
// 10: '圖片連結(google drive)' -> imageUrl

const dataRows = rows.slice(2); // Skip header (row 0) and example row (row 1)

const productsMap = new Map();

for (const row of dataRows) {
  // If row is completely empty, skip it
  if (!row || row.length === 0) continue;

  // Extract fields (handle undefined as empty string)
  const category = (row[1] || '').toString().trim();
  const subcategory = (row[2] || '').toString().trim();
  const brand = (row[3] || '').toString().trim();
  const name = (row[4] || '').toString().trim();
  const sku = (row[5] || '').toString().trim();
  const specName = (row[6] || '').toString().trim();
  const specDetail = (row[7] || '').toString().trim();
  const price = row[8] !== undefined ? row[8] : '';
  const imageUrl = (row[10] || '').toString().trim();

  // We need a product name to group by
  if (!name) continue;

  if (!productsMap.has(name)) {
    productsMap.set(name, {
      name,
      category,
      subcategory: subcategory === '無' ? '' : subcategory,
      brand,
      imageUrl,
      specs: []
    });
  }

  const product = productsMap.get(name);
  
  // Push the spec
  product.specs.push({
    sku,
    specName,
    specDetail,
    price
  });
}

const catalog = {
  products: Array.from(productsMap.values())
};

fs.writeFileSync('src/data/catalog.json', JSON.stringify(catalog, null, 2), 'utf-8');
console.log('Conversion completed! src/data/catalog.json has been created.');
