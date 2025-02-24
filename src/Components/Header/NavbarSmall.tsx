import { useEffect } from "react";
import { Drawer } from "flowbite-react";
import { Link } from "react-router";
import logo from "/logo/QualityLogo.svg";

interface NavbarSmallInterface {
  isOpen: boolean;
  handleClose: () => void;
}

export default function NavbarSmall({
  isOpen,
  handleClose,
}: NavbarSmallInterface) {
  const drawerTheme = {
    root: {
      base: "fixed z-40 overflow-y-auto bg-white p-4 transition-transform",
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
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="h-[50px] w-auto"
            />
          </Link>
        </div>
        <Drawer.Items>
          <div className="grid grid-cols-1 gap-4">
            <div className="font-semibold uppercase text-[#0a0a0a] text-[17px] transition-all duration-300 ">
              <ul className="flex flex-col gap-1">
                <li className="flex hover:text-[#0C7E4A] border-b py-[10px]">
                  <Link to="/" className="flex-grow cursor-pointer">
                    Home
                  </Link>
                </li>
                <li className="flex hover:text-[#0C7E4A] border-b py-[10px]">
                  <Link to="/catalog" className="flex-grow cursor-pointer">
                    Catalog
                  </Link>
                </li>
                <li className="flex items-center justify-between hover:text-[#0C7E4A] border-b py-[10px]">
                  <Link to="/services" className="flex-grow cursor-pointer">
                    Services
                  </Link>
                </li>
                <li className="flex hover:text-[#0C7E4A] border-b py-[10px]">
                  <Link to="/team" className="flex-grow cursor-pointer">
                    Team
                  </Link>
                </li>
                <li className="flex hover:text-[#0C7E4A] border-b py-[10px]">
                  <Link to="/contact" className="flex-grow cursor-pointer">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
