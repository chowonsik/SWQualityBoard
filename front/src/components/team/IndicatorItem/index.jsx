import { Wrapper } from "./styles";
import { EmojiSmile, EmojiNeutral, EmojiFrown } from "react-bootstrap-icons";

function IndicatorItem({ name, value, emoji = false, standard, valueColor }) {
  function checkStandard() {
    const valueNum = parseInt(value.replace(/[^0-9]/g, ""));
    console.log(valueNum);
    if (valueNum >= standard[0]) {
      return "good";
    } else if (valueNum >= standard[1]) {
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
        <span>{value}</span>
      </dd>
    </Wrapper>
  );
}

export default IndicatorItem;
