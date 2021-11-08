import styled from "styled-components";
import { fonts, colors } from "../../styles";
export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  margin-top: 3rem;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 415px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DateContainer = styled.div`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem;
`;

export const TodayContainer = styled.div`
  margin-bottom: 0.5rem;
  font-size: ${fonts.lg};
`;

export const CardWrapper = styled.div`
  position: relative;
`;

export const TitleAndMoreBtn = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.75rem;
`;
