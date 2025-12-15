import { memo } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import SideBar from "./components/sideBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <SideBar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 px-[30px] py-[25px] bg-[#F8F8F8]">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default memo(DashboardLayout);
