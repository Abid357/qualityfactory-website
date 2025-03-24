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

  // Extract shadow-* classes from className
  const shadowMatch = className.match(/shadow-[^\s]*/);

  // Remove rounded and shadow classes from className
  const otherClasses = className
    .replace(/rounded-[^\s]*\s*/g, "")
    .replace(/shadow-[^\s]*\s*/g, "")
    .trim();

  // Use passed shadow if available, otherwise use default
  const shadowClass = shadowMatch 
    ? shadowMatch[0] 
    : "shadow-[6px_6px_12px_rgba(0,0,0,0.15),-5px_-5px_12px_rgba(255,255,255,1)]";
  return (
    <div
      className={`relative bg-[#f8f4f4] ${roundedClass} ${shadowClass} ${otherClasses}`}
    >
      <div className="absolute shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.01)] inset-0 pointer-events-none h-full w-full"></div>
      <>{children}</>
    </div>
  );
};

export default Card;
