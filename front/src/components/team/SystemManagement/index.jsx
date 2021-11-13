import { Wrapper, IndicatorName } from "./styles";
import { EmojiFrown, EmojiNeutral, EmojiSmile } from "react-bootstrap-icons";
import IndicatorItem from "../IndicatorItem";
import { standard } from "../../../data/standard";

const systemStandard = standard.system;

function SystemManagement({ systemIndicators }) {
  function getIndicators(values, standardObj, standardLess = false) {
    const standardArr = Object.entries(standardObj);
    let cnt = 0;
    const indicatorElements = values.map((value, idx) => {
      let color;
      if (standardLess) {
        if (value >= standardArr[idx][1]) {
          cnt += 1;
          color = "red";
        }
      } else {
        if (value <= standardArr[idx][1]) {
          cnt += 1;
          color = "red";
        }
      }
      return (
        <IndicatorItem
          name={standardArr[idx][0]}
          value={value}
          valueColor={color}
        />
      );
    });
    return [getStandardResult(cnt, standardArr), indicatorElements];
  }

  function getStandardResult(cnt, standardArr) {
    const proportion = cnt / standardArr.length;
    let result;
    if (proportion <= 0.2) {
      result = "good";
    } else if (proportion <= 0.4) {
      result = "neutral";
    } else {
      result = "bad";
    }
    return getEmoji(result);
  }

  function getEmoji(result) {
    let emojiCase;
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
      <div className="system-indicators__first">
        <IndicatorName>구조품질지수</IndicatorName>
        <div className="indicator-detail">
          {getIndicators(
            [
              systemIndicators.complexity,
              systemIndicators.overlapping,
              systemIndicators.scale,
            ],
            systemStandard.구조품질지수
          )}
        </div>
      </div>
      <div className="system-indicators__second">
        <IndicatorName>중대결함수</IndicatorName>
        <div className="indicator-detail">
          {getIndicators(
            [
              systemIndicators.critical,
              systemIndicators.high,
              systemIndicators.medium,
              systemIndicators.low,
            ],
            systemStandard.중대결함수,
            true
          )}
        </div>
      </div>
      <div className="system-indicators__third">
        <IndicatorItem
          emoji
          name="기능적합성"
          value={systemIndicators.functionalCompatibility}
          standard={systemStandard.기능적합성}
          unit="%"
        />
        <IndicatorItem
          emoji
          name="테스트 커버리지"
          value={systemIndicators.testCoverage}
          standard={systemStandard.테스트커버리지}
          unit="%"
        />
        <IndicatorItem
          emoji
          name="시스템 신뢰도"
          value={systemIndicators.mtbf}
          standard={systemStandard.시스템신뢰도}
        />
      </div>
    </Wrapper>
  );
}

export default SystemManagement;
