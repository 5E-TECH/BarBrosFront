import { lazy, memo } from "react";
import { useRoutes } from "react-router-dom";

const DashboardLayout = lazy(() => import("../layout/dashboardLayout"));
const Login = lazy(() => import("../pages/login"));
const Auth = lazy(() => import("../pages/auth"));

const Statistic = lazy(() => import("../pages/admin/statistic"));
const BarberShop = lazy(() => import("../pages/admin/barberShop"));
const Users = lazy(() => import("../pages/admin/users"));
const Category = lazy(() => import("../pages/admin/category"));

const AddUser = lazy(() => import("../pages/admin/users/pages/addUser"));
const UserDetail = lazy(() => import("../pages/admin/users/pages/userDetail"));
const AdminDetail = lazy(() => import("../pages/admin/users/pages/adminDetail"));

const AppRouter = () => {
  return useRoutes([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: <Auth />,
      children: [
        {
          path: "/",
          element: <DashboardLayout />,
          children: [
            { path: "/", element: <Statistic /> },
            { path: "barbershop", element: <BarberShop /> },
            {
              path: "user",
              element: <Users />,
              children: [
                { path: "add-admin", element: <AddUser /> },
                { path: "user-detail/:id", element: <UserDetail /> },
                { path: "admin-detail/:id", element: <AdminDetail /> },
              ],
            },
            { path: "category", element: <Category /> },
          ],
        },
      ],
    },
  ]);
};

export default memo(AppRouter);
