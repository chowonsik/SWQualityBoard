import { useHistory } from "react-router";
import { Wrapper, Content, MenuTitle, ItemBox, CloseBtn } from "./styles";
import { BarChartFill, GraphUp, X } from "react-bootstrap-icons";
function CardHover({ width, height, dataType, onClickClose }) {
  const history = useHistory();
  function handleClickDetailChart() {
    history.push({
      pathname: `/detail/chart/${dataType}`,
      state: { dataType },
    });
  }

  function handleClickSequel() {
    switch (dataType) {
      case "defect":
        history.push({
          pathname: "/system",
          state: { dataType: "critical" },
        });
        break;
      case "structure":
        history.push({
          pathname: "/system",
          state: { dataType: "complexity" },
        });
        break;
      case "functionalCompatibility":
      case "testCoverage":
      case "mtbf":
        history.push({
          pathname: "/system",
          state: { dataType },
        });
        break;
      case "codeReviewRate":
      case "conventionRate":
      case "deliveryRate":
      case "receptionRate":
        history.push({
          pathname: "/team/table",
          state: { dataType, teamId: "ALL" },
        });
    }
  }
  return (
    <Wrapper width={width} height={height}>
      <CloseBtn id="close">
        <X onClick={onClickClose} />
      </CloseBtn>
      <Content>
        <ItemBox onClick={handleClickSequel}>
          <GraphUp className="chart-icon" />
          <MenuTitle>지표 추이</MenuTitle>
        </ItemBox>
        <ItemBox onClick={handleClickDetailChart}>
          <BarChartFill className="chart-icon" />
          <MenuTitle>항목별 상세지표</MenuTitle>
        </ItemBox>
      </Content>
    </Wrapper>
  );
}
export default CardHover;
