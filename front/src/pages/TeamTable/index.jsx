import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import {
  ChartContainer,
  ChartIndicator,
  DateSelectorContainer,
  Selectors,
  TeamSelector,
  TeamSelectorContainer,
  TableContainer,
  Wrapper,
} from "./styles";
import RangeCalendar from "../../components/common/RangeCalendar";

import TeamChart from "../../components/team/Chart";
import MyTable from "../../components/team/Table";

function TeamTable() {
  const [selectShow, setSelectShow] = useState(false);
  const [teams, setTeams] = useState([]);
  const [indicator, setIndicator] = useState("코드리뷰율");
  const [dateRange, setDateRange] = useState(initDateRange());
  const [data, setData] = useState({});
  const [selectedData, setSelectedData] = useState({});

  const allCheckRef = useRef(null);

  // 체크박스 체크 이벤트 핸들링
  function handleCheck(i) {
    const newTeams = [...teams];
    newTeams[i].isChecked = !newTeams[i].isChecked;
    setTeams(newTeams);
  }

  // 전체선택 체크 핸들링
  function handleAllCheck(check) {
    const newTeams = teams.map((team) => {
      return { ...team, isChecked: check };
    });
    setTeams(newTeams);
  }

  // 선택된 시스템
  function getSelectedTeamString() {
    const selectedTeams = teams.filter((team) => team.isChecked);
    if (selectedTeams.length === 0) return "선택된 개발팀 없음";
    else if (selectedTeams.length === 1) {
      return selectedTeams[0].name;
    }
    return `${selectedTeams[0].name}외 ${selectedTeams.length - 1}개`;
  }

  // 시스템 설정(api로할지)
  function initTeams() {
    let newTeams = [];
    for (let i = 1; i < 10; i++) {
      const name = `개발 ${i}팀`;
      newTeams.push({
        name: name,
        isChecked: i === 1 ? true : false,
        team: i,
      });
    }
    setTeams(newTeams);
  }

  function initDateRange() {
    const date = new Date();
    const prevDate = new Date(date);
    prevDate.setDate(date.getDate() - 7);
    prevDate.setHours(0, 0, 0);
    return [prevDate, date];
  }

  //데이터생성
  function initData() {
    const data = {};
    const startDate = new Date(2021, 0, 1);
    const curDate = new Date();
    for (let i = 1; i < 10; i++) {
      const team = i;
      data[team] = [];
    }
    while (startDate < curDate) {
      for (let i = 1; i < 10; i++) {
        const team = i;
        const testCoverage = parseInt(Math.random() * 50 + 50);
        data[team].push({
          date: new Date(startDate),
          testCoverage: testCoverage,
        });
      }
      startDate.setDate(startDate.getDate() + 1);
    }
    setData(data);
  }

  // 시스템, 기간에 따라 데이터 선택
  function selectData() {
    const selectedTeams = teams.filter((item) => item.isChecked);
    const newData = {};
    for (let team of selectedTeams) {
      const range = [...dateRange];
      range[0].setHours(0, 0, 0);
      range[1].setHours(23, 59, 59);
      newData[team.team] = data[team.team].filter(
        (item) => item.date >= range[0] && item.date <= range[1]
      );
    }

    setSelectedData(newData);
  }

  useEffect(() => {
    initTeams();
    initData();
  }, []);

  useEffect(() => {
    if (dateRange[1]) {
      selectData();
    }
  }, [teams, dateRange]);

  useEffect(() => {
    // 전체 선택 핸들링
    if (allCheckRef.current) {
      const selectedTeams = teams.filter((team) => team.isChecked);
      if (selectedTeams.length === teams.length) {
        allCheckRef.current.checked = true;
      } else {
        allCheckRef.current.checked = false;
      }
    }
  }, [teams]);

  return (
    <Wrapper>
      <Selectors>
        <TeamSelectorContainer selectShow={selectShow}>
          <span className="selected-team">{getSelectedTeamString()}</span>
          <span
            className="icon"
            onClick={() => {
              setSelectShow(!selectShow);
            }}
          >
            <ChevronDown />
          </span>
          {selectShow && (
            <TeamSelector>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleAllCheck(e.target.checked);
                  }}
                  ref={allCheckRef}
                />
                전체선택
              </label>
              {teams.map((team, i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    checked={team.isChecked}
                    onChange={() => {
                      handleCheck(i);
                    }}
                  />
                  {team.name}
                </label>
              ))}
            </TeamSelector>
          )}
        </TeamSelectorContainer>
        <DateSelectorContainer>
          <RangeCalendar dateRange={dateRange} setDateRange={setDateRange} />
        </DateSelectorContainer>
      </Selectors>
      <ChartContainer>
        <TeamChart selectedData={selectedData} />
      </ChartContainer>
      <TableContainer>
        <MyTable />
      </TableContainer>
    </Wrapper>
  );
}

export default TeamTable;
