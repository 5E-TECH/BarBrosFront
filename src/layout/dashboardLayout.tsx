import { memo } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import SideBar from "./components/sideBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* LEFT: Sidebar */}
      <SideBar />

      {/* RIGHT: Header + Content + Footer */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Main content grows */}
        <main className="flex-1 px-[30px] py-[35px] bg-[#F8F8F8]">
          <Outlet />
        </main>

        {/* Footer (sidebar tagida boshlanadi) */}
        <Footer />
      </div>
    </div>
  );
};

export default memo(DashboardLayout);
