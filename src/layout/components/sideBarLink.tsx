import React, { memo } from "react";
import { NavLink } from "react-router-dom";

interface SideBarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}

const SideBarLink: React.FC<SideBarLinkProps> = ({ to, icon, label, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2 text-[14px] font-medium transition-colors duration-200 ${
          isActive
            ? "bg-main text-white mx-4 px-[16px] py-[13px] rounded-[10px]"
            : "hover:text-[#FA8B00] cursor-pointer px-[16px] py-[13px] mx-4 rounded-[10px]"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default memo(SideBarLink);
