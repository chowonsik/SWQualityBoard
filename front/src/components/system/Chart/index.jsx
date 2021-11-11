import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

const indicatorMap = {
  complexity: "구조품질지수(복잡도)",
  critical: "중대결함수(critical)",
  high: "중대결함수(high)",
  low: "중대결함수(low)",
  medium: "중대결함수(medium)",
  mtbf: "시스템신뢰도",
  functionalCompatibility: "기능적합성",
  overlapping: "구조품질지수(중복도)",
  testCoverage: "테스트커버리지",
  scale: "구조품질지수(규모)",
};

function Chart({ data, indicator = "testCoverage" }) {
  const [legends, setLegends] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [series, setSeries] = useState([]);

  function changeLegends() {
    const set = data.reduce(
      (prev, cur) => prev.add(`시스템 ${cur.system.name}`),
      new Set()
    );
    const newLegends = [...set];
    setLegends(newLegends);
  }

  function changeXAxis() {
    const set = data.reduce((prev, cur) => prev.add(cur.createdAt), new Set());
    const newXAxis = [...set];
    newXAxis.sort();
    setXAxis(newXAxis);
  }

  function changeSeries() {
    const newData = [...data];
    newData.sort((o1, o2) => {
      return o1.createdAt < o2.createdAt ? -1 : 1;
    });
    const set = data.reduce(
      (prev, cur) => prev.add(`시스템 ${cur.system.name}`),
      new Set()
    );
    const newLegends = [...set];
    const newSeries = newLegends.map((legend) => {
      return {
        name: legend,
        type: "line",
        data: [],
      };
    });
    newData.forEach((item, i) => {
      newSeries[i % newLegends.length].data.push(item[indicator]);
    });
    setSeries(newSeries);
  }

  function getOptions() {
    return {
      title: {
        text: indicatorMap[indicator],
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
    changeLegends();
    changeXAxis();
    changeSeries();
  }, [data]);

  useEffect(() => {
    changeSeries();
  }, [indicator]);

  return (
    <ReactECharts
      option={getOptions()}
      opts={{ height: 400 }}
      notMerge={true}
    />
  );
}

export default Chart;
