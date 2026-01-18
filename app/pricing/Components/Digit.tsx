"use client";
import React from "react";

interface DigitProps {
    value: number;
}

const Digit: React.FC<DigitProps> = ({ value }) => {
    return (
        <div className="overflow-hidden h-20 w-14 relative">
            <div
                className="flex flex-col transition-transform duration-500"
                style={{ transform: `translateY(-${value * 5}rem)` }}
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <span
                        key={n}
                        className="h-20 flex items-center justify-center text-4xl font-mono text-white"
                    >
                        {n}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Digit;
