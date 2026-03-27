# drag-selection-box

使用 [dragselect](https://github.com/thibaultjanbeyer/dragselect) 套件，並從單一 `index` 入口進入網頁。

三種測試模式：

1. 直向測試
2. 橫向測試
3. 直橫混合測試

## 安裝

```bash
npm install
```

## 啟動測試頁

```bash
npm start
```

預設會在 `http://localhost:3000` 啟動。

## 進入方式

- `http://localhost:3000/`

頁面上方分頁按鈕使用同一份邏輯產生（依 query `mode` 切換）：

- `http://localhost:3000/?mode=vertical`
- `http://localhost:3000/?mode=horizontal`
- `http://localhost:3000/?mode=mixed`

## 檔案結構

- `index.html`：唯一入口頁
- `css/app.css`：共用樣式
- `js/index.js`：入口與分頁連結邏輯
- `js/scenarios.js`：三種情境設定
- `js/dragselect-core.js`：DragSelect 掛載與共用行為

## 測試重點

- 滑鼠拖曳框選
- `Ctrl`/`Cmd`/`Shift` 多選
- 自動捲動（靠近容器邊緣時）
- 清空選取
- 選取模式
