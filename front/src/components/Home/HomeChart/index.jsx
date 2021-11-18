import EChartsReact from "echarts-for-react";

function getOption(chartType, chartData) {
  if (chartType) {
    const pieChartOption = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        left: "center",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },

          labelLine: {
            show: false,
          },
          data: chartData.data,
          bottom: "3%",
        },
      ],
    };
    return pieChartOption;
  } else {
    const barChartOption = {
      xAxis: {
        type: "category",
        data: chartData.xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: chartData.yData,
          type: "bar",
        },
      ],
    };
    return barChartOption;
  }
}

function HomeChart({ isPie, chartData, width, height }) {
  const option = getOption(isPie, chartData);
  return <EChartsReact option={option} opts={{ width, height }}></EChartsReact>;
}

export default HomeChart;
