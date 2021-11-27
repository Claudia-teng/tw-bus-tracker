# 作品說明

The F2E 全台公車動態時刻查詢應用服務

- 搜尋指定公車路線的站序資料、預估時間
- 搜尋附近站牌及路線資料
- 地圖模式查詢公車路線站牌位置
- 手機、平板、電腦皆可使用

（目前有透過locaStorage的方式存放查詢縣市）

# 系統說明
專案運行方式：ng serve
網站連結：https://claudia-teng.github.io/tw-bus-tracker/

# 資料夾說明

src/app:
- auth：利用intercepter處理http request header
- components：主要分為 index（首頁）, city-bus（公車）, nearby（附近站牌）, intercity-bus（客運、未實作）
- model/service

# 使用技術

- Angular
- Sass
- PrimeNG

# 第三方服務

- Google map

