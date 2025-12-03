import { memo } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import SideBar from "./components/sideBar";

const DashboardLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <SideBar/>
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default memo(DashboardLayout);
