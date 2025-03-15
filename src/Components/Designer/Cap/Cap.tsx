import { useEffect, useState } from "react";
import Arrow from "../Arrow"
import Caps from "./Caps.json"

export default function Cap({capsIndex, setCapsIndex}: {capsIndex: number, setCapsIndex: (index: number) => void}) {
    const [animating, setAnimating] = useState(false);
    const [animation, setAnimation] = useState({});

    const slideCap = (direction = "next", newIndex: number) => {
        if (animating) return;
        setAnimating(true);

        // Step 1: Fade Out Animation
        const translation = direction === "next" ? 75 : -75;
        setAnimation({
            transform: `translateX(${translation}px)`,
            opacity: 0,
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
            backgroundColor: Caps[capsIndex].color, // Keep the current color until fully faded out
        });

        setTimeout(() => {
            // Step 2: Change Index (AFTER fade out completes)
            setCapsIndex(newIndex);

            // Step 3: Change Color BEFORE fade-in
            setAnimation(() => ({
                opacity: 0,
                transform: `translateX(${translation * -1}px)`,
                backgroundColor: Caps[newIndex].color, // Change color first
            }));

            setTimeout(() => {
                // Step 4: Fade In Animation
                setAnimation({
                    transform: "translateX(0)",
                    opacity: 1,
                    transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
                    backgroundColor: Caps[newIndex].color, // Ensure correct color stays
                });
                setAnimating(false);
            }, 20); // Small delay before fading in
        }, 500); // Fade out duration (matches transition duration)
    };

    const nextCap = () => slideCap("next", (capsIndex + 1) % Caps.length);
    const prevCap = () => slideCap("prev", (capsIndex - 1) < 0 ? Caps.length - 1 : capsIndex - 1);

    useEffect(() => {
        nextCap();
    }, []);

    return (
        <>
            <div className="flex flex-row justify-center">
                <Arrow margins={"md:mr-[100px] mr-[65px]"} onClick={prevCap} />
                <div className="flex flex-row justify-between w-8 h-6 mt-1 rounded-[4px] relative" style={animation}>
                    <div className="bg-white w-[5%] opacity-[30%]" />
                    <div className="bg-white w-[5%] opacity-[30%]" />
                    <div className="bg-white w-[5%] opacity-[30%]" />
                    <div className="bg-white w-[5%] opacity-[30%]" />
                    <div className="bg-white w-[5%] opacity-[30%]" />
                    <div className="bg-white w-[5%] opacity-[30%]" />
                    <div className="bg-white w-[5%] opacity-[30%]" />
                    <div className="bg-white w-[5%] opacity-[30%]" />
                    <div className="bg-white w-[5%] opacity-[30%]" />
                    <div className="bg-white w-[5%] opacity-[30%]" />
                    <div className="bg-white w-[5%] opacity-[30%]" />
                </div>
                <Arrow isRight={true} margins={"md:ml-[100px] ml-[65px]"} onClick={nextCap} />
            </div>
        </>
    )
}
