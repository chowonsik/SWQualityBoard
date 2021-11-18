export const standard = {
  system: {
    구조품질지수: { complexity: -1, overlapping: -1, scale: -1 },
    중대결함수: {
      critical: 1,
      high: 3,
      medium: 5,
      low: 7,
    },
    기능적합성: [80, 60],
    테스트커버리지: [80, 60],
    시스템신뢰도: [600, 300],
  },
  team: {
    코드리뷰율: [90, 80],
    컨벤션준수율: [90, 80],
    정시납기율: [90, 80],
    시스템접수율: [90, 80],
  },
};
