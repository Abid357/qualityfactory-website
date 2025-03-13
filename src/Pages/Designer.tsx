import Bottle from "../Components/Designer/Bottle";
import Cap from "../Components/Designer/Cap/Cap";

export default function Designer() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Cap/>
      <Bottle />
    </div>
  );
}
