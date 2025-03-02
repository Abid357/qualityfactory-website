import { useState, useEffect, useMemo } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { IoMenu } from "react-icons/io5";
import logo from "/Logo/QualityLogo.svg";
import logoMini from "/Logo/Quality_miniNav.svg";

export default function Navbar({ handleOpen }: { handleOpen: () => void }) {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navItems = useMemo(
    () => [
      { to: "/", label: "Home", type: "page" },
      { to: "/catalog", label: "Catalog", type: "page" },
      { to: "/#services", label: "Services", type: "section" },
      { to: "/#contact", label: "Contact", type: "section" },
    ],
    []
  );

  const scrollToTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollToSection = (to: string) => {
    // Extract the section ID from the hash
    if (to.includes("#")) {
      const sectionId = to.split("#")[1];
      const section = document.getElementById(sectionId);

      if (section) {
        // Get navbar height for offset
        const navbar = document.querySelector(".primary-navbar");
        const navbarHeight = navbar ? navbar.clientHeight : 80;

        // Calculate the scroll position with offset
        const offsetTop = section.offsetTop - navbarHeight - 20; // 20px extra padding

        // Scroll to the section
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Update active section
        setActiveSection(sectionId);
      }
    }
  };

  useEffect(() => {
    // Handle sticky navbar
    const primaryNavbar = document.querySelector(".primary-navbar");
    const scrollWatcher = document.createElement("div");

    scrollWatcher.setAttribute("data-scroll-watcher", "");
    primaryNavbar?.before(scrollWatcher);

    const navObserver = new IntersectionObserver((entries) => {
      setIsSticky(!entries[0].isIntersecting);
    });

    navObserver.observe(scrollWatcher);

    // Track section visibility
    if (location.pathname === "/") {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Get the section ID
            const sectionId = entry.target.id;

            // Find if we have a nav item for this section
            const matchingNavItem = navItems.find(
              (item) => item.type === "section" && item.to === `/#${sectionId}`
            );

            if (matchingNavItem) {
              if (entry.isIntersecting) {
                // Section is visible, highlight nav item
                setActiveSection(sectionId);
              } else if (activeSection === sectionId) {
                // Section left the viewport, clear if it was active
                setActiveSection(null);
              }
            }
          });
        },
        {
          // Use smaller threshold for "active" detection
          threshold: 0.05,
          // Adjust rootMargin to account for navbar height
          rootMargin: "-60px 0px -10px 0px",
        }
      );

      // Only observe sections that match nav items
      const sectionIds = navItems
        .filter((item) => item.type === "section")
        .map((item) => item.to.split("#")[1]);

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          sectionObserver.observe(section);
        }
      });

      return () => {
        navObserver.disconnect();
        sectionObserver.disconnect();
      };
    }

    return () => {
      navObserver.disconnect();
    };
  }, [location.pathname, activeSection, navItems]);

  // Check if a section link is active
  const isSectionActive = (to: string): boolean => {
    if (!to.includes("#")) return false;
    const sectionId = to.split("#")[1];
    return sectionId === activeSection;
  };

  return (
    <div
      className={`primary-navbar fixed top-0 left-0 transition-all duration-300 ease-in-out w-full ${
        isSticky ? "bg-[#0C7E4A] shadow-md" : "bg-transparent pt-[5px]"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-10 px-5">
          <NavLink to="/" onClick={scrollToTop}>
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
                  {item.type === "page" ? (
                    item.to === "/" ? (
                      <NavLink
                        to={item.to}
                        onClick={scrollToTop}
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
                    ) : (
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
                    )
                  ) : (
                    <Link
                      to={item.to}
                      onClick={() => scrollToSection(item.to)}
                      className={
                        isSticky
                          ? isSectionActive(item.to)
                            ? "bg-white text-[#0C7E4A] rounded-md py-[10px] px-[20px]"
                            : "text-white hover:bg-white hover:text-[#0C7E4A] rounded-md py-[10px] px-[20px]"
                          : isSectionActive(item.to)
                          ? "bg-[#73C0571A] text-[#73C057] rounded-md py-[10px] px-[20px]"
                          : "hover:bg-[#73C0571A] hover:text-[#73C057] rounded-md py-[10px] px-[20px]"
                      }
                    >
                      {item.label}
                    </Link>
                  )}
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
