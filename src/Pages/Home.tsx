import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Certifications from "../Components/Home/Certifications/Certifications";
import Services from "../Components/Home/Services/Services";
import Stats from "../Components/Home/Stats/Stats";
import OpeningHours from "../Components/Home/OpeningHours/OpeningHours";
import Customers from "../Components/Home/Customers/Customers";
import Contact from "../Components/Home/Contact/Contact";

export default function Home() {
  const location = useLocation();
  const [navbarHeight, setNavbarHeight] = useState(80);

  const sections = [
    { id: "certifications", Component: Certifications },
    { id: "services", Component: Services },
    { id: "stats", Component: Stats },
    { id: "openingHours", Component: OpeningHours },
    { id: "customers", Component: Customers },
    { id: "contact", Component: Contact },
  ];

  useEffect(() => {
    // Get actual navbar height
    const updateNavHeight = () => {
      const navbar = document.querySelector(".primary-navbar");
      if (navbar) {
        setNavbarHeight(navbar.clientHeight);
      }
    };

    // Update on load and resize
    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);

    // Apply scroll-margin-top to all sections
    const sections = document.querySelectorAll("div[id]");
    sections.forEach((section) => {
      (section as HTMLElement).style.scrollMarginTop = `${navbarHeight + 20}px`;
    });

    const hash = location.hash;

    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Short delay to ensure styles are applied
    } else if (location.state && location.state.scrollToTop) {
      // Scroll to top if requested via navigation state
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return () => {
      window.removeEventListener("resize", updateNavHeight);
    };
  }, [location.hash, navbarHeight, location.state]);

  return (
    <>
      <div className="w-full h-screen relative overflow-hidden">
        <div className="hidden md:block absolute h-[40px] w-full bg-gradient-to-r from-[#f5f7f7] to-[#c6c9c4]"></div>
        <div className="hidden md:block absolute h-[200px] left-0 w-full h-32 bg-gradient-to-t to-[#EDEBE8] from-transparent"></div>
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover md:mt-10"
        >
          <source src="/landing-page.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-0 left-0 w-full md:h-32 h-8 bg-gradient-to-t from-[#EDEBE8] to-transparent"></div>
      </div>
      <div className="left-0 w-full md:h-32 h-8 bg-gradient-to-t to-[#EDEBE8] from-transparent"></div>
      <div className="flex flex-col gap-40 w-[80%] my-20 mx-auto">
        {sections.map(({ id, Component }) => (
          <div key={id} id={id}>
            <Component />
          </div>
        ))}
      </div>
    </>
  );
}
