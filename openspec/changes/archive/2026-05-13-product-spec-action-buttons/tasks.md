## 1. 調查現有程式碼

- [x] 1.1 找到產品詳情頁的主要 React component 檔案（如 `ProductDetail.jsx` 或同等元件）
- [x] 1.2 確認規格選取的 state 變數名稱（如 `selectedSpec`、`selectedVariant` 等）
- [x] 1.3 確認規格明細（規格說明文字區塊）在 JSX 中的位置，確定按鈕要插入的位置

## 2. 實作行動按鈕組元件

- [x] 2.1 在規格明細區塊下方，條件渲染（conditional render）按鈕組：僅在 `selectedSpec` 有值時顯示
- [x] 2.2 新增「加入佇列」按鈕（次要樣式 / outlined），點擊後顯示視覺回饋（toast 或 console.log）
- [x] 2.3 新增「直接訂購」按鈕（主要樣式 / filled），使用 `<a href="https://www.google.com" target="_blank" rel="noopener noreferrer">` 實作

## 3. 樣式調整

- [x] 3.1 確保按鈕組排列方式與現有 UI 一致（水平排列，間距合適）
- [x] 3.2 確認按鈕在深色主題下的顏色與 hover 樣式正確
- [x] 3.3 確認 RWD：在小螢幕下按鈕不會超出容器

## 4. 驗證

- [x] 4.1 手動測試：進入產品頁，確認未選規格時按鈕不顯示
- [x] 4.2 手動測試：選定任一規格後，確認兩個按鈕出現
- [x] 4.3 手動測試：切換規格，確認按鈕持續顯示
- [x] 4.4 手動測試：點擊「直接訂購」，確認新分頁開啟 Google Form，當前頁面不跳轉
- [x] 4.5 手動測試：點擊「加入佇列」，確認有視覺回饋
