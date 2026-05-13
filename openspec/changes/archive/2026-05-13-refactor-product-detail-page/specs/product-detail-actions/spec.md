## ADDED Requirements

### Requirement: Hide Purchase Actions
系統必須在產品明細頁中隱藏與購買、詢價相關的操作按鈕與連結。

#### Scenario: User views product page without purchase actions
- **WHEN** 使用者瀏覽產品明細頁
- **THEN** 系統必須隱藏「加入購物車」按鈕
- **THEN** 系統必須隱藏「加入報價單/詢價單」按鈕
- **THEN** 系統必須隱藏「使用以下方式購買」按鈕
- **THEN** 系統必須隱藏「更多付款方式」連結

### Requirement: Hide Quantity Selector
系統必須在產品明細頁中隱藏商品數量的選擇欄位。

#### Scenario: User views product page without quantity field
- **WHEN** 使用者瀏覽產品明細頁
- **THEN** 系統必須隱藏「數量」選擇欄位
