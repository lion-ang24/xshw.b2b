## MODIFIED Requirements

### Requirement: Unified Specification Display
系統必須在產品明細頁中統一使用「規格名稱」與「規格明細」欄位，取代過去依商品不同的規格欄位（如「電池容量」、「配置」）。

#### Scenario: User views product specifications
- **WHEN** 使用者瀏覽產品明細頁
- **THEN** 系統必須顯示「規格名稱」選項欄位，並保留 `option-group` CSS class
- **THEN** 系統必須顯示「規格明細」文字框，且字數上限顯示為 500 字，視覺風格必須與系統一致
