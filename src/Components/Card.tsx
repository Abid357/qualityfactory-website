import React from "react";

interface CardProps {
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="relative bg-[#f8f4f4] rounded-lg shadow-[10px_10px_20px_rgba(0,0,0,0.15),-10px_-10px_10px_rgba(255,255,255,1)]">
      <div className="absolute shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.01)] inset-0 pointer-events-none h-full w-full"></div>
      <>{children}</>
    </div>
  );
};

export default Card;
