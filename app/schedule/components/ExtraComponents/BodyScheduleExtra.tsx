import { useState, useEffect } from "react";
const BodyScheduleExtra = () => {
    const [activeDay, setActiveDay] = useState<number>(1);
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsElapsed((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const formatTime = (secs: number) => {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor((secs % 3600) / 60);
        const seconds = secs % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };
    const volume = [
        { id: 1, title: "Total Volume", value: "12,450 lbs", important: true },
        { id: 2, title: "Sets Completed", value: "4 / 10" },
        { id: 3, title: "Est. Calories", value: "420 kcal" },
        { id: 4, title: "Workout Timer", timer: formatTime(secondsElapsed), important: true },
    ];
    return (
        <div className="bottom-content mt-8">
            <div className="heading mb-4">
                <h2
                    data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration="500"
                    className="
                        text-3xl
                        flex items-center justify-center
                        font-extrabold
                        bg-linear-to-r from-[#016e8b] via-[#00FFDD] to-[#00ACDB]
                        bg-clip-text text-transparent
                        drop-shadow-[0_0_12px_#00ACDB88]
                        ">
                    Volume Summary
                </h2>
            </div>
            <div className="content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                {volume.map((item) => (
                    <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom"
                        key={item.id}
                        className={`  p-6 rounded-2xl shadow-xl border border-gray-700  flex flex-col items-center justify-center text-center  ${item.important ? "bg-gradient-to-r from-[#016e8b81] via-[#00FFDD] to-[#00acdb92] text-black animate-pulse" : " text-white"}`}
                    >
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        {item.value && <p className="text-2xl font-extrabold">{item.value}</p>}
                        {item.timer && <p className="text-2xl font-mono">{item.timer}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default BodyScheduleExtra;
