import { Wrapper } from "./styles";
import { EmojiSmile, EmojiNeutral, EmojiFrown } from "react-bootstrap-icons";

function IndicatorItem({
  name = "코드리뷰율",
  value = "82%",
  emoji = false,
  standard = [],
  valueColor = "",
}) {
  let emojiCase;
  const valueNum = parseInt(value.replace(/[^0-9]/g, ""));
  if (valueNum >= standard[0]) {
    emojiCase = <EmojiSmile className="emoji green" />;
  } else if (valueNum >= standard[1]) {
    emojiCase = <EmojiNeutral className="emoji yellow" />;
  } else {
    emojiCase = <EmojiFrown className="emoji red" />;
  }

  return (
    <Wrapper>
      <dt className="indicator-name">{name}</dt>
      <dd className={"indicator-value " + (valueColor && valueColor)}>
        {emoji && emojiCase}
        <span>{value}</span>
      </dd>
    </Wrapper>
  );
}

export default IndicatorItem;
