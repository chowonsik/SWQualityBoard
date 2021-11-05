import styled from "styled-components";
import { colors, fonts } from "../../styles";
import Card from "../../components/common/Card";

export const Wrapper = styled.div`
  margin: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    text-align: left;
    font-size: ${fonts.xxl};
    font-weight: 400;
    margin-bottom: 40px;
  }
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
