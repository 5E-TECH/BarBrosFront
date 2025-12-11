import { memo, useEffect, useState } from "react";
import { Instagram, LinkedinIcon } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      className="
        fixed bottom-0 left-0 w-full 
        flex items-center justify-between
        shadow-md
        bg-white 
        h-12 px-6
        "
        // bg-[var(--color-bg-py)] dark:bg-[var(--color-dark-bg-py)]
    >
      <div className="flex items-center gap-2">
        {windowWidth > 768 && (
          <button
            className="shadow-md px-2 py-1.5 rounded-md transition-transform duration-300 cursor-pointer absolute bottom-5 left-4"
          >
            
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>
            © 2025, Made with ❤️ by{" "}
            <span className="font-semibold">Ye77i group</span>
        </span>
        <a
          href="https://www.instagram.com/ye77i.tech?igsh=eHpwaDVhb2R5dWtq"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://t.me/yetti_tech"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-500"
        >
          <FaTelegram size={20} />
        </a>
        <a
          href="https://linkedin.com/in/faxriddin_maripov"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600"
        >
          <LinkedinIcon size={20} />
        </a>
      </div>

      <div className="w-[72px]" />
    </footer>
  );
};

export default memo(Footer);