import { memo } from "react";
import { UserRole } from "../../shared/enum";
import {
  AlarmClock,
  ClipboardList,
  FileText,
  Grid2X2Check,
  Home,
  Scissors,
} from "lucide-react";
import SideBarLink from "./sideBarLink";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

interface LinkItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}

const sidebarConfig: Record<UserRole, LinkItem[]> = {
  [UserRole.Admin]: [
    { to: "/", icon: <Home />, label: "Statistics" },
    { to: "/barbershop", icon: <ClipboardList />, label: "BarberShops" },
    { to: "/user", icon: <FileText />, label: "Users" },
    { to: "/category", icon: <Grid2X2Check />, label: "Categories" },
    { to: "/booking", icon: <AlarmClock />, label: "Booking" },
    { to: "/subscribe", icon: <AlarmClock />, label: "Subscriptions Plans" },

  ],
};

const SideBar = () => {
  const userRole = useSelector((state: RootState) => state.roleSlice.role);
  let role: UserRole | undefined = undefined;
  if (userRole === "supperadmin" || userRole === "admin") {
    role = UserRole.Admin;
  }

  const links = role ? sidebarConfig[role] : [];

  return (
    <div className="w-[289px] h-screen max-sm:hidden border-r-2 border-[#EAEAEA] top-0 left-0 sticky dark:bg-[#191a1f] dark:text-white dark:border-0">
      <ul className="flex flex-col ">
        <div className="flex items-center mt-[13px] px-8 gap-3">
          <div className="px-4 py-4 rounded-full dark:bg-[#31343e] shadow-[0_0_10px_5px_rgba(251,191,36,0.6)]">
            <Scissors color="#fa8900" size={26} />
          </div>
          <h1 className="font-bold text-xl">STYLE <span className="bg-main rounded-full px-2 py-2 text-[16px] text-white">UP</span></h1>
        </div>
      </ul>
      <div className="mt-[53px]">
        {links.map((link, i) => (
          <li key={i} className="mb-3">
            <SideBarLink {...link} />
          </li>
        ))}
      </div>
    </div>
  );
};

export default memo(SideBar);
