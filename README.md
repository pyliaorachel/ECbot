# EC Bot

Hands-on lab for 女力新時代 #SheMeansBusniess 聊天機器人工作坊。

## 安裝

- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://github.com/nodejs-tw/nodejs-wiki-book/blob/master/zh-tw/node_npm.rst#%E5%AE%89%E8%A3%9D-npm)

## 步驟

1. 複製專案
    1. `Clone or download` > `Download ZIP`，解壓縮並以 VS Code 開啟專案
2. 準備資料庫
    1. 建立 Google 試算表，內含 Number, Category, Name, Price, Description, Photo, IsHot 等欄位
    2. 至 [SheetDB.io](https://sheetdb.io/) 申請帳號，貼入試算表網址產生API URL
    3. 將 API ID 複製貼至 `config/default.json`
3. 完成程式碼
    1. 打開 `index.js`，按照註解步驟填入完整程式碼
    2. 完整程式碼可參考 `index_gold.js`
4. 安裝套件
    1. 開啟 VS Code terminal
    2. 輸入指令 `npm install npm-install-all -g`
    3. 輸入指令 `npm-install-all index.js`
5. 執行
    1. 輸入指令 `npm start`

若最後一步出現 error，請檢查重新程式碼。若沒有 error，也不代表程式碼完全正確，需要部署後進行測試，