"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FaRocket, FaBars, FaTimes, FaSignOutAlt, FaUser } from "react-icons/fa"
import { LayoutDashboard, CalendarClock, CreditCard, MessageCircle, Users } from "lucide-react"
import { useAuth } from "@/utils/useAuth"
import toast from "react-hot-toast"

export default function DashboardNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { user, logout } = useAuth()

    const links = [
        { id: 1, name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { id: 2, name: "Members", href: "/dashboard/members", icon: <Users size={20} /> },
        { id: 3, name: "Schedule", href: "/dashboard/ScheduleCaptain", icon: <CalendarClock size={20} /> },
        { id: 4, name: "Payment", href: "/dashboard/payment", icon: <CreditCard size={20} /> },
        { id: 5, name: "AI Chat", href: "/dashboard/chatbot", icon: <MessageCircle size={20} /> },
    ]

    const handleLogout = () => {
        logout()
        toast.success("Logged out successfully")
        router.push("/")
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950 border-b border-slate-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-3" data-aos="fade-right">
                        <span className="text-2xl text-sky-400">
                            <FaRocket />
                        </span>
                        <div className="hidden sm:block">
                            <h2 className="text-lg font-bold text-white">Captain's</h2>
                            <p className="text-xs font-semibold text-sky-300 tracking-wider">CONTROL CENTER</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map(link => (
                            <Link
                                key={link.id}
                                href={link.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${pathname === link.href
                                    ? "bg-sky-500/20 text-sky-300 border-b-2 border-sky-400"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-sky-400"
                                    }`}
                            >
                                {link.icon}
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Profile & Logout */}
                    <div className="hidden md:flex items-center gap-4" data-aos="fade-left">
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
                            >
                                <FaUser className="text-sky-400" />
                                <span className="text-white font-medium">{user?.name || "Captain"}</span>
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2">
                                    <div className="px-4 py-2 border-b border-slate-700">
                                        <p className="text-sm text-slate-400">Signed in as</p>
                                        <p className="text-sm text-white font-medium truncate">{user?.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-400 hover:bg-slate-700 transition-all"
                                    >
                                        <FaSignOutAlt />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-sky-400 transition-all"
                        data-aos="fade-left"
                    >
                        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-slate-900 border-t border-slate-800">
                    <div className="px-4 py-4 space-y-2">
                        {links.map(link => (
                            <Link
                                key={link.id}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${pathname === link.href
                                    ? "bg-sky-500/20 text-sky-300"
                                    : "text-slate-300 hover:bg-slate-800"
                                    }`}
                            >
                                {link.icon}
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        ))}
                        <div className="border-t border-slate-700 pt-2 mt-2">
                            <div className="px-4 py-2">
                                <p className="text-sm text-slate-400">Signed in as</p>
                                <p className="text-sm text-white font-medium">{user?.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-3 text-left text-red-400 hover:bg-slate-800 rounded-lg transition-all"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
