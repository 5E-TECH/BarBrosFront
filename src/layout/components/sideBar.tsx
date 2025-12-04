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
    { to: "/barbershop", icon: <ClipboardList  />, label: "BarberShops" },
    { to: "/user", icon: <FileText/>, label: "Users" },
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
    <div className="w-[289px] max-sm:hidden border-r-2 border-[#EAEAEA]">
      <ul className="flex flex-col ">
        <div className="flex justify-between px-[12px] py-[11px] bg-[#F5F5F5] rounded-[6px] mb-[23px] mx-4">
          <Search size={20} color="#5C6269"/>
          <input type="text" name="" id="" placeholder="Search" className="outline-0"/>
        </div>
        <h3 className="text-helpertext font-medium pb-[6px] pl-[30px]">MENU</h3>
        {links.map((link, i) => (
          <li key={i} className="mb-[12px]">
            <SideBarLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(SideBar);
