import ModalWindow from "../ModalWindow/ModalWindow";
import BaseButton from "../BaseButton/BaseButton";
import { useAppDispatch } from "../../hook/useDispatch";
import { logoutUserThunk } from "../../redux/user/operations";

import s from "./ModalApproveAction.module.css";
interface IModalApproveAction {
  onClose: () => void;
  isOpen: boolean;
}

const ModalApproveAction = ({ isOpen, onClose }: IModalApproveAction) => {
  const dispatch = useAppDispatch();

  return (
    <ModalWindow
      closeModal={onClose}
      modalIsOpen={isOpen}
      className={s.logoutModal}
    >
      <div className={s.imgWrapper}>
        <img
          width={44}
          src="/cat_logout.webp"
          alt="Cat"
          srcSet="/cat_logout@2x.webp 2x"
        />
      </div>
      <h3 className={s.title}>Already leaving?</h3>
      <div className={s.buttonWrapper}>
        <BaseButton
          type="button"
          text="Yes"
          onClick={() => {
            dispatch(logoutUserThunk());
            onClose();
          }}
        />
        <BaseButton
          text="Cancel"
          onClick={onClose}
          style={s.cancelBtn}
          type="button"
        />
      </div>
    </ModalWindow>
  );
};

export default ModalApproveAction;
