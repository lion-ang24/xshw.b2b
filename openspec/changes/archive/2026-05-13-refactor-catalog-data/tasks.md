## 1. Script and Data Preparation

- [x] 1.1 撰寫 Node.js 腳本解析 `AZX產品型錄.xlsx`（可能需安裝 `xlsx` 相關套件），並確保轉換成 JSON Object 的參數 (variable) 皆為英文。
- [x] 1.2 在腳本中，過濾掉第二列（大類：15 - 機械及零配件範例），並在欄位轉換時排除「數量」與「序」欄位，不將其寫入 JSON 中。
- [x] 1.3 在腳本中，處理未填寫的空欄位，給予 Empty String (`""`)。
- [x] 1.4 在腳本中，將同名產品群組化 (Group by Name)，將不同列資料轉換為該產品的規格陣列 (`specs`)。
- [x] 1.5 執行腳本，將結果產出至 `src/data/catalog.json` 提供專案使用。

## 2. Catalog Navigation Updates

- [x] 2.1 修改側邊欄與大類導航，固定需求中列出的 16 個大類。
- [x] 2.2 將現有程式碼中寫死的子類別（如辦公桌、人體工學椅等）註解隱藏。
- [x] 2.3 針對「機械及零配件」大類，定義並渲染其專屬的 8 個子類別。

## 3. Category & Subcategory Logic

- [x] 3.1 修改 `Category` 頁面邏輯：若點擊的大類無定義子類別，則直接顯示產品清單元件。
- [x] 3.2 修改產品卡片預覽圖元件：若產品圖片為空 (`""`)，則顯示「圖片待更新」的 UI 狀態。

## 4. Product Details Logic

- [x] 4.1 修改 `Product.tsx`，改由 `catalog.json` 取得資料。
- [x] 4.2 根據該產品的 `specs` 陣列動態產生對應的規格選項與連動資料，並維持原有頁面風格。
