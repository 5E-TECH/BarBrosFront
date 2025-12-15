import { lazy, memo } from "react";
import { useRoutes } from "react-router-dom";

const DashboardLayout = lazy(() => import("../layout/dashboardLayout"));
const Login = lazy(() => import("../pages/login"));
const Auth = lazy(() => import("../pages/auth"));

const Statistic = lazy(() => import("../pages/admin/statistic"));
const BarberShop = lazy(() => import("../pages/admin/barberShop"));
const Users = lazy(() => import("../pages/admin/users"));
const AddUser = lazy(() => import("../pages/admin/users/pages/addUser"));

const AppRouter = () => {
  return useRoutes([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: <Auth />,
      children: [
        {
          path: "/", // dashboard layout uchun
          element: <DashboardLayout />,
          children: [
            { path: "/", element: <Statistic /> },
            { path: "barbershop", element: <BarberShop /> },
            {
              path: "user", // Users routi
              element: <Users />,
              children: [
                { path: "add-admin", element: <AddUser /> }, // child route
              ],
            },
          ],
        },
      ],
    },
  ]);
};

export default memo(AppRouter);
