import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

function Chart({ selectedData }) {
  const [legends, setLegends] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [series, setSeries] = useState([]);

  function dateToString(date) {
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
  }

  function changeLegends() {
    const newLegends = [];
    for (let system in selectedData) {
      newLegends.push(`시스템 ${system}`);
    }
    setLegends(newLegends);
  }

  function changeXAxis() {
    let dates;
    for (let system in selectedData) {
      dates = selectedData[system].map((data) => dateToString(data.date));
      break;
    }
    setXAxis(dates);
  }

  function changeSeries() {
    const newSeries = [];
    for (let system in selectedData) {
      const values = selectedData[system].map((data) => data.testCoverage);
      newSeries.push({
        name: `시스템 ${system}`,
        type: "line",
        data: values,
      });
    }
    setSeries(newSeries);
  }

  function getOptions() {
    return {
      title: {
        text: "테스트 커버리지",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: legends,
      },
      grid: {
        left: "3%",
        right: "5%",
        bottom: "3%",
        top: 40,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: xAxis,
      },
      yAxis: {
        type: "value",
      },
      series: series,
    };
  }

  useEffect(() => {
    changeSeries();
    changeLegends();
    changeXAxis();
  }, [selectedData]);

  return (
    <ReactECharts
      option={getOptions()}
      opts={{ height: 400 }}
      notMerge={true}
    />
  );
}

export default Chart;
