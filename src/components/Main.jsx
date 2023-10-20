import React from "react";
import Todos from "./Todos";
import EditTodo from "./EditTodo";

function Main() {
  return (
    <div className="main">
      <Todos />
      <EditTodo />
    </div>
  );
}

export default Main;
