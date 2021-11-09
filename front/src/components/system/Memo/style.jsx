import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
`;

export const MemoContainer = styled.div`
  position: absolute;
  top: 200px;
  left: 50%;
  background-color: white;
  transform: translateX(-50%);
  color: ${colors.black};
  border-radius: 15px;
  textarea {
    border-radius: 15px;
    min-width: 330px;
    width: 400px;
    max-width: 400px;
    height: 200px;
    resize: none;
    border: none;
    outline: none;
    padding: 20px;
    font-size: ${fonts.md};
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
    gap: 10px;
    button {
      cursor: pointer;
      padding: 3px 6px;
      font-size: ${fonts.sm};
    }
  }
`;
