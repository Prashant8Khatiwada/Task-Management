import { useState, useEffect } from "react";
import firebase from "../firebase";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // console.log(firebase);
    let unsubscribe = firebase.collection("todos").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setTodos(data);
    });
    return () => unsubscribe();
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
    let unsubscribe = firestore
      .collection("projects")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const projectName = doc.data().name;
          return {
            id: doc.id,
            name: projectName,
            numOfTodos: calculateNumOfTodos(projectName, todos),
          };
        });
        setProjects(data);
      });
    return () => unsubscribe();
  }, []);

  return projects;
}
