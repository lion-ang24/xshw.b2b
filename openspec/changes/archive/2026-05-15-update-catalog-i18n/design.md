## Context

系統原本的產品型錄資料 (`catalog.json`) 是透過 `scripts/convertXlsxToJson.cjs` 從 `AZX產品型錄.xlsx` 轉換而來。原先的邏輯只抓取單一語系的產品名稱與規格。現在 Excel 檔案已更新，包含了 `(en-US)` 與 `(zh-TW)` 的欄位。前端 `Product.tsx` 頁面需要能夠根據目前 Header 所選擇的語系（`zh-TW` 或 `en-US`），動態切換這些欄位的顯示。

## Goals / Non-Goals

**Goals:**
- 修改資料轉換腳本，能正確讀取 Excel 中雙語系的新欄位。
- 改變 `catalog.json` 結構，以支援 `en-US` 與 `zh-TW` 的資料儲存。
- 確保「同名產品規格合併」是依據 `zh-TW` 的產品名稱進行分組。
- 前端 `Product.tsx` 能夠讀取 `useTranslation` 的語系狀態，並根據語系顯示對應的名稱與規格。

**Non-Goals:**
- 不涉及後端資料庫的即時翻譯（維持靜態 JSON 檔案產生的流程）。
- 不更動除了「產品名稱」、「規格名稱」、「規格明細」以外欄位的多語系支援。

## Decisions

### 1. JSON 資料結構設計
**決策**：將「產品名稱」、「規格名稱」、「規格明細」從原本的單一字串，改為包含 `en-US` 與 `zh-TW` 的物件結構。
例如：
```json
"name": {
  "en-US": "FORCE D12 BRUSHLESS IMPACT DRILL",
  "zh-TW": "FORCE D12 無刷衝擊電鑽"
}
```
**理由**：採用物件結構有利於前端使用 `key` (如 `language` 變數) 直接取值，例如 `product.name[language]`，而不需要用 `name_en` 或 `name_zh` 這種寫死的後綴去組合變數，程式碼更為簡潔。

### 2. 產品合併邏輯
**決策**：在 `convertXlsxToJson.cjs` 中，使用 `產品名稱(zh-TW)` 作為 `productsMap` 的 `key` 來判斷是否為同一個產品。
**理由**：符合需求規範「"同名產品規格合併"依據的欄位：產品名稱(zh-TW)」。繁體中文名稱通常在內部管理是最具一致性的識別標準（當沒有絕對唯一的 Product ID 時）。

### 3. 前端切換實作
**決策**：在 `Product.tsx` 中，從 `useTranslation` 取得 `language`，並在渲染資料時，使用 `product.name[language] || product.name['zh-TW']` 作為 fallback 機制。
**理由**：避免因某個語言的欄位缺失導致畫面空白或錯誤，預設退回顯示中文。

## Risks / Trade-offs

- **[風險] 型別定義錯誤** → 修改了 `catalog.json` 結構後，原有 TypeScript 的 interface (`Product`, `Spec` 等) 會報錯。
  **[緩解策略]**：需同步更新定義在 `Product.tsx` (或獨立 type 檔案) 中的 `Product` 與 `Spec` 介面，將 string 改為 `{ 'en-US': string, 'zh-TW': string }`。
