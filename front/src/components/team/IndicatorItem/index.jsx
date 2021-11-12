import { Wrapper } from "./styles";
import { EmojiSmile, EmojiNeutral, EmojiFrown } from "react-bootstrap-icons";

function IndicatorItem({
  name,
  value,
  emoji = false,
  standard,
  valueColor,
  unit = "",
}) {
  function checkStandard() {
    if (value >= standard[0]) {
      return "good";
    } else if (value >= standard[1]) {
      return "neutral";
    } else {
      return "bad";
    }
  }

  function getEmoji() {
    let emojiCase;
    const result = checkStandard();
    if (result === "good") {
      emojiCase = <EmojiSmile className="emoji green" />;
    } else if (result === "neutral") {
      emojiCase = <EmojiNeutral className="emoji yellow" />;
    } else {
      emojiCase = <EmojiFrown className="emoji red" />;
    }
    return emojiCase;
  }

  return (
    <Wrapper>
      <dt className="indicator-name">{name}</dt>
      <dd className={"indicator-value " + valueColor}>
        {emoji && getEmoji()}
        <span>{value && value + unit}</span>
      </dd>
    </Wrapper>
  );
}

export default IndicatorItem;
