## Context

目前平台缺乏一個統一發佈與查看最新資訊的管道。為了讓 B2B 企業客戶能即時獲取重要通知與活動，我們需要在前台新增「公告」功能。目前會先以 Mock Data 進行前端 UI 與互動邏輯的開發，待後端 API 就緒後再進行串接。

## Goals / Non-Goals

**Goals:**
- 實作首頁 Banner 中的互動式 Megamenu（顯示近一個月內、最多 7 筆的公告標題）。
- 實作公告清單頁（每頁 6 筆，具備 Pagination，內文超過 100 字元截斷並顯示「了解更多」）。
- 實作公告明細頁（顯示完整內容）。
- 建立一個負責處理公告 Mock Data 的獨立 Service 或 Hook，以便未來抽換為真實 API。

**Non-Goals:**
- 本階段不包含後端 API 實作。
- 不包含後台管理介面（新增/編輯/刪除公告）的開發。

## Decisions

- **Mock Data 結構**：定義一個統一的介面 `Announcement`，包含 `id`, `title`, `content`, `date`, `status` (內容為 "新活動"、"公告" 或 "更新") 等屬性。Mock Data 統一放置於一處集中管理。
- **Megamenu 互動**：透過 React 狀態管理 Megamenu 的展開與收合，確保點擊項目（「查看全部」或特定公告）時能觸發收合動作並透過 React Router 導向對應頁面。
- **清單頁分頁處理**：在前端使用 Mock Data 陣列進行 `slice` 切割，模擬分頁效果。未來的 API 串接只需將前端切換頁碼的邏輯改為發送帶有 `page` 參數的請求即可。
- **內文截斷邏輯**：撰寫一個 Utility Function，判斷字串長度是否大於 100，若是則截斷並加上 `...`，確保排版整齊。

## Risks / Trade-offs

- **[Risk] 前端 Mock Data 排序與過濾邏輯與未來後端不一致**
  → Mitigation：將過濾「近一個月」與「排序」的邏輯明確封裝在特定的資料獲取 Hook 中（例如 `useAnnouncements`），未來只需將該 Hook 內部替換為 API 呼叫，不影響元件渲染邏輯。
