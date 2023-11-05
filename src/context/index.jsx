import React, { createContext, useState } from "react";
import { useTodos, useProjects } from "../hooks";
const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultproject = "today";
  const [selectedProject, setSelectedProject] = useState(defaultproject);

  const todos = useTodos();
  const projects = useProjects(todos);
  return (
    <TodoContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        todos,
        projects,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContextProvider, TodoContext };
