"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/Components/Global/Navbar";
import Footer from "@/Components/Global/Footer";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Hide old navbar and footer for sign-in pages and all dashboard routes
    const hideNavbarFooter = pathname === "/" ||
        pathname === "/signin-trainee" ||
        pathname === "/signin-captain" ||
        pathname?.startsWith("/dashboard");

    useEffect(() => {
        AOS.init({ duration: 1200, once: true, disable: 'mobile' });
    }, []);

    return (
        <>
            {!hideNavbarFooter && <Navbar />}
            {children}
            {!hideNavbarFooter && <Footer />}
        </>
    );
}
