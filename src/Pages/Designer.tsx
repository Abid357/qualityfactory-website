import Bottle from "../Components/Designer/Bottle/Bottle";
import Cap from "../Components/Designer/Cap/Cap";
import Recipe from "../Components/Designer/Recipe";

export default function Designer() {
document.addEventListener('touchmove', function(event) {
  event.preventDefault();
});
  return (
    <div className="w-[80%] my-50 mx-auto flex flex-col items-center">
      <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-15">
        Design your imagination<span className="text-[#0C7E4A]">.</span>
      </p>
      <Cap/>
      <Bottle />
      <p className="flex font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-15 mt-20">
        Build your recipe<span className="text-[#0C7E4A]">.</span>
      </p>
      <Recipe />
    </div>
  );
}
