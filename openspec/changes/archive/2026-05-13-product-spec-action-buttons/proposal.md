## Why

目前產品頁面在使用者選擇規格後，缺乏明確的行動呼籲按鈕，導致用戶無法直觀地完成採購流程。需要在規格選定後提供兩種下單途徑，提升 B2B 採購的轉換效率。

## What Changes

- 在產品規格選擇完成後，顯示兩個操作按鈕區塊
- 新增「加入佇列」按鈕：將選定規格的商品加入詢價/採購佇列
- 新增「直接訂購」按鈕：點擊後開啟 Google 官網（`https://www.google.com`）於新分頁

## Capabilities

### New Capabilities

- `product-spec-action-buttons`: 規格選定後出現的行動按鈕組，包含「加入佇列」與「直接訂購」兩個按鈕，控制其顯示時機與行為邏輯

### Modified Capabilities

- `product-detail`: 產品詳情頁需要在規格選定狀態下渲染新的按鈕組區塊

## Impact

- **前端元件**：產品詳情頁（ProductDetail / product page component）需要新增按鈕組 UI
- **狀態管理**：需監聽規格選取狀態（variant/spec selection），在選定後觸發按鈕顯示
- **外部連結**：「直接訂購」按鈕以 `window.open` 或 `<a target="_blank">` 開啟 `https://www.google.com`
- **無後端 API 依賴**：「加入佇列」按鈕的後端整合非本次 change 範疇，前端 UI 及基本互動為本次交付目標
