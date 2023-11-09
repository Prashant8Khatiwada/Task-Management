import { toast } from "react-toastify";
import React, { useContext, useState } from "react";
import RenameProjects from "./RenameProjects";
import { Pencil, XCircle } from "react-bootstrap-icons";
import Modal from "./Modal";
import { TodoContext } from "../context";
import db from "../firebase";
import {
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";

function Project({ project, edit }) {
  // CONTEXT
  const { defaultProject, selectedProject, setSelectedProject } =
    useContext(TodoContext);
  // STATE
  const [showModal, setShowModel] = useState(false);

  const deleteProject = async (project) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (isConfirmed) {
      const projectRef = doc(db, "projects", project.id);
      console.log(projectRef);

      try {
        // Delete the project document
        await deleteDoc(projectRef);

        // Find and delete all todos associated with the project
        const todosQuery = query(
          collection(db, "todos"),
          where("projectName", "==", project.name)
        );
        console.log(todosQuery);
        const todosSnapshot = await getDocs(todosQuery);
        console.log(todosSnapshot);
        todosSnapshot.forEach(async (todoDoc) => {
          await deleteDoc(todoDoc.ref);
        });

        // To return to default
        if (selectedProject === project.name) {
          setSelectedProject(defaultProject);
        }
        toast.success("Project successfully deleted!");
      } catch (error) {
        toast.error("Error deleting project: ", error);
      }
    }
  };

  return (
    <div className="Project">
      <div className="name" onClick={() => setSelectedProject(project.name)}>
        {project.name}
      </div>
      <div className="btns">
        {edit ? (
          <div className="edit-delete">
            <span onClick={() => setShowModel(true)} className="edit">
              <Pencil size="13" />
            </span>

            <span className="delete" onClick={() => deleteProject(project)}>
              <XCircle size="13" />
            </span>
          </div>
        ) : project.numOfTodos === 0 ? (
          ""
        ) : (
          <div className="total-todos">{project.numOfTodos}</div>
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModel}>
        <RenameProjects project={project} setShowModel={setShowModel} />
      </Modal>
    </div>
  );
}

export default Project;
