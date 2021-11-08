import { Wrapper, Content, MenuTitle, ItemBox, CloseBtn } from "./styles";
import { BarChartFill, GraphUp, X } from "react-bootstrap-icons";
function CardHover({ width, height, onClickClose }) {
  return (
    <Wrapper width={width} height={height}>
      <CloseBtn id="close">
        <X onClick={onClickClose} />
      </CloseBtn>
      <Content>
        <ItemBox>
          <GraphUp className="chart-icon" />
          <MenuTitle>지표 추이</MenuTitle>
        </ItemBox>
        <ItemBox>
          <BarChartFill className="chart-icon" />
          <MenuTitle>항목별 상세지표</MenuTitle>
        </ItemBox>
      </Content>
    </Wrapper>
  );
}
export default CardHover;
