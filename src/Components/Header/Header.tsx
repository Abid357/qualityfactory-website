import { useState } from "react";
import Navbar from "./Navbar";
import NavbarSmall from "./NavbarSmall";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="absolute w-full z-[999]">
      <header className="relative">
        <Navbar handleOpen={handleOpen} />
        <NavbarSmall isOpen={isOpen} handleClose={handleClose} />
      </header>
    </div>
  );
}
