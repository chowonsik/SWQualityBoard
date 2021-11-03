import { useState, useEffect } from "react";
import EChartsReact from "echarts-for-react";

import Card from "../../components/common/Card";
import { Wrapper, CardContent } from "./styles";
function Home() {
  const [curWidth, setCurWidth] = useState(window.outerWidth);
  const [cardWidth, setCardWidth] = useState(500);
  const [cardHeight, setCardHeight] = useState(250);
  useEffect(() => {
    if (curWidth > 768 && curWidth <= 1024) {
      setCardWidth(480);
      setCardHeight(240);
    } else if (curWidth > 375 && curWidth <= 768) {
      setCardWidth(400);
      setCardHeight(200);
    } else if (curWidth <= 375) {
      setCardWidth(350);
      setCardHeight(200);
    }
  }, [curWidth]);
  const optionObj = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80],
        type: "bar",
      },
    ],
  };
  const optsObj = {
    width: 350,
    height: 200,
  };
  return (
    <Wrapper>
      <Card width={cardWidth} height={cardHeight}>
        <h3>중대결함수</h3>
        <CardContent>
          <div>
            <p>Critical: 1</p>
            <p>High: 4</p>
            <p>Medium: 2</p>
            <p>Low: 2</p>
          </div>
          <EChartsReact option={optionObj} opts={optsObj} />
        </CardContent>
      </Card>
      <Card width={cardWidth} height={cardHeight}></Card>
      <Card width={cardWidth} height={cardHeight}></Card>
      <Card width={cardWidth} height={cardHeight}></Card>
      <Card width={cardWidth} height={cardHeight}></Card>
      <Card width={cardWidth} height={cardHeight}></Card>
      <Card width={cardWidth} height={cardHeight}></Card>
      <Card width={cardWidth} height={cardHeight}></Card>
      <Card width={cardWidth} height={cardHeight}></Card>
    </Wrapper>
  );
}

export default Home;
