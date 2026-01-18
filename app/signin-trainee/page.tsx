"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface SignInPageProps {
    showAccessKey?: boolean; 
}

const ACCESS_KEY = "64310";

export default function SignInPage({ showAccessKey = false }: SignInPageProps) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accessKey, setAccessKey] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Validate inputs
        if (!name.trim()) {
            setError("Name is required");
            setLoading(false);
            return;
        }
        if (!email.trim()) {
            setError("Email is required");
            setLoading(false);
            return;
        }
        if (!password.trim()) {
            setError("Password is required");
            setLoading(false);
            return;
        }
        if (showAccessKey && accessKey !== ACCESS_KEY) {
            setError("Invalid access key");
            setLoading(false);
            return;
        }

        // Store user data in localStorage
        const userData = {
            name,
            email,
            role: showAccessKey ? "captain" : "trainee",
            signedIn: true,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isSignedIn", "true");

        // Redirect based on role
        const redirectPath = showAccessKey ? "/dashboard/home" : "/home";
        router.push(redirectPath);
        setLoading(false);
    };
    return (
        <main className="flex flex-col md:flex-row min-h-screen">
            <div
                className="left w-full md:w-1/2 h-64 md:h-screen bg-no-repeat bg-left bg-cover flex flex-col justify-end p-6 md:p-12"
                style={{ backgroundImage: "url('/images/signin.jpg')" }}
            >
                <div className="headtop flex items-center mb-4 md:mb-8">
                    <img src="/images/icon1.png" alt="Icon 1" className="w-6 mr-2" />
                    <h4 className="font-opensans font-bold uppercase text-xl md:text-2xl text-white">
                        Apex Fitness
                    </h4>
                </div>
                <div className="middle mb-4 font-bold text-2xl md:text-4xl text-white leading-snug">
                    Push Limits. <br />
                    Break Barriers. <br />
                    <span className="text-[#00ACDB]">Unleash</span> Potential.
                </div>
                <div className="bottom text-gray-300 text-sm md:text-base">
                    Join the elite community. Track your <br />
                    progress, book classes, and achieve your <br />
                    peak performance.
                </div>
            </div>
            <div className="right w-full md:w-1/2 h-screen bg-[#101718] flex flex-col justify-between p-6 md:p-12 text-white">
                <div className="inner-content w-full mt-10 md:w-3/4 mx-auto flex flex-col justify-between h-full">
                    <div className="head mb-2 md:mb-8">
                        <h3 className="text-2xl md:text-3xl flex items-center justify-center font-bold mb-2">
                            Sign In
                        </h3>
                        <p className="text-gray-400 flex items-center justify-center text-sm md:text-base">
                            Welcome back! Please enter your details
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="inputs flex flex-col gap-4 mb-6">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-900/30 border border-red-500 text-red-400 text-sm">
                                {error}
                            </div>
                        )}
                        {showAccessKey && (
                            <div className="flex flex-col relative">
                                <label htmlFor="accessKey" className="ml-3 text-gray-300 text-sm mb-3">
                                    Access Key
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="accessKey"
                                    value={accessKey}
                                    onChange={(e) => setAccessKey(e.target.value)}
                                    className="p-3 rounded-3xl bg-[#1A1F21] text-white focus:outline-none focus:ring-2 focus:ring-[#00ACDB] w-full pr-10"
                                    placeholder="Enter your key"
                                />
                                <button
                                    type="button"
                                    className="absolute top-3/4 right-6 -translate-y-1/2 text-gray-400 hover:text-[#00ACDB]"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-sm mb-3 ml-3 text-gray-300 montserrat-400">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-3 rounded-3xl bg-[#1A1F21] text-white focus:outline-none focus:ring-2 focus:ring-[#00ACDB]"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm mb-3 ml-3 text-gray-300 montserrat-400">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 rounded-3xl bg-[#1A1F21] text-white focus:outline-none focus:ring-2 focus:ring-[#00ACDB]"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="flex flex-col relative">
                            <div className="divlabel flex items-center justify-between mb-4 align-middle">
                                <label htmlFor="password" className="ml-3 text-gray-300 text-sm">
                                    Password
                                </label>
                                <span className="text-sm text-[#00ACDB] cursor-pointer mt-2 ml-3 block">
                                    Forgot Password?
                                </span>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-3 rounded-3xl bg-[#1A1F21] text-white focus:outline-none focus:ring-2 focus:ring-[#00ACDB] w-full pr-10"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute top-16.25 right-6 -translate-y-1/2 text-gray-400 hover:text-[#00ACDB]"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full p-3 rounded-3xl bg-[#00ACDB] text-black font-bold hover:bg-[#0098c2] transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                    <div className="bottom-btns flex flex-col justify-between md:flex-row gap-4 mb-6">
                        <button className="flex px-18 items-center justify-center gap-2 p-3 rounded-2xl bg-[#20262B] cursor-pointer hover:bg-[#2A3237] transition">
                            <img src="/images/google.png" alt="google" className="w-5 h-5" />
                            Google
                        </button>
                        <button className="flex px-18 items-center justify-center gap-2 p-3 rounded-2xl bg-[#20262B] cursor-pointer hover:bg-[#2A3237] transition">
                            <img src="/images/apple.png" alt="apple" className="w-5 h-5" />
                            Apple
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
