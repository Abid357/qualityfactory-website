import { useEffect } from "react";
import { Drawer } from "flowbite-react";
import { NavLink, Link } from "react-router";
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
  const navItems = [
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
  ];

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

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

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
          <NavLink to="/">
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
                      <NavLink
                        to={item.to}
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
                    ) : (
                      <Link
                        to={item.to}
                        className={
                          "flex-grow hover:bg-[#73C0571A] hover:text-[#73C057] rounded-md py-[5px] pl-3"
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
