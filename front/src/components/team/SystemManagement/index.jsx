import { Wrapper, IndicatorName } from "./styles";
import { EmojiSmile, EmojiNeutral, EmojiFrown } from "react-bootstrap-icons";
import IndicatorItem from "../IndicatorItem";

function SystemManagement() {
  const standard = {
    structureQuality: 3,
    importantDefect: {
      critical: 1,
      high: 3,
      medium: 5,
      low: 7,
    },
    functionCompatibility: [90, 80, 70],
    testCoverage: [90, 80, 70],
    systemReliability: [90, 80, 70],
  };

  function structureQualityEmoji(value) {
    // 이모지도 같이 변하게, cnt로
    // if (value < standard.structureQuality) {
    // }
  }

  return (
    <Wrapper>
      <div className="system-indicators__first">
        <IndicatorName>구조품질지수</IndicatorName>
        <div className="indicator-detail">
          <EmojiSmile className="emoji" />
          <IndicatorItem
            name="중복도"
            value="5"
            valueColor={5 < standard.structureQuality ? "red" : ""}
          />
          <IndicatorItem
            name="복잡도"
            value="2"
            valueColor={2 < standard.structureQuality ? "red" : ""}
          />
          <IndicatorItem
            name="규모"
            value="4"
            valueColor={4 < standard.structureQuality ? "red" : ""}
          />
        </div>
      </div>
      <div className="system-indicators__second">
        <IndicatorName>중대결합함수</IndicatorName>
        <div className="indicator-detail">
          <EmojiSmile className="emoji" />
          <IndicatorItem
            name="critical"
            value="1"
            valueColor={4 > standard.importantDefect.critical ? "red" : ""}
          />
          <IndicatorItem
            name="high"
            value="5"
            valueColor={4 > standard.importantDefect.high ? "red" : ""}
          />
          <IndicatorItem
            name="medium"
            value="2"
            valueColor={4 > standard.importantDefect.medium ? "red" : ""}
          />
          <IndicatorItem
            name="low"
            value="4"
            valueColor={4 > standard.importantDefect.low ? "red" : ""}
          />
        </div>
      </div>
      <div className="system-indicators__third">
        <IndicatorItem
          emoji
          name="기능 적합성"
          value="90%"
          standard={standard.functionCompatibility}
        />
        <IndicatorItem
          emoji
          name="테스트 커버리지"
          value="90%"
          standard={standard.testCoverage}
        />
        <IndicatorItem
          emoji
          name="시스템 신뢰도"
          value="80%"
          standard={standard.systemReliability}
        />
      </div>
    </Wrapper>
  );
}

export default SystemManagement;
