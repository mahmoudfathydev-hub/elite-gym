"use client"
import { useState } from "react"
import Link from "next/link"
import { FaRocket } from "react-icons/fa6"
import { FiMenu } from "react-icons/fi"
import { LuLayoutDashboard, LuCalendarClock, LuCreditCard, LuSettings } from "react-icons/lu"
const Sidebar = () => {
    const [open, setOpen] = useState(true)
    const links = [
        { id: 1, name: "Dashboard", href: "/dashboard/", icon: <LuLayoutDashboard /> },
        { id: 2, name: "My Schedule", href: "/dashboard/schedule", icon: <LuCalendarClock /> },
        { id: 3, name: "Payment", href: "/dashboard/payment", icon: <LuCreditCard /> },
        { id: 4, name: "Settings", href: "/dashboard/settings", icon: <LuSettings /> }
    ]
    return (
        <>
            <button onClick={() => setOpen(!open)} className="fixed top-5 left-5 z-50 rounded-lg bg-linear-to-br from-sky-500 to-blue-600 p-3 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <FiMenu size={20} />
            </button>
            <aside className={`fixed  top-20 left-0 z-40 h-screen w-64 bg-linear-to-b from-slate-950 to-slate-900 border-r border-slate-800 p-6 text-white transition-transform duration-300 shadow-2xl ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="mb-4 flex items-center gap-3 rounded-lg bg-linear-to-b from-sky-500/10 to-blue-500/10 p-4 border border-sky-500/20">
                    <span className="text-3xl text-sky-400 animate-pulse"><FaRocket /></span>
                    <div>
                        <h2 className="text-lg font-bold text-white">Captain&apos;s</h2>
                        <p className="text-xs font-semibold text-sky-300 tracking-wider">CONTROL CENTER</p>
                    </div>
                </div>
                <nav className="flex flex-col gap-3">
                    {links.map(link => (
                        <Link key={link.id} href={link.href} className="flex items-center gap-4 rounded-lg px-4 py-3 text-slate-300 transition-all duration-200 hover:bg-gradient-to-r hover:from-sky-500/20 hover:to-blue-500/20 hover:text-sky-300 hover:border-l-4 hover:border-sky-400 group">
                            <span className="text-xl text-sky-400 group-hover:text-sky-300 transition-colors">{link.icon}</span>
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    )
}
export default Sidebar
