import React from "react";
interface Card {
    id: number;
    title: string;
    desc: string;
    img: string;
}
const Core: React.FC = () => {
    const cards: Card[] = [
        {
            id: 1,
            title: "Bodybuilding",
            desc: "High intensity resistance training using custom-engineered Hammer Strength & Eleiko equipment.",
            img: "/images/dumble.png",
        },
        {
            id: 2,
            title: "Precision Cardio",
            desc: "Real-time heart-rate monitoring and biometric data visualization to push your aerobic threshold",
            img: "/images/cardio.png",
        },
        {
            id: 3,
            title: "Active Recovery",
            desc: "Mobility work and yoga sessions designed specifically for muscle recovery and cognitive focus.",
            img: "/images/yoga.png",
        },
    ];
    return (
        <div className="container mx-auto px-4 py-16 max-w-310 ">
            <div className="flex flex-col md:flex-row justify-between mb-12">
                <div data-aos="fade-right" className="mb-6 md:mb-0">
                    <h6 className="text-sm text-[#00ACDB] uppercase mb-2">Core Ecosystem</h6>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Engineered for Performance</h2>
                </div>
                <div>
                    <p data-aos="fade-left" className="text-gray-600 mt-5">
                        Our specialized zones are designed with biomechanical <br />
                        precision to maximize your training efficiency and results.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-[#26282B] rounded-2xl shadow-lg p-6 border-l-4 border-b-4 border-[#00ACDB] flex flex-col items-start space-y-4 text-left hover:border-4 hover:border-[#00ACDB] hover:border-t-4 hover:border-r-4 hover:scale-105 transition-all duration-700 ease-in-out"
                    >
                        <div className="imgcontainer bg-[#00acdb13] flex items-center justify-center w-12 h-12 rounded-2xl">
                            <img src={card.img} alt={card.title} className="w-8 h-8 z-10" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                        <p className="text-gray-400 text-sm">{card.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};
export default Core;
