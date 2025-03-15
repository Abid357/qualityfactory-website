import { useState } from "react";
import Bottle from "../Components/Designer/Bottle/Bottle";
import Cap from "../Components/Designer/Cap/Cap";
import Recipe from "../Components/Designer/Recipe";
import Share from "../Components/Designer/Share";

export type CardType = {
  ingredient: string;
  amount: number;
  unit: string;
  id: string;
};

const DEFAULT_ITEMS = [
  { ingredient: "Sugar", "amount": 750, "unit": "g", id: "1" },
  { ingredient: "Ascorbic Acid", "amount": 605, "unit": "mg", id: "2" },
  { ingredient: "Orange Flavor", "amount": 11.2, "unit": "g", id: "3" },
];

export default function Designer() {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [capsIndex, setCapsIndex] = useState(0);
  const [waveColor, setWaveColor] = useState("#f4a404");
  const [volumesIndex, setVolumesIndex] = useState(0);

  return (
    <div className="w-[80%] my-30 md:my-50 mx-auto flex flex-col items-center">
      <p className="font-bold text-3xl lg:text-4xl xl:text-5xl mb-15 text-center">
        Design your imagination<span className="text-[#0C7E4A]">.</span>
      </p>
      <Cap capsIndex={capsIndex} setCapsIndex={setCapsIndex}/>
      <Bottle waveColor={waveColor} setWaveColor={setWaveColor} volumesIndex={volumesIndex} setVolumesIndex={setVolumesIndex} />
      <p className="font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-10 mt-20">
        Build your recipe<span className="text-[#0C7E4A]">.</span>
      </p>
      <Recipe cards={items} setCards={setItems} />
      <p className="flex hidden md:block text-sm lg:text-md xl:text-lg italic whitespace-nowrap text-gray-500 mt-2">
          Drag to change the order of the items
      </p>
      <p className="font-bold text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap mb-10 mt-20">
        Share on WhatsApp<span className="text-[#0C7E4A]">.</span>
      </p>
      <Share items={items} capsIndex={capsIndex} volumesIndex={volumesIndex} waveColor={waveColor}/>
    </div>
  );
}
