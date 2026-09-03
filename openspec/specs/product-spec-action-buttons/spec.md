## ADDED Requirements

### Requirement: 規格選定後顯示行動按鈕組
當使用者在產品詳情頁選定一個規格選項後，系統 SHALL 在規格明細下方顯示「加入佇列」與「直接訂購」兩個按鈕。在任何規格被選定之前，按鈕組 SHALL NOT 顯示。

#### Scenario: 未選規格時按鈕不顯示
- **WHEN** 使用者進入產品詳情頁，尚未點選任何規格
- **THEN** 「加入佇列」與「直接訂購」按鈕均不可見

#### Scenario: 選定規格後按鈕出現
- **WHEN** 使用者點選任一規格選項（例如「4.0Ah High Capacity」）
- **THEN** 「加入佇列」與「直接訂購」兩個按鈕 SHALL 出現於規格明細區塊下方

#### Scenario: 切換規格後按鈕持續顯示
- **WHEN** 使用者已選定規格後，再切換至另一個規格選項
- **THEN** 按鈕組 SHALL 持續顯示，不消失

### Requirement: 加入佇列按鈕互動
「加入佇列」按鈕 SHALL 提供點擊視覺回饋，讓使用者知道操作已被接收。

#### Scenario: 點擊加入佇列
- **WHEN** 使用者點擊「加入佇列」按鈕
- **THEN** 系統 SHALL 顯示操作回饋（如 toast 通知或按鈕狀態變化），告知使用者已加入佇列

### Requirement: 直接訂購按鈕開啟外部連結
「直接訂購」按鈕點擊後，系統 SHALL 在新的瀏覽器分頁開啟 `https://www.google.com`，不影響目前產品頁。

#### Scenario: 點擊直接訂購
- **WHEN** 使用者點擊「直接訂購」按鈕
- **THEN** 系統 SHALL 在新分頁開啟 `https://www.google.com`
- **THEN** 目前產品詳情頁 SHALL 維持原狀，不發生跳轉

#### Scenario: 新分頁開啟不被攔截
- **WHEN** 使用者點擊「直接訂購」按鈕
- **THEN** 系統 SHALL 使用 `<a target="_blank" rel="noopener noreferrer">` 方式開啟，確保瀏覽器相容性
