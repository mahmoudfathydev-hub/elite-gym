"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<{ isSignedIn: boolean; name: string }>({ isSignedIn: false, name: "" });

    useEffect(() => {
        const signedIn = localStorage.getItem("isSignedIn") === "true";
        const userString = localStorage.getItem("user");
        
        if (signedIn && userString) {
            try {
                const userData = JSON.parse(userString);
                setUser({ isSignedIn: true, name: userData.name || "" });
            } catch (e) {
                setUser({ isSignedIn: false, name: "" });
            }
        }
    }, []);

    useEffect(() => {
        AOS.init({ once: true, duration: 1000 });
    }, []);
    useEffect(() => {
        AOS.refresh();
    }, [isOpen]);

    const links = [
        { id: 1, name: "Home", href: "/home" },
        { id: 2, name: "Pricing", href: "/pricing" },
        { id: 3, name: "Schedule", href: "/schedule" },
        { id: 4, name: "Trainers", href: "/trainers" },
    ];

    return (
        <nav className="w-full bg-[#181A1B] text-white fixed top-0 left-0 z-50 shadow-md">
            <div className="container max-w-310 mx-auto flex items-center justify-between px-8 h-20">
                <div
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1000"
                    className="flex items-center gap-3"
                >
                    <img src="/images/logo.png" alt="logo" className="w-10" />
                    <h2 className="text-xl font-bold">ELITE GYM</h2>
                </div>
                <ul className="hidden md:flex gap-8">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link href={link.href} key={link.id}>
                                <li
                                    data-aos="fade-down"
                                    data-aos-easing="linear"
                                    data-aos-duration={1000 + index * 300}
                                    className={`tracking-wider text-lg cursor-pointer transition-all duration-300 ${isActive ? "text-[#00ACDB]" : "text-white hover:text-[#00ACDB]"
                                        }`}
                                >
                                    {link.name}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
                <div className="hidden md:block">
                    {user.isSignedIn ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-300">{user.name}</span>
                            <button
                                data-aos="fade-down"
                                data-aos-easing="linear"
                                data-aos-duration="1800"
                                className="p-2 rounded-full bg-[#00ACDB] text-black hover:bg-[#167a96] transition"
                            >
                                <FaUser size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link href="/signin-trainee">
                            <button
                                data-aos="fade-down"
                                data-aos-easing="linear"
                                data-aos-duration="1800"
                                className="px-6 py-2 rounded-md bg-[#00ACDB] text-black font-semibold hover:bg-[#167a96] transition"
                            >
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
                <div className="md:hidden flex items-center">
                    <button
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-duration="2000"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* قائمة الموبايل */}
            <div
                className={`md:hidden fixed inset-0 bg-[#181A1B] z-40 flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <ul className="flex flex-col gap-8 text-center">
                    {links.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.id}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    data-aos="fade-down"
                                    data-aos-easing="linear"
                                    data-aos-duration={1200 + index * 300}
                                    className={`text-2xl font-medium transition-colors ${isActive
                                        ? "text-[#00ACDB]"
                                        : "text-white hover:text-[#00ACDB]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        {user.isSignedIn ? (
                            <button
                                data-aos="fade-down"
                                data-aos-easing="linear"
                                data-aos-duration="2000"
                                className="flex items-center gap-2 px-10 py-3 rounded-md bg-[#00ACDB] text-black font-semibold hover:bg-[#167a96] transition"
                            >
                                <FaUser size={18} />
                                {user.name}
                            </button>
                        ) : (
                            <Link href="/signin-trainee" onClick={() => setIsOpen(false)}>
                                <button
                                    data-aos="fade-down"
                                    data-aos-easing="linear"
                                    data-aos-duration="2000"
                                    className="px-10 py-3 rounded-md bg-[#00ACDB] text-black font-semibold hover:bg-[#167a96] transition"
                                >
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
