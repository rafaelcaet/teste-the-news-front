"use client";
import Link from "next/link";
import { useState } from "react";
import { ProgressBar } from "./ProgressBar";

const topics = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Rewards",
    path: "/reward",
  },
];

export function NavBar() {
  const [loading, setLoading] = useState(false);
  const handleLinkClick = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = path;
    }, 1000);
  };
  return (
    <header className="fixed top-0 w-full z-10 bg-background/95 py-6 dark:text-white text-black">
      <nav className="container flex items-center justify-between font-medium">
        {/* Logo alinhada à esquerda */}
        <Link href="/" className="text-lg font-bold hover:underline">
          ☕ The News
        </Link>

        {/* Links centralizados */}
        <div className="flex ml-96 gap-10">
          {topics.map((topic, index) => (
            <span
              key={index}
              className="text-base font-semibold hover:text-theNewsYellow cursor-pointer"
              onClick={() => handleLinkClick(topic.path)}
            >
              {topic.name}
            </span>
          ))}
        </div>

        {/* Login alinhado à direita */}
        <span className="ml-auto text-base border border-theNewsYellow rounded-lg p-2 text-theNewsYellow hover:text-[#e6b700] cursor-pointer">
          Login / Sign in
        </span>
      </nav>
      {loading && <ProgressBar />}
    </header>
  );
}
