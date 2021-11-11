import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Card from "../../components/common/Card";
import DetailChart from "../../components/ChartByItem/DetailChart";
import useChartByItem from "../../hooks/useChartByItem";
import { Wrapper } from "./styles";

function ChartByItem() {
  const [curWidth, setCurWidth] = useState(window.outerWidth);
  const [cardWidth, setCardWidth] = useState(1200);
  const [cardHeight, setCardHeight] = useState(800);
  const history = useHistory();
  const [type, setType] = useState(history.location.state.dataType);
  const [dataList, setDataList] = useState(
    Object.keys(JSON.parse(sessionStorage.getItem("systemData"))).includes(type)
      ? JSON.parse(sessionStorage.getItem("systemData"))[type]
      : JSON.parse(sessionStorage.getItem("teamData"))[type]
  );

  const chartByItem = useChartByItem(type, dataList);
  useEffect(() => {
    if (curWidth >= 768 && curWidth < 1024) {
      setCardWidth(750);
      setCardHeight(600);
    } else if (curWidth > 375 && curWidth < 768) {
      setCardWidth(400);
      setCardHeight(400);
    } else if (curWidth <= 375) {
      setCardWidth(360);
      setCardHeight(200);
    }
  }, [curWidth]);

  useEffect(() => {
    if (
      sessionStorage.getItem("systemData") &&
      sessionStorage.getItem("teamData")
    ) {
      const sessionDataList = Object.keys(
        JSON.parse(sessionStorage.getItem("systemData"))
      ).includes(type)
        ? JSON.parse(sessionStorage.getItem("systemData"))
        : JSON.parse(sessionStorage.getItem("teamData"));
      setDataList(sessionDataList[type]);
      chartByItem.setChartByItem(type, dataList);
    }
  }, [type]);

  return (
    <Wrapper>
      <Card width={cardWidth} height={cardHeight}>
        <DetailChart
          chartData={chartByItem.chartData}
          chartHeight={cardHeight}
        />
      </Card>
    </Wrapper>
  );
}

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

export default ChartByItem;
