import React from "react";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function TodoForm({
  handleSubmit,
  heading = false,
  text,
  setText,
  day,
  setDay,
  time,
  setTime,
  projects,
  showButtons = false,
  setShowModal = false,
  todoProject,
  setTodoProject,
}) {
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <div className="text">
        {heading && <h3>{heading}</h3>}
        <input
          type="text"
          placeholder="Enter your todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </div>
      <div className="remind">
        <Bell />
        <p>Remind Me</p>
      </div>

      <div className="pick-day">
        <div className="title">
          <CalendarDay />
          <p>Choose a day</p>
        </div>
        <DatePicker
          selected={day}
          onChange={(day) => setDay(day)}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>

      <div className="pick-time">
        <div className="title">
          <Clock />
          <p>Choose a time</p>
        </div>
        <DatePicker
          selected={time}
          onChange={(time) => setTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      </div>

      <div className="pick-project">
        <div className="title">
          <Palette />
          <p>Choose a project</p>
        </div>
        <div className="projects">
          {projects.map((project) => (
            <div
              className={`project ${
                todoProject === project.name ? "active" : ""
              }`}
              onClick={() => setTodoProject(project.name)}
              key={project.id}
            >
              {project.name}
            </div>
          ))}
        </div>
      </div>
      {showButtons && (
        <div>
          <div className="cancel" onClick={() => setShowModal(false)}>
            <X size={40} />
          </div>
          <div className="confirm">
            <button>+ Add to do </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default TodoForm;
