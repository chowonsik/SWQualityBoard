import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;

  margin: 1rem;
  display: grid;
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
  height: 80%;
  & > div {
    display: flex;
    flex-direction: column;
    justify-items: center;
  }
`;
