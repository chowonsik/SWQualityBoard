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
  const [dataList, setDataList] = useState(getData(type));

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

  function getData(type) {
    if (
      sessionStorage.getItem("systemData") &&
      sessionStorage.getItem("teamData")
    ) {
      if (type === "defect" || type === "structure") {
        if (type === "defect") {
          const critical = JSON.parse(sessionStorage.getItem("systemData"))[
            "critical"
          ];
          const high = JSON.parse(sessionStorage.getItem("systemData"))["high"];
          const medium = JSON.parse(sessionStorage.getItem("systemData"))[
            "medium"
          ];
          const low = JSON.parse(sessionStorage.getItem("systemData"))["low"];
          const tempDataObj = {
            name: critical.map((data) => data.name),
            critical,
            high,
            medium,
            low,
          };
          return tempDataObj;
        } else {
          const complexity = JSON.parse(sessionStorage.getItem("systemData"))[
            "complexity"
          ];
          const overlapping = JSON.parse(sessionStorage.getItem("systemData"))[
            "overlapping"
          ];
          const scale = JSON.parse(sessionStorage.getItem("systemData"))[
            "scale"
          ];
          const tempDataObj = {
            name: complexity.map((data) => data.name),
            complexity,
            overlapping,
            scale,
          };
          return tempDataObj;
        }
      } else {
        const sessionDataList = Object.keys(
          JSON.parse(sessionStorage.getItem("systemData"))
        ).includes(type)
          ? JSON.parse(sessionStorage.getItem("systemData"))[type]
          : JSON.parse(sessionStorage.getItem("teamData"))[type];
        return sessionDataList;
      }
    }
  }

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

export default ChartByItem;
