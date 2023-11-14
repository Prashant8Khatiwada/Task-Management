import React, { useContext, useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import db from "../firebase";

function EditTodo() {
  // STATE
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState("");

  // CONTEXT
  const { selectedTodo, projects } = useContext(TodoContext);

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      if (selectedTodo.date) {
        setDay(moment(selectedTodo.date, "MM/DD/YYYY").toDate());
      }
      if (selectedTodo.time) {
        setTime(moment(selectedTodo.time, "hh:mm A").toDate());
      }
      setTodoProject(selectedTodo.projectName);
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (selectedTodo && text && day && time && todoProject !== undefined) {
      const todoRef = doc(db, "todos", selectedTodo.id);
      updateDoc(todoRef, {
        text,
        date: moment(day).format("MM/DD/YYYY"),
        day: moment(day).format("d"),
        time: moment(time).format("hh:mm A"),
        projectName: todoProject,
      });
    }
  }, [text, day, time, todoProject, selectedTodo]);

  function handleSubmit(e) {}

  return (
    <div>
      {selectedTodo && (
        <div className="EditTodo">
          <div className="header">Edit Todo</div>
          <div className="container">
            <TodoForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              day={day}
              setDay={setDay}
              time={time}
              setTime={setTime}
              todoProject={todoProject}
              setTodoProject={setTodoProject}
              projects={projects}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EditTodo;
