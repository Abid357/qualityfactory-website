import { Link } from "react-router";
import DesignImg from "/Design/Design.webp";
import Card from "../../Card";
import { IoIosColorPalette } from "react-icons/io";
import { useScrollToTop } from "../../ScrollToTop";

export default function Design() {
  const scrollToTop = useScrollToTop();
  return (
    <>
      <div className="flex flex-col items-center justify-end">
        <img src={DesignImg} alt="Design" loading="lazy" className="w-full" />
        <Link to="/design" onClick={() => scrollToTop("/design")} className="absolute 2xl:mb-30 lg:mb-15 md:mb-10 sm:mb-5 -mb-11 z-1">
          <Card className="shadow-[6px_6px_12px_rgba(0,0,0,0.25),-5px_-5px_12px_rgba(0,0,0,0)]">
            <button className="flex justify-center items-center gap-2 font-bold text-white hover:text-[#0C7E4A] bg-[#0C7E4A] hover:bg-white transition-all duration-300 ease-in-out transform cursor-pointer active:scale-95 rounded-md px-4 py-2">
              <IoIosColorPalette className="text-xl" />
              <p>Design Now!</p>
            </button>
          </Card>
        </Link>
      </div>
    </>
  );
}
