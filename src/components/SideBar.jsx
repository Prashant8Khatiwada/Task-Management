import React from "react";
import User from "./User";
import AddNewTool from "./AddNewTool";
import Calandar from "./Calandar";
import Projects from "./Projects";

function SideBar() {
  return (
    <div className="sidebar">
      <User />
      <AddNewTool />
      <Calandar />
      <Projects />
    </div>
  );
}

export default SideBar;
