import { useState, useEffect, useMemo } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router";
import { IoMenu } from "react-icons/io5";
import logo from "/Logo/QualityLogo.svg";
import logoMini from "/Logo/Quality_miniNav.svg";

export default function Navbar({ handleOpen }: { handleOpen: () => void }) {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);

  const navItems = useMemo(
    () => [
      { to: "/", label: "Home", type: "page" },
      { to: "/catalog", label: "Catalog", type: "page" },
      { to: "/#services", label: "Services", type: "section" },
      { to: "/#contact", label: "Contact", type: "section" },
    ],
    []
  );

  const scrollToTop = (path: string) => {
    // If already on target path, just scroll to top
    if (location.pathname === path) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // If not on target path, navigate and then scroll to top
      navigate(path);
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
      }, 100);
    }
  };

  const scrollToSection = (to: string) => {
    // Extract the section ID from the hash
    if (to.includes("#")) {
      const sectionId = to.split("#")[1];

      // Check if need to navigate first
      const basePath = to.split("#")[0] || "/";

      if (location.pathname !== basePath) {
        // Navigate to base page first
        navigate(basePath);

        // Then scroll to section
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            scrollToSectionHelper(section, sectionId);
          }
        }, 100);
      } else {
        // Already on correct page, just scroll to section
        const section = document.getElementById(sectionId);
        if (section) {
          scrollToSectionHelper(section, sectionId);
        }
      }
    }
  };

  const scrollToSectionHelper = (section: HTMLElement, sectionId: string) => {
    // Get navbar height for offset
    const navbar = document.querySelector(".primary-navbar");
    const navbarHeight = navbar ? navbar.clientHeight : 80;

    // Calculate the scroll position with offset
    const offsetTop = section.offsetTop - navbarHeight - 20;

    // Scroll to the section
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    // Update active section
    setActiveSection(sectionId);
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
          // Virtual "viewport" in the middle 60% of the screen
          threshold: 0.1, // Detect even 10% of section is in the viewport
          rootMargin: "-20% 0px -20% 0px", // 60% vertical viewport in the middle
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

  useEffect(() => {
    if (location.pathname === "/") {
      const checkIfAtTop = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setIsAtTop(scrollTop < 500); // Consider "top" to be first 500px
      };

      // Initial Check
      checkIfAtTop();

      // Add scroll event listener
      window.addEventListener("scroll", checkIfAtTop);

      // Cleanup
      return () => {
        window.removeEventListener("scroll", checkIfAtTop);
      };
    } else {
      // If not on home page, don't track scroll
      setIsAtTop(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Reset activeSection when user navigates to a different page
    if (!location.pathname.startsWith("/#")) {
      setActiveSection(null);
    }
  }, [location.pathname]);

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
          <NavLink to="/" onClick={() => scrollToTop("/")}>
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
                        onClick={() => scrollToTop("/")}
                        className={({ isActive }) =>
                          isSticky
                            ? isActive && !activeSection && isAtTop
                              ? "bg-white text-[#0C7E4A] rounded-md py-[10px] px-[20px]"
                              : "text-white hover:bg-white hover:text-[#0C7E4A] rounded-md py-[10px] px-[20px]"
                            : isActive && !activeSection && isAtTop
                            ? "bg-[#73C0571A] text-[#73C057] rounded-md py-[10px] px-[20px]"
                            : "hover:bg-[#73C0571A] hover:text-[#73C057] rounded-md py-[10px] px-[20px]"
                        }
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <NavLink
                        to={item.to}
                        onClick={() => scrollToTop(item.to)}
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
