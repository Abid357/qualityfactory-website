import { useState } from "react";
import Arrow from "./Arrow";

export default function Bottle() {
    const [waveColor, setWaveColor] = useState("#f4a404"); // Default color
    const [animationKey, setAnimationKey] = useState(0); // Changes to restart fill animation

    // Function to update color & restart fill animation
    const handleColorChange = (e) => {
        setWaveColor(e.target.value);
        setAnimationKey(prevKey => prevKey + 1); // Change key to restart fill animation
    };

    return (
        <>
            <div className="flex flex-row justify-even items-center">
                <Arrow margins={"md:mr-[50px] mr-[15px]"} />
                <div className="relative flex flex-col items-center">
                    <div className="w-32 h-12 bg-gray-200 border-[10px] border-gray-200 border-t rounded-t-[100%]" />
                    <div
                        className="w-32 h-64 rounded-b-[40px] shadow-inner relative overflow-hidden border-gray-200 border-[5px]"
                        style={{ backgroundColor: waveColor }}
                        key={animationKey}
                    >
                        <div className="absolute w-[200%] h-[110%] bg-gray-200 left-[-50%] rounded-[40%] animate-wave animate-fill" />

                        <input type="color"
                            className="w-full h-full"
                            id="hs-color-input"
                            value={waveColor}
                            onChange={handleColorChange}
                            title="Choose your color" />
                    </div>
                </div>
                <Arrow isRight={true} margins={"md:ml-[50px] ml-[15px]"} />
            </div>
            <style>
                {`
              @keyframes wave {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
                @keyframes fill {
                    0% {
                        top: -10%;
                    }
                    100% {
                        top: -90%;
                    }
                }
              .animate-wave {
                animation: wave 10s infinite linear, fill 2s ease-in-out forwards;
              }
                input[type="color"] {
                    border: none;
                }
                input[type="color"]::-moz-color-swatch {
                    border: none;
                }
                input[type="color"]::-webkit-color-swatch {
                    border: none;
                }
            `}
            </style>
        </>
    );
}
