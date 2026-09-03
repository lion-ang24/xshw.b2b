# product-catalog-i18n Specification

## Purpose
TBD - created by archiving change update-catalog-i18n. Update Purpose after archive.
## Requirements
### Requirement: 擷取多語系產品欄位資料
轉換腳本 `convertXlsxToJson.cjs` MUST 解析 Excel 中新增的「(en-US)」與「(zh-TW)」欄位，並將「產品名稱」、「規格名稱」、「規格明細」轉換為包含 `en-US` 與 `zh-TW` 的物件格式。

#### Scenario: 成功解析雙語系欄位
- **WHEN** 腳本處理產品型錄資料行時
- **THEN** 產出的 JSON 物件中 `name`, `specName`, `specDetail` 屬性會是一個包含 `en-US` 和 `zh-TW` 鍵值的物件
- **AND** 即使某些語言欄位為空值，也應設定為空字串而非 undefined

### Requirement: 依繁體中文名稱合併產品
轉換腳本 MUST 依據「產品名稱(zh-TW)」作為產品識別的唯一鍵值 (key)，將相同繁體中文名稱的資料列合併為同一個產品的不同規格。

#### Scenario: 相同中文名稱的產品被合併
- **WHEN** 腳本讀取到兩列具有相同 `產品名稱(zh-TW)` 的資料時
- **THEN** 腳本會將這兩列合併為同一個 `Product` 物件
- **AND** 第二列的規格資料會被附加到該產品的 `specs` 陣列中

### Requirement: 產品頁面依據選擇語系動態顯示內容
前端 `Product.tsx` 元件 MUST 讀取全域語系設定，並動態顯示對應語系的產品名稱、規格名稱與規格明細。

#### Scenario: 使用者切換語系為英文
- **WHEN** 使用者在 Header 將語系切換為 `en-US`
- **THEN** `Product.tsx` 會顯示 `product.name['en-US']`、`spec.specName['en-US']` 以及 `spec.specDetail['en-US']`

#### Scenario: 缺少對應語系資料的後備機制
- **WHEN** 系統要求顯示 `en-US` 的產品名稱，但該欄位為空字串或不存在時
- **THEN** 系統預設顯示 `zh-TW` 的資料作為備援

