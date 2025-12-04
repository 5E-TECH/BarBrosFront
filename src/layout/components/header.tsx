import { Bell } from "lucide-react";
import { memo } from "react";

const Header = () => {
  return (
    <div className="h-[66px] flex justify-end items-center px-[25px] gap-[24px] border-b-2 border-[#EAEAEA]">
      <div className="pr-[24px] border-r border-[#E8E9EB] flex items-center">
        <Bell className="text-[#000] w-5 h-5" />
      </div>
      <h4>Admin</h4>
    </div>
  );
};

export default memo(Header);
