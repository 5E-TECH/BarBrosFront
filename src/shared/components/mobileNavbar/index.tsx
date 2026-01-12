import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import {
  AlarmClock,
  ClipboardList,
  FileText,
  Grid2X2Check,
  Home,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { UserRole } from "../../enum";

const sidebarConfig: Record<
  UserRole,
  { to: string; icon: React.ReactNode; }[]
> = {
  [UserRole.Admin]: [
    { to: "/", icon: <Home />},
    { to: "/barbershop", icon: <ClipboardList />},
    { to: "/user", icon: <FileText />},
    { to: "/category", icon: <Grid2X2Check /> },
    { to: "/booking", icon: <AlarmClock /> },
  ],
};

const MobileNavbar = () => {
  const userRole = useSelector((state: RootState) => state.roleSlice.role);

  let role: UserRole | undefined = undefined;
  if (userRole === "supperadmin") {
    role = UserRole.Admin;
  }

  const links = role ? sidebarConfig[role] : [];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-[65px] bg-white dark:bg-[#191a1f] border-t border-[#EAEAEA] dark:border-gray-800 flex items-center justify-around px-2 z-10">
      {links.map((link, i) => (
        <NavLink
          key={i}
          to={link.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive
                ? "text-orange-600 font-bold"
                : "text-gray-500 dark:text-gray-400"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`transition-transform ${
                  isActive ? "scale-110" : ""
                }`}
              >
                {link.icon}
              </div>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-orange-600 rounded-full" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default memo(MobileNavbar);
