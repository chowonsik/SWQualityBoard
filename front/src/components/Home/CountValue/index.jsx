import { ArrowRight } from "react-bootstrap-icons";
import {
  Wrapper,
  ValueBox,
  Category,
  NowValue,
  PastValue,
  ValueWrapper,
} from "./styles";

function CountValue({ data, isPastShow, dataType }) {
  return (
    <Wrapper>
      {data.map((item) => (
        <ValueBox>
          <Category fontColor={item.categoryColor}>{item.category}</Category>
          <ValueWrapper>
            <PastValue isPastShow={isPastShow}>
              {item.pastValue ? item.pastValue : 0}
            </PastValue>
            {isPastShow && <ArrowRight className="icon" />}
            <NowValue
              pastValue={item.pastValue}
              nowValue={item.nowValue}
              isPastShow={isPastShow}
              dataType={dataType}
            >
              {item.nowValue}
            </NowValue>
          </ValueWrapper>
        </ValueBox>
      ))}
    </Wrapper>
  );
}

export default CountValue;
