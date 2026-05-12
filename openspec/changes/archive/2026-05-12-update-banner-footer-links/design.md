## Context

目前網站的 Header（Banner）區域包含了一個「登入」按鈕，但由於會員系統尚未完全上線或需配合特定業務流程，目前需要先將其隱藏。此外，Footer 中的「產品目錄」連結目前指向 `/catalog`，但正確的路由設計應為 `/category`，這會導致使用者迷航。

## Goals / Non-Goals

**Goals:**
- 將 `Header.tsx` 中的 `<button className="login-btn">` 隱藏。
- 將 `Footer.tsx` 中指向產品目錄的 `<Link to="/catalog">` 修改為 `<Link to="/category">`。

**Non-Goals:**
- 不涉及 Header 或 Footer 其他元件的排版變動。
- 不刪除登入相關的程式碼或樣式，僅在 UI 層面隱藏。

## Decisions

- **Header 隱藏邏輯**：使用 JSX 註解 (`{/* ... */}`) 來隱藏登入按鈕，這樣可以保留程式碼，未來若需重新啟用只需移除註解即可。
- **Footer 路徑修正**：直接修改 `<Link to="/category">` 的 `to` 屬性。

## Risks / Trade-offs

- [Risk] 其他地方可能有硬編碼的 `/catalog` 連結。
  - Mitigation: 本次僅處理使用者提報的 Footer 區域，未來可再全盤掃描。
