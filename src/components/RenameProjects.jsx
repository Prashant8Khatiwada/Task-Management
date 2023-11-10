import React, { useState } from "react";
import ProjectForm from "./ProjectForm";
import db from "../firebase";

function RenameProjects({ project, setShowModel }) {
  const [newProjectName, setNewProjectName] = useState(project.name);

  const renameProject = (project, newProjectName) => {
    const projectRef = collection();
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
