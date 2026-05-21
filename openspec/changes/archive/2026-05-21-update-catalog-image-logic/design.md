## Context

目前系統中的型錄資料轉換腳本 (`scripts/convertXlsxToJson.cjs`) 會將 `imageUrl` 置於每個產品的頂層屬性。這代表即使一個產品底下擁有多個不同規格 (SKU)，它們在 UI 上只能顯示同一張產品圖片。然而，使用者希望能夠針對每一個 SKU 顯示不同的產品圖片，以便更精確地展示規格差異。

## Goals / Non-Goals

**Goals:**
- 將資料結構從產品層級的 `imageUrl` 擴展至 SKU 層級的 `imageUrl`。
- 修改 `convertXlsxToJson.cjs`，使得產出的 JSON 在 `specs` 陣列的每個物件中都包含對應的 `imageUrl`。
- 在 `Subcategory.tsx` 的產品卡片中，預設顯示該產品第一筆 SKU 的 `imageUrl`。
- 在 `Product.tsx` 中，當使用者選擇不同的規格時，畫面左側（或主要展示區）應切換顯示該 SKU 的 `imageUrl`。

**Non-Goals:**
- 修改現有 `convertXlsxToJson.cjs` 解析其他欄位（如中英文產品名稱、規格敘述等）的邏輯。
- 改變後端的 API 結構（目前為純靜態/轉換資料驅動）。

## Decisions

**1. 資料結構調整：**
- *決策*：將 `imageUrl` 從產品層級移出，或在每個 spec 中新增 `imageUrl`。基於目前使用者的要求：「改成specs object底下每個sku number對應各自的imageUrl」。因此 `convertXlsxToJson.cjs` 必須在處理每一列 Excel 資料並推入 `specs` 時，將該列的圖片欄位取出並放進 spec 中。

**2. 預設圖片處理：**
- *決策*：產品列表頁 (Subcategory) 透過 `product.specs[0]?.imageUrl` 取得第一筆 SKU 的圖片作為封面顯示。

**3. Product.tsx 互動狀態管理：**
- *決策*：在 `Product.tsx` 中使用 React State（如 `selectedSpec` 或 `activeImageUrl`），當使用者點選規格名稱時更新該狀態，並重新渲染主要圖片。

## Risks / Trade-offs

- **Risk**: 部分產品可能某些 SKU 沒有圖片。
  - **Mitigation**: 確保 UI 顯示圖片時具備 fall-back 機制（若為空字串，顯示預設圖片或是隱藏）。
- **Risk**: 型錄轉換腳本在解析 Excel 圖片欄位時，若使用者未填寫完整。
  - **Mitigation**: 若 Excel 規格列無填寫圖片 URL，預設給予空字串 `""`，並確保前端可以安全處理空字串。
