import React, { createContext, useState } from "react";
import { useTodos, useProjects, useFilteredTodo } from "../hooks";
const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultProject = "today";
  const [selectedProject, setSelectedProject] = useState(defaultProject);

  const todos = useTodos();
  const projects = useProjects(todos);
  const filteredTodos = useFilteredTodo(todos, selectedProject);
  return (
    <TodoContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        defaultProject,
        todos: filteredTodos,
        projects,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContextProvider, TodoContext };
