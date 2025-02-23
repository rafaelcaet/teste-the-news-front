"use client";
import useColorMode from "@/hooks/useColorMode";
import { Moon, Sun } from "lucide-react";

export default function HeaderDashboard() {
  const [colorMode, setColorMode] = useColorMode();
  const date = new Date().getHours();
  const hello =
    date <= 12 ? "Bom dia 😎" : date <= 18 ? "Boa tarde 😊" : "Boa noite 😴";
  return (
    <>
      <header>
        <h2 className="flex mt-28  gap-3 font-semibold text-[#FFCE04]">
          <span className="text-5xl font-bold">{hello}</span>
          <div className="flex text-5xl">
            <span className="flex font-bold">☕The News Dashboard</span>
            <div className="flex ml-6 items-center justify-center mt-3 hover:cursor-pointer text-theNewsYellow rounded-full hover:text-[#e6b700]">
              {colorMode === "light" ? (
                <Moon
                  onClick={() => {
                    if (typeof setColorMode === "function")
                      setColorMode(colorMode === "light" ? "dark" : "light");
                  }}
                />
              ) : (
                <Sun
                  onClick={() => {
                    if (typeof setColorMode === "function")
                      setColorMode(colorMode === "light" ? "dark" : "light");
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
