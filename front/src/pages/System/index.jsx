import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "react-bootstrap-icons";
import ReactECharts from "echarts-for-react";
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

function System() {
  const [selectShow, setSelectShow] = useState(false);
  const [systems, setSystems] = useState([]);
  const [indicator, setIndicator] = useState("기능적합성");
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

  function getChartOption() {
    const option = {
      title: {
        text: "시스템 신뢰도",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["시스템 A", "시스템 B", "시스템 C"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: 40,
        containLabel: true,
      },

      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "시스템 A",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "시스템 B",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "시스템 C",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
      ],
    };
    return option;
  }

  // 시스템 설정(api로할지)
  function initSystems() {
    let newSystems = [];
    for (let i = 0; i < 10; i++) {
      const name = `시스템 ${String.fromCharCode(65 + i)}`;
      newSystems.push({ name: name, isChecked: i === 0 ? true : false });
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

  function initData() {}

  useEffect(() => {
    initSystems();
    initDateRange();
  }, []);

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
        <ReactECharts option={getChartOption()} opts={{ height: 400 }} />
      </ChartContainer>
      <TableContainer>테이블</TableContainer>
    </Wrapper>
  );
}

export default System;
