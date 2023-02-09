import { FC } from "react";

interface ModalProps {
  id: string;
  children: React.ReactNode;
  name: string;
}

const Modal: FC<ModalProps> = ({ children, id, name }) => {
  return (
    <>
      <label htmlFor={id} className="btn-secondary btn">
        {name}
      </label>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative p-4" htmlFor="">
          {children}
        </label>
      </label>
    </>
  );
};

export default Modal;
