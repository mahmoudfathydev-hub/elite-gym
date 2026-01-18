"use client";
import Cards from '@/app/home/components/Cards';
import React, { useState } from 'react';

const Hero = () => {
    const [billing, setBilling] = useState<"MONTHLY" | "YEARLY">("MONTHLY");

    return (
        <div className="hero-section mt-10  text-white py-20">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="head flex justify-center flex-col text-center mb-12">
                    <div data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="1500"
                        className="special-text mb-2 bg-[#e64f352e] max-w-fit p-1 rounded-md flex items-center gap-2 mx-auto">
                        <h5 className="text-[#E64F35] uppercase tracking-wider font-semibold">
                            <span className="text-2xl text-[#E64F35]">•</span> High Performance Only
                        </h5>
                    </div>
                    <h3 data-aos="fade-up-right" className="text-3xl md:text-5xl font-medium mt-4 mb-2">LEVEL UP YOUR</h3>
                    <h2 data-aos="fade-up-left" className="text-4xl md:text-5xl font-extrabold mb-4 text-[#00ACDB]">PERFORMANCE</h2>
                    <p data-aos="fade-down-right" className="text-gray-500 text-base md:text-md">
                        Precision-engineered training environments. Choose the access <br />
                        level that matches your ambition.
                    </p>
                </div>
                <div data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration="500"
                    className="taps flex justify-center gap-4 mb-12 max-w-fit mx-auto p-3 rounded-2xl bg-[#27272A]">
                    <button
                        onClick={() => setBilling("MONTHLY")}
                        className={`px-6 py-3 rounded-lg cursor-pointer font-medium transition-colors duration-300
                            ${billing === "MONTHLY" ? "bg-[#00ACDB] text-black shadow-lg" : " text-white"}`}
                    >
                        MONTHLY
                    </button>
                    <button
                        onClick={() => setBilling("YEARLY")}
                        className={`px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors duration-300
                            ${billing === "YEARLY" ? "bg-[#00ACDB] text-black shadow-lg" : " text-white "}`}
                    >
                        YEARLY
                    </button>
                </div>
                <Cards billing={billing} />
            </div>
        </div>
    )
}

export default Hero;
