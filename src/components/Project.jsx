import React, { useContext, useState } from "react";
import RenameProjects from "./RenameProjects";
import { Pencil, XCircle } from "react-bootstrap-icons";
import Modal from "./Modal";
import { TodoContext } from "../context";
function Project({ project, edit }) {
  // CONTEXT
  const { setSelectedProject } = useContext(TodoContext);

  // STATE
  const [showModal, setShowModel] = useState(false);

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
            <span className="delete">
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
