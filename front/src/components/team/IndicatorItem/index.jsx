import { Wrapper } from "./styles";
import { EmojiSmile, EmojiNeutral, EmojiFrown } from "react-bootstrap-icons";
import { useHistory } from "react-router";

const indicatorMap = {
  codeReviewRate: "코드리뷰율",
  conventionRate: "코딩컨벤션 준수율",
  receptionRate: "시스템 접수율",
  devLeadTime: "개발 리드타임",
  deliveryRate: "정시 납기율",
  critical: "critical",
  high: "high",
  low: "low",
  medium: "medium",
  mtbf: "시스템신뢰도",
  functionalCompatibility: "기능적합성",
  testCoverage: "테스트커버리지",
  overlapping: "중복도",
  complexity: "복잡도",
  scale: "규모",
};

function IndicatorItem({
  value,
  emoji = false,
  standard,
  valueColor,
  unit = "",
  indicator,
  systemId,
  teamId,
}) {
  const history = useHistory();
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

  function handleIndicatorClick(dataType) {
    switch (dataType) {
      case "critical":
      case "medium":
      case "high":
      case "low":
      case "complexity":
      case "overlapping":
      case "scale":
      case "functionalCompatibility":
      case "testCoverage":
      case "mtbf":
        history.push({
          pathname: "/system",
          state: { dataType, systemId },
        });
        break;
      case "codeReviewRate":
      case "conventionRate":
      case "deliveryRate":
      case "receptionRate":
        history.push({
          pathname: "/team/table",
          state: { dataType, teamId },
        });
        break;
      default:
        break;
    }
  }
  return (
    <Wrapper onClick={() => handleIndicatorClick(indicator)}>
      <dt className="indicator-name">{indicatorMap[indicator]}</dt>
      <dd className={"indicator-value " + valueColor}>
        {emoji && getEmoji()}
        <span>{value && value + unit}</span>
      </dd>
    </Wrapper>
  );
}

export default IndicatorItem;
