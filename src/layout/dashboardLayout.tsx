import { memo } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import SideBar from "./components/sideBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <div className="flex">
          <SideBar/>
          <main className="px-[30px] py-[35px]">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default memo(DashboardLayout);
