import React, { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";

function AddNewProject() {
  const [showModel, setShowModel] = useState(false);
  const [projectName, setProjectName] = useState("");
  function handleSubmit(e) {}
  return (
    <div className="AddNewProject">
      <div className="add-button">
        <span onClick={() => setShowModel(true)}>
          <Plus size="20" />
        </span>
      </div>
      <Modal showModal={showModel} setShowModel={setShowModel}>
        <ProjectForm
          handleSubmit={handleSubmit}
          heading="New Project!"
          value={projectName}
          setValue={setProjectName}
          setShowModel={setShowModel}
          confirmButtonText="+ Add Project"
        />
      </Modal>
    </div>
  );
}

export default AddNewProject;
