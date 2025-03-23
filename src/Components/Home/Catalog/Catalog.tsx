import { Link } from "react-router";
import { GrCatalog } from "react-icons/gr";
import { useScrollToTop } from "../../ScrollToTop";
import Card from "../../Card";

export default function Catalog() {
  const scrollToTop = useScrollToTop();
  return (
    <>
      <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-5">
        Explore our catalog<span className="text-[#0C7E4A]">.</span>
      </p>
      <div className="relative rounded-xl overflow-hidden mb-5">
        <img src="/Catalog/Catalog.png" alt="" />
        <div className="absolute top-2/5 left-1/4">
          <Link to="/catalog" onClick={() => scrollToTop("/catalog")}>
            <Card className="shadow-[6px_6px_12px_rgba(0,0,0,0.15),-5px_-5px_12px_rgba(255,255,255,0.5)]">
              <button className="flex justify-center items-center gap-3 font-bold text-2xl text-[#0C7E4A] hover:text-white bg-white hover:bg-[#0C7E4A] transition-all duration-300 ease-in-out transform cursor-pointer active:scale-95 rounded-md px-4 py-2">
                <p className="text-3xl">
                  <GrCatalog />
                </p>
                <p>Catalog</p>
              </button>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
}
