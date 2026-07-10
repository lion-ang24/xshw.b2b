## Context

當前翔盛五金 B2B 電子商務與產品型錄平台的前台，在產品明細頁中，每個產品規格（Specification）僅支援展示單張主圖片（`currentSpec.imageUrl`）。隨著後台功能升級支援「規格多圖片管理區塊」以設定最多 5 張圖片，前台亦需要配合更新圖片展示機制，支援規格內多張圖片的左右輪播切換與 Lightbox 連動瀏覽，以提供更豐富的產品視覺細節。

## Goals / Non-Goals

**Goals:**
- 更新前台資料撈取 API `src/api/productApi.ts`，撈取並排序規格內的所有圖片 URL，產出 `imageUrls` 陣列。
- 在 `Product.tsx` 的商品大圖片展示容器中，當目前規格擁有多張圖片時，顯示左右切換導覽箭頭與點狀指示器（dots indicator）。
- 提供左右箭頭點擊循環切換與點狀指示器點擊切換圖片之互動效果。
- 點擊開啟 Lightbox 放大預覽時，Lightbox 內部須支援相同的左右切換箭頭，且其與主圖之當前顯示圖片索引保持同步。
- 切換產品規格時，將目前圖片切換索引重置為 0（首張/主圖片）。

**Non-Goals:**
- 不修改後台資料結構與儲存邏輯（已由後台完成）。
- 本功能不涉及主圖片之外的其他輪播區塊，亦不涉及自動輪播功能（僅支援手動點擊切換）。

## Decisions

### 1. 資料庫資料對應擴充
- **決策**：在 `src/api/productApi.ts` 中，對每個規格的 `product_images` 依 `is_primary` 降冪排序。過濾空字串與無效 URL 後，組成 `imageUrls` 陣列回傳給前台。
- **替代方案**：不排序直接返回，或僅傳回第一張圖片。
  - *捨棄原因*：不排序會導致主圖（`is_primary = true`）被放在次要順序，無法保證首圖的正確性；僅傳回第一張則無法滿足展示多圖的設計初衷。

### 2. 前台狀態管理與切換邏輯
- **決策**：在 `Product.tsx` 中引進 `currentImageIndex` 狀態，初始化為 `0`。當 `selectedSpecIndex` 變更時，透過 `useEffect` 將 `currentImageIndex` 重置為 `0`。
- **替代方案**：不使用 useEffect 監聽，而是在切換規格按鈕的 `onClick` 事件中呼叫重置。
  - *捨棄原因*：`selectedSpecIndex` 的變更來源可能有多處，使用 `useEffect` 進行狀態同步更具聲明性（declarative）且能防止狀態遺漏。

### 3. Lightbox 同步邏輯
- **決策**：Lightbox 共享同一個 `currentImageIndex` 狀態，在 Lightbox 內切換圖片時亦會直接更新 `currentImageIndex`。
- **替代方案**：Lightbox 維護自己獨立的圖片索引狀態。
  - *捨棄原因*：若為獨立狀態，則當使用者關閉 Lightbox 時，主畫面的圖片無法反映使用者在 Lightbox 內看過的最後一張圖片，兩者狀態產生斷層。共享狀態可實現最流暢的跨容器瀏覽體驗。

## Implementation Contract

### 1. 介面與資料格式 (Interface & Data Shape)
- `fetchProductDetails` 回傳的產品詳細資料中，`specs` 陣列中的每個規格物件將增加 `imageUrls: string[]` 欄位。

### 2. 行為 (Behavior)
- **多圖展示與箭頭控制**：若 `currentSpec.imageUrls` 長度大於 1，系統必須渲染 `.image-nav-arrow`（左/右箭頭）與 `.product-image-dots`（點狀指示器）。若僅有 1 張圖或無圖，上述控制元件必須被隱藏。
- **循環切換 (Wrap-around)**：點擊右側箭頭且當前為最後一張圖片時，索引必須回到 0。點擊左側箭頭且當前為第 0 張圖片時，索引必須更新為最後一張圖片之索引。
- **Lightbox 聯動**：開啟 Lightbox 時，Lightbox 與主畫面皆使用 `currentSpecImageUrls[currentImageIndex]`，點擊 Lightbox 中的左右箭頭必須更新該索引。

### 3. 驗證條件 (Acceptance Criteria)
- 當產品規格設定了 3 張圖片時，明細頁主圖左右顯示箭頭且下方有 3 個點狀指示器。
- 點擊箭頭可正常循環切換這 3 張圖片。
- 點擊下方點狀指示器可切換到對應圖片。
- 切換至其他只有 1 張圖片之規格時，箭頭與點狀指示器自動消失。
- 點擊放大按鈕進入 Lightbox 後，在 Lightbox 中點擊右箭頭，關閉 Lightbox 後，主畫面也顯示更新後的圖片。

## Risks / Trade-offs

- **[Risk]**：圖片 URL 無效或載入失敗導致大圖區域顯示空白或破圖。
  - **Mitigation**：利用 CSS 設定預設的背景色，並利用 `referrerPolicy="no-referrer"` 確保第三方圖片 URL 能正確載入。若無圖片 URL，依舊降級顯示「暫無圖片」區塊。
