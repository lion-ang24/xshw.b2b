## Why

當前翔盛五金 B2B 前台的商品明細頁面僅支援顯示單一規格的單張圖片。由於後台已擴充支援單一規格設定最多 5 張圖片網址（"規格多圖片管理區塊"功能），前台需要對應更新，以支援展示該規格的所有圖片，並提供左右切換箭頭與 Lightbox 預覽，以提升 B2B 採購者的商品檢視體驗。

## What Changes

- **資料庫讀取與對應擴充**：修改 `src/api/productApi.ts`，在 `fetchProductDetails` 中將同一規格的所有圖片網址整理為 `imageUrls` 陣列（依 `is_primary` 降冪排序，主圖優先），並將其暴露至前台產品規格物件中。
- **前台圖片展示區塊更新**：修改 `src/pages/Product/Product.tsx` 中的商品大圖展示區塊 `product-image-large`，如果該規格擁有多張圖片，則在圖片左右兩側顯示切換箭頭，點擊可循環切換圖片。
- **圖片切換指示器**：在圖片下方顯示精緻的點狀指示器（dots），以標示當前圖片索引與總數。
- **Lightbox 支援多圖瀏覽**：點擊放大按鈕開啟 Lightbox 時，Lightbox 內也必須同步支援左右箭頭切換以及與主圖連動。

## Capabilities

### New Capabilities

- `multi-spec-images-viewer`: 允許商品規格展示多張圖片，並在前台商品明細頁面提供左右箭頭切換、點狀指示器與 Lightbox 聯動切換功能。

### Modified Capabilities

(none)

## Impact

- Affected specs: `multi-spec-images-viewer`
- Affected code:
  - Modified: src/api/productApi.ts, src/pages/Product/Product.tsx
