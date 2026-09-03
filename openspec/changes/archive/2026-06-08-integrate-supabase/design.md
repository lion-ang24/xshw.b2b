## Context

目前專案中的關於我們、隱私權政策、服務條款、公告列表、產品分類目錄等頁面，皆是讀取本機靜態檔案（例如 `catalog.json` 、 `catalogData.ts` 、 `mockAnnouncements.ts` ）或本機 i18n 檔案（ `zh-TW.json` 、 `en-US.json` ）。這導致內容無法動態更新。本變更案將會引入 Supabase JavaScript SDK ，建立與遠端 PostgreSQL 的整合，並重新設計資料撈取邏輯。

## Goals / Non-Goals

**Goals:**
- 移除對本機 `catalog.json` 、 `catalogData.ts` 與 `mockAnnouncements.ts` 的依賴。
- 將公司簡介、公告、產品目錄、隱私權政策、服務條款、運送與退貨頁面，全數改為由 Supabase 撈取資料。
- 支援語系切換時，動態顯示對應語系欄位（例如： `name_zh` / `name_en` 、 `content_zh` / `content_en` ）。
- 保留現有頁面中未移至資料庫的靜態資訊，並繼續由語系檔撈取。
- 將 Supabase 連線初始化與資料庫請求封裝至 API 層，與 UI 頁面分離。
- 在 `src/types/` 中定義與資料庫結構一致的 TypeScript 型別。

**Non-Goals:**
- 本次變更不包含會員註冊/登入的資料庫寫入或認證整合。
- 產品詳細頁面（Product Detail）的 Supabase 資料撈取不在本次範圍，本次僅處理 Subcategory 產品分類目錄、公告與四個靜態頁面。

## Decisions

### 1. 使用專屬的 API 模組封裝 Supabase Query
- **說明**：為了保持關注點分離（Separation of Concerns），UI 頁面不直接呼叫 `supabase.from()` 進行資料庫查詢，而是呼叫 `src/api/` 目錄下封裝好的服務函式。例如， `src/api/content.ts` 暴露 `getContentPage(slug: string)` 供 About 頁面使用。
- **優點**：資料庫連線邏輯與前端 UI 解耦。若未來需要更換資料庫或修改查詢條件，只需變更 API 層，不需要修改元件層。
- **替代方案**：直接在 Page 元件中使用 `supabaseClient` 進行 query。缺點是程式碼重複性高，且違反單一職責原則。

### 2. 集中定義 Supabase 資料表 TypeScript 型別
- **說明**：在 `src/types/` 目錄下定義與 `init.sql` 資料庫欄位一致的 Interface。例如 `ContentPage` 、 `Announcement` 、 `Category` 、 `Subcategory` 。
- **優點**：確保前後端資料型別安全，並在 IDE 中提供良好的自動完成提示。
- **替代方案**：使用 `any` 型別或僅在 API 檔案內局部定義。這會失去強型別系統帶來的開發保護。

### 3. 多語系動態欄位選擇與 Fallback 機制
- **說明**：在多語系切換時，前端 API 與 React 元件將依據 `i18n.language` （ `zh-TW` 或 `en-US` ）動態渲染對應的欄位（如 `title_zh` / `title_en` ）。若資料庫內未配置特定頁面資料，則 SHALL 回退使用本機語系檔案（ `zh-TW.json` / `en-US.json` ）內的預設文案。

## Risks / Trade-offs

- **[Risk] Supabase 連線失敗或網路延遲**
  - **Mitigation**：在 API 呼叫處加上完整的 `try-catch` 區塊，並在 UI 上提供 loading 骨架屏（Skeleton）或狀態提示。若查詢出錯，則 fallback 到本機預設資料，避免網頁出現空白或崩潰。
- **[Risk] Anon Key 安全性問題**
  - **Mitigation**：雖然 Supabase 的 Anon Key 本身就是設計為前端公開使用，但仍需在 Supabase 後台啟用 RLS（Row Level Security），確保這些靜態內容、公告和產品目錄相關資料表僅限於 Public Read，不開放 Write 權限。
