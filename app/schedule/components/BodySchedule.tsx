"use client"
import { useState } from "react";
import BodyScheduleExtra from "./ExtraComponents/BodyScheduleExtra";
type Exercise = {
    type: string;
    name: string;
    sets: string;
    reps: string;
    rest: string;
};
const BodySchedule = () => {
    const schedule = [
        { id: 1, name: "SATURDAY", Day: "Chest (Hypertrophy)" },
        { id: 2, name: "SUNDAY", Day: "Back & Biceps" },
        { id: 3, name: "MONDAY", Day: "Shoulders & Core" },
        { id: 4, name: "TUESDAY", Day: "Rest/Yoga" },
        { id: 5, name: "WEDNESDAY", Day: "Legs & Glutes" },
        { id: 6, name: "THURSDAY", Day: "Back & Triceps" },
        { id: 7, name: "FRIDAY", Day: "Recovery/Rest" },
    ];
    const exercises: Record<number, Exercise[]> = {
        1: [
            { type: "Primary Compound", name: "Bench Press", sets: "4 Sets", reps: "8-10", rest: "90-120 Seconds" },
            { type: "Accessory Lift", name: "Incline Flyes", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Push Ups", sets: "3 Sets", reps: "15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Dumbbell Pullover", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Cable Crossover", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
        ],
        2: [
            { type: "Primary Compound", name: "Pull Ups", sets: "4 Sets", reps: "8-10", rest: "90 Seconds" },
            { type: "Accessory Lift", name: "Barbell Row", sets: "3 Sets", reps: "10-12", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Bicep Curl", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Hammer Curl", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Face Pull", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
        ],
        3: [
            { type: "Primary Compound", name: "Overhead Press", sets: "4 Sets", reps: "8-10", rest: "90 Seconds" },
            { type: "Accessory Lift", name: "Lateral Raise", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Front Raise", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Plank", sets: "3 Sets", reps: "60 sec", rest: "60 Seconds" },
        ],
        4: [],
        5: [
            { type: "Primary Compound", name: "Squats", sets: "4 Sets", reps: "8-10", rest: "90-120 Seconds" },
            { type: "Accessory Lift", name: "Leg Press", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Lunges", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Leg Curl", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Calf Raises", sets: "4 Sets", reps: "15-20", rest: "60 Seconds" },
        ],
        6: [
            { type: "Primary Compound", name: "Deadlift", sets: "4 Sets", reps: "6-8", rest: "120 Seconds" },
            { type: "Accessory Lift", name: "Tricep Pushdown", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
            { type: "Accessory Lift", name: "Pull Ups", sets: "3 Sets", reps: "10-12", rest: "90-120 Seconds" },
            { type: "Accessory Lift", name: "Face Pull", sets: "3 Sets", reps: "12-15", rest: "60 Seconds" },
        ],
        7: [],
    };
    const [activeDay, setActiveDay] = useState<number>(1);
    return (
        <div className="min-h-screen py-10">
            <div className="container max-w-7xl mx-auto mt-10 px-6 py-3">
                <div
                    data-aos="fade-down"
                    className="top grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
                    {schedule.map((item) => {
                        const isEmpty = item.Day === "" || item.Day.toLowerCase().includes("rest");
                        const isActive = item.id === activeDay;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveDay(item.id)}
                                className={`
                                    flex flex-col items-center justify-center 
                                    cursor-pointer rounded-xl px-4 py-3 font-bold 
                                    transition-all duration-300 transform
                                    ${isActive ? "bg-[#00ACDB] text-white shadow-lg scale-105" : "bg-transparent text-white hover:bg-[#00ACDB]/20 hover:text-white hover:shadow-md"}`}
                            >
                                <span className="text-md">{item.name}</span>
                                <span className="text-xs font-normal mt-1 text-gray-300">{item.Day}</span>
                            </button>
                        );
                    })}
                </div>
                <div className="body mt-6 ">
                    <div
                        data-aos="zoom-in-up"
                        className="top-content  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exercises[activeDay].length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center p-12 rounded-3xl bg-linear-to-r from-[#016e8b81] via-[#00FFDD] to-[#00acdb92] shadow-2xl animate-pulse">
                                <p className="text-6xl mb-4">🛌</p>
                                <p className="text-center text-black text-2xl font-extrabold tracking-wide">
                                    Rest Day
                                </p>
                                <p className="text-center text-black mt-2 text-lg max-w-md">
                                    Take it easy today! Relax, recover, and get ready for your next session.
                                </p>
                            </div>
                        ) : (
                            exercises[activeDay].map((ex: Exercise, idx: number) => (
                                <div key={idx} className="p-6 rounded-2xl shadow-xl border border-gray-800 hover:scale-105 transition-transform duration-300">
                                    <h3 className="font-bold text-[#00ACDB] mb-2">{ex.type}</h3>
                                    <p className="font-semibold text-white text-lg mb-4">{ex.name}</p>
                                    <div className="content max-w-80 bg-[#1a1a1a] rounded-2xl m-auto p-4">
                                        <div className="extra-content flex justify-between items-center mb-2">
                                            <p className="text-gray-400 mt-1 flex flex-col">
                                                Target Sets
                                                <span className="text-white font-bold flex items-center justify-center text-lg">{ex.sets}</span>
                                            </p>
                                            <p className="text-gray-400 flex flex-col">
                                                Target Reps
                                                <span className="text-white font-bold flex items-center justify-center text-xl">{ex.reps}</span>
                                            </p>
                                        </div>
                                        <p className="text-gray-400">Rest: {ex.rest}</p>
                                    </div>
                                    <button className="mt-4 w-full text-center py-2 bg-linear-to-r from-[#016e8b81] via-[#00FFDD] to-[#00acdb92] shadow-2xl animate-pulse text-black font-semibold rounded-xl hover:bg-[#0098c2] transition-colors">
                                        Log Set
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="bottom-content">
                        <BodyScheduleExtra />
                    </div>
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                    className="bottom mt-12 flex flex-col lg:flex-row items-center justify-between gap-8 
                bg-[#1a1a1a] rounded-3xl p-8 
                border border-[#00ACDB]/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-r 
                    from-[#00ACDB]/10 via-transparent to-[#00ACDB]/10 
                    blur-2xl pointer-events-none"></div>
                    <div className="left w-full lg:w-[60%] relative z-10">
                        <h2 className="text-3xl font-extrabold text-white mb-4">
                            Performance Coaching
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Need a technique review for these lifts? Book a 15-minute virtual <br />
                            check-in with your assigned performance coach.
                        </p>
                    </div>
                    <div className="right  w-full lg:w-[40%] flex flex-col sm:flex-row gap-4 justify-end relative z-10">
                        <button
                            className="flex-1 px-6 py-4 rounded-2xl font-bold text-white
                        border border-[#00ACDB]/40
                        hover:border-[#00ACDB]
                        bg-[#1a1a1a]
                        cursor-pointer
                        hover:shadow-[0_0_25px_#00ACDB55]
                        transition-all duration-300">
                            Request <br /> Feedback
                        </button>
                        <button
                            className="flex-1 px-6 py-4 rounded-2xl font-bold text-black
                        bg-linear-to-r from-[#016e8b] via-[#00FFDD] to-[#00ACDB]
                        shadow-xl hover:shadow-2xl
                        hover:scale-105
                        cursor-pointer
                        transition-all duration-300">
                            Custom Plan <br /> Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BodySchedule;
