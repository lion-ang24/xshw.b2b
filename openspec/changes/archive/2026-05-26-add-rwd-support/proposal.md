## Why

目前位於 `/src` 底下的網站頁面缺乏對行動裝置完整的響應式網頁設計 (RWD) 支援。隨著來自行動裝置的流量增加，確保使用者能舒適地在手機上瀏覽產品、公告與公司資訊變得至關重要，特別是針對窄螢幕如 iPhone Pro Max 系列（寬度約為 430px）。

## What Changes

- 於所有主要頁面與版面元件中加入 CSS 媒體查詢 (Media Queries，如 `@media (max-width: 768px)` 與 `@media (max-width: 480px)`)，確保長寬斷點能完美涵蓋 iPhone Pro 與 Pro Max 系列裝置。
- 調整網格佈局 (Grid Layouts)、Flex 方向、內距 (Padding)、外距 (Margin) 與字體大小，以防止在行動裝置視窗中發生文字重疊或溢出。
- 調整 Header (包含導覽列與下拉選單) 以及浮動購物車 (Floating Cart)，使其在寬度受限的觸控裝置上能完全順暢操作。
- 確保所有容器、表格與圖片能流暢地縮放至 390px-430px 的最小寬度，防止出現任何水平捲軸。

## Capabilities (功能)

### New Capabilities (新增功能)
- `responsive-layout`: 確保所有頁面與主要元件能優雅地縮放至行動裝置尺寸（最小寬度支援至 390px-430px，完整涵蓋 iPhone Pro 與 Pro Max 系列）。

### Modified Capabilities (修改功能)


## Impact (影響範圍)

- 影響專案中的多個 CSS 檔案，包含但不限於：`App.css`、`index.css`、`Home.css`、`Subcategory.css`、`Product.css`、`Announcements.css`、`About.css`、`Privacy.css`、`Header.css`、`FloatingCart.css` 以及 `Footer.css`。
- 將大幅改善 SEO 與行動裝置的使用者體驗。
