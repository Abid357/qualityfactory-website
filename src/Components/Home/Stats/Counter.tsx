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
        enableScrollSpy={true}
        scrollSpyOnce={true}
        className="font-bold text-3xl md:text-6xl"
      />
    </div>
  );
}
