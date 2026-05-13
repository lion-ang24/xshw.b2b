## Context

產品詳情頁目前提供規格選取功能（variant selector），使用者可以點選不同規格名稱（如 2.0Ah Compact、4.0Ah High Capacity 等）。選定規格後，頁面目前僅顯示規格明細（文字輸入框），並無後續行動按鈕，使用者缺乏明確的採購路徑。

本次新增兩個行動按鈕，在規格選定後出現，讓 B2B 採購流程更直觀。

## Goals / Non-Goals

**Goals:**
- 在規格選定後，於規格明細下方顯示兩個按鈕
- 「加入佇列」按鈕：前端 UI 與點擊互動（視覺回饋），後端整合非本次範疇
- 「直接訂購」按鈕：點擊後以 `window.open('https://www.google.com', '_blank')` 開啟 Google 官網

**Non-Goals:**
- 「加入佇列」的後端 API 整合與資料持久化
- 購物車或詢價單的後續流程
- 行動裝置 RWD 以外的特殊佈局

## Decisions

### 1. 顯示時機：規格選定後才出現

**決策**：按鈕組在使用者點選任一規格按鈕後才顯示（非預設顯示）。

**理由**：避免使用者在未選規格的情況下誤觸下單，確保訂單資訊的完整性。

**替代方案**：預設顯示但 disabled → 視覺上有按鈕但不可點，UX 較混亂。

---

### 2. 「直接訂購」開啟目標

**決策**：使用 `window.open('https://www.google.com', '_blank')` 於新分頁開啟，不在同頁跳轉。

**理由**：B2B 使用者通常希望保留產品頁，同時在新分頁完成訂購流程。`_blank` 符合此行為模式。

---

### 3. 按鈕樣式方向

**決策**：
- 「加入佇列」：次要樣式（outlined / ghost button），與現有深色主題一致
- 「直接訂購」：主要樣式（filled / primary button），強調主要行動

**理由**：主次視覺層次引導使用者優先注意「直接訂購」，符合 B2B 轉換優化慣例。

---

### 4. React 狀態管理

**決策**：利用現有 variant selection state（產品詳情頁已有的 `selectedSpec` 或等效 state），監聽其值來決定按鈕是否顯示。

**理由**：無需新增全域 store，局部 component state 即可滿足需求。

## Risks / Trade-offs

- **[風險] 後端未整合** → 「加入佇列」點擊後僅做視覺回饋（console.log 或 toast 提示），待後端 API 就緒後再接入
- **[風險] 規格 state 結構不確定** → 實作時需閱讀現有 ProductDetail component，確認 selectedSpec 的 state key 名稱
- **[取捨] 新分頁開啟** → 部分瀏覽器/廣告攔截器可能阻擋 `window.open`，可改用 `<a target="_blank">` 作為 fallback
