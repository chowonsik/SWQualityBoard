import { ExclamationTriangleFill } from "react-bootstrap-icons";
import { Wrapper, WarnMessage } from "./styles";
function Warning({ isLight }) {
  return (
    <Wrapper isLight={isLight}>
      <ExclamationTriangleFill id="warn-icon" />
      <WarnMessage>기준에 미달한 지표를 표시합니다.</WarnMessage>
    </Wrapper>
  );
}

export default Warning;
