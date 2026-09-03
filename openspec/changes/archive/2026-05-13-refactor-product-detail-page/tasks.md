## 1. Mock Data and Logic Preparation

- [x] 1.1 在 `Product.tsx` (或相關 mock API 檔案中) 新增規格選項的假資料：「規格名稱」包含 2.0Ah Compact, 4.0Ah High Capacity, 5.0Ah Extended，及其對應的明細內容。
- [x] 1.2 在 `Product.tsx` 中實作狀態管理 (state)，追蹤使用者選擇的「規格名稱」，並動態推導出「規格明細」。

## 2. Product UI Updates - Specification Fields

- [x] 2.1 修改 UI 渲染邏輯，將特定的規格名稱（如「電池容量」）統一改名為「規格名稱」，並確保其 HTML class `option-group` 不變。
- [x] 2.2 將對應的規格內容欄位（如「配置」）統一改名為「規格明細」。
- [x] 2.3 將「規格明細」實作為唯讀 (readOnly) 的 TEXT input 或 textarea，加入 100 字元的限制提示，並確保能自動顯示目前選擇對應的明細文字。
- [x] 2.4 套用現有的 CSS 樣式 (theme) 確保「規格明細」文字框在視覺上與其他表單元素保持一致。

## 3. Product UI Updates - Hide Actions

- [x] 3.1 在 `Product.tsx` 中隱藏「加入購物車」按鈕。
- [x] 3.2 在 `Product.tsx` 中隱藏「加入報價單/詢價單」按鈕。
- [x] 3.3 在 `Product.tsx` 中隱藏「使用以下方式購買」按鈕。
- [x] 3.4 在 `Product.tsx` 中隱藏「更多付款方式」連結。
- [x] 3.5 在 `Product.tsx` 中隱藏「數量」選擇欄位。

## 4. Verification

- [x] 4.1 確認切換「規格名稱」時，「規格明細」欄位會正確顯示對應的說明字串。
- [x] 4.2 確認所有指定的結帳相關按鈕、連結與數量欄位皆已在 UI 上隱藏。
