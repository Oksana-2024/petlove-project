import clsx from "clsx";
import s from "./Title.module.css";
interface ITitle {
  title: string;
  className?: string;
}

const Title = ({ title, className }: ITitle) => {
  return <h2 className={clsx(s.title, className)}>{title}</h2>;
};

export default Title;
