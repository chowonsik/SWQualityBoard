import { useState, useEffect } from "react";

import Card from "../../components/common/Card";
import Calendar from "../../components/common/Calendar";
import CardHover from "../../components/common/CardHover";
import HomeChart from "../../components/Home/HomeChart";
import CountValue from "../../components/Home/CountValue";
import PercentValue from "../../components/Home/PercentValue";
import Indicator from "../../components/common/Indicator";
import useHomeChart from "../../hooks/useHomeChart";
import {
  Wrapper,
  CardWrapper,
  CardContent,
  TitleAndMoreBtn,
  Grid,
  DateContainer,
  TodayContainer,
} from "./styles";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import { requestGet } from "../../lib/apis";

function getToday() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date();
  const year = now.getFullYear();
  const month =
    now.getMonth() + 1 < 10 ? `0${now.getMonth()}` : now.getMonth() + 1;
  const date = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const day = days[now.getDay()];
  const result = [year, month, date, day];
  return result;
}

function getDate(past) {
  const year = past.getFullYear();
  const month =
    past.getMonth() + 1 < 10 ? `0${past.getMonth()}` : past.getMonth() + 1;
  const date = past.getDate() < 10 ? `0${past.getDate()}` : past.getDate();
  return [year, month, date];
}

function handleLight(value) {
  return parseInt(value) < 80;
}

function Home() {
  const [curWidth, setCurWidth] = useState(window.outerWidth);
  const [cardWidth, setCardWidth] = useState(550);
  const [cardHeight, setCardHeight] = useState(250);
  const [startDate, setStartDate] = useState(new Date());
  const [today, setToday] = useState(getToday());
  const [dateContainerWidth, setDateContainerWidth] = useState("100%");

  const [systemList, setSystemList] = useState([]);
  const [systemData, setSystemData] = useState({
    critical: [],
    high: [],
    medium: [],
    low: [],
    complexity: [],
    overlapping: [],
    scale: [],
    testCoverage: [],
    functionalCompatibility: [],
    mtbf: [],
  });
  const [systemAvg, setSystemAvg] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    complexity: 0,
    overlapping: 0,
    scale: 0,
    testCoverage: 0,
    functionalCompatibility: 0,
    mtbf: {},
  });
  const [pastSystemData, setPastSystemData] = useState({
    critical: [],
    high: [],
    medium: [],
    low: [],
    complexity: [],
    overlapping: [],
    scale: [],
    testCoverage: [],
    functionalCompatibility: [],
    mtbf: [],
  });
  const [pastSystemAvg, setPastSystemAvg] = useState({
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    complexity: 0,
    overlapping: 0,
    scale: 0,
    testCoverage: 0,
    functionalCompatibility: 0,
    mtbf: {},
  });
  const [teamList, setTeamList] = useState([]);
  const [teamData, setTeamData] = useState({
    codeReviewRate: [],
    conventionRate: [],
    receptionRate: [],
    devLeadTime: [],
    deliveryRate: [],
  });
  const [teamAvg, setTeamAvg] = useState({
    codeReviewRate: 0,
    conventionRate: 0,
    receptionRate: 0,
    devLeadTime: 0,
    deliveryRate: 0,
  });
  const [pastTeamData, setPastTeamData] = useState({
    codeReviewRate: [],
    conventionRate: [],
    receptionRate: [],
    devLeadTime: [],
    deliveryRate: [],
  });
  const [pastTeamAvg, setPastTeamAvg] = useState({
    codeReviewRate: 0,
    conventionRate: 0,
    receptionRate: 0,
    devLeadTime: 0,
    deliveryRate: 0,
  });
  const [systemCount, setSystemCount] = useState(10);
  const [teamCount, setTeamCount] = useState(3);
  const homeChart = useHomeChart(
    systemAvg,
    teamAvg,
    pastSystemAvg,
    pastTeamAvg
  );
  const [isPastShow, setIsPastShow] = useState(false);
  // 경영진이 볼 수 있는 팀과 시스템의 정보를 저장
  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    if (loginUser) {
      setTeamList(
        loginUser["teams"].map((team) => {
          return {
            id: team.id,
            name: team.name,
          };
        })
      );
      const tempSystemList = [];
      loginUser["teams"].forEach((team) => {
        tempSystemList.push(...team.systems.map((system) => system));
      });
      setSystemList(tempSystemList);
      // 시스템과 팀에 대한 지표 데이터 불러온 후에 저장하기
      const teamIdList = loginUser["teams"].map((team) => team["id"]);
      const systemIdList = tempSystemList.map((system) => system.id);

      const teamParams = {
        teams: teamIdList,
        start: `${today[0]}-${today[1]}-${today[2]}`,
        end: `${today[0]}-${today[1]}-${today[2]}`,
      };
      const systemParams = {
        systems: systemIdList,
        start: `${today[0]}-${today[1]}-${today[2]}`,
        end: `${today[0]}-${today[1]}-${today[2]}`,
      };
      requestGet("/team-quality", teamParams).then((res) => {
        const teamObj = handleTeamData(res.result);
        setTeamData(teamObj);
        sessionStorage.setItem("teamData", JSON.stringify(teamObj));
      });
      requestGet("/system-quality", systemParams).then((res) => {
        const systemObj = handleSystemData(res.result);
        setSystemData(systemObj);
        sessionStorage.setItem("systemData", JSON.stringify(systemObj));
      });
    }
  }, [today]);

  // 각 지표에 대한 평균값 구하기
  useEffect(() => {
    const systemAvgObj = handleSystemDataAvg(systemData);
    const teamAvgObj = handleTeamDataAvg(teamData);

    setSystemAvg(systemAvgObj);
    setTeamAvg(teamAvgObj);

    setSystemCount(systemList.length);
    setTeamCount(teamList.length);
  }, [systemData, teamData]);

  // 팀, 시스템의 평균에 대한 차트 속성 구하기
  useEffect(() => {
    homeChart.setHomeChart(systemAvg, teamAvg);
  }, [systemAvg, teamAvg]);

  useEffect(() => {
    homeChart.setPastHomeChart(pastSystemAvg, pastTeamAvg);
  }, [pastSystemAvg, pastTeamAvg]);

  useEffect(() => {
    if (curWidth > 768 && curWidth <= 1024) {
      setCardWidth(450);
      setCardHeight(240);
      setDateContainerWidth("100vw");
    } else if (curWidth > 375 && curWidth <= 768) {
      setCardWidth(400);
      setCardHeight(200);
      setDateContainerWidth("100vw");
    } else if (curWidth <= 375) {
      setCardWidth(360);
      setCardHeight(200);
      setDateContainerWidth("100vw");
    }
  }, [curWidth]);

  // 과거 데이터 불러오기
  useEffect(() => {
    const past = getDate(startDate);
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (past[0] != today[0] || past[1] != today[1] || past[2] != today[2]) {
      setIsPastShow(true);
      const teamIdList = teamList.map((team) => team["id"]);
      const systemIdList = systemList.map((system) => system["id"]);
      const systemParams = {
        systems: systemIdList,
        start: `${past[0]}-${past[1]}-${past[2]}`,
        end: `${past[0]}-${past[1]}-${past[2]}`,
      };

      const teamParams = {
        teams: teamIdList,
        start: `${past[0]}-${past[1]}-${past[2]}`,
        end: `${past[0]}-${past[1]}-${past[2]}`,
      };

      requestGet("/system-quality", systemParams).then((res) => {
        const systemObj = handleSystemData(res.result);
        setPastSystemData(systemObj);
      });
      requestGet("/team-quality", teamParams).then((res) => {
        const teamObj = handleTeamData(res.result);
        setPastTeamData(teamObj);
      });
    } else {
      setIsPastShow(false);
    }
  }, [startDate]);

  // 각 지표에 대한 과거 평균값 구하기
  useEffect(() => {
    const pastSystemAvgObj = handleSystemDataAvg(pastSystemData);
    const pastTeamAvgObj = handleTeamDataAvg(pastTeamData);
    setPastSystemAvg(pastSystemAvgObj);
    setPastTeamAvg(pastTeamAvgObj);
  }, [pastSystemData, pastTeamData]);

  function handleClickMoreMenu(e) {
    const parent = e.target.parentNode.parentNode;
    const hoverCard = parent.nextSibling;
    if (hoverCard) {
      hoverCard.style.display = "flex";
    }
  }

  function handleClickClose(e) {
    const curNode = e.target;
    const hoverCard = curNode.parentNode.parentNode;
    if (hoverCard.id && hoverCard.id === "close") {
      hoverCard.parentNode.style.display = "none";
    } else if (hoverCard) {
      hoverCard.style.display = "none";
    }
  }

  // 팀 관련 지표 저장하기
  function handleTeamData(teams) {
    let codeReviewRate = [];
    let conventionRate = [];
    let receptionRate = [];
    let devLeadTime = [];
    let deliveryRate = [];
    if (teams) {
      teams.forEach((team) => {
        codeReviewRate.push({
          name: team.team.name,
          value: team.codeReviewRate,
        });
        conventionRate.push({
          name: team.team.name,
          value: team.conventionRate,
        });
        receptionRate.push({ name: team.team.name, value: team.receptionRate });
        devLeadTime.push({ name: team.team.name, value: team.devLeadTime });
        deliveryRate.push({ name: team.team.name, value: team.deliveryRate });
      });
    }

    const teamObj = {
      codeReviewRate,
      conventionRate,
      receptionRate,
      devLeadTime,
      deliveryRate,
    };

    return teamObj;
  }

  // 시스템관련 지표 저장하기
  function handleSystemData(systems) {
    let critical = [];
    let high = [];
    let medium = [];
    let low = [];
    let complexity = [];
    let overlapping = [];
    let scale = [];
    let testCoverage = [];
    let functionalCompatibility = [];
    let mtbf = [];
    if (systems) {
      systems.forEach((system) => {
        critical.push({ name: system.system.name, value: system.critical });
        high.push({ name: system.system.name, value: system.high });
        medium.push({ name: system.system.name, value: system.medium });
        low.push({ name: system.system.name, value: system.low });
        complexity.push({ name: system.system.name, value: system.complexity });
        overlapping.push({
          name: system.system.name,
          value: system.overlapping,
        });
        scale.push({ name: system.system.name, value: system.scale });
        testCoverage.push({
          name: system.system.name,
          value: system.testCoverage,
        });
        functionalCompatibility.push({
          name: system.system.name,
          value: system.functionalCompatibility,
        });
        mtbf.push({ name: system.system.name, value: system.mtbf });
      });
    }

    const systemObj = {
      critical,
      high,
      medium,
      low,
      complexity,
      overlapping,
      scale,
      testCoverage,
      functionalCompatibility,
      mtbf,
    };

    return systemObj;
  }

  // 팀, 시스템 지표들의 평균 구하기
  function handleSystemDataAvg(systems) {
    const systemObj = {};
    Object.keys(systems).forEach((key) => {
      if (key === "mtbf") {
        const mtbf = {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
        };
        systems[key].forEach((obj) => {
          if (obj.value <= 200) {
            mtbf["D"] += 1;
          } else if (obj.value <= 400) {
            mtbf["C"] += 1;
          } else if (obj.value <= 600) {
            mtbf["B"] += 1;
          } else {
            mtbf["A"] += 1;
          }
        });
        systemObj[key] = mtbf;
      } else {
        const total = systems[key].reduce((prev, cur) => prev + cur.value, 0);
        const avg = Math.round(total / systemCount);
        systemObj[key] = avg;
      }
    });
    return systemObj;
  }

  function handleTeamDataAvg(teams) {
    const teamObj = {};
    Object.keys(teams).forEach((key) => {
      const total = teams[key].reduce((prev, cur) => prev + cur.value, 0);
      const avg = Math.round(total / teamCount);
      teamObj[key] = avg;
    });
    return teamObj;
  }

  return (
    <Wrapper>
      <DateContainer width={dateContainerWidth}>
        <TodayContainer>{`${today[0]}.${today[1]}.${today[2]} ${today[3]}`}</TodayContainer>
        <Calendar startDate={startDate} setStartDate={setStartDate} />
      </DateContainer>

      <Grid>
        <CardWrapper width={cardWidth} height={cardHeight}>
          <Card width={cardWidth} height={cardHeight}>
            <TitleAndMoreBtn>
              <Indicator
                indicatorTitle={"중대결함수"}
                fontSize={"lg"}
                isBold={true}
              />

              <BoxArrowUpRight onClick={handleClickMoreMenu} />
            </TitleAndMoreBtn>
            <CardContent>
              <CountValue
                data={homeChart.defectsData}
                isPastShow={isPastShow}
              />
              <HomeChart
                isPie={false}
                chartData={homeChart.defects}
                width={cardWidth * (2 / 3)}
                height={cardHeight}
              />
            </CardContent>
          </Card>
          <CardHover
            width={cardWidth}
            height={cardHeight}
            dataType={"defect"}
            onClickClose={handleClickClose}
          />
        </CardWrapper>
        <CardWrapper width={cardWidth} height={cardHeight}>
          <Card width={cardWidth} height={cardHeight}>
            <TitleAndMoreBtn>
              <Indicator
                indicatorTitle={"시스템신뢰도"}
                fontSize={"lg"}
                isBold={true}
              />
              <BoxArrowUpRight onClick={handleClickMoreMenu} />
            </TitleAndMoreBtn>
            <CardContent>
              <CountValue
                data={homeChart.reliabilityData}
                isPastShow={isPastShow}
              />
              <HomeChart
                isPie={true}
                chartData={homeChart.systemReliability}
                width={cardWidth * (2 / 3)}
                height={cardHeight}
              />
            </CardContent>
          </Card>
          <CardHover
            width={cardWidth}
            height={cardHeight}
            dataType={"mtbf"}
            onClickClose={handleClickClose}
          />
        </CardWrapper>
        <CardWrapper width={cardWidth} height={cardHeight}>
          <Card width={cardWidth} height={cardHeight}>
            <TitleAndMoreBtn>
              <Indicator
                indicatorTitle={"구조품질지수"}
                fontSize={"lg"}
                isBold={true}
              />
              <BoxArrowUpRight onClick={handleClickMoreMenu} />
            </TitleAndMoreBtn>
            <CardContent>
              <CountValue
                data={homeChart.structuralData}
                isPastShow={isPastShow}
              />
              <HomeChart
                isPie={false}
                chartData={homeChart.structuralQuality}
                width={cardWidth * (2 / 3)}
                height={cardHeight}
              />
            </CardContent>
          </Card>
          <CardHover
            width={cardWidth}
            height={cardHeight}
            dataType={"structure"}
            onClickClose={handleClickClose}
          />
        </CardWrapper>
        <CardWrapper width={cardWidth} height={cardHeight}>
          <Card
            width={cardWidth}
            height={cardHeight}
            isLight={handleLight(systemAvg["testCoverage"])}
          >
            <TitleAndMoreBtn>
              <Indicator
                indicatorTitle={"테스트커버리지"}
                fontSize={"lg"}
                isBold={true}
              />
              <BoxArrowUpRight onClick={handleClickMoreMenu} />
            </TitleAndMoreBtn>
            <CardContent>
              <PercentValue
                data={homeChart.coverageData}
                isPastShow={isPastShow}
              />
              <HomeChart
                isPie={true}
                chartData={homeChart.testCoverage}
                width={cardWidth * (2 / 3)}
                height={cardHeight}
              />
            </CardContent>
          </Card>
          <CardHover
            width={cardWidth}
            height={cardHeight}
            dataType={"testCoverage"}
            onClickClose={handleClickClose}
          />
        </CardWrapper>
        <CardWrapper width={cardWidth} height={cardHeight}>
          <Card
            width={cardWidth}
            height={cardHeight}
            isLight={handleLight(systemAvg["functionalCompatibility"])}
          >
            <TitleAndMoreBtn>
              <Indicator
                indicatorTitle={"기능적합성"}
                fontSize={"lg"}
                isBold={true}
              />
              <BoxArrowUpRight onClick={handleClickMoreMenu} />
            </TitleAndMoreBtn>
            <CardContent>
              <PercentValue
                data={homeChart.functionalCompatibilityData}
                isPastShow={isPastShow}
              />
              <HomeChart
                isPie={true}
                chartData={homeChart.functionalCompatibility}
                width={cardWidth * (2 / 3)}
                height={cardHeight}
              />
            </CardContent>
          </Card>
          <CardHover
            width={cardWidth}
            height={cardHeight}
            dataType={"functionalCompatibility"}
            onClickClose={handleClickClose}
          />
        </CardWrapper>
        <CardWrapper width={cardWidth} height={cardHeight}>
          <Card
            width={cardWidth}
            height={cardHeight}
            isLight={handleLight(teamAvg["receptionRate"])}
          >
            <TitleAndMoreBtn>
              <Indicator
                indicatorTitle={"시스템접수율"}
                fontSize={"lg"}
                isBold={true}
              />
              <BoxArrowUpRight onClick={handleClickMoreMenu} />
            </TitleAndMoreBtn>
            <CardContent>
              <PercentValue
                data={homeChart.receptionRateData}
                isPastShow={isPastShow}
              />
              <HomeChart
                isPie={true}
                chartData={homeChart.receptionRate}
                width={cardWidth * (2 / 3)}
                height={cardHeight}
              />
            </CardContent>
          </Card>
          <CardHover
            width={cardWidth}
            height={cardHeight}
            dataType={"receptionRate"}
            onClickClose={handleClickClose}
          />
        </CardWrapper>
        <CardWrapper width={cardWidth} height={cardHeight}>
          <Card
            width={cardWidth}
            height={cardHeight}
            isLight={handleLight(teamAvg["codeReviewRate"])}
          >
            <TitleAndMoreBtn>
              <Indicator
                indicatorTitle={"코드리뷰율"}
                fontSize={"lg"}
                isBold={true}
              />
              <BoxArrowUpRight onClick={handleClickMoreMenu} />
            </TitleAndMoreBtn>
            <CardContent>
              <PercentValue
                data={homeChart.codeReviewRateData}
                isPastShow={isPastShow}
              />
              <HomeChart
                isPie={true}
                chartData={homeChart.codeReviewRate}
                width={cardWidth * (2 / 3)}
                height={cardHeight}
              />
            </CardContent>
          </Card>
          <CardHover
            width={cardWidth}
            height={cardHeight}
            dataType={"codeReviewRate"}
            onClickClose={handleClickClose}
          />
        </CardWrapper>
        <CardWrapper width={cardWidth} height={cardHeight}>
          <Card
            width={cardWidth}
            height={cardHeight}
            isLight={handleLight(teamAvg["conventionRate"])}
          >
            <TitleAndMoreBtn>
              <Indicator
                indicatorTitle={"코딩컨벤션"}
                fontSize={"lg"}
                isBold={true}
              />
              <BoxArrowUpRight onClick={handleClickMoreMenu} />
            </TitleAndMoreBtn>
            <CardContent>
              <PercentValue
                data={homeChart.conventionRateData}
                isPastShow={isPastShow}
              />
              <HomeChart
                isPie={true}
                chartData={homeChart.conventionRate}
                width={cardWidth * (2 / 3)}
                height={cardHeight}
              />
            </CardContent>
          </Card>
          <CardHover
            width={cardWidth}
            height={cardHeight}
            dataType={"conventionRate"}
            onClickClose={handleClickClose}
          />
        </CardWrapper>
        <CardWrapper width={cardWidth} height={cardHeight}>
          <Card
            width={cardWidth}
            height={cardHeight}
            isLight={handleLight(teamAvg["deliveryRate"])}
          >
            <TitleAndMoreBtn>
              <Indicator
                indicatorTitle={"정시납기율"}
                fontSize={"lg"}
                isBold={true}
              />
              <BoxArrowUpRight onClick={handleClickMoreMenu} />
            </TitleAndMoreBtn>
            <CardContent>
              <PercentValue
                data={homeChart.deliveryRateData}
                isPastShow={isPastShow}
              />
              <HomeChart
                isPie={true}
                chartData={homeChart.deliveryRate}
                width={cardWidth * (2 / 3)}
                height={cardHeight}
              />
            </CardContent>
          </Card>
          <CardHover
            width={cardWidth}
            height={cardHeight}
            dataType={"deliveryRate"}
            onClickClose={handleClickClose}
          />
        </CardWrapper>
      </Grid>
    </Wrapper>
  );
}

export default Home;
