import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import "react-datepicker/dist/react-datepicker.css";
import { calendarItems } from "../constants";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import moment from "moment";
import randomColor from "randomcolor";
function AddNewTodo() {
  const { projects, selectedProject } = useContext(TodoContext);

  // STATE
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject);

  function handleSubmit(e) {
    e.preventDefault();
    if (text && !calendarItems.includes(todoProject)) {
      try {
        const docRef = addDoc(collection(db, "todos"), {
          text: text,
          date: moment(day).format("MM/DD/YYYY"),
          day: moment(day).format("d"),
          time: moment(time).format("hh:mm a"),
          checked: false,
          color: randomColor({ luminosity: "dark" }),
          projectName: todoProject,
        });
      } catch (error) {
        console.log(error);
      }

      setShowModal(false);
      setText("");
      setDay(new Date());
      setTime(new Date());
    }
  }

  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);

  return (
    <div className="AddNewTodo">
      <div className="btn">
        <button onClick={() => setShowModal(true)}>+ New Todo</button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TodoForm
          handleSubmit={handleSubmit}
          heading="Add New Todo"
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          projects={projects}
          showButtons={true}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
}

export default AddNewTodo;
