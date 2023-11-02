import react, { createContext, useState } from "react";
const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultproject = "today";
  const [selectedProject, setSelectedProject] = useState(defaultproject);
  return (
    <TodoContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContextProvider, TodoContext };
