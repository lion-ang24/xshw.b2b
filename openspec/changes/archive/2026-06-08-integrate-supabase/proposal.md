## Why

將現有靜態網頁（關於我們、隱私權政策、服務條款、運送與退貨）、公告資訊與產品目錄資料由本機靜態檔案（如 `catalog.json`、`catalogData.ts`、`mockAnnouncements.ts` ），改為由遠端 Supabase PostgreSQL 資料庫動態提取，提供後台內容管理彈性，並確保中英文語系切換時資料一致性。

## What Changes

- **靜態內容與公告整合**：公司簡介（`pages/About`）、公告（`pages/Announcements`）、隱私權政策（`pages/Privacy`）、服務條款（`pages/Terms`）、運送與退貨（`pages/Shipping`）頁面，全數改由 Supabase 資料庫中的 `content_pages` 與 `announcements` 資料表撈取。
- **產品目錄整合**：產品目錄（`pages/Subcategory`）與 Header 選單的分類，改由 Supabase 的 `categories` 與 `subcategories` 資料表撈取。
- **資料提取邏輯重構**：從 Supabase 撈取的資料結構定義於 `src/types/` 目錄中，資料提取邏輯封裝至 API 層，符合單一職責與關注點分離原則。
- **語系切換支援**：當使用者在 Header 切換語系時，系統動態由 Supabase 撈取對應語系欄位（例如：`name_zh` / `name_en` ）。
- **移除本機靜態參考**：移除 `catalog.json`、`catalogData.ts` 與 `mockAnnouncements.ts` 參考，並清理 `en-US.json` 及 `zh-TW.json` 中已移入資料庫的靜態文字。

## Capabilities

### New Capabilities

- `supabase-data-fetching`: 建立與 Supabase 資料庫的連線與 API 模組，並整合靜態頁面、公告、產品目錄之資料存取。

### Modified Capabilities

<!-- Existing capabilities whose REQUIREMENTS are changing (not just implementation).
     Only list here if spec-level behavior changes. Each needs a delta spec file.
     Use existing spec names from openspec/specs/. Leave empty if no requirement changes. -->

## Impact

- **依賴項目**：新增 `@supabase/supabase-js` 套件。
- **資料儲存**：移除對 `src/data/catalog.json`、`src/data/catalogData.ts`、`src/data/mockAnnouncements.ts` 的本機檔案依賴。
- **語系檔案**：精簡 `src/data/locales/en-US.json` 和 `src/data/locales/zh-TW.json`，移去各網頁的靜態內文與分類名稱欄位。
- **程式碼結構**：
  - 新增 `src/api/supabaseClient.ts` 初始化 Supabase 客戶端。
  - 新增 `src/api/content.ts`、`src/api/announcement.ts`、`src/api/catalog.ts` 封裝 API 存取邏輯。
  - 新增 `src/types/supabase.ts` 存放 Supabase 資料結構的 TypeScript 型別。
  - 修改 `src/pages/About/About.tsx`、`src/pages/Announcements/AnnouncementList.tsx`、`src/pages/Announcements/AnnouncementDetail.tsx`、`src/pages/Subcategory/Subcategory.tsx`、`src/pages/Privacy/Privacy.tsx`、`src/pages/Terms/Terms.tsx`、`src/components/Header/Header.tsx`。
  - 新增 `src/pages/Shipping/Shipping.tsx` 用於運送與退貨頁面。
