import { ArrowRight } from "react-bootstrap-icons";
import { Wrapper, NowValue, PastValue, ValueWrapper } from "./styles";

function PercentValue({ data, isPastShow }) {
  return (
    <Wrapper>
      <ValueWrapper>
        <PastValue isPastShow={isPastShow}>{data.pastValue}%</PastValue>
        {isPastShow && (
          <ArrowRight
            style={{
              fontSize: "1.5rem",
              margin: "0 0.25rem",
            }}
          />
        )}
        <NowValue
          pastValue={data.pastValue}
          nowValue={data.nowValue}
          isPastShow={isPastShow}
        >
          {data.nowValue}%
        </NowValue>
      </ValueWrapper>
    </Wrapper>
  );
}

export default PercentValue;
