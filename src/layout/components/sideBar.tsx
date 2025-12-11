import { memo } from "react";
import { UserRole } from "../../shared/enum";
import { ClipboardList, FileText, Home, Search } from "lucide-react";
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
    <div className="w-[289px] h-screen max-sm:hidden border-r-2 border-[#EAEAEA] top-0 left-0 sticky">
      <ul className="flex flex-col ">
        <div className="flex items-center mt-[23px] px-4 py-[7px] bg-[#F5F5F5] rounded-md mx-4 gap-2">
          <Search className="w-5 h-5" color="#5C6269" />
          <input
            type="text"
            placeholder="Search"
            className="outline-0 w-full bg-transparent"
          />
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
