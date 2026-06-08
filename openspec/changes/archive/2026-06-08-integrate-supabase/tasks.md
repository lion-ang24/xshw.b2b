## 1. 基礎建設與連線設定

- [x] 1.1 安裝 `@supabase/supabase-js` 套件。
- [x] 1.2 建立 `src/api/supabaseClient.ts` 並使用使用者提供的網址與 Anon Key 初始化 Supabase 客戶端。
- [x] 1.3 建立 `src/types/supabase.ts` 定義 `ContentPage` 、 `Announcement` 、 `Category` 、 `Subcategory` 等資料表對應的 TypeScript 型別。

## 2. API 服務層重構

- [x] 2.1 建立 `src/api/content.ts` 提供靜態頁面（about、privacy、terms、shipping）的資料撈取函式，加入 Fallback 處理。
- [x] 2.2 建立 `src/api/announcement.ts` 提供公告列表與公告明細資料撈取函式。
- [x] 2.3 建立 `src/api/catalog.ts` 提供產品類別與子類別的資料撈取與樹狀整合函式。

## 3. UI 頁面與元件重構

- [x] 3.1 修改 `src/components/Header/Header.tsx` 使用 Supabase 的分類資料取代原 `catalogData.ts` 參考，支援語系切換。
- [x] 3.2 修改 `src/pages/Subcategory/Subcategory.tsx` 改由 Supabase 分類與產品資料表撈取，取代原 `catalogData.ts` 參考。
- [x] 3.3 修改 `src/pages/About/About.tsx` 串接 Supabase `content_pages` 的 `about` 資料，並處理語系切換。
- [x] 3.4 修改 `src/pages/Privacy/Privacy.tsx` 串接 Supabase `content_pages` 的 `privacy` 資料，並處理語系切換。
- [x] 3.5 修改 `src/pages/Terms/Terms.tsx` 串接 Supabase `content_pages` 的 `terms` 資料，並處理語系切換。
- [x] 3.6 新建運送與退貨頁面 `src/pages/Shipping/Shipping.tsx` 串接 Supabase `content_pages` 的 `shipping` 資料，並於 `src/App.tsx` 註冊該路由。
- [x] 3.7 修改 `src/pages/Announcements/AnnouncementList.tsx` 與 `AnnouncementDetail.tsx` 改以呼叫 API 撈取 Supabase 公告資料，取代原對 `mockAnnouncements` 的參考。

## 4. 清理本機靜態參考與測試

- [x] 4.1 刪除本機 `src/data/catalog.json` 、 `src/data/catalogData.ts` 、 `src/data/mockAnnouncements.ts` 等不再使用的檔案。
- [x] 4.2 清理 `src/data/locales/zh-TW.json` 與 `src/data/locales/en-US.json` 中被移往資料庫的靜態內文欄位。
- [x] 4.3 啟動開發伺服器驗證所有頁面資料載入、語系切換與 API 呼叫是否正常。
