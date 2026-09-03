## 1. 更新資料轉換腳本 (convertXlsxToJson.cjs)

- [x] 1.1 修改 Excel 欄位對應邏輯，讀取新的 `(en-US)` 與 `(zh-TW)` 欄位。
- [x] 1.2 調整產品合併的 key，改為使用「產品名稱(zh-TW)」。
- [x] 1.3 將產出的 `name`, `specName`, `specDetail` 結構改為包含 `en-US` 與 `zh-TW` 的物件形式。
- [x] 1.4 執行指令重新產生 `catalog.json` 並確認資料結構無誤。

## 2. 更新前端產品元件 (Product.tsx)

- [x] 2.1 修改 `Product.tsx` 中 `Product` 與 `Spec` 的 TypeScript 型別定義，以符合新的多語系物件結構。
- [x] 2.2 讀取全域 `language` 狀態（從 `useTranslation` 中取得）。
- [x] 2.3 調整畫面渲染邏輯，依據目前的 `language` 動態顯示對應的產品名稱、規格名稱與明細，並實作退回中文的預設機制。

## 3. 測試與驗證

- [x] 3.1 驗證首頁與分類頁到產品頁的連結是否仍然正常運作（URL slug 是否匹配新的產品合併邏輯）。
- [x] 3.2 在產品詳情頁面切換語系，確保文字能正確切換中/英顯示。
