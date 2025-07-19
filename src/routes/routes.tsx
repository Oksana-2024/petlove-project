import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import MainPage from "../pages/MainPage/MainPage";

const Home = lazy(() => import("../pages/HomePage/HomePage"));
const Register = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const Login = lazy(() => import("../pages/LoginPage/LoginPage"));
const News = lazy(() => import("../pages/NewsPage/NewsPage"));
const Notices = lazy(() => import("../pages/NoticesPage/NoticesPage"));
const Friends = lazy(() => import("../pages/OurFriendsPage/OurFriendsPage"));
const Profile = lazy(() => import("../pages/ProfilePage/ProfilePage"));
const AddPet = lazy(() => import("../pages/AddPetPage/AddPetPage"));
const NotFound = lazy(() => import("../pages/NotFoundPage/NotFounPage"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    element: <Layout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/news", element: <News /> },
      { path: "/notices", element: <Notices /> },
      { path: "/friends", element: <Friends /> },
      { path: "/profile", element: <Profile /> },
      { path: "/add-pet", element: <AddPet /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default routes;
