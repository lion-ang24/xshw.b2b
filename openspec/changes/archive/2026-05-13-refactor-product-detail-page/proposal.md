## Why

統一產品明細頁的規格欄位名稱與顯示邏輯，避免不同商品使用各自獨立的規格欄位（例如：電池容量、配置），降低系統維護成本並統一使用者體驗。此外，根據業務需求隱藏購物車、報價單與部分購買相關按鈕，簡化產品展示頁面的操作流程。

## What Changes

- **統一規格名稱欄位**：將原本特定於某些商品的「電池容量」欄位，統一改稱為「規格名稱」，並維持原有的 `option-group` CSS class。
- **統一規格明細欄位**：將原本特定商品的「配置」欄位，統一改為「規格明細」，並將顯示格式更改為具有 100 字元上限的 TEXT 文字框，同時維持既有視覺風格（theme）。
- **Mock 資料更新與連動邏輯**：新增 API JSON mock 資料，包含「規格名稱」的三個選項（2.0Ah Compact, 4.0Ah High Capacity, 5.0Ah Extended）。當選擇特定的「規格名稱」時，「規格明細」文字框會自動顯示對應的詳細說明字串。
- **隱藏結帳與購買相關元件**：
  - 隱藏「加入購物車」、「加入報價單/詢價單」、「使用以下方式購買」等按鈕。
  - 隱藏「更多付款方式」連結。
  - 隱藏「數量」選擇欄位。

## Capabilities

### New Capabilities
- `product-detail-unified-specs`: 處理產品明細頁中統一規格欄位（規格名稱、規格明細）的選擇與連動顯示邏輯。

### Modified Capabilities
- `product-detail-actions`: 修改產品明細頁的操作區塊，隱藏多個購買與購物車相關按鈕與欄位。

## Impact

- `src/pages/Product/Product.tsx`: 主要影響產品明細頁的渲染邏輯、按鈕顯示控制以及規格欄位的選擇連動。
- `src/api/productApi.ts` (或其他 mock 資料位置): 需新增或修改規格相關的 mock 資料結構。
- `src/hooks/useTranslation.tsx`: 可能影響多語系翻譯鍵值的調整（例如：「電池容量」改為「規格名稱」）。
