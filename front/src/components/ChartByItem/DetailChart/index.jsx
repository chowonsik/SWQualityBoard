import { useState } from "react";
import EChartsReact from "echarts-for-react";

function getOption(type, chartData) {
  if (type === "defects" || type === "structure") {
    const chartOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
        data: chartData.yAxis,
      },
      series: chartData.xData,
    };
    return chartOption;
  } else {
    const chartOption = {
      title: {
        text: chartData.title,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: "category",
        data: chartData.yAxis,
      },
      series: chartData.xData,
    };
    return chartOption;
  }
}

function DetailChart({ type, chartData, chartWidth, chartHeight }) {
  const [chartOption, setChartOption] = useState(getOption(type, chartData));
  return (
    <EChartsReact
      option={chartOption}
      opts={{ width: chartWidth, height: chartHeight }}
    ></EChartsReact>
  );
}

export default DetailChart;
