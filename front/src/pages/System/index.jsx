import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import { useHistory, useLocation } from "react-router-dom";
import {
  ChartContainer,
  DateSelectorContainer,
  Selectors,
  SystemSelector,
  SystemSelectorContainer,
  TableContainer,
  Wrapper,
} from "./styles";
import RangeCalendar from "../../components/common/RangeCalendar";

import Chart from "../../components/system/Chart";
import MyTable from "../../components/system/Table";
import Memo from "../../components/system/Memo";
import ToastMessage from "../../components/common/ToastMessage";
import { requestGet } from "../../lib/apis";

function System() {
  const [selectShow, setSelectShow] = useState(false);
  const [systems, setSystems] = useState([]);
  const [indicator, setIndicator] = useState("testCoverage");
  const [dateRange, setDateRange] = useState([null, null]);
  const [data, setData] = useState([]);
  const [memoOpened, setMemoOpened] = useState(false);
  const [memo, setMemo] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [toastActive, setToastActive] = useState(false);

  const allCheckRef = useRef(null);
  const history = useHistory();
  const location = useLocation();

  function selectIndicator() {
    if (location.state) {
      setIndicator(location.state.dataType);
    }
  }

  // 메모 변경되면 데이터에 있는 메모도 변경해주기
  function updateMemo() {
    if (memo.systemQualityId) {
      const curMemoData = data.find((item) => item.id === memo.systemQualityId);
      let newMemo = curMemoData.memo
        ? { ...curMemoData.memo, systemQualityId: memo.systemQualityId }
        : { systemQualityId: memo.systemQualityId };
      setMemo(newMemo);
    }
  }

  // 토스트 메세지 띄우기
  function showToastMessage(message) {
    setToastMessage(message);
    setToastActive(true);
  }

  // 메모 열기
  function openMemo(memo) {
    setMemo(memo);
    setMemoOpened(true);
  }
  // 메모 닫기
  function closeMemo() {
    setMemo({});
    setMemoOpened(false);
  }

  // 체크박스 체크 이벤트 핸들링
  function handleCheck(i) {
    const newSystems = [...systems];
    newSystems[i].isChecked = !newSystems[i].isChecked;
    setSystems(newSystems);
  }

  // 전체선택 체크 핸들링
  function handleAllCheck(check) {
    const newSystems = systems.map((system) => {
      return { ...system, isChecked: check };
    });
    setSystems(newSystems);
  }

  // 선택된 시스템
  function getSelectedSystemString() {
    const selectedSystems = systems.filter((system) => system.isChecked);
    if (selectedSystems.length === 0) return "선택된 시스템 없음";
    else if (selectedSystems.length === 1) {
      return selectedSystems[0].name;
    }
    return `${selectedSystems[0].name}외 ${selectedSystems.length - 1}개`;
  }

  // 시스템 설정(api로할지)
  function initSystems() {
    if (!localStorage.getItem("loginUser")) {
      history.push("/login");
      return;
    }
    const userTeams = JSON.parse(localStorage.getItem("loginUser")).teams;
    const userSystems = userTeams.reduce(
      (prev, cur) => [...prev, ...cur.systems],
      []
    );
    const newSystems = userSystems.map((systemInfo, i) => {
      return {
        name: `시스템 ${systemInfo.name}`,
        isChecked: i < 3 ? true : false,
        system: systemInfo.name,
        id: systemInfo.id,
      };
    });
    setSystems(newSystems);
  }

  // 기간 일주일 전 ~ 오늘로 설정
  function initDateRange() {
    const date = new Date();
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 7);
    prevDate.setHours(0, 0, 0);
    setDateRange([prevDate, date]);
  }

  function initData() {
    const selectedSystems = systems.filter((item) => item.isChecked);
    if (selectedSystems.length === 0) return;
    const start = `${dateRange[0].getFullYear()}-${
      dateRange[0].getMonth() + 1 < 10
        ? `0${dateRange[0].getMonth() + 1}`
        : dateRange[0].getMonth() + 1
    }-${
      dateRange[0].getDate() < 10
        ? `0${dateRange[0].getDate()}`
        : dateRange[0].getDate()
    }`;
    const end = `${dateRange[1].getFullYear()}-${
      dateRange[1].getMonth() + 1 < 10
        ? `0${dateRange[1].getMonth() + 1}`
        : dateRange[1].getMonth() + 1
    }-${
      dateRange[1].getDate() < 10
        ? `0${dateRange[1].getDate()}`
        : dateRange[1].getDate()
    }`;
    const params = {
      systems: selectedSystems.map((system) => system.id),
      start: start,
      end: end,
    };
    requestGet("/system-quality", params)
      .then((data) => {
        setData(data.result);
        updateMemo();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    initSystems();
    initDateRange();
    initData();
    selectIndicator();
  }, []);

  useEffect(() => {
    updateMemo();
  }, [data]);

  useEffect(() => {
    if (dateRange[1]) {
      initData();
    }
  }, [systems, dateRange]);

  useEffect(() => {
    // 전체 선택 핸들링
    if (allCheckRef.current) {
      const selectedSystems = systems.filter((system) => system.isChecked);
      if (selectedSystems.length === systems.length) {
        allCheckRef.current.checked = true;
      } else {
        allCheckRef.current.checked = false;
      }
    }
  }, [systems]);

  return (
    <Wrapper>
      <Selectors>
        <SystemSelectorContainer selectShow={selectShow}>
          <span className="selected-system">{getSelectedSystemString()}</span>
          <span
            className="icon"
            onClick={() => {
              setSelectShow(!selectShow);
            }}
          >
            <ChevronDown />
          </span>
          {selectShow && (
            <SystemSelector>
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
              {systems.map((system, i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    checked={system.isChecked}
                    onChange={() => {
                      handleCheck(i);
                    }}
                  />
                  {system.name}
                </label>
              ))}
            </SystemSelector>
          )}
        </SystemSelectorContainer>
        <DateSelectorContainer>
          <RangeCalendar dateRange={dateRange} setDateRange={setDateRange} />
        </DateSelectorContainer>
      </Selectors>
      <ChartContainer>
        <Chart data={data} indicator={indicator} />
      </ChartContainer>
      <TableContainer>
        <MyTable openMemo={openMemo} data={data} setIndicator={setIndicator} />
      </TableContainer>
      {memoOpened && (
        <Memo
          closeMemo={closeMemo}
          memo={memo}
          showToastMessage={showToastMessage}
          initData={initData}
        />
      )}
      <ToastMessage
        isActive={toastActive}
        setIsActive={setToastActive}
        message={toastMessage}
      />
    </Wrapper>
  );
}

export default System;
