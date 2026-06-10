# supabase-data-fetching Specification

## Purpose

TBD - created by archiving change 'integrate-supabase'. Update Purpose after archive.

## Requirements

### Requirement: 多語系資料提取 (Multi-language Data Fetching)

系統 SHALL 在進行資料撈取時，根據目前語系（ `zh-TW` 或 `en-US` ）動態提取 Supabase 資料表中的對應語系欄位。例如： `content_pages` 的 `content_zh` / `content_en` ，以及 `categories` / `subcategories` 的 `name_zh` / `name_en` 。

#### Scenario: 語系切換至中文時撈取中文欄位
- **WHEN** 使用者在 Header 切換語系至 `zh-TW` 且進入關於我們頁面
- **THEN** 系統 SHALL 呼叫 API 模組向 Supabase 撈取 `content_pages` 中 `slug` 為 `about` 的資料，並呈現 `title_zh` 與 `content_zh` 欄位內容。

#### Scenario: 語系切換至英文時撈取英文欄位
- **WHEN** 使用者在 Header 切換語系至 `en-US` 且進入關於我們頁面
- **THEN** 系統 SHALL 呼叫 API 模組向 Supabase 撈取 `content_pages` 中 `slug` 為 `about` 的資料，並呈現 `title_en` 與 `content_en` 欄位內容。


<!-- @trace
source: integrate-supabase
updated: 2026-06-08
code:
  - src/App.tsx
  - src/api/catalog.ts
  - src/api/content.ts
  - src/pages/Product/Product.tsx
  - src/components/Header/Header.tsx
  - src/pages/Announcements/AnnouncementList.tsx
  - src/data/locales/zh-TW.json
  - src/pages/Shipping/Shipping.tsx
  - src/data/locales/en-US.json
  - src/pages/Subcategory/Subcategory.tsx
  - src/types/supabase.ts
  - src/pages/Home/Home.tsx
  - src/data/catalog.json
  - src/pages/Terms/Terms.tsx
  - src/pages/About/About.tsx
  - src/api/supabaseClient.ts
  - src/data/catalogData.ts
  - src/pages/Privacy/Privacy.tsx
  - src/pages/Announcements/AnnouncementDetail.tsx
  - src/api/announcement.ts
  - src/pages/Shipping/Shipping.css
  - src/hooks/useAnnouncements.ts
  - src/api/productApi.ts
  - src/components/Footer/Footer.tsx
  - src/data/mockAnnouncements.ts
  - package.json
-->

---
### Requirement: 靜態內容整合 (Static Content Integration)

系統 SHALL 於關於我們、隱私權政策、服務條款與運送與退貨頁面，向 Supabase 的 `content_pages` 資料表請求資料，若資料庫無對應欄位，則 SHALL 回退至本機的語系檔案中讀取。

#### Scenario: 成功於隱私權政策頁面載入 Supabase 資料
- **WHEN** 使用者訪問 `/privacy` 頁面
- **THEN** 系統 SHALL 從 Supabase 資料表 `content_pages` 查詢 `slug` 為 `privacy` 的資料並顯示於 UI 上。

#### Scenario: 載入運送與退貨頁面
- **WHEN** 使用者訪問 `/shipping` 頁面
- **THEN** 系統 SHALL 從 Supabase 資料表 `content_pages` 查詢 `slug` 為 `shipping` 的資料並顯示於 UI 上。


<!-- @trace
source: integrate-supabase
updated: 2026-06-08
code:
  - src/App.tsx
  - src/api/catalog.ts
  - src/api/content.ts
  - src/pages/Product/Product.tsx
  - src/components/Header/Header.tsx
  - src/pages/Announcements/AnnouncementList.tsx
  - src/data/locales/zh-TW.json
  - src/pages/Shipping/Shipping.tsx
  - src/data/locales/en-US.json
  - src/pages/Subcategory/Subcategory.tsx
  - src/types/supabase.ts
  - src/pages/Home/Home.tsx
  - src/data/catalog.json
  - src/pages/Terms/Terms.tsx
  - src/pages/About/About.tsx
  - src/api/supabaseClient.ts
  - src/data/catalogData.ts
  - src/pages/Privacy/Privacy.tsx
  - src/pages/Announcements/AnnouncementDetail.tsx
  - src/api/announcement.ts
  - src/pages/Shipping/Shipping.css
  - src/hooks/useAnnouncements.ts
  - src/api/productApi.ts
  - src/components/Footer/Footer.tsx
  - src/data/mockAnnouncements.ts
  - package.json
-->

---
### Requirement: 公告內容整合 (Announcements Integration)

系統 SHALL 於公告列表與公告明細頁面，從 Supabase 的 `announcements` 資料表撈取資料，並按日期降序排列。

#### Scenario: 載入公告列表
- **WHEN** 使用者訪問 `/announcements` 頁面
- **THEN** 系統 SHALL 從 Supabase 的 `announcements` 資料表查詢狀態為 `active` 的公告，並以 `date` 降序排列展示。

#### Scenario: 載入特定公告明細
- **WHEN** 使用者訪問 `/announcements/:id` 頁面
- **THEN** 系統 SHALL 從 Supabase 的 `announcements` 資料表查詢主鍵為指定 ID 的公告明細並展示。


<!-- @trace
source: integrate-supabase
updated: 2026-06-08
code:
  - src/App.tsx
  - src/api/catalog.ts
  - src/api/content.ts
  - src/pages/Product/Product.tsx
  - src/components/Header/Header.tsx
  - src/pages/Announcements/AnnouncementList.tsx
  - src/data/locales/zh-TW.json
  - src/pages/Shipping/Shipping.tsx
  - src/data/locales/en-US.json
  - src/pages/Subcategory/Subcategory.tsx
  - src/types/supabase.ts
  - src/pages/Home/Home.tsx
  - src/data/catalog.json
  - src/pages/Terms/Terms.tsx
  - src/pages/About/About.tsx
  - src/api/supabaseClient.ts
  - src/data/catalogData.ts
  - src/pages/Privacy/Privacy.tsx
  - src/pages/Announcements/AnnouncementDetail.tsx
  - src/api/announcement.ts
  - src/pages/Shipping/Shipping.css
  - src/hooks/useAnnouncements.ts
  - src/api/productApi.ts
  - src/components/Footer/Footer.tsx
  - src/data/mockAnnouncements.ts
  - package.json
-->

---
### Requirement: 產品分類目錄整合 (Subcategory Catalog Integration)

系統 SHALL 於產品目錄頁面與 Header 選單中，從 Supabase 的 `categories` 與 `subcategories` 資料表撈取分類樹狀資料，取代本機的 `catalog.json` 與 `catalogData.ts` 。

#### Scenario: 載入主選單與產品目錄頁面分類
- **WHEN** 系統初始化或進入分類頁面 `/category`
- **THEN** 系統 SHALL 從 Supabase 資料庫撈取所有 `categories` 與 `subcategories` ，並依照 `sort_order` 排序展示於導覽列與分類側邊欄中。

<!-- @trace
source: integrate-supabase
updated: 2026-06-08
code:
  - src/App.tsx
  - src/api/catalog.ts
  - src/api/content.ts
  - src/pages/Product/Product.tsx
  - src/components/Header/Header.tsx
  - src/pages/Announcements/AnnouncementList.tsx
  - src/data/locales/zh-TW.json
  - src/pages/Shipping/Shipping.tsx
  - src/data/locales/en-US.json
  - src/pages/Subcategory/Subcategory.tsx
  - src/types/supabase.ts
  - src/pages/Home/Home.tsx
  - src/data/catalog.json
  - src/pages/Terms/Terms.tsx
  - src/pages/About/About.tsx
  - src/api/supabaseClient.ts
  - src/data/catalogData.ts
  - src/pages/Privacy/Privacy.tsx
  - src/pages/Announcements/AnnouncementDetail.tsx
  - src/api/announcement.ts
  - src/pages/Shipping/Shipping.css
  - src/hooks/useAnnouncements.ts
  - src/api/productApi.ts
  - src/components/Footer/Footer.tsx
  - src/data/mockAnnouncements.ts
  - package.json
-->