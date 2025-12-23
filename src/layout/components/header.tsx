import { Bell, LogOut } from "lucide-react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../shared/assets/profile.jpg";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="h-[65px] flex justify-end items-center px-[25px] gap-6 border-b-2 border-[#EAEAEA] sticky left-0 top-0 bg-white">
      <div className="pr-6 border-r border-[#E8E9EB] flex items-center">
        <LogOut
          onClick={handleLogout}
          className="mr-4 cursor-pointer hover:text-red-500"
        />
        <Bell className="w-5 h-5" />
      </div>
      <div onClick={() => navigate("/profile")} className="flex items-center gap-2 cursor-pointer">
        <img src={profile} alt="" className="w-[30px]"/>
        <h4>Admin</h4>
      </div>
    </div>
  );
};

export default memo(Header);
