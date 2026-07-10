# 規格多圖片瀏覽器規格 (multi-spec-images-viewer Specification)

## 目的 (Purpose)

待定 - 此規格經由封存變更「multi-spec-images-viewer」建立。封存後請更新此處的目的描述。

## 需求 (Requirements)

### Requirement: 規格多圖片顯示
系統 SHALL 從資料層取得所選產品規格的所有圖片網址，並依是否為主圖進行排序（主圖優先）。前端頁面 SHALL 預設顯示第一張圖片。

#### Scenario: 載入時顯示圖片
- **WHEN** 使用者查看含有多個圖片規格的產品詳情頁時
- **THEN** 頁面 SHALL 顯示所選規格的主圖（第一張圖片）
- **THEN** 若所選規格包含 1 張以上的圖片，圖片容器的左右兩側 SHALL 顯示導覽箭頭


<!-- @trace
source: multi-spec-images-viewer
updated: 2026-06-30
code:
  - src/pages/Product/Product.tsx
  - src/index.css
  - src/api/productApi.ts
-->

---
### Requirement: 圖片輪播導覽
若所選規格包含多張圖片，系統 SHALL 允許使用者使用左右箭頭或點擊圖片下方的指示點來循環切換圖片。輪播功能 SHALL 支援循環（在最後一張圖片點擊下一張時會回到第一張）。

#### Scenario: 透過箭頭導覽至下一張圖片
- **WHEN** 使用者點擊產品圖片容器上的右導覽箭頭時
- **THEN** 系統 SHALL 顯示序列中的下一張圖片
- **THEN** 活動指示點 SHALL 更新以符合目前的圖片索引值

#### Scenario: 透過箭頭導覽至上一張圖片
- **WHEN** 使用者點擊產品圖片容器上的左導覽箭頭時
- **THEN** 系統 SHALL 顯示序列中的上一張圖片（若在第一張圖片則循環至最後一張）

#### Scenario: 透過指示點選擇圖片
- **WHEN** 使用者點擊產品圖片下方的特定指示點時
- **THEN** 系統 SHALL 顯示該指示點索引值對應的圖片


<!-- @trace
source: multi-spec-images-viewer
updated: 2026-06-30
code:
  - src/pages/Product/Product.tsx
  - src/index.css
  - src/api/productApi.ts
-->

---
### Requirement: 切換規格重置索引值
當使用者切換所選的產品規格時，圖片瀏覽器 SHALL 將活動圖片的索引值重置為 0（即顯示新選定規格的第一張圖片/主圖）。

#### Scenario: 切換規格重置圖片索引值
- **WHEN** 使用者選擇不同的規格按鈕時
- **THEN** 系統 SHALL 將顯示的圖片索引值重置為 0，並顯示新選定規格的第一張圖片


<!-- @trace
source: multi-spec-images-viewer
updated: 2026-06-30
code:
  - src/pages/Product/Product.tsx
  - src/index.css
  - src/api/productApi.ts
-->

---
### Requirement: Lightbox 同步導覽
縮放 Lightbox 燈箱重疊層 SHALL 顯示目前活動的圖片。若該規格有多張圖片，Lightbox SHALL 亦提供左右導覽箭頭以循環瀏覽圖片，且 Lightbox 中的活動圖片索引值 SHALL 與主頁面的活動圖片索引值保持同步。

#### Scenario: 開啟 Lightbox 並進行導覽
- **WHEN** 使用者點擊主圖片容器上的縮放圖示時
- **THEN** Lightbox SHALL 開啟並顯示目前的活動圖片
- **WHEN** 使用者在 Lightbox 內使用箭頭導覽，然後關閉 Lightbox
- **THEN** 主頁面的圖片瀏覽器 SHALL 顯示與 Lightbox 中所選取相同的圖片

<!-- @trace
source: multi-spec-images-viewer
updated: 2026-06-30
code:
  - src/pages/Product/Product.tsx
  - src/index.css
  - src/api/productApi.ts
-->