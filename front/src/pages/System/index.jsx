import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import {
  ChartContainer,
  ChartIndicator,
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

function System() {
  const [selectShow, setSelectShow] = useState(false);
  const [systems, setSystems] = useState([]);
  const [indicator, setIndicator] = useState("테스트");
  const [dateRange, setDateRange] = useState([null, null]);
  const [data, setData] = useState({});
  const [selectedData, setSelectedData] = useState({});

  const allCheckRef = useRef(null);

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
    let newSystems = [];
    for (let i = 0; i < 10; i++) {
      const name = `시스템 ${String.fromCharCode(65 + i)}`;
      newSystems.push({
        name: name,
        isChecked: i === 0 ? true : false,
        system: String.fromCharCode(65 + i),
      });
    }
    setSystems(newSystems);
  }

  // 기간 일주일 전 ~ 오늘로 설정
  function initDateRange() {
    const date = new Date();
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 7);
    setDateRange([prevDate, date]);
  }

  function initData() {
    const data = {};
    const startDate = new Date(2021, 0, 1);
    const curDate = new Date();
    for (let i = 0; i < 10; i++) {
      const system = String.fromCharCode(65 + i);
      data[system] = [];
    }
    while (startDate < curDate) {
      for (let i = 0; i < 10; i++) {
        const system = String.fromCharCode(65 + i);
        const testCoverage = parseInt(Math.random() * 50 + 50);
        data[system].push({
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
    const selectedSystems = systems.filter((item) => item.isChecked);
    const selectedData = {};
    for (let system of selectedSystems) {
      const range = [...dateRange];
      range[0].setHours(0, 0, 0);
      range[1].setHours(23, 59, 59);
      selectedData[system.system] = data[system.system].filter(
        (item) => item.date >= range[0] && item.date <= range[1]
      );
    }
    setSelectedData(selectedData);
  }

  useEffect(() => {
    initSystems();
    initDateRange();
    initData();
  }, []);

  useEffect(() => {
    if (dateRange[1]) {
      selectData();
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
        <Chart selectedData={selectedData} />
      </ChartContainer>
      <TableContainer>
        <MyTable />
      </TableContainer>
    </Wrapper>
  );
}

export default System;
