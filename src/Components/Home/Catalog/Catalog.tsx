import { Link } from "react-router";
import { useScrollToTop } from "../../ScrollToTop";
import Card from "../../Card";
import { MdMenuBook } from "react-icons/md";

export default function Catalog() {
  const scrollToTop = useScrollToTop();
  return (
    <>
      <p className="flex justify-center md:justify-start font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5">
        Explore our catalog<span className="text-[#0C7E4A]">.</span>
      </p>
      <div className="relative rounded-xl overflow-hidden">
        <img src="/Catalog/Catalog.png" alt="" />
        <div className="absolute top-2/5 left-1/4">
          <Link to="/catalog" onClick={() => scrollToTop("/catalog")}>
            <Card className="shadow-[6px_6px_12px_rgba(0,0,0,0.15),-5px_-5px_12px_rgba(255,255,255,0.5)]">
              <button className="flex justify-center items-center gap-3 font-bold text-white hover:text-[#0C7E4A] bg-[#0C7E4A] hover:bg-white transition-all duration-300 ease-in-out transform cursor-pointer active:scale-95 rounded-md px-4 py-2">
                <MdMenuBook className="text-xl"  />
                <p>Catalog</p>
              </button>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
