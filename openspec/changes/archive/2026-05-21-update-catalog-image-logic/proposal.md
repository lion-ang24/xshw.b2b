## Why

使用者需要在型錄與產品明細頁中，針對不同的規格 (SKU) 顯示對應的產品圖片，而不僅僅是整個產品共用一張圖片。這能讓客戶更精確地辨識不同規格的外觀差異。

## What Changes

- 修改 `scripts/convertXlsxToJson.cjs`，將 `imageUrl` 從產品層級移至 `specs` 陣列中，讓每個 SKU 對應各自的 `imageUrl`。
- 調整 `Subcategory.tsx`，在產品列表中預設顯示該產品第一個 SKU 的圖片。
- 調整 `Product.tsx`，當使用者點擊不同規格名稱時，動態切換顯示對應 SKU 的 `imageUrl`。

## Capabilities

### New Capabilities
- `sku-image-mapping`: Defines the behavior of SKU-specific images in both the data layer and UI presentation layer (Subcategory and Product Detail pages).

### Modified Capabilities

## Impact

- `scripts/convertXlsxToJson.cjs` (資料轉換邏輯)
- `src/data/catalog.json` (資料結構改變)
- `src/pages/Subcategory/Subcategory.tsx` (列表頁渲染)
- `src/pages/Product/Product.tsx` (詳細頁互動與渲染)
