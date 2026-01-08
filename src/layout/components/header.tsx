import { Bell, LogOut, Moon, Sun } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../../shared/assets/profile.jpg";

const Header = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    const store = localStorage.getItem("darkMode");
    return store ? JSON.parse(store) : false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="h-[65px] flex justify-end items-center px-[25px] gap-6 border-b-2 border-[#EAEAEA] sticky left-0 top-0 bg-white dark:bg-[#191a1f] dark:text-white dark:border-0">
      <div className="pr-6 border-r border-[#E8E9EB] flex items-center gap-6">
        <button onClick={() => setDark(!dark)} className="cursor-pointer">
          {dark ? <Sun size={25} /> : <Moon size={25} />}
        </button>
        <Bell size={25} />
        <LogOut
          size={25}
          onClick={handleLogout}
          className="mr-4 cursor-pointer hover:text-red-500"
        />
      </div>
      <div
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src={profile} alt="" className="w-[30px]" />
        <h4>Admin</h4>
      </div>
    </div>
  );
};

export default memo(Header);
