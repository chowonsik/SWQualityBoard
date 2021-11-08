import { useState } from "react";
import EChartsReact from "echarts-for-react";

function getOption(chartData) {
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

function DetailChart({ chartData, chartWidth, chartHeight }) {
  const [chartOption, setChartOption] = useState(getOption(chartData));
  return (
    <EChartsReact
      option={chartOption}
      opts={{ width: chartWidth, height: chartHeight }}
    ></EChartsReact>
  );
}

export default DetailChart;
