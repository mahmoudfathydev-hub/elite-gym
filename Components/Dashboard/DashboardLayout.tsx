"use client"

import DashboardNavbar from "./DashboardNavbar"
import DashboardFooter from "./DashboardFooter"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950">
            <DashboardNavbar />
            <main className="flex-1 mt-16">
                {children}
            </main>
            <DashboardFooter />
        </div>
    )
}
