import Bottle from "../Components/Designer/Bottle/Bottle";
import Cap from "../Components/Designer/Cap/Cap";
import Recipe from "../Components/Designer/Recipe/Recipe";

export default function Designer() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Cap/>
      <Bottle />
      <Recipe />
    </div>
  );
}
