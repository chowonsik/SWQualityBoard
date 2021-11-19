import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  :hover {
    box-shadow: 0 6px 16px 0 rgba(47, 47, 48, 0.35);
  }
  transition: all ease 0.3s;
  .react-datepicker__input-container input {
    width: 280px;
    text-align: center;
    color: white;
    background-color: ${colors.gray};
    border-radius: 6px;
    font-size: ${fonts.md};
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }

  .react-datepicker__input-container input:focus {
    outline: none;
  }

  .date-customheader {
    font-size: 1.3rem;
    display: flex;
    justify-content: space-around;
    align-content: center;
    padding: 20px;
    margin: 0;
  }

  .react-datepicker {
    font-size: 1.2rem;
  }

  .react-datepicker__current-month {
    font-size: 1.8rem;
  }

  .react-datepicker__header {
    background-color: white;
  }

  .arrow-btn {
    font-size: 1.5rem;
    color: ${colors.grayLine};
    cursor: pointer;
  }

  .arrow-btn :hover {
    color: ${colors.black};
  }

  .react-datepicker__navigation {
    display: flex;
    top: 13px;
  }

  .react-datepicker__day-name,
  .react-datepicker__day {
    margin: 0.5rem;
  }

  .react-datepicker__day-name {
    color: ${colors.gray};
  }

  .react-datepicker__day--outside-month {
    color: #d3d3d3;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${colors.blue};
  }

  .react-datepicker__day--today {
    position: relative;
  }

  .react-datepicker__day--today::after {
    position: absolute;
    top: 1.2rem;
    right: 0.3rem;
    content: "오늘";
    font-size: 10px;
  }

  .react-datepicker__day--in-range {
    background-color: #90b5d2;
  }

  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background-color: ${colors.blue};
  }
`;
