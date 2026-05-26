## ADDED Requirements

### Requirement: Global Responsive Layout (全域響應式版面)
系統「必須 (SHALL)」確保所有主要排版容器皆能流暢地適應縮小至 390px-430px 寬度的視窗，防止在如 iPhone Pro 與 Pro Max 等行動裝置上出現水平捲軸。

#### Scenario: User visits the site on an iPhone Pro Max (情境：使用者在 iPhone Pro Max 上瀏覽網站)
- **WHEN** 使用者在寬度為 390px-430px 的螢幕上瀏覽網站時
- **THEN** 主要版面容器會自動調整大小以符合 100% 視窗寬度，且不產生水平捲軸

### Requirement: Touch-Friendly Header and Navigation (觸控友善的 Header 與導覽列)
系統「必須 (SHALL)」在窄螢幕上將水平導覽項目調整為行動版友善的佈局，確保觸控目標不會重疊並保持易用性。

#### Scenario: User opens the Mega Menu on mobile (情境：使用者在手機上開啟巨型選單)
- **WHEN** 使用者在寬度小於 768px 的螢幕上點擊「公告」或「聯絡我們」的下拉選單時
- **THEN** 下拉選單將垂直堆疊顯示，防止項目超出螢幕右側邊緣

### Requirement: Responsive Product Grids (響應式產品網格)
系統「必須 (SHALL)」在寬度小於 768px 的螢幕上，將產品列表網格從桌面版的多欄式調整為單欄式 (`1fr`)。

#### Scenario: User views the product category page on mobile (情境：使用者在手機上瀏覽產品分類頁面)
- **WHEN** 使用者在寬度小於 768px 的螢幕上瀏覽次分類 (Subcategory) 頁面時
- **THEN** 產品卡片將以單欄版面垂直堆疊顯示

### Requirement: Usable Floating Cart on Mobile (行動版易用的浮動購物車)
系統「必須 (SHALL)」確保浮動購物車面板擴展至將近 100% 的視窗寬度，並為數量調整按鈕維持清晰的排版與觸控範圍。

#### Scenario: User adjusts product quantity in the Floating Cart (情境：使用者在浮動購物車內調整產品數量)
- **WHEN** 使用者在 430px 寬的螢幕上開啟浮動購物車時
- **THEN** 購物車面板會舒適地佔用螢幕寬度，且所有文字、按鈕與項目皆保持完全可見並可順暢操作，不需縮放或水平滑動
