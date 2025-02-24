import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { IoMenu } from "react-icons/io5";
import logo from "/logo/QualityLogo.svg";
import logoMini from "/logo/Quality_mini.svg";

interface NavbarWhiteInterface {
  handleOpen: () => void;
}

export default function NavbarWhite({ handleOpen }: NavbarWhiteInterface) {
  const [isSticky, setIsSticky] = useState(false);

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
        isSticky ? "bg-[#0C7E4A] shadow-md" : "bg-transparent  py-[10px]"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-10 px-5">
          <NavLink to="/">
            <div className="relative flex items-center">
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
                className={`absolute transition-opacity duration-300 bg-white rounded-full p-1 md:p-2 h-[40px] md:h-[70px] w-auto ${
                  isSticky ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </NavLink>
          <div className="hidden md:flex items-center justify-end gap-[67px] font-semibold uppercase text-[#0C7E4A] text-[17px] leading-[24px] transition-all duration-300">
            <ul className="flex gap-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isSticky
                      ? isActive
                        ? "bg-white text-[#0C7E4A] relative rounded-md py-[10px] px-[20px]"
                        : "text-white hover:bg-white hover:text-[#0C7E4A] relative rounded-md py-[10px] px-[20px]"
                      : isActive
                      ? "bg-[#73C0571A] text-[#73C057] relative rounded-md py-[10px] px-[20px]"
                      : "hover:bg-[#73C0571A] hover:text-[#73C057] relative rounded-md py-[10px] px-[20px]"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/catalog"
                  className={({ isActive }) =>
                    isSticky
                      ? isActive
                        ? "bg-white text-[#0C7E4A] relative rounded-md py-[10px] px-[20px]"
                        : "text-white hover:bg-white hover:text-[#0C7E4A] relative rounded-md py-[10px] px-[20px]"
                      : isActive
                      ? "bg-[#73C0571A] text-[#73C057] relative rounded-md py-[10px] px-[20px]"
                      : "hover:bg-[#73C0571A] hover:text-[#73C057] relative rounded-md py-[10px] px-[20px]"
                  }
                >
                  Catalog
                </NavLink>
              </li>
              <li className="flex-none">
                <NavLink
                  to="/services"
                  end
                  className={({ isActive }) =>
                    isSticky
                      ? isActive
                        ? "bg-white text-[#0C7E4A] relative rounded-md py-[10px] px-[20px]"
                        : "text-white hover:bg-white hover:text-[#0C7E4A] relative rounded-md py-[10px] px-[20px]"
                      : isActive
                      ? "bg-[#73C0571A] text-[#73C057] relative rounded-md py-[10px] px-[20px]"
                      : "hover:bg-[#73C0571A] hover:text-[#73C057] relative rounded-md py-[10px] px-[20px]"
                  }
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/team"
                  className={({ isActive }) =>
                    isSticky
                      ? isActive
                        ? "bg-white text-[#0C7E4A] relative rounded-md py-[10px] px-[20px]"
                        : "text-white hover:bg-white hover:text-[#0C7E4A] relative rounded-md py-[10px] px-[20px]"
                      : isActive
                      ? "bg-[#73C0571A] text-[#73C057] relative rounded-md py-[10px] px-[20px]"
                      : "hover:bg-[#73C0571A] hover:text-[#73C057] relative rounded-md py-[10px] px-[20px]"
                  }
                >
                  Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isSticky
                      ? isActive
                        ? "bg-white text-[#0C7E4A] relative rounded-md py-[10px] px-[20px]"
                        : "text-white hover:bg-white hover:text-[#0C7E4A] relative rounded-md py-[10px] px-[20px]"
                      : isActive
                      ? "bg-[#73C0571A] text-[#73C057] relative rounded-md py-[10px] px-[20px]"
                      : "hover:bg-[#73C0571A] hover:text-[#73C057] relative rounded-md py-[10px] px-[20px]"
                  }
                >
                  Contact
                </NavLink>
              </li>
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
