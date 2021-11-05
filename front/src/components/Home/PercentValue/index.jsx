import { Wrapper, NowValue } from "./styles";

function PercentValue({ data }) {
  return (
    <Wrapper>
      <NowValue>{data.nowValue}%</NowValue>
    </Wrapper>
  );
}

export default PercentValue;
