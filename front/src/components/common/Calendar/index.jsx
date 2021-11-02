import React, { forwardRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import { Wrapper } from "./styles";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

require("react-datepicker/dist/react-datepicker.css");
registerLocale("ko", ko);

function Calendar() {
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const [startDate, setStartDate] = useState(new Date());

  return (
    <Wrapper>
      <DatePicker
        locale="ko"
        dateFormat="yyyy.MM.dd E"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        maxDate={new Date()}
        adjustDateOnChange
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="date-customheader">
            <button
              className="arrow-btn"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <ChevronLeft />
            </button>
            <div className="custom-month">
              {date.getFullYear()}년 {months[date.getMonth()]}
            </div>
            <button
              className="arrow-btn"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      ></DatePicker>
    </Wrapper>
  );
}

export default Calendar;
