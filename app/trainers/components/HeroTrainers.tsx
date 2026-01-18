import Image from "next/image";
const HeroTrainers = () => {
    const cards = [
        {
            id: 1,
            title: "Marcus Thorne",
            desc: "Strength & Conditioning",
            rate: "4.9",
            sessions: "+500 Sessions",
            img: "/images/1.png",
            EXP: "12 YEARS EXP",
            aos: "fade-right"
        },
        {
            id: 2,
            title: "Elena Rodriguez",
            desc: "HIIT Specialist",
            rate: "5.0",
            sessions: "+485 Sessions",
            img: "/images/2.png",
            EXP: "10 YEARS EXP",
            aos: "fade-up-right"
        },
        {
            id: 3,
            title: "David Chen",
            desc: "Olympic Lifting",
            rate: "5.0",
            sessions: "+415 Sessions",
            img: "/images/3.png",
            EXP: "10 YEARS EXP",
            aos: "fade-down-left"
        },
        {
            id: 4,
            title: "Sarah Jenkins",
            desc: "Mobility & Recovery",
            rate: "4.8",
            sessions: "+380 Sessions",
            img: "/images/4.png",
            EXP: "8 YEARS EXP",
            aos: "fade-left"
        },
    ];
    return (
        <section className="w-full py-32 bg-linear-to-r from-[#016d8b83] via-[#070f0e] to-[#08405077]
                        shadow-xl hover:shadow-2xl">
            <div className="container max-w-6xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-start gap-10 mb-20">
                    <div data-aos="fade-down" className="w-1 h-50 bg-[#00ACDB] rounded-full mt-2"></div>
                    <div data-aos="fade-left" className="text-white max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            Elite Performance <br />
                            <span className="text-[#00ACDB]">Coaching</span>
                        </h2>
                        <p className="mt-6 text-gray-300 text-lg leading-relaxed">
                            Unlock your absolute potential with industry-leading specialists.
                            Our roster features world-class athletes and master coaches
                            dedicated to your evolution.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card) => (
                        <div
                        data-aos={card.aos}
                            key={card.id}
                            className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-[#00ACDB]/30 transition-all duration-300"
                        >
                            <div className="relative">
                                <Image
                                    src={card.img}          
                                    alt={card.title}        
                                    width={400}             
                                    height={256}            
                                    className="object-cover w-full h-64 rounded-t-2xl"
                                    priority={card.id === 1} 
                                />
                                <span className="absolute top-4 left-4 bg-[#00ACDB] text-black text-xs font-bold px-3 py-1 rounded-full">
                                    {card.EXP}
                                </span>
                            </div>
                            <div className="p-6 text-white">
                                <h3 className="text-lg font-bold">{card.title}</h3>
                                <p className="text-sm text-[#00ACDB] mt-1">{card.desc}</p>
                                <div className="flex items-center justify-between mt-4 text-sm">
                                    <span className="text-[#00ACDB] font-semibold">
                                        ⭐ {card.rate}
                                    </span>
                                    <span className="text-gray-400">
                                        {card.sessions}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default HeroTrainers;
