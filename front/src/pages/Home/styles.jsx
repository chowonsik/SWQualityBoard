import styled from "styled-components";
import { fonts, colors } from "../../styles";
export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2rem;
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
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 20px;
  @media screen and (max-width: 415px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TodayContainer = styled.div`
  color: ${colors.navy};
  font-size: ${fonts.lg};
  font-weight: bold;
`;

export const CardWrapper = styled.div`
  position: relative;
  .icon {
    cursor: pointer;
    transition: transform ease-in 0.1s;
    &:hover {
      transform: scale(1.15);
    }
  }
`;

export const TitleAndMoreBtn = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 415px) {
    margin-bottom: 1rem;
  }
`;

export const DateTitle = styled.div`
  font-size: ${fonts.md};
  margin-right: 0.5rem;
`;

export const TitleAndWarn = styled.div`
  display: flex;
  align-items: center;
`;
