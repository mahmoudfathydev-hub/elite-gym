"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import React, { useState, useEffect } from "react";
import Digit from "./Digit";
import Link from "next/link";
const VideoSection: React.FC = () => {
    const videos = [
        { id: 1, src: "/video/1.mp4", overlay: "Train Hard, Stay Strong" },
        { id: 2, src: "/video/2.mp4", overlay: "Fitness Fun For Everyone" },
        { id: 5, src: "/video/5.mp4", overlay: "Feel Energy, Feel Alive" },
        { id: 6, src: "/video/6.mp4", overlay: "Powerful Workouts Daily" },
        { id: 7, src: "/video/7.mp4", overlay: "Join Friends, Stay Motivated" },
        { id: 8, src: "/video/8.mp4", overlay: "Strength Starts Here" },
        { id: 9, src: "/video/9.mp4", overlay: "Relax, Stretch, Recover Well" },
        { id: 10, src: "/video/10.mp4", overlay: "Relax, Stretch, Recover Well" },
    ];
    const slides = [];
    for (let i = 0; i < videos.length; i += 2) {
        slides.push([videos[i], videos[i + 1]]);
    }
    const [activeIndex, setActiveIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000);
        return () => clearInterval(interval);
    }, []);
    const getDigits = (value: number) => [Math.floor(value / 10), value % 10];
    const hours = getDigits(Math.floor(timeLeft / 3600));
    const minutes = getDigits(Math.floor((timeLeft % 3600) / 60));
    const seconds = getDigits(timeLeft % 60);
    return (
        <section className="w-full min-h-screen md:h-screen relative flex overflow-hidden bg-black">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop
                slidesPerView={1}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full h-full"
            >
                {slides.map((pair, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
                            {pair.map((video, i) => video ? (
                                <video
                                    key={video.id}
                                    src={video.src}
                                    autoPlay
                                    loop
                                    preload="none"
                                    muted
                                    className="w-full h-full object-cover brightness-50 shadow-lg"
                                />
                            ) : <div key={i} className="w-full h-full bg-black" />)}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-8 md:px-12">
                <div className="max-w-2xl text-center space-y-4 sm:space-y-6 md:space-y-8">
                    <h2 className="text-[#00ACDB] text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-widest drop-shadow-lg">ELITE GYM</h2>
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl">{videos[activeIndex * 2]?.overlay || ""}</h1>
                    <Link href="/signin">
                        <button className="bg-[#00ACDB] text-black font-bold px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-2xl sm:rounded-3xl text-base sm:text-lg md:text-xl hover:bg-[#0098c2] transition-all duration-300 shadow-2xl transform hover:scale-105">Get Started Now</button>
                    </Link>
                    <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 sm:mt-6 bg-[#00ACDB]/30 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg">
                        <span className="text-white font-semibold uppercase tracking-wider text-xs sm:text-sm md:text-base">Discount Ends In</span>
                        <div className="flex items-center space-x-1 bg-[#00ACDB] px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-white font-bold text-lg sm:text-2xl shadow-inner">
                            <Digit value={hours[0]} />
                            <Digit value={hours[1]} />
                            <span className="mx-1 text-white text-3xl font-bold">:</span>
                            <Digit value={minutes[0]} />
                            <Digit value={minutes[1]} />
                            <span className="mx-1 text-white text-3xl font-bold">:</span>
                            <Digit value={seconds[0]} />
                            <Digit value={seconds[1]} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
