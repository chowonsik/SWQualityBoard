import { Wrapper, ValueBox, Category, NowValue } from "./styles";

function CountValue({ data }) {
  return (
    <Wrapper>
      {data.map((item) => (
        <ValueBox>
          <Category fontColor={item.categoryColor}>{item.category}</Category>
          <NowValue>{item.nowValue}</NowValue>
        </ValueBox>
      ))}
    </Wrapper>
  );
}

export default CountValue;
