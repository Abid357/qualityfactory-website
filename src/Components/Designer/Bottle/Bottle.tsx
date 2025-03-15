import { useEffect, useState } from "react";
import Arrow from "../Arrow";
import Volumes from "./Volumes.json";

export default function Bottle({ waveColor, setWaveColor, volumesIndex, setVolumesIndex }: {
    waveColor: string; setWaveColor: (color: string) => void; volumesIndex: number; setVolumesIndex: (index: number) => void;
}) {
    const [animationKey, setAnimationKey] = useState(0); // Changes to restart fill animation
    const [animating, setAnimating] = useState(false);
    const [animation, setAnimation] = useState({});

    // Function to update color & restart fill animation
    const changeColor = (e) => {
        setWaveColor(e.target.value);
        setAnimationKey(prevKey => prevKey + 1); // Change key to restart fill animation
    };

    const slideVolume = (direction = "next", newIndex: number) => {
        if (animating) return;
        setAnimating(true);

        // Step 1: Fade Out Animation
        const translation = direction === "next" ? 75 : -75;
        setAnimation({
            transform: `translateX(${translation}px)`,
            opacity: 0,
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
        });

        setTimeout(() => {
            // Step 2: Change Index (AFTER fade out completes)
            setVolumesIndex(newIndex);

            // Step 3: Change Volume BEFORE fade-in
            setAnimation(() => ({
                opacity: 0,
                transform: `translateX(${translation * -1}px)`,
            }));

            setTimeout(() => {
                // Step 4: Fade In Animation
                setAnimation({
                    transform: "translateX(0)",
                    opacity: 0.8,
                    transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
                });
                setAnimating(false);
            }, 20); // Small delay before fading in
        }, 500); // Fade out duration (matches transition duration)
    };

    const nextVolume = () => slideVolume("next", (volumesIndex + 1) % Volumes.length);
    const prevVolume = () => slideVolume("prev", (volumesIndex - 1) < 0 ? Volumes.length - 1 : volumesIndex - 1);

    useEffect(() => {
        nextVolume();
    }, []);

    return (
        <>
            <div className="flex flex-row justify-even items-center">
                <Arrow margins={"md:mr-[50px] mr-[15px] top-5"} onClick={prevVolume}/>
                <div className="relative flex flex-col items-center">
                    <div className="w-32 h-16 bg-gray-200 border-[10px] border-gray-200 border-t rounded-t-[100%]" />
                    <div
                        className="w-32 h-64 rounded-b-[40px] shadow-inner relative overflow-hidden border-gray-200 border-[5px]"
                        style={{ backgroundColor: waveColor }}
                        key={animationKey}
                    >
                        <div className="absolute w-[200%] h-[105%] bg-gray-200 left-[-50%] rounded-[40%] animate-wave animate-fill" />
                        <input type="color"
                            className="w-full h-full"
                            id="hs-color-input"
                            value={waveColor}
                            onChange={changeColor}
                            title="Choose your color" />
                    </div>
                    <div style={animation} className="flex flex-row text-lg italic justify-center items-center w-[92%] h-20 bg-white absolute z-1 bottom-25 opacity-[80%] rounded-[5%]">
                        <div>{Volumes[volumesIndex]}</div>
                    </div>
                </div>
                <Arrow isRight={true} margins={"md:ml-[50px] ml-[15px] top-5"} onClick={nextVolume} />
            </div>
            <p className="flex text-sm lg:text-md xl:text-lg italic whitespace-nowrap text-gray-500 mt-2">
                Click on the bottle to change the color
            </p>
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
