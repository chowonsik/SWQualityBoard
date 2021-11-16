import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import {
  ChartContainer,
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
import { requestGet } from "../../lib/apis";
import { useLocation } from "react-router";

function TeamTable() {
  const { teams, authorities } = JSON.parse(localStorage.getItem("loginUser"));
  const storageTeamList = JSON.parse(sessionStorage.getItem("teamTableList"));
  const isExecutive = authorities[0].role === "ROLE_EXECUTIVE";
  const [selectShow, setSelectShow] = useState(false);
  const [teamList, setTeamList] = useState(teams);
  const [indicator, setIndicator] = useState("codeReviewRate");
  const [dateRange, setDateRange] = useState([null, null]);
  const [data, setData] = useState([]);

  const allCheckRef = useRef(null);
  const location = useLocation();

  function selectIndicator() {
    if (location.state) {
      setIndicator(location.state.dataType);
    }
  }

  useEffect(() => {
    // 전체 선택 핸들링
    if (allCheckRef.current) {
      const selectedTeams = teamList.filter((team) => team.isChecked);
      if (selectedTeams.length === teams.length) {
        allCheckRef.current.checked = true;
      } else {
        allCheckRef.current.checked = false;
      }
    }
    sessionStorage.setItem("teamTableList", JSON.stringify(teamList));
  }, [teamList]);

  // 체크박스 체크 이벤트 핸들링
  function handleCheck(i) {
    const newTeams = [...teamList];
    newTeams[i].isChecked = !newTeams[i].isChecked;
    setTeamList(newTeams);
  }

  // 전체선택 체크 핸들링
  function handleAllCheck(check) {
    const newTeams = teamList.map((team) => {
      return { ...team, isChecked: check };
    });
    setTeamList(newTeams);
  }

  function getSelectedTeamString() {
    const selectedTeams = teamList.filter((team) => team.isChecked);
    if (selectedTeams.length === 0) return "선택된 개발팀 없음";
    else if (selectedTeams.length === 1) {
      return selectedTeams[0].name;
    }
    return `${selectedTeams[0].name}외 ${selectedTeams.length - 1}개`;
  }

  function initTeams() {
    if (storageTeamList && !location.state) {
      setTeamList(storageTeamList);
      return;
    }
    let newTeams = [];
    teamList.map((team, i) => {
      function isChecked() {
        if (location.state?.teamId) {
          // 홈에서 들어올때
          if (location.state.teamId === "ALL") {
            return true;
            // 팀관리에서 들어올 때
          } else {
            return location.state.teamId === team.id ? true : false;
          }
        } else {
          return i === 0 ? true : false;
        }
      }
      newTeams.push({
        name: team.name,
        isChecked: isChecked(),
        id: team.id,
      });
    });
    setTeamList(newTeams);
  }

  function initDateRange() {
    const storageDate = JSON.parse(sessionStorage.getItem("teamTableDate"));
    if (storageDate && !location.state) {
      setDateRange(storageDate.map((date) => new Date(date)));
    } else {
      const date = new Date();
      const prevDate = new Date(date);
      prevDate.setDate(date.getDate() - 7);
      prevDate.setHours(0, 0, 0);
      setDateRange([prevDate, date]);
    }
  }

  function dateToString(date) {
    const now = date;
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const dateString = year + "-" + month + "-" + day;
    return dateString;
  }

  async function getData() {
    const selectedTeams = teamList.filter((item) => item.isChecked);
    const params = {
      teams: selectedTeams.map((team) => team.id),
      start: dateToString(dateRange[0]),
      end: dateToString(dateRange[1]),
    };
    await requestGet("/team-quality", params).then((res) =>
      setData(res.result)
    );
  }

  useEffect(() => {
    initTeams();
    initDateRange();
    selectIndicator();
  }, []);

  useEffect(() => {
    if (dateRange[1]) {
      getData();
    }
  }, [teamList, dateRange]);

  useEffect(() => {
    sessionStorage.setItem("teamTableDate", JSON.stringify(dateRange));
  }, [dateRange]);

  return (
    <Wrapper>
      <Selectors>
        <TeamSelectorContainer selectShow={selectShow}>
          <span className="selected-team">{getSelectedTeamString()}</span>
          {isExecutive && (
            <>
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
                  {teamList.map((team, i) => (
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
            </>
          )}
        </TeamSelectorContainer>
        <DateSelectorContainer>
          <RangeCalendar dateRange={dateRange} setDateRange={setDateRange} />
        </DateSelectorContainer>
      </Selectors>
      <ChartContainer>
        <TeamChart data={data} indicator={indicator} />
      </ChartContainer>
      <TableContainer>
        <MyTable data={data} setIndicator={setIndicator} />
      </TableContainer>
    </Wrapper>
  );
}

export default TeamTable;
