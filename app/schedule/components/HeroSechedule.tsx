import React from "react";
const HeroSchedule = () => {
    const getCurrentWeek = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diffToSaturday = dayOfWeek === 6 ? 0 : dayOfWeek + 1;
        const saturday = new Date(today);
        saturday.setDate(today.getDate() - diffToSaturday);
        const friday = new Date(saturday);
        friday.setDate(saturday.getDate() + 6);
        const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
        const saturdayStr = formatter.format(saturday);
        const fridayStr = formatter.format(friday);
        return `${saturdayStr} — ${fridayStr}`;
    };
    const currentWeek = getCurrentWeek();
    return (
        <div>
            <div className="container max-w-7xl px-4 md:px-6 m-auto flex flex-col md:flex-row mt-20 md:mt-35 justify-between items-start md:items-end gap-8 md:gap-0">
                <div className="left italic w-full">
                    <p data-aos="fade-right" className="text-3xl md:text-5xl font-extrabold">
                        Weekly <span className="text-[#00ACDB]">Workout</span>
                    </p>
                    <p data-aos="fade-right" className="text-3xl md:text-5xl font-extrabold mt-2 md:mt-4">Plan</p>
                    <p
                        data-aos="fade-up"
                        className="text-gray-600 mt-4 text-sm md:text-base">
                        Stay consistent and track your progress. Follow your customized routine
                        <br className="hidden md:block" />
                        designed for maximum muscle growth and performance.
                    </p>
                </div>
                <div data-aos="fade-up-left" className="right flex italic flex-col gap-y-2 items-start md:items-end justify-end h-full min-h-0 md:min-h-45 w-full md:w-auto">
                    <p className="text-[#00ACDB] text-xl md:text-2xl font-semibold">Current Week</p>
                    <p className="text-2xl md:text-3xl font-bold">{currentWeek}</p>
                </div>
            </div>

        </div>
    );
};
export default HeroSchedule;
