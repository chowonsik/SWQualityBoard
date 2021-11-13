import styled from "styled-components";
import { colors, fonts } from "../../styles";
import Card from "../../components/common/Card";

export const Wrapper = styled.div`
  margin: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.8rem;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const TeamManagement = styled.div`
  .team-indicators__first {
    margin-bottom: 36px;
  }
  .team-indicators__first,
  .team-indicators__second {
    display: flex;
    justify-content: space-around;
    font-size: ${fonts.md};
  }
`;

export const StyledCard = styled(Card)`
  height: ${(props) => props.height || "100%"};
  display: flex;
  flex-direction: column;
  justify-content: center;

  & + & {
    margin-top: 25px;
  }
`;

export const SystemTab = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 55px;
  border-bottom: 1px solid ${colors.grayLine};

  .system-name {
    font-size: ${fonts.lg};
    color: ${colors.gray};
    font-weight: 400;
    margin-right: 20px;
    cursor: pointer;
  }
  .system-name:nth-last-child(1) {
    margin-right: 0px;
  }
  .active {
    font-weight: 700;
    color: ${colors.navy};
  }
`;

export const TeamSelectorContainer = styled.div`
  display: flex;
  font-size: ${fonts.xxl};
  margin-bottom: 1.4rem;

  .selected-name {
    cursor: ${(props) => (props.isAccesible ? "pointer" : "")};
    display: flex;
    gap: 5px;
    .icon {
      transform: ${(props) => (props.selectShow ? "rotateX(180deg)" : "")};
      transition: all ease-in 0.1s;
    }
  }
`;

export const TeamSelector = styled(Card)`
  position: absolute;
  top: 4.8rem;
  z-index: 80;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding: 20px;
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto;
  }
  @media screen and (max-width: 475px) {
    grid-template-columns: auto;
  }
  button {
    cursor: pointer;
    font-size: ${fonts.sm};
  }
`;
