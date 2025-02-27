"use client";
import useColorMode from "@/hooks/useColorMode";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useColorMode();
  const [mounted, setMounted] = useState(false);
  const date = new Date().getHours();
  const hello =
    date <= 12 ? "Bom dia 😎" : date <= 18 ? "Boa tarde 😊" : "Boa noite 😴";
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <>
      <header>
        <h2 className="flex mt-28  gap-3 font-semibold text-[#FFCE04]">
          <span className="text-3xl font-bold">{hello}</span>
          <div className="flex text-2xl">
            <span className="flex items-center font-bold">
              ☕The News{" "}
              {pathname === "/dashboard"
                ? "Dashboard"
                : pathname === "/reward"
                ? "Reward Room"
                : "history"}
            </span>
            <div className="flex ml-3 transition-all animate-bounce items-center justify-center hover:cursor-pointer text-theNewsYellow rounded-full hover:text-[#e6b700]">
              {colorMode === "light" ? (
                <Moon
                  onClick={() => {
                    if (typeof setColorMode === "function")
                      setColorMode("dark");
                  }}
                />
              ) : (
                <Sun
                  onClick={() => {
                    if (typeof setColorMode === "function")
                      setColorMode("light");
                  }}
                />
              )}
            </div>
          </div>
        </h2>
      </header>
    </>
  );
}
