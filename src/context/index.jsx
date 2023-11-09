import React, { createContext, useState } from "react";
import { useTodos, useProjects, useFilteredTodo } from "../hooks";
const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultproject = "today";
  const [selectedProject, setSelectedProject] = useState(defaultproject);

  const todos = useTodos();
  const projects = useProjects(todos);
  const filteredTodos = useFilteredTodo(todos, selectedProject);
  console.log(filteredTodos);
  return (
    <TodoContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        todos: filteredTodos,
        projects,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContextProvider, TodoContext };
