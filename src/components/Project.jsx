import { toast } from "react-toastify";
import React, { useContext, useState } from "react";
import RenameProjects from "./RenameProjects";
import { Pencil, XCircle } from "react-bootstrap-icons";
import Modal from "./Modal";
import { useTransition, animated } from "@react-spring/web";
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

  // TO DELETE PROJECT
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
        const todosSnapshot = await getDocs(todosQuery);
        todosSnapshot.forEach(async (todoDoc) => {
          await deleteDoc(todoDoc.ref);
        });

        // To return to default
        if (selectedProject === project.name) {
          setSelectedProject(defaultProject);
        }
      } catch (error) {
        toast.error("Error deleting project: ", error);
      }
    }
  };

  // FOR ANIMATION
  const btnTransation = useTransition(edit, {
    from: { opacity: 0, right: "-20px" },
    enter: { opacity: 1, right: "0px" },
    leave: { opacity: 0, right: "-20px" },
  });

  return (
    <div className="Project">
      <div className="name" onClick={() => setSelectedProject(project.name)}>
        {project.name}
      </div>
      <div className="btns">
        {btnTransation((props, items) =>
          items ? (
            <animated.div className="edit-delete" style={props}>
              <span onClick={() => setShowModel(true)} className="edit">
                <Pencil size="13" />
              </span>

              <span className="delete" onClick={() => deleteProject(project)}>
                <XCircle size="13" />
              </span>
            </animated.div>
          ) : project.numOfTodos === 0 ? (
            ""
          ) : (
            <animated.div className="total-todos" style={props}>
              {project.numOfTodos}
            </animated.div>
          )
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModel}>
        <RenameProjects project={project} setShowModel={setShowModel} />
      </Modal>
    </div>
  );
}

export default Project;
