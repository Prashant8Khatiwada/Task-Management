import React, { useState } from "react";
import { doc, addDoc, updateDoc, collection } from "firebase/firestore";
import db from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";
import moment from "moment";

function Todo({ todo }) {
  const [hover, setHover] = useState(false);

  // Delete Todo
  const deleteTodo = (todo) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (isConfirmed) {
      const todoRef = doc(db, "todos", todo.id);

      deleteDoc(todoRef)
        .then(() => {
          toast.success("Todo successfully deleted!");
        })
        .catch((error) => {
          toast.error("Error deleting Todo: ", error);
        });
    }
  };

  // Check Todo
  const checkTodo = (todo) => {
    const todoRef = doc(db, "todos", todo.id);

    updateDoc(todoRef, { checked: !todo.checked });
  };

  // To Repead Todo For Next Day
  const repeatNextDay = async (todo) => {
    const nextDayDate = moment(todo.date, "MM/DD/YYYY").add(1, "days");

    // Create a new object with the updated date and day
    const repeatedTodo = {
      ...todo,
      checked: false,
      date: nextDayDate.format("MM/DD/YYYY"),
      day: nextDayDate.format("d"),
    };

    // Remove the 'id' property
    const { id, ...todoWithoutId } = repeatedTodo;

    try {
      // Add the repeated todo to the 'todos' collection
      const docRef = await addDoc(collection(db, "todos"), todoWithoutId);
      console.log("Repeated Todo added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding repeated todo: ", error);
    }
  };

  return (
    <div className="Todo">
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo" onClick={() => checkTodo(todo)}>
          {todo.checked ? (
            <span className="checked">
              <CheckCircleFill color="#bebebe" />
            </span>
          ) : (
            <span className="unchecked">
              <Circle color={todo.color} />
            </span>
          )}
        </div>
        <div className="text">
          <p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
            {todo.text}
          </p>
          <span>
            {todo.time} - {todo.projectName}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>
        <div className="add-to-next-day" onClick={() => repeatNextDay(todo)}>
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>
        <div className="delete-todo" onClick={() => deleteTodo(todo)}>
          {(todo.checked || hover) && (
            <span>
              <Trash />
            </span>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Todo;
