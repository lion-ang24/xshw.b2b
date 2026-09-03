## Why

為了支援多語系（中/英）的產品資訊展示，系統需要同時儲存並依據使用者選擇的語系顯示「產品名稱」、「規格名稱」與「規格明細」。此變更可提升跨國客戶的採購體驗。

## What Changes

- 更新 `scripts/convertXlsxToJson.cjs` 解析邏輯：
  - JSON 結構針對「產品名稱」、「規格名稱」、「規格明細」新增 `en-US` 與 `zh-TW` 雙語欄位。
  - 「同名產品規格合併」的判斷基準改為使用產品名稱的 `zh-TW` 欄位。
  - 除了上述新增雙語欄位功能外，原來 `convertXlsxToJson.cjs` 既有邏輯維持不變。
- 更新 `src/pages/Product/Product.tsx` 顯示邏輯：
  - 綁定 Header 的語系切換狀態。
  - 依據當前語系（en-US 或 zh-TW），動態顯示對應的產品名稱、規格名稱與規格明細資料。

## Capabilities

### New Capabilities
- `product-catalog-i18n`: 支援產品型錄資料的多語系結構解析與前端動態切換顯示功能。

### Modified Capabilities
- 

## Impact

- `scripts/convertXlsxToJson.cjs` (資料轉換腳本)
- `src/data/catalog.json` (產出的資料結構將會改變)
- `src/pages/Product/Product.tsx` (產品詳情頁面渲染邏輯)
