此作品獲得The F2E 3rd [前端組入圍獎](https://2021.thef2e.com/reward/)

<img width="306" alt="Screen Shot 2022-10-10 at 3 02 10 PM" src="https://user-images.githubusercontent.com/55543282/194813262-88cbe455-e834-43ac-ab81-ac986bad4bb7.png">


# 作品說明

The F2E 全台公車動態時刻查詢應用服務

<img src="./src/assets/md/introduction.png" alt="introduction" width="1000"/>

- 搜尋指定公車路線的站序資料、預估時間
- 搜尋附近站牌及路線資料
- 地圖模式檢視公車路線站牌位置
- 收藏常用路線（目前使用local storage）
- 手機、平板、電腦皆可使用

Data source: [TDX 運輸資料流通服務](https://tdx.transportdata.tw/)

Design: [KT](https://www.behance.net/KT_Designer)

# 系統說明
專案運行方式：ng serve

網站連結：https://claudia-teng.github.io/tw-bus-tracker/

# 資料夾說明

src/app:
- auth：利用intercepter處理http request header
- components：主要分為 index（首頁）, city-bus（公車）, nearby（附近站牌）, my-fav（收藏路線）
- model：存放所有interface
- service：存放所有service

# 使用技術

- Angular
- Sass
- PrimeNG
- CSS Flexbox
- CSS Grid
- RWD

# 第三方服務

- Google Maps

