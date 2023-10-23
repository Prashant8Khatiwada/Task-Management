import React, { useState } from "react";
import Modal from "./Modal";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import { TimePicker } from "react-ios-time-picker";
import "react-datepicker/dist/react-datepicker.css";
function AddNewTodo() {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());

  // Initialize time with the current time
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const formattedHour = currentHour < 10 ? `0${currentHour}` : `${currentHour}`;
  const formattedMinute =
    currentMinute < 10 ? `0${currentMinute}` : `${currentMinute}`;
  const initialTime = `${formattedHour}:${formattedMinute}`;
  const [time, setTime] = useState(initialTime);

  return (
    <div className="AddNewTodo">
      <div className="btn">
        <button onClick={() => setShowModal(true)}>+ New Todo</button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <form>
          <div className="text">
            <h3>Add new to do!</h3>
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
            <DatePicker selected={day} onChange={(day) => setDay(day)} />
          </div>

          <div className="pick-time">
            <div className="title">
              <Clock />
              <p>Choose a time</p>
            </div>
            <TimePicker value={time} onChange={(time) => setTime(time)} />
          </div>

          <div className="pick-project">
            <div className="title">
              <Palette />
              <p>Choose a project</p>
            </div>
            <div className="projects">
              <div className="project active">Personal</div>
              <div className="project">Work</div>
            </div>
          </div>
          <div className="cancel" onClick={() => setShowModal(false)}>
            <X size={40} />
          </div>
          <div className="confirm">
            <button>+ Add to do </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddNewTodo;
