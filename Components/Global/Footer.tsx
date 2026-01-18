import { FaEarthAfrica } from "react-icons/fa6";
import { FaShareAlt, FaChevronRight } from "react-icons/fa";
import { BsCameraVideo } from "react-icons/bs";
import { useState } from "react";
const Footer = () => {
    const [focus, setFocus] = useState(false);
    const links = [
        { id: 1, name: "Home", link: "/" },
        { id: 2, name: "Pricing", link: "/pricing" },
        { id: 3, name: "Schedule", link: "/schedule" },
        { id: 4, name: "Trainers", link: "/trainers" }
    ];
    return (
        <footer className="text-white z-50 relative pt-20 pb-6 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 border-t-2  border-zinc-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/images/logo.png" alt="logo" className="w-10" />
                            <p className="text-xl font-bold tracking-wide">ELITE GYM</p>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            Elevating human potential through technical <br />
                            innovation and relentless community support.
                        </p>
                        <div className="flex gap-4">
                            {[FaEarthAfrica, FaShareAlt, BsCameraVideo].map((Icon, i) => (
                                <span key={i} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-[#00ACDB] hover:text-black transition cursor-pointer">
                                    <Icon size={18} />
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Explore</h3>
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li key={link.id}>
                                    <a href={link.link} className="text-gray-400 hover:text-[#00ACDB] transition">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-lg font-semibold mb-4">Newsletter</p>
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Email Address"
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                                className="w-full px-4 py-3 pr-12 rounded-md bg-zinc-900 border border-zinc-700 focus:outline-none focus:border-[#00ACDB] text-sm transition"
                            />
                            <FaChevronRight className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform duration-300 ${focus ? "rotate-180 text-[#00ACDB]" : ""}`} />
                        </div>
                    </div>
                </div>
                <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
                    <p>© 2026 Elite Gym. All rights reserved.</p>
                    <p className="hover:text-[#00ACDB] cursor-pointer transition">Privacy Policy | Terms of Service</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
