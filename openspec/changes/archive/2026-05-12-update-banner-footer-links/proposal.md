## Why

為了讓全站的動線與目前的路由設計保持一致，我們需要隱藏尚未啟用的 Header（Banner）登入按鈕。同時，也需要將 Footer 中的「產品目錄」連結修正至正確的 `/category` 路徑，避免使用者點擊後進入無效頁面。

## What Changes

- **Header (Banner) 調整**：隱藏位於右上角的「登入」按鈕。
- **Footer 調整**：修改底部導覽列中的「產品目錄」連結，將其目的路徑從 `/catalog` 更改為 `/category`。

## Capabilities

### Modified Capabilities
- `layout-links-update`: 變更全域版面（Header、Footer）中的連結顯示邏輯與路徑指向。

## Impact

- `src/components/Header/Header.tsx`: 隱藏登入按鈕元件。
- `src/components/Footer/Footer.tsx`: 修改 Link 路徑。
