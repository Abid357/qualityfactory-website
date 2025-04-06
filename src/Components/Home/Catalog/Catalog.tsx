import { Link } from "react-router";
import { useScrollToTop } from "../../ScrollToTop";
import Card from "../../Card";
import { MdMenuBook } from "react-icons/md";

export default function Catalog() {
  const scrollToTop = useScrollToTop();
  return (
    <>
      {/* Small screen layout */}
      <div className="md:hidden">
        <p className="flex justify-center font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5">
          Explore our catalog<span className="text-[#0C7E4A]">.</span>
        </p>
        <div className="relative flex flex-col justify-center items-center -mx-[calc((100vw-100%)/2)] w-screen">
          <img src="/Catalog/Catalog.webp" alt="" className="w-full mb-5" />
          <Link to="/catalog" onClick={() => scrollToTop("/catalog")}>
            <Card className="shadow-[6px_6px_12px_rgba(0,0,0,0.15),-5px_-5px_12px_rgba(255,255,255,0.5)]">
              <button className="flex justify-center items-center gap-3 font-bold text-white hover:text-[#0C7E4A] bg-[#0C7E4A] hover:bg-white transition-all duration-300 ease-in-out transform cursor-pointer active:scale-95 rounded-md px-4 py-2">
                <MdMenuBook className="text-xl" />
                <p>Explore</p>
              </button>
            </Card>
          </Link>
        </div>
      </div>

      {/* Medium screen layout */}
      <div className="hidden md:block">
        <p className="flex justify-start font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5">
          Explore our catalog<span className="text-[#0C7E4A]">.</span>
        </p>
        <div className="relative flex justify-center -mx-[calc((100vw-100%)/2)] w-screen">
          <img src="/Catalog/Catalog.webp" alt="" className="w-full" />
          <div className="absolute top-1/4 left-1/4">
            <Link to="/catalog" onClick={() => scrollToTop("/catalog")}>
              <Card className="shadow-[6px_6px_12px_rgba(0,0,0,0.15),-5px_-5px_12px_rgba(255,255,255,0.5)]">
                <button className="flex justify-center items-center gap-3 font-bold text-white hover:text-[#0C7E4A] bg-[#0C7E4A] hover:bg-white transition-all duration-300 ease-in-out transform cursor-pointer active:scale-95 rounded-md px-4 py-2">
                  <MdMenuBook className="text-xl" />
                  <p>Explore</p>
                </button>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
