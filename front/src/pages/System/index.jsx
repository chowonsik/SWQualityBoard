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

function System() {
  const [selectShow, setSelectShow] = useState(false);
  const [systems, setSystems] = useState([]);
  const [indicator, setIndicator] = useState("기능적합성");
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

  function getChartOptions() {
    const options = {
      grid: { top: 8, right: 8, bottom: 24, left: 36 },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "2021/10/19",
          "2021/10/20",
          "2021/10/21",
          "2021/10/22",
          "2021/10/23",
          "2021/10/24",
          "2021/10/25",
          "2021/10/26",
          "2021/10/27",
          "2021/10/28",
          "2021/10/29",
          "2021/10/30",
          "2021/10/31",
          "2021/11/1",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [67, 68, 67, 68, 69, 70, 71, 67, 68, 67, 68, 69, 70, 100],
          type: "line",
          smooth: false,
        },
      ],
      tooltip: {
        trigger: "axis",
      },
    };
    return options;
  }

  useEffect(() => {
    let newSystems = [];
    for (let i = 0; i < 10; i++) {
      const name = `시스템 ${String.fromCharCode(65 + i)}`;
      newSystems.push({ name: name, isChecked: i === 0 ? true : false });
    }
    setSystems(newSystems);
  }, []);

  useEffect(() => {
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
        <SystemSelectorContainer>
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
        <DateSelectorContainer>달력</DateSelectorContainer>
      </Selectors>
      <ChartIndicator>{indicator}</ChartIndicator>
      <ChartContainer>
        <ReactECharts option={getChartOptions()} />
      </ChartContainer>
      <TableContainer>테이블</TableContainer>
    </Wrapper>
  );
}

export default System;
