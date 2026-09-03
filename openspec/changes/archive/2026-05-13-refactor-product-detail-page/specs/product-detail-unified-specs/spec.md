## ADDED Requirements

### Requirement: Unified Specification Display
系統必須在產品明細頁中統一使用「規格名稱」與「規格明細」欄位，取代過去依商品不同的規格欄位（如「電池容量」、「配置」）。

#### Scenario: User views product specifications
- **WHEN** 使用者瀏覽產品明細頁
- **THEN** 系統必須顯示「規格名稱」選項欄位，並保留 `option-group` CSS class
- **THEN** 系統必須顯示「規格明細」文字框，且字數上限顯示為 100 字，視覺風格必須與系統一致

### Requirement: Dynamic Specification Details Mapping
系統必須根據使用者選擇的「規格名稱」，動態更新並顯示對應的「規格明細」。

#### Scenario: User selects 2.0Ah Compact
- **WHEN** 使用者在「規格名稱」中選擇 "2.0Ah Compact"
- **THEN** 「規格明細」文字框必須顯示 "2.0Ah Compact Bare Tool / Kit with Charger"

#### Scenario: User selects 4.0Ah High Capacity
- **WHEN** 使用者在「規格名稱」中選擇 "4.0Ah High Capacity"
- **THEN** 「規格明細」文字框必須顯示 "4.0Ah High Capacity Bare Tool / Kit with Charger"

#### Scenario: User selects 5.0Ah Extended
- **WHEN** 使用者在「規格名稱」中選擇 "5.0Ah Extended"
- **THEN** 「規格明細」文字框必須顯示 "5.0Ah Extended Bare Tool / Kit with Charger"
