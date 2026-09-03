const xlsx = require('xlsx');
const workbook = xlsx.readFile('AZX產品型錄.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
console.log(data[0]);
console.log(data[1]); // The example row
console.log(data[2]); // The first data row
