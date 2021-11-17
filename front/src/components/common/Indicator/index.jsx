import { useState } from "react";
import { Wrapper, Title, IndicatorHelp } from "./styles";

function getIndicatorHelp(indicatorTitle) {
  const helpDict = {
    중대결함수:
      "정적분석을 통해 발견된 심각 수준의 결함으로 Critical, High, Medium, Low로 나뉜다.",
    코드리뷰율: "인당 일일 2회 이상 코드리뷰에 참여한 인원의 비율을 의미한다.",
    코딩컨벤션:
      "프로그래밍 언어별 변수, 클래스, 메소드 등의 네이밍 규칙 준수율을 의미한다.",
    구조품질지수: "소스코드의 복잡도(1~5), 중복도, 규모를 의미한다.",
    시스템접수율: "시스템을 활용하여 접수받은 요청사항의 비율을 의미한다.",
    테스트커버리지:
      "단위 테스트 케이스가 해당 파일내에서 수행한 라인 커버리지를 의미하며 30%라면 100줄 중에 30줄에 대해서 단위 케이스가 수행된 것을 의미한다.",
    기능적합성: "요구사항의 정확한 기능 구현 여부에 대한 수치를 의미한다.",
    시스템신뢰도: "시스템 고장 조치 이후 고장 발생에 소요된 시간을 의미한다.",
    정시납기율: "고객 요청 시간 내 릴리즈 건을 의미한다.",
    개발리드타임: "개발 요청 건에 대한 릴리즈 소요시간을 의미한다.",
  };

  return helpDict[indicatorTitle];
}

function Indicator({ indicatorTitle, fontSize, isBold, width }) {
  const [help, setHelp] = useState(getIndicatorHelp(indicatorTitle));

  return (
    <Wrapper>
      <Title fontSize={fontSize} isBold={isBold}>
        {indicatorTitle}
      </Title>
      <IndicatorHelp width={width}>{help}</IndicatorHelp>
    </Wrapper>
  );
}

export default Indicator;
