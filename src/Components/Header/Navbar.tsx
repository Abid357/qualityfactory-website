import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { IoMenu } from "react-icons/io5";
import logo from "/logo/QualityLogo.svg";
import logoMini from "/logo/Quality_miniNav.svg";

export default function Navbar({ handleOpen }: { handleOpen: () => void }) {
  const [isSticky, setIsSticky] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/catalog", label: "Catalog" },
    { to: "/services", label: "Services" },
    { to: "/team", label: "Team" },
    { to: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const primaryNavbar = document.querySelector(".primary-navbar");
    const scrollWatcher = document.createElement("div");

    scrollWatcher.setAttribute("data-scroll-watcher", "");
    primaryNavbar?.before(scrollWatcher);

    const navObserver = new IntersectionObserver((entries) => {
      setIsSticky(!entries[0].isIntersecting);
    });

    navObserver.observe(scrollWatcher);
  }, []);

  return (
    <div
      className={`primary-navbar fixed top-0 left-0 transition-all duration-300 ease-in-out w-full ${
        isSticky ? "bg-[#0C7E4A] shadow-md" : "bg-transparent pt-[5px]"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-10 px-5">
          <NavLink to="/">
            <div
              className={`relative flex justify-center items-center  transition-all duration-300 ${
                isSticky ? "h-[40px] md:h-[60px]" : "h-[50px] md:h-[100px]"
              }`}
            >
              <img
                src={logo}
                alt="logo"
                className={`transition-opacity duration-300 h-[50px] md:h-[100px] w-auto ${
                  isSticky ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={logoMini}
                alt="logo mini"
                className={`absolute transition-opacity duration-300 h-[30px] md:h-[50px] w-auto ${
                  isSticky ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </NavLink>
          <div className="hidden md:flex items-center justify-end gap-[67px] font-semibold uppercase text-[#0C7E4A] text-[17px] leading-[24px] transition-all duration-300">
            <ul className="flex gap-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isSticky
                        ? isActive
                          ? "bg-white text-[#0C7E4A] rounded-md py-[10px] px-[20px]"
                          : "text-white hover:bg-white hover:text-[#0C7E4A] rounded-md py-[10px] px-[20px]"
                        : isActive
                        ? "bg-[#73C0571A] text-[#73C057] rounded-md py-[10px] px-[20px]"
                        : "hover:bg-[#73C0571A] hover:text-[#73C057] rounded-md py-[10px] px-[20px]"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            title="menu"
            onClick={handleOpen}
            className="md:hidden"
          >
            <p
              className={`font-semibold text-[25px] ${
                isSticky ? "text-white" : "text-[#0C7E4A]"
              }`}
            >
              <IoMenu />
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
