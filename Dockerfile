# 使用 Node.js 作為基底映像檔 (適用於開發環境)
FROM node:20-alpine

# 設定工作目錄
WORKDIR /app

# 先複製 package.json 進行安裝 (利用 Docker 緩存機制)
COPY package.json ./

# 安裝依賴
RUN npm install

# 複製其餘專案檔案
COPY . .

# 曝露 Vite 預設的 5173 port
EXPOSE 5173

# 啟動 Vite 開發伺服器 (package.json 中已設定 vite --host)
CMD ["npm", "run", "dev"]
