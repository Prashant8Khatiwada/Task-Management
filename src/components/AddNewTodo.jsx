import React, { useState } from "react";
import Modal from "./Modal";
function AddNewTodo() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="AddNewTodo">
      <button>+ New Todo</button>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div>Hello Dear!!!</div>
      </Modal>
    </div>
  );
}

export default AddNewTodo;
