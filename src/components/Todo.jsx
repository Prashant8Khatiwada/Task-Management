import React, { useState, useContext } from "react";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";
import moment from "moment";
import {
  doc,
  addDoc,
  updateDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import db from "../firebase";
import { TodoContext } from "../context";
import { ToastContainer, toast } from "react-toastify";
import { useTransition, animated, useSpring } from "@react-spring/web";

function Todo({ todo }) {
  // STATE
  const [hover, setHover] = useState(false);

  // CONTEXT
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  //========== Delete Todo ==========

  const handleDelete = (todo) => {
    deleteTodo(todo);
    if (selectedTodo === todo) {
      setSelectedTodo(undefined);
    }
  };

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

  // ========== Check Todo ==========
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

  // FOR ANIMATION
  const fadeIn = useSpring({
    from: { marginTop: "-12px", opacity: 0 },
    to: { marginTop: "0px", opacity: 1 },
  });

  const checkTransation = useTransition(todo.checked, {
    from: { position: "absolute", transform: "scale(0)" },
    enter: { transform: "scale(1)" },
    leave: { transform: "scale(0)" },
  });
  return (
    <animated.div style={fadeIn} className="Todo">
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo" onClick={() => checkTodo(todo)}>
          {checkTransation((props, checked) =>
            checked ? (
              <animated.span style={props} className="checked">
                <CheckCircleFill color="#bebebe" />
              </animated.span>
            ) : (
              <animated.span style={props} className="unchecked">
                <Circle color={todo.color} />
              </animated.span>
            )
          )}
        </div>
        <div className="text" onClick={() => setSelectedTodo(todo)}>
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
        <div className="delete-todo" onClick={() => handleDelete(todo)}>
          {(todo.checked || hover) && (
            <span>
              <Trash />
            </span>
          )}
        </div>
      </div>
      <ToastContainer />
    </animated.div>
  );
}

export default Todo;
