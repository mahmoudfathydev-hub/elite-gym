"use client";
import ChooseTier from "./components/ChooseTier";
import Community from "./components/Community";
import Core from "./components/Core";
import Hero from "./components/Hero";export default function HomePage() {
    return (
        <main>
            <Hero />
            <Core />
            <ChooseTier />
            <Community />
        </main>
    );
}
