import { useState, useEffect } from "react";

import Card from "../../components/common/Card";
import DetailChart from "../../components/ChartByItem/DetailChart";
import { Wrapper } from "./styles";

function ChartByItem() {
  const [curWidth, setCurWidth] = useState(window.outerWidth);
  const [cardWidth, setCardWidth] = useState(1200);
  const [cardHeight, setCardHeight] = useState(800);
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
  return (
    <Wrapper>
      <Card width={cardWidth} height={cardHeight}>
        <DetailChart chartData={chartData} chartHeight={cardHeight} />
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
