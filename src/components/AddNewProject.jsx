import React, { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import db from "../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

function AddNewProject() {
  const [showModel, setShowModel] = useState(false);
  const [projectName, setProjectName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (projectName) {
      const projectRef = collection(db, "projects");
      // Check if a project with the given name exists
      const q = query(projectRef, where("name", "==", projectName));
      getDocs(q)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // If no matching projects found, add a new one
            addDoc(projectRef, {
              name: projectName,
            })
              .then(() => {
                console.log("Project added successfully!");
              })
              .catch((error) => {
                console.error("Error adding project: ", error);
              });
          } else {
            toast.error("Project already exists!");
          }
        })
        .catch((error) => {
          console.error("Error checking for existing projects: ", error);
        });

      setProjectName("");
      setShowModel(false);
    }
  }
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default AddNewProject;
