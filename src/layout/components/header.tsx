import {
  Bell,
  CircleUserRound,
  LogOut,
  Menu,
  Moon,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoo from "../../shared/assets/logoo.svg";

const Header = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => {
    const store = localStorage.getItem("darkMode");
    return store ? JSON.parse(store) : false;
  });

  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleSize = () => {
      setMobile(window.innerWidth < 700);
      if (window.innerWidth >= 700) setOpen(false);
    };
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

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
    <div className="h-[65px] flex justify-end items-center px-[25px] gap-6 border-b-2 border-[#EAEAEA] sticky left-0 top-0 bg-white dark:bg-[#191a1f] dark:text-white dark:border-0 z-50">
      {mobile && (
        <button
          onClick={() => setOpen(true)}
          className="absolute flex items-center gap-45"
        >
          <div className="flex items-center gap-2">
            <img src={logoo} alt="" width={50} />
            <h1 className="font-bold">STYLE UP</h1>
          </div>
          <Menu size={28} />
        </button>
      )}

      {!mobile && (
        <>
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
            <div className="border border-gray-700 p-2 rounded-[50%]">
              <UserRound size={22}/>
            </div>
          </div>
        </>
      )}

      {mobile && (
        <>
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
              open ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setOpen(false)}
          />

          <div
            className={`fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-[#24252d] dark:text-white p-6 transform transition-transform duration-300 z-50 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex justify-end mb-8">
              <button onClick={() => setOpen(false)}>
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-200"
              >
                <Bell size={20} />
                <span>Notification</span>
              </button>
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-200"
              >
                <CircleUserRound size={20} />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setDark(!dark)}
                className="flex items-center gap-3 w-full p-3 rounded-lg border border-gray-400 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-200"
              >
                {dark ? <Sun size={20} /> : <Moon size={20} />}
                <span>{dark ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10 mt-4"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Header);
