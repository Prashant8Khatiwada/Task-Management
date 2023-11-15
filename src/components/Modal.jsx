import { useSpring, animated } from "@react-spring/web";
import React, { useRef } from "react";

function Modal({ children, showModal, setShowModal }) {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  //ANIMATION
  const modalAnimation = useSpring({
    opacity: showModal ? 1 : 0,
    top: showModal ? "25%" : "0%",
    config: { friction: 10 },
  });

  return (
    showModal && (
      <div className="Modal " ref={modalRef} onClick={closeModal}>
        <animated.div className="container" style={modalAnimation}>
          {children}
        </animated.div>
      </div>
    )
  );
}

export default Modal;
