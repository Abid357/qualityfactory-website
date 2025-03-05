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
        className="font-bold text-lg lg:text-xl xl:text-4xl text-[#0C7E4A]"
      />
    </div>
  );
}
