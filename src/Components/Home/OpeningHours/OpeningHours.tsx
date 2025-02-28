import { useEffect, useState } from "react";
import Card from "../../Card";

export default function OpeningHours() {
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Days data: Monday = 0, Sunday = 6
  const daysData = [
    { day: "Mon", hours: "8am - 8pm", isWorkingDay: true },
    { day: "Tue", hours: "8am - 8pm", isWorkingDay: true },
    { day: "Wed", hours: "8am - 8pm", isWorkingDay: true },
    { day: "Thu", hours: "8am - 8pm", isWorkingDay: true },
    { day: "Fri", hours: "Closed", isWorkingDay: false },
    { day: "Sat", hours: "8am - 8pm", isWorkingDay: true },
    { day: "Sun", hours: "8am - 8pm", isWorkingDay: true },
  ];

  useEffect(() => {
    // Check if currently open based on Dubai time
    const checkOpenStatus = () => {
      // Date object for Dubai time (UTC+4)
      const dubaiTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dubai",
      });
      const dubaiDate = new Date(dubaiTime);
      const jsDay = dubaiDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
      const day = jsDay === 0 ? 6 : jsDay - 1; // Convert to 0 = Mon, ..., 6 = Sun
      setCurrentDay(day);
      const hours = dubaiDate.getHours();

      // Check if working day and within business hours
      const isWorkingDay = daysData[day].isWorkingDay;
      const isBusinessHours = hours >= 8 && hours < 20; // 8am to 8pm

      setIsOpen(isWorkingDay && isBusinessHours);
    };

    // Check initially
    checkOpenStatus();

    // Update every minute
    const interval = setInterval(checkOpenStatus, 60000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col mt-20">
        <p className="flex flex-wrap items-end font-bold text-3xl lg:text-4xl xl:text-5xl mb-10">
          <span className="whitespace-nowrap">We are</span>
          {isOpen ? (
            <img
              src="/OpeningHours/Open.svg"
              alt="Open"
              className="h-20 mx-5"
            />
          ) : (
            <img
              src="/OpeningHours/Closed.svg"
              alt="Closed"
              className="h-20 mx-5"
            />
          )}
          <span>now</span>
          <span className="text-[#0C7E4A]">.</span>
        </p>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-10 uppercase">
          {daysData.map((dayInfo, index) => (
            <Card key={index} className="flex-1">
              <div
                className={`flex lg:flex-col justify-between lg:justify-center items-center gap-5 rounded-md p-3 ${
                  currentDay === index ? "text-white bg-[#0C7E4A]" : ""
                }`}
              >
                <p className="text-lg lg:text-xl xl:text-2xl">{dayInfo.day}</p>
                <p>{dayInfo.hours}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
