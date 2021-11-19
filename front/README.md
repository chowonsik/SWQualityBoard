# SW Quality board Frontend

![Generic badge](https://img.shields.io/badge/react-v17.0.2-green.svg) ![Generic badge](https://img.shields.io/badge/node-14.17.1-yellow.svg) ![node](https://img.shields.io/npm/v/node) ![styled-components](https://img.shields.io/npm/v/styled-components?color=ff69b4&label=styled-components) ![webpack](https://img.shields.io/npm/v/webpack?color=yellow&label=webpack) ![echarts](https://img.shields.io/npm/v/echarts?color=orange&label=echarts)

```
📦src
├─📂components
│  ├─📂ChartByItem
│  │  └─📂DetailChart
│  ├─📂common
│  │  ├─📂Calendar
│  │  ├─📂Card
│  │  ├─📂CardHover
│  │  ├─📂Header
│  │  ├─📂Indicator
│  │  ├─📂RangeCalendar
│  │  ├─📂Sidebar
│  │  └─📂ToastMessage
│  ├─📂forms
│  │  └─📂LoginForm
│  ├─📂Home
│  │  ├─📂CountValue
│  │  ├─📂HomeChart
│  │  ├─📂HomeChartValue
│  │  ├─📂PercentValue
│  │  └─📂Warning
│  ├─📂system
│  │  ├─📂Chart
│  │  ├─📂Memo
│  │  └─📂Table
│  └─📂team
│      ├─📂Chart
│      ├─📂IndicatorItem
│      ├─📂SystemManagement
│      └─📂Table
├─📂data
├─📂hooks
├─📂lib
│  ├─📂PrivateRoute
│  └─📂PublicRoute
├─📂pages
│  ├─📂ChartByItem
│  ├─📂Home
│  ├─📂Login
│  ├─📂System
│  ├─📂Team
│  └─📂TeamTable
└─📂styles
```

<br>

## ✔ How to start project in local environment

```
// 레포지토리 클론
$ git clone <https://lab.ssafy.com/s05-final/S05P31F003.git>

// 경로 변경
$ cd S05P31F003/front

// npm package install
$ npm install

// 프로젝트 실행
$ npm start
```

## ✔ Tech Stack

| Usage               | Stack           |
| ------------------- | --------------- |
| `React`             | Fronted Library |
| `HTML/JSX`          | Markup Language |
| `Styled-components` | Styling         |
| `echarts`           | Chart Library   |

## ✔ Project Structure

- `src/` 하위 폴더들은 다음과 같은 역할을 한다.
- `pages/` : 최상위 컴포넌트들을 포함하며 로직 구현에 집중한다.
- `components/` : `page/` 의 최상위 컴포넌트에 포함되는 하위 컴포넌트를 정의하며 표현에 집중한다.
- `hooks/` : 커스텀 훅들이 정의되어 있다.
- `lib/` : URL 접근 제한을 위한 컴포넌트가 정의되어 있다.
- `styles/` : 전역 스타일이 변수로 지정되어 있다.
