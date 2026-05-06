## 1. 資料與基礎建設 (Data & Infrastructure)

- [x] 1.1 定義 `Announcement` TypeScript 介面（包含 `id`, `title`, `content`, `date`, `status`）。
- [x] 1.2 擴充目前的 Mock Data：現有 4 筆資料僅有 Title，請依照各自的標題生成約 200 字的 Mock Content。並補足其他測試用資料（確保有涵蓋 30 天內外、字數大於 100 字元截斷等情境）。
- [x] 1.3 實作 `useAnnouncements` Hook 或 Service，提供取得 Megamenu 列表（近一個月、最多 7 筆、按日期降冪）、清單頁列表（分頁）及單筆明細的方法。

## 2. 首頁與導覽列整合 (Megamenu Integration)

- [x] 2.1 在 Banner 或 Header 實作互動式 Megamenu 區塊。
- [x] 2.2 將 `useAnnouncements` 取得的最新公告資料渲染於 Megamenu，僅顯示標題。
- [x] 2.3 實作 Megamenu 內的「查看全部」點擊邏輯：關閉 Megamenu 並導向 `/announcements`。
- [x] 2.4 實作單一公告的點擊邏輯：關閉 Megamenu 並導向 `/announcements/:id`。

## 3. 公告清單頁 (List Page)

- [x] 3.1 建立 `AnnouncementList` 頁面元件與路由 `/announcements`。
- [x] 3.2 呼叫 Service 取得分頁資料並實作列表渲染（每頁 6 筆）。
- [x] 3.3 實作內文截斷邏輯（大於 100 字元截斷並顯示...），並加入「了解更多」連結導向明細頁。
- [x] 3.4 實作 Pagination 分頁元件與切換邏輯。

## 4. 公告明細頁 (Detail Page)

- [x] 4.1 建立 `AnnouncementDetail` 頁面元件與路由 `/announcements/:id`。
- [x] 4.2 根據路由參數 (ID) 呼叫 Service 取得該筆公告資料。
- [x] 4.3 渲染完整的公告標題、日期、狀態與完整內文。
