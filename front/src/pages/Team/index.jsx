import ReactEcharts from "echarts-for-react";
import { colors } from "../../styles";
import IndicatorItem from "../../components/team/IndicatorItem";
import SystemManagement from "../../components/team/SystemManagement";
import { useState, useEffect } from "react";
import {
  StyledCard,
  Container,
  Wrapper,
  SystemTab,
  TeamManagement,
  TeamSelectorContainer,
  TeamSelector,
} from "./styles";
import { standard } from "../../data/standard";
import { requestGet } from "../../lib/apis";
import useDateString from "../../hooks/useDateString";
import { ChevronDown } from "react-bootstrap-icons";

const standardTeam = standard.team;

function Team() {
  const { authorities, teams } = JSON.parse(localStorage.getItem("loginUser"));
  const today = useDateString();
  const isAccesible = authorities[0].role === "ROLE_EXECUTIVE";
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [systems, setSystems] = useState(selectedTeam.systems);
  const [selectShow, setSelectShow] = useState(false);
  const [teamIndicators, setTeamIndicators] = useState({});
  const [wholeTeamIndicators, setwholeTeamIndicators] = useState({});

  const [selectedSystemId, setSelectedSystemId] = useState(systems[0].id);
  const [systemIndicators, setSystemIndicators] = useState({});

  useEffect(() => {
    getTeamQuality(selectedTeam.id);
    getTeamQualityAverage();
    getSystemQuality(selectedSystemId);
  }, []);

  useEffect(() => {
    getTeamQuality(selectedTeam.id);
    getTeamQualityAverage();
    const changeSystem = async () => {
      await setSystems(selectedTeam.systems);
    };
    changeSystem();
    setSelectedSystemId(selectedTeam.systems[0].id);
  }, [selectedTeam]);

  useEffect(() => {
    getSystemQuality(selectedSystemId);
  }, [selectedSystemId]);

  function getTeamQuality(teamId) {
    const params = {
      teams: teamId,
      start: today,
      end: today,
    };
    requestGet("/team-quality", params).then((res) =>
      setTeamIndicators(res?.result[0])
    );
  }

  function getTeamQualityAverage() {
    requestGet("/team-quality/average").then((res) =>
      setwholeTeamIndicators(res?.result)
    );
  }

  function getChartOption() {
    // api 요청
    return {
      title: {
        text: `${selectedTeam.name} 지표`,
        textStyle: {
          fontSize: 20,
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        right: 0,
        data: ["개발팀 평균", selectedTeam.name],
        padding: 5,
        textStyle: {
          fontSize: 16,
        },
      },
      radar: {
        indicator: [
          { name: "코드리뷰율", max: 100 },
          { name: "정시납기율", max: 100 },
          { name: "코드컨벤션", max: 100 },
          { name: "시스템 접수율", max: 100 },
          { name: "개발 리드타임 ", max: 400 },
        ],
        center: ["50%", "55%"],

        name: {
          fontSize: 14,
          color: `${colors.blue}`,
        },
      },
      series: [
        {
          name: "개발팀 지표 비교",
          type: "radar",
          tooltip: {
            trigger: "item",
          },
          data: [
            {
              value: [
                teamIndicators.codeReviewRate,
                teamIndicators.deliveryRate,
                teamIndicators.conventionRate,
                teamIndicators.receptionRate,
                teamIndicators.devLeadTime,
              ],
              name: "개발팀 평균",
            },
            {
              value: [
                wholeTeamIndicators.codeReviewRate,
                wholeTeamIndicators.deliveryRate,
                wholeTeamIndicators.conventionRate,
                wholeTeamIndicators.receptionRate,
                wholeTeamIndicators.devLeadTime,
              ],
              name: selectedTeam.name,
            },
          ],
        },
      ],
    };
  }

  function getSystemQuality(systemId) {
    const params = {
      systems: systemId,
      start: today,
      end: today,
    };
    requestGet("/system-quality", params).then((res) =>
      setSystemIndicators(res.result[0])
    );
  }

  function changeSelectedSystem(systemId) {
    setSelectedSystemId(systemId);
    getSystemQuality(systemId);
  }

  return (
    <Wrapper>
      <TeamSelectorContainer selectShow={selectShow} isAccesible={isAccesible}>
        <div
          onClick={() => {
            setSelectShow(!selectShow);
          }}
          className="selected-name"
        >
          {selectedTeam.name}
          {isAccesible && <ChevronDown className="icon" />}
        </div>
      </TeamSelectorContainer>
      {isAccesible && selectShow && (
        <TeamSelector>
          {teams.map((team, index) => (
            <button key={index} onClick={() => setSelectedTeam(team)}>
              {team.name}
            </button>
          ))}
        </TeamSelector>
      )}
      <Container>
        <div>
          <StyledCard height="240">
            <TeamManagement>
              <div className="team-indicators__first">
                <IndicatorItem
                  emoji
                  name="코드리뷰율"
                  value={teamIndicators?.codeReviewRate}
                  standard={standardTeam.코드리뷰율}
                  unit="%"
                />
                <IndicatorItem
                  emoji
                  name="코딩컨벤션 준수율"
                  value={teamIndicators?.conventionRate}
                  standard={standardTeam.컨벤션준수율}
                  unit="%"
                />
              </div>
              <div className="team-indicators__second">
                <IndicatorItem
                  emoji
                  name="정시 납기율"
                  value={teamIndicators?.deliveryRate}
                  standard={standardTeam.정시납기율}
                  unit="%"
                />
                <IndicatorItem
                  emoji
                  name="시스템 접수율"
                  value={teamIndicators?.receptionRate}
                  standard={standardTeam.시스템접수율}
                  unit="%"
                />
                <IndicatorItem
                  name="개발 리드타임"
                  value={teamIndicators?.devLeadTime}
                  unit="h"
                />
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
                className={
                  "system-name" +
                  (selectedSystemId === system.id ? " active" : "")
                }
                onClick={() => changeSelectedSystem(system.id)}
              >
                시스템{system.name}
              </h2>
            ))}
          </SystemTab>
          <SystemManagement systemIndicators={systemIndicators} />
        </StyledCard>
      </Container>
    </Wrapper>
  );
}

export default Team;
