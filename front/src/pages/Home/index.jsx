import { useState, useEffect } from "react";

import Card from "../../components/common/Card";
import CardHover from "../../components/common/CardHover";
import HomeChart from "../../components/Home/HomeChart";
import CountValue from "../../components/Home/CountValue";
import PercentValue from "../../components/Home/PercentValue";
import { Wrapper, CardWrapper, CardContent, TitleAndMoreBtn } from "./styles";
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
    const parent = e.target.parentNode.parentNode;
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
          <TitleAndMoreBtn>
            <h3>중대결함수</h3>
            <BoxArrowUpRight onClick={handleClickMoreMenu} />
          </TitleAndMoreBtn>
          <CardContent>
            <CountValue data={defectsData} />
            <HomeChart
              isPie={false}
              chartData={defects}
              width={cardWidth * (2 / 3)}
              height={cardHeight}
            />
          </CardContent>
        </Card>
        <CardHover
          width={cardWidth}
          height={cardHeight}
          onClickClose={handleClickClose}
        />
      </CardWrapper>
      <CardWrapper width={cardWidth} height={cardHeight}>
        <Card width={cardWidth} height={cardHeight}>
          <TitleAndMoreBtn>
            <h3>시스템 신뢰도</h3>
            <BoxArrowUpRight onClick={handleClickMoreMenu} />
          </TitleAndMoreBtn>
          <CardContent>
            <CountValue data={reliabilityData} />
            <HomeChart
              isPie={true}
              chartData={systemReliability}
              width={cardWidth * (2 / 3)}
              height={cardHeight}
            />
          </CardContent>
        </Card>
        <CardHover
          width={cardWidth}
          height={cardHeight}
          onClickClose={handleClickClose}
        />
      </CardWrapper>
      <CardWrapper width={cardWidth} height={cardHeight}>
        <Card width={cardWidth} height={cardHeight}>
          <TitleAndMoreBtn>
            <h3>구조품질지수</h3>
            <BoxArrowUpRight onClick={handleClickMoreMenu} />
          </TitleAndMoreBtn>
          <CardContent>
            <CountValue data={structuralData} />
            <HomeChart
              isPie={false}
              chartData={structuralQuality}
              width={cardWidth * (2 / 3)}
              height={cardHeight}
            />
          </CardContent>
        </Card>
        <CardHover
          width={cardWidth}
          height={cardHeight}
          onClickClose={handleClickClose}
        />
      </CardWrapper>
      <CardWrapper width={cardWidth} height={cardHeight}>
        <Card width={cardWidth} height={cardHeight}>
          <TitleAndMoreBtn>
            <h3>테스트커버리지</h3>
            <BoxArrowUpRight onClick={handleClickMoreMenu} />
          </TitleAndMoreBtn>
          <CardContent>
            <PercentValue data={coverageData} />
            <HomeChart
              isPie={true}
              chartData={testCoverage}
              width={cardWidth * (2 / 3)}
              height={cardHeight}
            />
          </CardContent>
        </Card>
        <CardHover
          width={cardWidth}
          height={cardHeight}
          onClickClose={handleClickClose}
        />
      </CardWrapper>
    </Wrapper>
  );
}
const defects = {
  xData: ["critical", "high", "medium", "low"],
  yData: [
    {
      value: 2,
      itemStyle: {
        color: "#FF5252",
      },
    },
    {
      value: 4,
      itemStyle: {
        color: "#1A75FF",
      },
    },
    {
      value: 2,
      itemStyle: {
        color: "#1A75FF",
      },
    },
    {
      value: 8,
      itemStyle: {
        color: "#1A75FF",
      },
    },
  ],
};

const defectsData = [
  { category: "Critical", nowValue: 2, pastValue: null },
  { category: "High", nowValue: 4, pastValue: null },
  { category: "Medium", nowValue: 2, pastValue: null },
  { category: "Low", nowValue: 8, pastValue: null },
];

const systemReliability = {
  data: [
    {
      value: 2,
      name: "A",
      itemStyle: {
        color: "#1A75FF",
      },
    },
    {
      value: 5,
      name: "B",
      itemStyle: {
        color: "#2E8B57",
      },
    },
    {
      value: 4,
      name: "C",
      itemStyle: {
        color: "#FFCC00",
      },
    },
    {
      value: 3,
      name: "D",
      itemStyle: {
        color: "#FF5252",
      },
    },
  ],
};

const reliabilityData = [
  { category: "A", nowValue: 2, pastValue: null, categoryColor: "#1A75FF" },
  { category: "B", nowValue: 5, pastValue: null, categoryColor: "#2E8B57" },
  { category: "C", nowValue: 4, pastValue: null, categoryColor: "#FFCC00" },
  { category: "D", nowValue: 3, pastValue: null, categoryColor: "#FF5252" },
];

const structuralQuality = {
  xData: ["복잡도", "중복도", "규모"],
  yData: [
    {
      value: 4,
      itemStyle: {
        color: "#1A75FF",
      },
    },
    {
      value: 3,
      itemStyle: {
        color: "#1A75FF",
      },
    },
    {
      value: 4,
      itemStyle: {
        color: "#FFCC00",
      },
    },
  ],
};

const structuralData = [
  { category: "복잡도", nowValue: 4, pastValue: null },
  { category: "중복도", nowValue: 3, pastValue: null },
  { category: "규모", nowValue: 4, pastValue: null },
];

const testCoverage = {
  data: [
    {
      value: 32,
      name: "팀평균 테스트커버리지",
      itemStyle: {
        color: "#1A75FF",
      },
    },
    {
      value: 68,
      itemStyle: {
        color: "#DCDDE1",
      },
    },
  ],
};

const coverageData = {
  nowValue: 32,
};
export default Home;
