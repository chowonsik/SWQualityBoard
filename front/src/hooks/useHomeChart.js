import { useState } from "react";

const useHomeChart = (initSystems, initTeams, initPastSystem, initPastTeam) => {
  const [systems, setSystems] = useState(initSystems);
  const [teams, setTeams] = useState(initTeams);
  const [pastSystem, setPastSystem] = useState(initPastSystem);
  const [pastTeam, setPastTeam] = useState(initPastTeam);
  const setHomeChart = (changedSystems, changedTeams) => {
    setSystems(changedSystems);
    setTeams(changedTeams);
  };
  const setPastHomeChart = (changedPastSystem, changedPastTeam) => {
    setPastSystem(changedPastSystem);
    setPastTeam(changedPastTeam);
  };

  const defects = {
    xData: ["critical", "high", "medium", "low"],
    yData: [
      {
        value: systems["critical"],
        itemStyle: {
          color: "#FF5252",
        },
      },
      {
        value: systems["high"],
        itemStyle: {
          color: "#FFCC00",
        },
      },
      {
        value: systems["medium"],
        itemStyle: {
          color: "#1A75FF",
        },
      },
      {
        value: systems["low"],
        itemStyle: {
          color: "#2E8B57",
        },
      },
    ],
  };

  const defectsData = [
    {
      category: "Critical",
      nowValue: systems["critical"],
      pastValue: pastSystem["critical"] ? pastSystem["critical"] : null,
    },
    {
      category: "High",
      nowValue: systems["high"],
      pastValue: pastSystem["high"] ? pastSystem["hign"] : null,
    },
    {
      category: "Medium",
      nowValue: systems["medium"],
      pastValue: pastSystem["medium"] ? pastSystem["medium"] : null,
    },
    {
      category: "Low",
      nowValue: systems["low"],
      pastValue: pastSystem["low"] ? pastSystem["low"] : null,
    },
  ];

  const systemReliability = {
    data: [
      {
        value: systems["mtbf"]["A"],
        name: "A",
        itemStyle: {
          color: "#2E8B57",
        },
      },
      {
        value: systems["mtbf"]["B"],
        name: "B",
        itemStyle: {
          color: "#1A75FF",
        },
      },
      {
        value: systems["mtbf"]["C"],
        name: "C",
        itemStyle: {
          color: "#FFCC00",
        },
      },
      {
        value: systems["mtbf"]["D"],
        name: "D",
        itemStyle: {
          color: "#FF5252",
        },
      },
    ],
  };

  const reliabilityData = [
    {
      category: "A",
      nowValue: systems["mtbf"]["A"],
      pastValue: pastSystem["mtbf"]["A"],
      categoryColor: "#2E8B57",
    },
    {
      category: "B",
      nowValue: systems["mtbf"]["B"],
      pastValue: pastSystem["mtbf"]["B"],
      categoryColor: "#1A75FF",
    },
    {
      category: "C",
      nowValue: systems["mtbf"]["C"],
      pastValue: pastSystem["mtbf"]["C"],
      categoryColor: "#FFCC00",
    },
    {
      category: "D",
      nowValue: systems["mtbf"]["D"],
      pastValue: pastSystem["mtbf"]["D"],
      categoryColor: "#FF5252",
    },
  ];

  const structuralQuality = {
    xData: ["복잡도", "중복도", "규모"],
    yData: [
      {
        value: systems["complexity"],
        itemStyle: {
          color: "#1A75FF",
        },
      },
      {
        value: systems["overlapping"],
        itemStyle: {
          color: "#1A75FF",
        },
      },
      {
        value: systems["scale"],
        itemStyle: {
          color: "#FFCC00",
        },
      },
    ],
  };

  const structuralData = [
    {
      category: "복잡도",
      nowValue: systems["complexity"],
      pastValue: pastSystem["complexity"],
    },
    {
      category: "중복도",
      nowValue: systems["overlapping"],
      pastValue: pastSystem["overlapping"],
    },
    {
      category: "규모",
      nowValue: systems["scale"],
      pastValue: pastSystem["scale"],
    },
  ];

  const testCoverage = {
    data: [
      {
        value: systems["testCoverage"],
        name: "시스템평균 테스트커버리지",
        itemStyle: {
          color: "#1A75FF",
        },
      },
      {
        value: 100 - systems["testCoverage"],
        itemStyle: {
          color: "#DCDDE1",
        },
      },
    ],
  };

  const coverageData = {
    nowValue: systems["testCoverage"],
    pastValue: pastSystem["testCoverage"],
  };

  const functionalCompatibility = {
    data: [
      {
        value: systems["functionalCompatibility"],
        name: "시스템평균 기능적합성",
        itemStyle: {
          color: "#1A75FF",
        },
      },
      {
        value: 100 - systems["functionalCompatibility"],
        itemStyle: {
          color: "#DCDDE1",
        },
      },
    ],
  };

  const functionalCompatibilityData = {
    nowValue: systems["functionalCompatibility"],
    pastValue: pastSystem["functionalCompatibility"],
  };

  const codeReviewRate = {
    data: [
      {
        value: teams["codeReviewRate"],
        name: "팀평균 코드리뷰율",
        itemStyle: {
          color: "#2E8B57",
        },
      },
      {
        value: 100 - teams["codeReviewRate"],
        itemStyle: {
          color: "#DCDDE1",
        },
      },
    ],
  };
  const codeReviewRateData = {
    nowValue: teams["codeReviewRate"],
    pastValue: pastTeam["codeReviewRate"],
  };

  const conventionRate = {
    data: [
      {
        value: teams["conventionRate"],
        name: "팀평균 코딩컨벤션",
        itemStyle: {
          color: "#2E8B57",
        },
      },
      {
        value: 100 - teams["conventionRate"],
        itemStyle: {
          color: "#DCDDE1",
        },
      },
    ],
  };

  const conventionRateData = {
    nowValue: teams["conventionRate"],
    pastValue: pastTeam["conventionRate"],
  };

  const receptionRate = {
    data: [
      {
        value: teams["receptionRate"],
        name: "팀평균 시스템접수율",
        itemStyle: {
          color: "#2E8B57",
        },
      },
      {
        value: 100 - teams["receptionRate"],
        itemStyle: {
          color: "#DCDDE1",
        },
      },
    ],
  };

  const receptionRateData = {
    nowValue: teams["receptionRate"],
    pastValue: pastTeam["receptionRate"],
  };

  const devLeadTime = teams["devLeadTime"];

  const deliveryRate = {
    data: [
      {
        value: teams["deliveryRate"],
        name: "팀평균 정시 납기율",
        itemStyle: {
          color: "#2E8B57",
        },
      },
      {
        value: 100 - teams["deliveryRate"],
        itemStyle: {
          color: "#DCDDE1",
        },
      },
    ],
  };
  const deliveryRateData = {
    nowValue: teams["deliveryRate"],
    pastValue: pastTeam["deliveryRate"],
  };
  //console.log(pastSystem);
  return {
    setHomeChart,
    setPastHomeChart,
    defects,
    defectsData,
    systemReliability,
    reliabilityData,
    structuralQuality,
    structuralData,
    testCoverage,
    coverageData,
    functionalCompatibility,
    functionalCompatibilityData,
    codeReviewRate,
    codeReviewRateData,
    conventionRate,
    conventionRateData,
    receptionRate,
    receptionRateData,
    devLeadTime,
    deliveryRate,
    deliveryRateData,
  };
};

export default useHomeChart;
