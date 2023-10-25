import React, { useState } from "react";
import Project from "./Project";
import AddNewProject from "./AddNewProject";
import { CaretUp, Palette, PencilFill } from "react-bootstrap-icons";
function Projects() {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const pencilColor = edit ? "#1EC94C" : "#000000";
  const projects = [
    { id: 1, name: "personal", numOfTodos: 0 },
    { id: 2, name: "work", numOfTodos: 1 },
    { id: 3, name: "other", numOfTodos: 2 },
  ];
  return (
    <div className="Projects">
      <div className="header">
        <div className="title">
          <Palette size="18" />
          <p>Projects</p>
        </div>
        <div className="btns">
          {showMenu && (
            <span className="edit" onClick={() => setEdit((edit) => !edit)}>
              <PencilFill size="15" color={pencilColor} />
            </span>
          )}
          <AddNewProject />

          <span className="arrow">
            <CaretUp size="20" />
          </span>
        </div>
      </div>
      <div className="items">
        {projects.map((project) => (
          <Project key={project.id} project={project} edit={edit} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
