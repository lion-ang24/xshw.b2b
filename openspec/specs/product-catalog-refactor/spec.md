## ADDED Requirements

### Requirement: Catalog Categories
系統必須固定顯示 16 個產品大類，並針對「機械及零配件」大類顯示 8 個子類別，其餘舊有子類別必須被隱藏。

#### Scenario: User navigates categories
- **WHEN** 使用者瀏覽側邊欄或產品目錄大類
- **THEN** 系統必須顯示固定的 16 個大類
- **THEN** 只有在「機械及零配件」下會顯示對應的 8 個子類別

### Requirement: Dynamic Subcategories
系統必須根據大類是否擁有子類別，決定分類頁面的顯示內容。

#### Scenario: Category has no subcategories
- **WHEN** 使用者點擊一個沒有子類別的大類
- **THEN** 系統必須直接在該頁面顯示該大類下的產品清單

### Requirement: Product Merging by Name
系統必須將 Excel 轉換後相同名稱的資料合併為單一產品，並以規格切分。

#### Scenario: Viewing a product with multiple specs
- **WHEN** 使用者進入「搖頭棘輪梅開板手」產品明細頁
- **THEN** 系統必須顯示單一產品，並在「規格名稱」欄位中提供三個選項供切換

### Requirement: Fallback Image
若產品資料中未提供圖片連結，系統必須顯示預設提示。

#### Scenario: Product missing image
- **WHEN** 產品的圖片欄位為空值 (`""`)
- **THEN** 系統必須在預覽圖片區塊顯示「圖片待更新」的資訊
