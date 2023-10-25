import React from "react";
import User from "./User";
import AddNewTodo from "./AddNewTodo";
import Calendar from "./Calendar";
import Projects from "./Projects";

function SideBar() {
  return (
    <div className="sidebar">
      <User />
      <AddNewTodo />
      <Calendar />
      <Projects />
    </div>
  );
}

export default SideBar;
