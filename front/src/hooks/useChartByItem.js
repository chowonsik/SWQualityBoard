import { useState } from "react";

function setThreshold(type) {
  switch (type) {
    case "mtbf":
      return [200, 400, 600, 800];
    case "functionalCompatibility":
      return [20, 40, 60, 80];
    case "testCoverage":
      return [20, 40, 60, 80];
    case "codeReviewRate":
      return [20, 40, 60, 80];
    case "conventionRate":
      return [20, 40, 60, 80];
    case "deliveryRate":
      return [20, 40, 60, 80];
    case "receptionRate":
      return [20, 40, 60, 80];
  }
}

function getThresholdColor(value, threshold) {
  if (value <= threshold[0]) {
    return "#FF5252";
  } else if (value <= threshold[1]) {
    return "#FF751A";
  } else if (value <= threshold[2]) {
    return "#FFCC00";
  } else if (value <= threshold[3]) {
    return "#1A75FF";
  } else {
    return "#2E8B57";
  }
}

function getChartTitle(type) {
  switch (type) {
    case "mtbf":
      return "시스템신뢰도";
    case "functionalCompatibility":
      return "기능적합성";
    case "testCoverage":
      return "테스트커버리지";
    case "codeReviewRate":
      return "코드리뷰율";
    case "conventionRate":
      return "코딩컨벤션";
    case "deliveryRate":
      return "정기납기율";
    case "receptionRate":
      return "시스템접수율";
  }
}

const useChartByItem = (initType, initDataList) => {
  const [type, setType] = useState(initType);
  const [dataList, setDataList] = useState(
    initDataList.sort((a, b) => a.value - b.value)
  );
  const [title, setTitle] = useState(getChartTitle(initType));

  const setChartByItem = (changedType, changedDataList) => {
    setType(changedType);
    setDataList(changedDataList.sort((a, b) => a.value - b.value));
  };

  const chartData = {
    title,
    yAxis: dataList.map((data) => data.name),
    xData: [
      {
        type: "bar",
        data: dataList.map((curData) => {
          return {
            value: curData.value,
            itemStyle: {
              color: getThresholdColor(curData.value, setThreshold(type)),
            },
          };
        }),
      },
    ],
  };
  return {
    setChartByItem,
    chartData,
  };
};

const chartData = {
  title: "시스템신뢰도",
  yAxis: ["A", "B", "C", "D", "E", "F"],
  xData: [
    {
      type: "bar",
      data: [
        {
          value: 10,
          itemStyle: {
            color: "#FF5252",
          },
        },
        {
          value: 25,
          itemStyle: {
            color: "#ff9933",
          },
        },
        {
          value: 42,
          itemStyle: {
            color: "#009900",
          },
        },
        {
          value: 7,
          itemStyle: {
            color: "#FF5252",
          },
        },
        {
          value: 55,
          itemStyle: {
            color: "#3366ff",
          },
        },
        {
          value: 17,
          itemStyle: {
            color: "#FF5252",
          },
        },
      ],
    },
  ],
};

export default useChartByItem;
