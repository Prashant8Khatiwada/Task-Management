import React, { useState } from "react";
import ProjectForm from "./ProjectForm";

function RenameProjects({ project, setShowModel }) {
  const [newProjectName, setNewProjectName] = useState(project.name);

  function handleSubmit(e) {
    e.preventDefault();
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
