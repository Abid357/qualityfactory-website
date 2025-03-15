const Card = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  // Extract any rounded-* classes from the className
  const roundedMatch = className.match(/rounded-[^\s]*/);
  const roundedClass = roundedMatch ? roundedMatch[0] : "rounded-lg";

  // Remove the rounded class from className to avoid duplication
  const otherClasses = className.replace(/rounded-[^\s]*\s*/, "").trim();
  return (
    <div
      className={`relative bg-[#f8f4f4] ${roundedClass} shadow-[6px_6px_12px_rgba(0,0,0,0.15),-5px_-5px_12px_rgba(255,255,255,1)] ${otherClasses}`}
    >
      <div className="absolute shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.01)] inset-0 pointer-events-none h-full w-full"></div>
      <>{children}</>
    </div>
  );
};

export default Card;
