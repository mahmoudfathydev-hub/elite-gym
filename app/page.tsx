"use client";
import FloatingTriangle from "@/Components/Ui/FloatingTraingle";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

export default function RolePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0b0f14] relative">
      <FloatingTriangle />
      <div className="w-full max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
          <div className="group w-full max-w-sm sm:max-w-md h-130 relative rounded-2xl overflow-hidden bg-[#111827] border border-white/10 hover:border-[#00ACDB] transition">
            <Image
              src="/images/captain.png"
              alt="Captain"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-8">
              <h6 className="text-sm tracking-widest text-[#00ACDB] mb-2">
                Management Portal
              </h6>
              <h2 className="text-4xl font-extrabold text-white mb-4">
                CAPTAIN
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Lead the pack. Manage schedules, design <br />
                custom training programs, and track trainee <br />
                progress with professional precision tools.
              </p>
              <Link href="/signin-captain">
                <button className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#00ACDB] text-black font-semibold hover:bg-[#00cfff] transition">
                  <span>Get Started</span>
                  <span className="w-4 h-4 flex items-center justify-center transition-transform duration-300 group-hover:rotate-180">
                    <FaChevronRight />
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div className="group w-full max-w-sm sm:max-w-md h-130 relative rounded-2xl overflow-hidden bg-[#111827] border border-white/10 hover:border-[#00FFDD] transition">
            <Image
              src="/images/trainee.png"
              alt="Trainee"
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-8">
              <h6 className="text-sm tracking-widest text-[#00FFDD] mb-2">
                Performance Hub
              </h6>
              <h2 className="text-4xl font-extrabold text-white mb-4">
                TRAINEE
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Reach your peak. Follow personalized workout <br />
                plans, book sessions, and engage with a <br />
                community dedicated to growth.
              </p>
              <Link href="/signin-trainee">
                <button className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#00FFDD] text-black font-semibold hover:bg-[#2dffe6] transition">
                  <span>Get Started</span>
                  <span className="flex items-center justify-center transition-transform duration-300 group-hover:rotate-180">
                    <FaChevronRight />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
