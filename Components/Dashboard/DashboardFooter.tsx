"use client"

import Link from "next/link"
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa"

export default function DashboardFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div data-aos="fade-up" data-aos-delay="0">
                        <h3 className="text-white font-bold text-lg mb-4">Elite Gym</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Professional fitness management platform for trainers and trainees.
                            Track progress, manage sessions, and achieve your fitness goals.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div data-aos="fade-up" data-aos-delay="100">
                        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/dashboard" className="text-sm hover:text-sky-400 transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/ScheduleCaptain" className="text-sm hover:text-sky-400 transition-colors">
                                    Schedule
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/payment" className="text-sm hover:text-sky-400 transition-colors">
                                    Payment
                                </Link>
                            </li>
                            <li>
                                <Link href="/home" className="text-sm hover:text-sky-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
                        <div className="flex gap-4 mb-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                                className="text-slate-400 hover:text-sky-400 transition-colors">
                                <FaGithub size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="text-slate-400 hover:text-sky-400 transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="text-slate-400 hover:text-sky-400 transition-colors">
                                <FaLinkedin size={24} />
                            </a>
                            <a href="mailto:support@elitegym.com"
                                className="text-slate-400 hover:text-sky-400 transition-colors">
                                <FaEnvelope size={24} />
                            </a>
                        </div>
                        <p className="text-sm text-slate-400">
                            Need help? <Link href="/support" className="text-sky-400 hover:text-sky-300">Contact Support</Link>
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4" data-aos="fade-up" data-aos-delay="300">
                    <p className="text-sm text-slate-500">
                        © {currentYear} Elite Gym. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="hover:text-sky-400 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-sky-400 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="hover:text-sky-400 transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
