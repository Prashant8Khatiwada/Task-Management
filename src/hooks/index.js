import { useState, useEffect } from "react";
import db from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let response = await getDocs(collection(db, "todos"));
      const data = response.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });

      setTodos(data);
    }
    fetchData();
  }, []);

  return todos;
}

export function useProjects(todos) {
  const [projects, setProjects] = useState([]);

  function calculateNumOfTodos(projectName, todos) {
    const numOfTodos = todos.filter((todo) => todo.projectName === projectName);
    return numOfTodos.length;
  }

  useEffect(() => {
    async function getData() {
      const response = await getDocs(collection(db, "projects"));
      const data = response.docs.map((doc) => {
        const projectName = doc.data().name;
        return {
          id: doc.id,
          name: projectName,
          numOfTodos: calculateNumOfTodos(projectName, todos),
        };
      });
      setProjects(data);
    }

    getData();
  }, [todos]);

  return projects;
}
