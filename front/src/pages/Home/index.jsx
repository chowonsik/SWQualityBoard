import { useState, useEffect } from "react";
import EChartsReact from "echarts-for-react";

import Card from "../../components/common/Card";
import CardHover from "../../components/common/CardHover";
import { Wrapper, CardWrapper } from "./styles";
import { Box, BoxArrowUpRight } from "react-bootstrap-icons";
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
  function handleClickMoreMenu(e) {
    const parent = e.target.parentNode;
    const hoverCard = parent.nextSibling;
    if (hoverCard) {
      hoverCard.style.display = "flex";
    }
  }

  function handleClickClose(e) {
    const curNode = e.target;
    const hoverCard = curNode.parentNode.parentNode;
    if (hoverCard.id && hoverCard.id === "close") {
      hoverCard.parentNode.style.display = "none";
    } else if (hoverCard) {
      hoverCard.style.display = "none";
    }
  }
  return (
    <Wrapper>
      <CardWrapper width={cardWidth} height={cardHeight}>
        <Card width={cardWidth} height={cardHeight}>
          <h3>중대결함수</h3>
          <BoxArrowUpRight onClick={handleClickMoreMenu} />
          <EChartsReact
            opts={{ width: 200, height: 200 }}
            option={{
              xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  data: [
                    120,
                    {
                      value: 200,
                      itemStyle: {
                        color: "#a90000",
                      },
                    },
                    150,
                    80,
                    70,
                    110,
                    130,
                  ],
                  type: "bar",
                },
              ],
            }}
          />
        </Card>
        <CardHover
          width={cardWidth}
          height={cardHeight}
          onClickClose={handleClickClose}
        />
      </CardWrapper>
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
