import React from "react";
import User from "./User";
import AddNewTodo from "./AddNewTodo";
import Calandar from "./Calandar";
import Projects from "./Projects";

function SideBar() {
  return (
    <div className="sidebar">
      <User />
      <AddNewTodo />
      <Calandar />
      <Projects />
    </div>
  );
}

export default SideBar;
