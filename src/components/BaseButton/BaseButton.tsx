import clsx from "clsx";
import s from "./BaseButton.module.css";
type ButtonType = "button" | "submit" | "reset";
interface IBaseButton {
  text: string;
  type?: ButtonType;
  style?: string;
  onClick?: () => void;
}

const BaseButton = ({ text, type = "submit", style, onClick }: IBaseButton) => {
  return (
    <button className={clsx(s.baseStyle, style)} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default BaseButton;
