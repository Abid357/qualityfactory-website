import { useState, useEffect, useMemo } from "react";
import { Drawer } from "flowbite-react";
import { NavLink, Link, useLocation, useNavigate } from "react-router";
import { TiHome } from "react-icons/ti";
import { GrCatalog } from "react-icons/gr";
import { GrBusinessService } from "react-icons/gr";
import { MdContactEmergency } from "react-icons/md";
import logo from "/Logo/QualityLogo.svg";

export default function NavbarSmall({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);

  const navItems = useMemo(
    () => [
      { to: "/", label: "Home", type: "page", icon: <TiHome /> },
      { to: "/catalog", label: "Catalog", type: "page", icon: <GrCatalog /> },
      {
        to: "/#services",
        label: "Services",
        type: "section",
        icon: <GrBusinessService />,
      },
      {
        to: "/#contact",
        label: "Contact",
        type: "section",
        icon: <MdContactEmergency />,
      },
    ],
    []
  );

  const drawerTheme = {
    root: {
      base: "fixed z-40 overflow-y-auto bg-[#f8f4f4] p-4 transition-transform",
      backdrop: "fixed inset-0 z-30 bg-gray-900/50",
      edge: "bottom-16",
      position: {
        top: {
          on: "left-0 right-0 top-0 w-full transform-none",
          off: "left-0 right-0 top-0 w-full -translate-y-full",
        },
        right: {
          on: "right-0 top-0 h-screen w-80 transform-none",
          off: "right-0 top-0 h-screen w-80 translate-x-full",
        },
        bottom: {
          on: "bottom-0 left-0 right-0 w-full transform-none",
          off: "bottom-0 left-0 right-0 w-full translate-y-full",
        },
        left: {
          on: "left-0 top-0 h-screen w-80 transform-none",
          off: "left-0 top-0 h-screen w-80 -translate-x-full",
        },
      },
    },
    header: {
      inner: {
        closeButton:
          "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900",
        closeIcon: "h-4 w-4",
        titleIcon: "me-2.5 h-4 w-4",
        titleText:
          "mb-4 inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400",
      },
      collapsed: {
        on: "hidden",
        off: "block",
      },
    },
    items: {
      base: "",
    },
  };

  const scrollToTop = (path: string) => {
    // If already on target path, just scroll to top
    if (location.pathname === path) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 300);
    } else {
      // If not on target path, navigate and then scroll to top
      navigate(path);
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 300);
    }
  };

  const scrollToSection = (to: string) => {
    handleClose(); // Close Drawer

    if (to.includes("#")) {
      const sectionId = to.split("#")[1];

      // Check if we need to navigate first
      const basePath = to.split("#")[0] || "/";

      if (location.pathname !== basePath) {
        // Navigate to base page first
        navigate(basePath);

        // Then scroll to section after drawer close
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            scrollToSectionHelper(section, sectionId);
          }
        }, 300);
      } else {
        // Already on correct page, just scroll to section after drawer closes
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            scrollToSectionHelper(section, sectionId);
          }
        }, 300);
      }
    }
  };

  const scrollToSectionHelper = (section: HTMLElement, sectionId: string) => {
    // Get navbar height for offset
    const navbar = document.querySelector(".primary-navbar");
    const navbarHeight = navbar ? navbar.clientHeight : 60;

    // Calculate the scroll position with offset
    const offsetTop = section.offsetTop - navbarHeight - 20;

    // Scroll to the section
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    setActiveSection(sectionId);
  };

  // Check if a section link is active
  const isSectionActive = (to: string): boolean => {
    if (!to.includes("#")) return false;
    const sectionId = to.split("#")[1];
    return sectionId === activeSection;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Track section visibility
    if (location.pathname === "/") {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Get the section ID
            const sectionId = entry.target.id;

            // Find if there is a nav item for this section
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
        sectionObserver.disconnect();
      };
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, location.pathname, activeSection, navItems]);

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

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        theme={drawerTheme}
      >
        <Drawer.Header titleIcon={() => <></>} />
        <div className="mb-5">
          <NavLink to="/" onClick={() => scrollToTop("/")}>
            <img
              src={logo}
              alt="logo"
              className="flex justify-center w-full h-[80px]"
            />
          </NavLink>
        </div>
        <Drawer.Items>
          <div className="grid grid-cols-1 gap-4">
            <div className="font-semibold uppercase text-[#0a0a0a] text-[17px] transition-all duration-300 ">
              <ul className="flex flex-col text-[#0C7E4A] pt-5 gap-5">
                {navItems.map((item) => (
                  <li className="flex" key={item.to}>
                    {item.type === "page" ? (
                      item.to === "/" ? (
                        <NavLink
                          to={item.to}
                          onClick={() => {
                            scrollToTop("/");
                            handleClose();
                          }}
                          className={({ isActive }) =>
                            isActive && !activeSection && isAtTop
                              ? "flex-grow bg-[#73C0571A] text-[#73C057] rounded-md py-[5px] pl-3"
                              : "flex-grow hover:bg-[#73C0571A] hover:text-[#73C057] rounded-md py-[5px] pl-3"
                          }
                        >
                          <div className="flex items-center gap-5">
                            <p className="text-xl">{item.icon}</p>
                            <p>{item.label}</p>
                          </div>
                        </NavLink>
                      ) : (
                        <NavLink
                          to={item.to}
                          onClick={() => {
                            scrollToTop(item.to);
                            handleClose();
                          }}
                          className={({ isActive }) =>
                            isActive
                              ? "flex-grow bg-[#73C0571A] text-[#73C057] rounded-md py-[5px] pl-3"
                              : "flex-grow hover:bg-[#73C0571A] hover:text-[#73C057] rounded-md py-[5px] pl-3"
                          }
                        >
                          <div className="flex items-center gap-5">
                            <p className="text-xl">{item.icon}</p>
                            <p>{item.label}</p>
                          </div>
                        </NavLink>
                      )
                    ) : (
                      <Link
                        to={item.to}
                        onClick={() => scrollToSection(item.to)}
                        className={
                          isSectionActive(item.to)
                            ? "flex-grow bg-[#73C0571A] text-[#73C057] rounded-md py-[5px] pl-3"
                            : "flex-grow hover:bg-[#73C0571A] hover:text-[#73C057] rounded-md py-[5px] pl-3"
                        }
                      >
                        <div className="flex items-center gap-5">
                          <p className="text-xl">{item.icon}</p>
                          <p>{item.label}</p>
                        </div>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
