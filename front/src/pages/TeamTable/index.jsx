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

function TeamTable() {
  const { teams } = JSON.parse(localStorage.getItem("loginUser"));
  const [selectShow, setSelectShow] = useState(false);
  const [accessibleTeams, setAccessibleTeams] = useState(teams);
  const [indicator, setIndicator] = useState("codeReviewRate");
  const [dateRange, setDateRange] = useState(initDateRange());
  const [data, setData] = useState([]);
  const allCheckRef = useRef(null);

  useEffect(() => {
    // 전체 선택 핸들링
    if (allCheckRef.current) {
      const selectedTeams = accessibleTeams.filter((team) => team.isChecked);
      if (selectedTeams.length === teams.length) {
        allCheckRef.current.checked = true;
      } else {
        allCheckRef.current.checked = false;
      }
    }
  }, [accessibleTeams]);
  // 체크박스 체크 이벤트 핸들링
  function handleCheck(i) {
    const newTeams = [...accessibleTeams];
    newTeams[i].isChecked = !newTeams[i].isChecked;
    setAccessibleTeams(newTeams);
  }

  // 전체선택 체크 핸들링
  function handleAllCheck(check) {
    const newTeams = accessibleTeams.map((team) => {
      return { ...team, isChecked: check };
    });
    setAccessibleTeams(newTeams);
  }

  function getSelectedTeamString() {
    const selectedTeams = accessibleTeams.filter((team) => team.isChecked);
    if (selectedTeams.length === 0) return "선택된 개발팀 없음";
    else if (selectedTeams.length === 1) {
      return selectedTeams[0].name;
    }
    return `${selectedTeams[0].name}외 ${selectedTeams.length - 1}개`;
  }

  function initTeams() {
    let newTeams = [];
    accessibleTeams.map((team, i) => {
      newTeams.push({
        name: team.name,
        isChecked: i === 1 ? true : false,
        id: team.id,
      });
    });
    setAccessibleTeams(newTeams);
  }

  function initDateRange() {
    const date = new Date();
    const prevDate = new Date(date);
    prevDate.setDate(date.getDate() - 7);
    prevDate.setHours(0, 0, 0);
    return [prevDate, date];
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
    const selectedTeams = accessibleTeams.filter((item) => item.isChecked);
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
  }, []);

  useEffect(() => {
    if (dateRange[1]) {
      getData();
    }
  }, [accessibleTeams, dateRange]);

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
              {accessibleTeams.map((team, i) => (
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
        <TeamChart data={data} indicator={indicator} />
      </ChartContainer>
      <TableContainer>
        <MyTable data={data} setIndicator={setIndicator} />
      </TableContainer>
    </Wrapper>
  );
}

export default TeamTable;
