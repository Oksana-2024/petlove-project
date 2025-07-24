import clsx from "clsx";
import s from "./BaseButton.module.css";
import Icon from "../Icon/Icon";

type ButtonType = "button" | "submit" | "reset";
interface IBaseButton {
  text: string;
  type?: ButtonType;
  style?: string;
  onClick?: () => void;
  icon?: string;
  iconStyle?: string;
}

const BaseButton = ({
  text,
  type = "submit",
  style,
  onClick,
  icon,
  iconStyle,
}: IBaseButton) => {
  return (
    <button className={clsx(s.baseStyle, style)} type={type} onClick={onClick}>
      {text}
      {icon && <Icon name={icon} className={iconStyle} />}
    </button>
  );
};

export default BaseButton;
