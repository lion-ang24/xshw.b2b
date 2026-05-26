## 1. Global Layout Adjustments (全域版面調整)

- [x] 1.1 在 `index.css` 與 `App.css` 中加入基礎的媒體查詢斷點 (`@media (max-width: 768px)` 與 `@media (max-width: 480px)`)
- [x] 1.2 確保 `index.html` 中已正確設定 `viewport` meta tag
- [x] 1.3 針對行動版視窗調整根變數 (root variables) 或基礎內距，以防止內容緊貼螢幕邊緣

## 2. Header and Navigation (Touch-Friendly) (Header 與導覽列 - 觸控友善)

- [x] 2.1 更新 `Header.css` 以處理行動版佈局 (可能會加入漢堡選單或將導覽項目堆疊)
- [x] 2.2 若有必要，重構 `Header.tsx` 的狀態以處理行動版選單的開啟/關閉互動
- [x] 2.3 調整 `Header.css` 中的巨型選單 (Mega Menu) 顯示方式，使其在小於 768px 時垂直堆疊以防止項目溢出

## 3. Product Grid and Subcategories (產品網格與次分類)

- [x] 3.1 修改 `Home.css` 中的精選產品網格，使其在小於 768px 的螢幕上顯示為單欄
- [x] 3.2 修改 `Subcategory.css` 中的產品列表，使其在手機上顯示為單欄
- [x] 3.3 針對窄螢幕調整產品卡片的內距、圖片大小與字體大小

## 4. Floating Cart (浮動購物車)

- [x] 4.1 更新 `FloatingCart.css`，讓購物車面板寬度在手機上能延展至接近 100%
- [x] 4.2 放大數量的 `+` / `-` 按鈕觸控目標尺寸，使其在手機上更容易點擊

## 5. Secondary Pages and Components (次要頁面與元件)

- [x] 5.1 更新 `Announcements.css` 以確保公告卡片能在手機上優雅地縮放
- [x] 5.2 更新 `About.css`、`Privacy.css` 與 `Terms.css`，以優化在小螢幕上閱讀長篇文章的體驗
- [x] 5.3 檢查並調整 `Footer.css`，將導覽連結與公司資訊垂直堆疊
