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
    case "defect":
      return "중대결함수";
    case "structure":
      return "구조품질지수";
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
    Array.isArray(initDataList)
      ? initDataList.sort((a, b) => a.value - b.value)
      : initDataList
  );
  const [title, setTitle] = useState(getChartTitle(initType));

  const setChartByItem = (changedType, changedDataList) => {
    setType(changedType);
    Array.isArray(changedDataList)
      ? setDataList(changedDataList.sort((a, b) => a.value - b.value))
      : setDataList(changedDataList);
  };
  if (type === "defect" || type === "structure") {
    if (type === "defect") {
      const chartData = {
        title,
        yAxis: dataList.name,
        xData: [
          {
            name: "critical",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: dataList.critical.map((data) => data.value),
            itemStyle: {
              color: "#FF5252",
            },
          },
          {
            name: "high",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: dataList.high.map((data) => data.value),
            itemStyle: {
              color: "#FFCC00",
            },
          },
          {
            name: "medium",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: dataList.medium.map((data) => data.value),
            itemStyle: {
              color: "#1A75FF",
            },
          },
          {
            name: "low",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: dataList.low.map((data) => data.value),
            itemStyle: {
              color: "#2E8B57",
            },
          },
        ],
      };
      return {
        setChartByItem,
        chartData,
      };
    } else {
      const chartData = {
        title,
        yAxis: dataList.name,
        xData: [
          {
            name: "complexity",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: dataList.complexity.map((data) => data.value),
            itemStyle: {
              color: "#FF5252",
            },
          },
          {
            name: "overlapping",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: dataList.overlapping.map((data) => data.value),
            itemStyle: {
              color: "#FFCC00",
            },
          },
          {
            name: "scale",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: dataList.scale.map((data) => data.value),
            itemStyle: {
              color: "#1A75FF",
            },
          },
        ],
      };
      return {
        setChartByItem,
        chartData,
      };
    }
  } else {
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
  }
};

export default useChartByItem;
