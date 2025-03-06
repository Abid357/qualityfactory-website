import CountUp from "react-countup";

export default function Counter({
  number,
  suffix,
}: {
  number: number;
  suffix: string;
}) {
  return (
    <div className="number">
      <CountUp
        duration={3}
        end={number}
        suffix={suffix}
        className="font-bold text-xl md:text-6xl"
      />
    </div>
  );
}
