import { Link } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow";
import s from "./ModalAttention.module.css";

interface IModalAttention {
  onClose: () => void;
  isOpen: boolean;
}

const ModalAttention = ({ onClose, isOpen }: IModalAttention) => {
  return (
    <ModalWindow closeModal={onClose} modalIsOpen={isOpen} className={s.modal}>
      <div className={s.imgBorder}>
        <img
          src="/dog_modal.png"
          alt="Dog"
          srcSet="/dog_modal@2x.png 2x"
          className={s.image}
        />
      </div>
      <h3 className={s.title}>Attention</h3>
      <p className={s.text}>
        We would like to remind you that certain functionality is available only
        to authorized users.If you have an account, please log in with your
        credentials. If you do not already have an account, you must register to
        access these features.
      </p>
      <div className={s.linkWrapper}>
        <Link to="/login" className={s.loginLink}>
          Log In
        </Link>
        <Link to="/register" className={s.registerLink}>
          Registration
        </Link>
      </div>
    </ModalWindow>
  );
};

export default ModalAttention;
