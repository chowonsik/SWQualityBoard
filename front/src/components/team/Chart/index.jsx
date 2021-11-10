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
    for (let team in selectedData) {
      newLegends.push(`개발 ${team}팀`);
    }
    setLegends(newLegends);
  }

  function changeXAxis() {
    let dates;
    for (let team in selectedData) {
      dates = selectedData[team].map((data) => dateToString(data.date));
      break;
    }
    setXAxis(dates);
  }

  function changeSeries() {
    const newSeries = [];
    for (let team in selectedData) {
      const values = selectedData[team].map((data) => data.testCoverage);
      newSeries.push({
        name: `개발 ${team}팀`,
        type: "line",
        data: values,
      });
    }
    setSeries(newSeries);
  }

  useEffect(() => {
    changeLegends();
    changeXAxis();
    changeSeries();
  }, [selectedData]);

  function option() {
    return {
      title: {
        text: "코드리뷰율",
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

  return (
    <ReactECharts option={option()} style={{ height: 400 }} notMerge={true} />
  );
}

export default Chart;
