import type { ReactNode } from "react";
import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import { ToastContainer } from "react-toastify";

interface ILayoute {
  children?: ReactNode;
}

const Layout = ({ children }: ILayoute) => {
  const location = useLocation();
  const isHome = location.pathname === "/home";
  return (
    <ThemeProvider theme={isHome ? "home" : "default"}>
      <Header />
      <main>{children}</main>
      <Outlet />
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Layout;
