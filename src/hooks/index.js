import { useState, useEffect } from "react";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import moment from "moment";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(data);
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  return todos;
}

export function useFilteredTodo(todos, selectedProject) {
  const [filteredTodo, setFilteredTodo] = useState([]);

  useEffect(() => {
    let data;
    const todayDateFormatted = moment().format("MM/DD/YYYY");
    if (selectedProject === "today") {
      data = todos.filter((todo) => {
        return todo.date === todayDateFormatted;
      });
    } else if (selectedProject === "next 7 days") {
      data = todos.filter((todo) => {
        const todoDate = moment(todo.date, "MM/DD/YYYY");
        const todayDate = moment(todayDateFormatted, "MM/DD/YYYY");

        const diffDays = todoDate.diff(todayDate, "days");

        return diffDays < 7 && diffDays >= 0;
      });
    } else if (selectedProject === "all days") {
      data = todos;
    } else {
      data = todos.filter((todo) => todo.projectName === selectedProject);
    }
    setFilteredTodo(data);
  }, [todos, selectedProject]);
  return filteredTodo;
}

export function useProjects(todos) {
  const [projects, setProjects] = useState([]);

  function calculateNumOfTodos(projectName, todos) {
    const numOfTodos = todos.filter((todo) => todo.projectName === projectName);
    return numOfTodos.length;
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "projects"),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const projectName = doc.data().name;
          return {
            id: doc.id,
            name: projectName,
            numOfTodos: calculateNumOfTodos(projectName, todos),
          };
        });
        setProjects(data);
      }
    );

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, [todos]);

  return projects;
}
