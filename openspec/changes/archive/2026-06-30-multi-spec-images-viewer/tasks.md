## 1. 資料層對應修改

- [x] 1.1 修改 `src/api/productApi.ts` 撈取規格所有圖片網址，並對應到 specs 陣列物件的 `imageUrls` 屬性。此即實作「1. 資料庫資料對應擴充」決策、滿足「1. 介面與資料格式 (Interface & Data Shape)」合約與「Spec Multi-Image Display」需求，回傳格式須經由 `npm run dev` 啟動後在瀏覽器或以單元測試檢查 `fetchProductDetails` 回傳之資料，確認包含複數 `imageUrls` 陣列元素。

## 2. 前台圖片元件切換邏輯與箭頭 UI

- [x] 2.1 修改 `src/pages/Product/Product.tsx`，加入 `currentImageIndex` 狀態以實現「2. 前台狀態管理與切換邏輯」與「Image Carousel Navigation」需求，並符合「2. 行為 (Behavior)」合約，當 `currentSpec.imageUrls` 有多張圖片時，在大圖區塊的左右兩側渲染切換箭頭與下方的點狀指示器，點擊後能循環切換圖片並更新點狀指示器。驗證方式：以手動瀏覽測試網頁商品頁，確認有多個圖片 URL 的規格會在商品大圖處顯示左右切換箭頭和底部小點。
- [x] 2.2 在 `src/pages/Product/Product.tsx` 的規格切換 `useEffect` 邏輯中，當 `selectedSpecIndex` 改變時將 `currentImageIndex` 重置為 0，滿足「Specification Switch Resets Index」需求。驗證方式：手動測試商品頁，將 A 規格的圖片切換到第 2 張後，點選 B 規格，確認顯示的圖片立即重置為 B 規格的第一張圖片（主圖）。
- [x] 2.3 在 `src/index.css` 中新增切換箭頭 `.image-nav-arrow`、點狀指示器 `.product-image-dots` 及活動圓點 `.dot.active` 的樣式，使視覺符合專案深色主題與 RWD 配置。驗證方式：開啟網頁商品明細頁，以瀏覽器開發者工具檢視控制項位置、圓角、微陰影與滑鼠 hover 時的放大動畫效果，確認視覺風格 premium。

## 3. Lightbox 同步與多圖瀏覽

- [x] 3.1 修改 `src/pages/Product/Product.tsx` 中的 Lightbox Overlay 區塊，當開啟 Lightbox 時顯示左右導覽箭頭，點擊時直接與主頁面的 `currentImageIndex` 同步更新，實現「3. Lightbox 同步邏輯」、「3. 驗證條件 (Acceptance Criteria)」合約與「Lightbox Synchronized Navigation」需求。驗證方式：開啟商品頁的 Lightbox，點擊右箭頭切換到下一張圖，關閉 Lightbox 後，確認主頁面大圖區塊之圖片已同步更新為剛才在 Lightbox 中切換後的同張圖片。
