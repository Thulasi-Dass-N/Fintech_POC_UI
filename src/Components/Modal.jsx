import { useEffect } from "react";
import "../App.css";

// export interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children?: ReactNode;
// }

const Modal = ({ isOpen, onClose, children,className }) => {

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, );

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      if (document.body.style.overflow === "hidden")
        document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return isOpen ? (
    <div
      role="presentation"
      className={className}
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <div role="dialog">{children}</div>
    </div>
  ) : (
    <></>
  );
};
export default Modal;
