import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Card = {
    id: number;
    title: string;
    price: number;
    duration: string;
    features: string[];
    disabled?: string[];
    popular?: boolean;
    button: string;
};

type CardsProps = {
    billing?: "MONTHLY" | "YEARLY";
};

const Cards: React.FC<CardsProps> = ({ billing }) => {
    const cardsTier: Card[] = [
        { id: 1, title: "Basic", price: 49, duration: "/Mo", features: ["24/7 Gym Access", "Locker Room Access"], disabled: ["Free Guest Passes", "Personal Training"], button: "Start Basic" },
        { id: 2, title: "Pro Performance", price: 89, duration: "/Mo", features: ["All Basic Features", "All Group Classes", "2 Guest Passes / Month", "1 PT Session / Month"], popular: true, button: "Select Pro" },
        { id: 3, title: "Elite Athlete", price: 149, duration: "/Mo", features: ["Everything in Pro", "Unlimited Guest Passes", "Weekly 1-on-1 Training", "Custom Nutrition Plan"], button: "Go Elite" }
    ];

    const getPrice = (price: number) => {
        if (billing === "YEARLY") return (price * 12 * 0.9).toFixed(2);
        return price.toFixed(2);
    };

    return (
        <div data-aos="fade-up" data-aos-duration="3000" className="grid md:grid-cols-3 gap-8">
            {cardsTier.map((card) => (
                <motion.div 
                    key={card.id} 
                    layout 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -20 }} 
                    transition={{ duration: 0.5 }}
                    className={`relative bg-[#1E2023] p-8 rounded-xl text-white border transition-colors duration-300 hover:border-[#00ACDB] ${card.popular ? "border-[#00ACDB] border-r-6 border-b-6" : "border-gray-700"}`}
                >
                    {card.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00ACDB] text-black text-sm font-semibold px-4 py-1 rounded-full">Most Popular</span>}
                    {billing === "YEARLY" && <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">DISCOUNT 10%</span>}
                    <h3 className={`text-xl font-semibold mb-4 ${card.popular ? "text-[#00ACDB]" : ""}`}>{card.title}</h3>
                    <div className="flex items-end gap-1 mb-6">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={billing} 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="text-4xl font-bold"
                            >
                                ${getPrice(card.price)}
                            </motion.span>
                        </AnimatePresence>
                        <span className="text-gray-400">{billing === "MONTHLY" ? "/Mo" : "/Year"}</span>
                    </div>
                    <ul className="space-y-3">
                        {card.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <Check size={18} className="text-[#00ACDB]" />
                                <span>{feature}</span>
                            </li>
                        ))}
                        {card.disabled?.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-500">
                                <X size={18} className="text-red-500" />
                                <span><del className="text-gray-400 font-light opacity-70">{feature}</del></span>
                            </li>
                        ))}
                    </ul>
                    <button className={`mt-8 w-full py-3 rounded-lg font-semibold transition cursor-pointer ${card.popular ? "bg-[#00ACDB] text-black hover:text-white border border-transparent hover:bg-transparent hover:border-[#00ACDB]" : "border border-white hover:bg-white hover:text-black"}`}>{card.button}</button>
                </motion.div>
            ))}
        </div>
    );
};

export default Cards;
