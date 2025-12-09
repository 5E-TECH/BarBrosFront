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
      className={({ isActive }) =>
        `flex items-center gap-2 text-[14px] mx-4 px-[16px] py-[13px] rounded-[10px] ${
          isActive ? "bg-main text-white" : "hover:text-[#FA8B00]"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default memo(SideBarLink);
