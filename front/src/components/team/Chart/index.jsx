import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

const indicatorMap = {
  codeReviewRate: "코드리뷰율",
  conventionRate: "코딩컨벤션",
  receptionRate: "시스템접수율",
  devLeadTime: "개발리드타임",
  deliveryRate: "정시납기율",
};

function Chart({ data, indicator }) {
  const [legends, setLegends] = useState([]);
  const [xAxis, setXAxis] = useState([]);
  const [series, setSeries] = useState([]);

  function changeLegends() {
    const set = data.reduce((prev, cur) => prev.add(cur.team.name), new Set());
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
    const set = data.reduce((prev, cur) => prev.add(cur.team.name), new Set());
    const newLegends = [...set];
    const newSeries = newLegends.map((legend) => {
      return {
        name: legend,
        type: "line",
        data: [],
        smooth: true,
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
        right: "3%",
        bottom: "3%",
        top: 60,
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
      style={{ height: 400 }}
      notMerge={true}
    />
  );
}

export default Chart;
