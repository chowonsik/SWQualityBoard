import { useState, useEffect } from "react";

import Card from "../../components/common/Card";
import { Wrapper } from "./styles";
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
  return (
    <Wrapper>
      <Card width={cardWidth} height={cardHeight}></Card>
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
