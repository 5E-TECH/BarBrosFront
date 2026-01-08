import { memo } from "react";
import { UserRole } from "../../shared/enum";
import { ClipboardList, FileText, Grid2X2Check, Home } from "lucide-react";
import SideBarLink from "./sideBarLink";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import logoo from "../../shared/assets/logoo.svg"

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
  ],
};

const SideBar = () => {
  const userRole = useSelector((state: RootState) => state.roleSlice.role);
  let role: UserRole | undefined = undefined;
  if (userRole === "supperadmin") {
    role = UserRole.Admin;
  }

  const links = role ? sidebarConfig[role] : [];

  return (
    <div className="w-[289px] h-screen max-sm:hidden border-r-2 border-[#EAEAEA] top-0 left-0 sticky dark:bg-[#191a1f] dark:text-white dark:border-0">
      <ul className="flex flex-col ">
        <div className="flex items-center mt-[13px] px-8 gap-2">
          <img src={logoo} alt="" className="w-[60px]"/>
          <h1 className="text-orange-700 font-bold text-xl">STYLE UP</h1>
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
