"use client";

import Image from "next/image";
import Button from "@/Components/Ui/Button";

const Hero = () => {
    return (
        <div className="container max-w-325 m-auto">
            <div
                className="relative w-screen min-h-screen flex flex-col md:flex-row items-center justify-between bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/herohome.jpg')" }}
            >
                <Image
                    src="/images/Gradient.png"
                    alt="Gradient"
                    fill
                    priority
                    className="object-cover z-10"
                />
                <div
                    data-aos="fade-up-right"
                    className="relative z-20 container flex flex-col items-start justify-center min-h-screen px-4 sm:px-8 md:px-16 text-left"
                >
                    <p
                        className="inline-block text-white text-[10px] sm:text-xs md:text-lg px-2 sm:px-6 py-1 sm:py-2 mb-2 sm:mb-4"
                        style={{
                            backgroundImage: "url('/images/border.png')",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 100%"
                        }}
                    >
                        Limited spots available this month
                    </p>
                    <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-6xl lg:text-7xl leading-snug mb-2 sm:mb-4">
                        Limitless <br />
                        <span className="text-[#00ACDB]">Strength.</span> <br />
                        Unrivaled Tech.
                    </h1>
                    <p className="text-gray-200 font-semibold text-[9px] sm:text-[10px] md:text-base leading-snug mb-3 sm:mb-5">
                        Join the most advanced fitness community in the city. <br />
                        Professional equipment, expert trainers, and precision <br />
                        biometric tracking.
                    </p>
                    <div className="btns flex flex-col sm:flex-row gap-2 sm:gap-6">
                        <Button>Join the Elite</Button>
                        <Button className="bg-transparent border">Watch Trailer</Button>
                    </div>
                </div>
                <div className="relative w-full h-full">
                    <Image
                        src="/images/numbers.png"
                        alt="numbers"
                        width={360}
                        height={360}
                        className="absolute right-10 sm:right-50 w-50 sm:w-36 md:w-48 lg:w-90 bottom-10 sm:-bottom-8 md:-bottom-24 lg:-bottom-87.5"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
