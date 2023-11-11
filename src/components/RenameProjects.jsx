import React, { useContext, useState } from "react";
import ProjectForm from "./ProjectForm";
import { TodoContext } from "../context";
import db from "../firebase";
import {
  collection,
  updateDoc,
  query,
  getDocs,
  doc,
  where,
} from "firebase/firestore";

function RenameProjects({ project, setShowModel }) {
  // STATE
  const [newProjectName, setNewProjectName] = useState(project.name);
  // CONTEXT
  const { selectedProject, setSelectedProject } = useContext(TodoContext);

  const renameProject = async (project, newProjectName) => {
    const projectRef = collection(db, "projects");
    const todoRef = collection(db, "todos");
    const { name: oldProjectName } = project;

    const projectQuery = query(projectRef, where("name", "==", newProjectName));
    const todoQuery = query(
      todoRef,
      where("projectName", "==", oldProjectName)
    );
    try {
      const projectSnapshot = await getDocs(projectQuery);
      if (!projectSnapshot.empty) {
        alert("Project with the same name already exists!!!");
      } else {
        const projectId = doc(db, "projects", project.id);
        await updateDoc(projectId, { name: newProjectName });

        const todoSnapshot = await getDocs(todoQuery);
        todoSnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, { projectName: newProjectName });
        });

        setShowModel(false);
      }
      if (selectedProject === oldProjectName) {
        setSelectedProject(newProjectName);
      }
    } catch (error) {
      console.log("Error updating project document: ", error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    renameProject(project, newProjectName);

    setShowModel(false);
  }
  return (
    <div className="RenameProject">
      <ProjectForm
        handleSubmit={handleSubmit}
        heading="Edit Project Name!"
        value={newProjectName}
        setValue={setNewProjectName}
        setShowModel={setShowModel}
        confirmButtonText="confirm"
      />
    </div>
  );
}

export default RenameProjects;
