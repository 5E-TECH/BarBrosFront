import { lazy, memo } from "react";
import { useRoutes } from "react-router-dom";

const DashboardLayout = lazy(() => import("../layout/dashboardLayout"));
const Login = lazy(() => import("../pages/login"));
const Auth = lazy(() => import("../pages/auth"));

const Statistic = lazy(() => import("../pages/admin/statistic"));

const BarberShop = lazy(() => import("../pages/admin/barberShop"));
const BarberShopDetail = lazy(
  () => import("../pages/admin/barberShop/pages/BarberShopDetail")
);

const Users = lazy(() => import("../pages/admin/users"));
const AddUser = lazy(() => import("../pages/admin/users/pages/addAdmin"));
const UserDetail = lazy(() => import("../pages/admin/users/pages/userDetail"));
const AdminDetail = lazy(
  () => import("../pages/admin/users/pages/adminDetail")
);

const Category = lazy(() => import("../pages/admin/category"));
const CategoryDetail = lazy(
  () => import("../pages/admin/category/page/CategoryDetail")
);
const Profile = lazy(() => import("../pages/profile"));

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
            {
              path: "barbershop",
              element: <BarberShop />,
              children: [
                {
                  path: "barbershop-detail/:id",
                  element: <BarberShopDetail />,
                },
              ],
            },
            {
              path: "user",
              element: <Users />,
              children: [
                { path: "add-admin", element: <AddUser /> },
                { path: "user-detail/:id", element: <UserDetail /> },
                { path: "admin-detail/:id", element: <AdminDetail /> },
              ],
            },
            { path: "/profile", element: <Profile /> },
            {
              path: "category",
              element: <Category />,
              children: [
                { path: "category-detail/:id", element: <CategoryDetail /> },
              ],
            },
          ],
        },
      ],
    },
  ]);
};

export default memo(AppRouter);
