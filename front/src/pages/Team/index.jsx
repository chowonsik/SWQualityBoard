import ReactEcharts from "echarts-for-react";
import { colors } from "../../styles";
import IndicatorItem from "../../components/team/IndicatorItem";
import SystemManagement from "../../components/team/SystemManagement";
import { useState } from "react";
import {
  StyledCard,
  Container,
  Wrapper,
  SystemTab,
  TeamManagement,
} from "./styles";

function Team() {
  const teamName = "개발 1팀";
  const systems = ["시스템A", "시스템B", "시스템C"];
  const [activeTab, setActiveTab] = useState(0);

  const standard = {
    codeReview: [90, 80, 70],
    codeConvention: [90, 80, 70],
    onTimeDelivery: [90, 80, 70],
    systemReception: [90, 80, 70],
  };

  function getChartOption() {
    // api 요청
    return {
      title: {
        text: `${teamName} 지표`,
        textStyle: {
          fontSize: 20,
        },
      },
      legend: {
        right: 0,
        data: ["개발팀 평균", teamName],
        padding: 5,
        textStyle: {
          fontSize: 16,
        },
      },
      radar: {
        indicator: [
          { name: "코드리뷰율", max: 6500 },
          { name: "정시납기율", max: 16000 },
          { name: "코드컨벤션", max: 30000 },
          { name: "개발 리드타임 ", max: 38000 },
        ],
        name: {
          fontSize: 14,
          color: `${colors.blue}`,
        },
      },
      series: [
        {
          name: "개발팀 지표 비교",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000],
              name: "개발팀 평균",
            },
            {
              value: [5000, 14000, 28000, 26000],
              name: teamName,
            },
          ],
        },
      ],
    };
  }

  function changeActiveTab(idx) {
    setActiveTab(idx);
  }

  return (
    <Wrapper>
      <h1>개발 1팀</h1>
      <Container>
        <div>
          <StyledCard height="240">
            <TeamManagement>
              <div className="team-indicators__first">
                <IndicatorItem
                  emoji
                  name="코드리뷰율"
                  value="62%"
                  standard={standard.codeReview}
                />
                <IndicatorItem
                  emoji
                  name="코딩컨벤션 준수율"
                  value="80%"
                  standard={standard.codeConvention}
                />
              </div>
              <div className="team-indicators__second">
                <IndicatorItem
                  emoji
                  name="정시 납기율"
                  standard={standard.onTimeDelivery}
                  value="90%"
                />
                <IndicatorItem
                  emoji
                  name="시스템 접수율"
                  standard={standard.systemReception}
                  value="70%"
                />
                <IndicatorItem name="개발 리드타임" value="52h" />
              </div>
            </TeamManagement>
          </StyledCard>
          <StyledCard height="440">
            <ReactEcharts
              option={getChartOption()}
              style={{ height: "400px" }}
            />
          </StyledCard>
        </div>
        <StyledCard>
          <SystemTab>
            {systems?.map((system, idx) => (
              <h2
                className={"system-name" + (activeTab === idx ? " active" : "")}
                onClick={() => changeActiveTab(idx)}
              >
                {system}
              </h2>
            ))}
          </SystemTab>
          <SystemManagement />
        </StyledCard>
      </Container>
    </Wrapper>
  );
}

export default Team;
