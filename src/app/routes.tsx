import { lazy, memo } from "react";
import { useRoutes } from "react-router-dom";

const DashboardLayout = lazy(() => import("../layout/dashboardLayout"));
const Login = lazy(() => import("../pages/login"));
const Auth = lazy(() => import("../pages/auth"));

const AppRouter = () => {
  return useRoutes([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: <Auth />,
      children: [{ path: "/", element: <DashboardLayout /> }],
    },
  ]);
};


export default memo(AppRouter)