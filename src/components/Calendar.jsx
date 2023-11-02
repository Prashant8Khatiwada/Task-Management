import React, { useContext } from "react";
import { CalendarDate, CaretUp } from "react-bootstrap-icons";
import { calendarItems } from "../constants";
import { TodoContext } from "../context";
function Calendar() {
  // Context
  const { setSelectedProject } = useContext(TodoContext);
  return (
    <div className="Calendar">
      <div className="header">
        <div className="title">
          <CalendarDate size="18" />
          <p>Calendar</p>
        </div>
        <div className="btns">
          <span>
            <CaretUp size="20" />
          </span>
        </div>
      </div>
      <div className="items">
        {calendarItems.map((item, index) => (
          <div
            className="item"
            key={index}
            onClick={() => setSelectedProject(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
