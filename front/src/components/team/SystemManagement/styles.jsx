import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .system-indicators__first,
  .system-indicators__second,
  .system-indicators__third {
    padding: 45px;
  }

  .system-indicators__second,
  .system-indicators__third {
    border-top: 1px solid ${colors.grayLine};
  }

  .system-indicators__third {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 60px;
    .indicator-name {
      font-size: ${fonts.md};
      margin-bottom: 14px;
    }
    .indicator-value {
      order: 2;
    }
  }

  .indicator-detail {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .emoji {
      font-size: 42px;
    }
  }
  .green {
    color: ${colors.green};
  }
  .yellow {
    color: ${colors.yellow};
  }
  .red {
    color: ${colors.red};
  }
`;

export const IndicatorName = styled.h4`
  text-align: left;
  font-size: ${fonts.md};
  margin-bottom: 30px;
  font-weight: 400;
`;
