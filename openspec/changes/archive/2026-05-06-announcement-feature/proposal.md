## Why

本平台需要一個公告功能，以便即時將最新的活動、產品更新與重要通知傳達給 B2B 企業客戶。透過提供獨立的公告清單與明細頁，並結合首頁 Banner 與 Megamenu 的互動，能有效提升使用者的觸及率與操作體驗。

## What Changes

- 修改首頁 Banner 的公告區塊，調整為互動式 Megamenu。
- Megamenu 內僅顯示一個月內的最新公告，最多 7 筆，以日期降冪排列，且僅顯示公告標題。
- 點擊 Megamenu 內的「查看全部」，將關閉 Megamenu 並導向「公告清單頁」。
- 點擊 Megamenu 內的任一公告，將關閉 Megamenu 並導向該筆「公告明細頁」。
- 新增「公告清單頁」，每頁最多顯示 6 筆，並具備分頁 (Pagination) 功能。列表上的公告內文若超過 100 個字元將進行截斷，下方附帶「了解更多」連結以導向明細頁。
- 新增「公告明細頁」，顯示公告完整內容。
- 開發與實作階段請保留目前的假資料（Mock Data）以供展示與測試。

## Capabilities

### New Capabilities
- `announcements`: 涵蓋首頁 Banner 的 Megamenu 公告展示、公告清單頁（含分頁與摘要截斷）、以及公告明細頁的功能。

### Modified Capabilities
（無）

## Impact

- 頁面元件：Banner/Header 需新增 Megamenu 互動邏輯。
- 路由與頁面：需新增 `/announcements` (清單頁) 與 `/announcements/:id` (明細頁) 路由及對應頁面。
- 狀態與 API：需新增或串接取得公告列表（支援分頁、過濾一個月內）與公告明細的邏輯。
