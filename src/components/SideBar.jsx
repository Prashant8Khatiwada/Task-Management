import { useContext } from "react";
import React, { useEffect, useRef } from "react";
import User from "./User";
import AddNewTodo from "./AddNewTodo";
import Calendar from "./Calendar";
import Projects from "./Projects";
import { TodoContext } from "../context";

function SideBar() {
  const sidebarRef = useRef();
  const { setSelectedTodo } = useContext(TodoContext);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const handleClick = (e) => {
    if (
      e.target === sidebarRef.current ||
      sidebarRef.current.contains(e.target)
    ) {
      setSelectedTodo(undefined);
    }
  };
  return (
    <div className="sidebar" ref={sidebarRef}>
      <User />
      <AddNewTodo />
      <Calendar />
      <Projects />
    </div>
  );
}

export default SideBar;
