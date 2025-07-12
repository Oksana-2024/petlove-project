import clsx from "clsx";
import type { ReactNode } from "react";
import s from "./Container.module.css";
interface IContainer {
  className?: string;
  children: ReactNode;
}

const Container = ({ className, children }: IContainer) => {
  return <div className={clsx(s.container, className)}>{children}</div>;
};

export default Container;
