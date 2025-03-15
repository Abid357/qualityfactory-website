import Bottle from "../Components/Designer/Bottle/Bottle";
import Cap from "../Components/Designer/Cap/Cap";
import Recipe from "../Components/Designer/Recipe";
import Share from "../Components/Designer/Share";

export default function Designer() {
  return (
    <div className="w-[80%] my-30 md:my-50 mx-auto flex flex-col items-center">
      <p className="font-bold text-3xl lg:text-4xl xl:text-5xl mb-15 text-center">
        Design your imagination<span className="text-[#0C7E4A]">.</span>
      </p>
      <Cap/>
      <Bottle />
      <p className="font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-10 mt-20">
        Build your recipe<span className="text-[#0C7E4A]">.</span>
      </p>
      <Recipe />
      <p className="flex hidden md:block text-sm lg:text-md xl:text-lg italic whitespace-nowrap text-gray-500 mt-2">
          Drag to change the order of the items
      </p>
      <p className="font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-10 mt-20">
        Share on WhatsApp<span className="text-[#0C7E4A]">.</span>
      </p>
      <Share />
    </div>
  );
}
