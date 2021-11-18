import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const StyledForm = styled.form`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const InputBox = styled.div``;

export const StyledInput = styled.input`
  width: ${(props) => props.inputWidth + "px"};
  height: 40px;
  border: none;
  outline: none;
  border-bottom: 1px solid ${colors.navy};
  color: ${colors.navy};
  font-size: ${fonts.lg};
  padding: 1rem;
`;

export const ErrorMessage = styled.div`
  height: 40px;
  color: ${colors.red};
  font-size: ${fonts.sm};
  padding: 0.5rem;
`;

export const StyledButton = styled.button`
  background-color: ${colors.navy};
  color: ${colors.white};
  width: ${(props) => props.width + "px"};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: ${fonts.md};
  cursor: pointer;
`;
