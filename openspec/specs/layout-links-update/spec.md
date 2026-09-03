### Requirement: Hide Login Link in Header
系統必須在 Header（Banner）區域中隱藏「登入」按鈕/連結。

#### Scenario: User views the website header
- **WHEN** 使用者瀏覽網站 Header 區塊
- **THEN** 系統必須不顯示「登入」按鈕

### Requirement: Update Footer Catalog Link
系統必須確保 Footer 中的產品目錄連結導向正確的分類頁面。

#### Scenario: User clicks the catalog link in the footer
- **WHEN** 使用者點擊 Footer 中的「產品目錄」連結
- **THEN** 系統必須將其導向至 `/category` 路徑
