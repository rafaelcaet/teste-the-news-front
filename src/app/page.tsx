"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useColorMode from "@/hooks/useColorMode";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <>
      <div className="flex justify-center container mt-28">
        <Card className="p-11 flex flex-col mt-20">
          <CardTitle className="flex justify-center font-bold text-center mb-10 text-2xl">
            ☕ Login
            <div className="flex ml-4 items-center justify-center mt-2 hover:cursor-pointer text-theNewsYellow rounded-full hover:text-[#e6b700]">
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
          </CardTitle>
          <CardContent>
            <span className="font-semibold text-sm ml-1 text-theNewsYellow">
              Email
            </span>
            <div className="flex items-center gap-2">
              <Input placeholder="thenewszeiro@email.com" />
              <Button className="text-[10px] h-6 w-6 bg-theNewsYellow hover:bg-[#e6b700] ">
                Ok
              </Button>
            </div>
            <div className="hover: cursor-pointer text-sm text-center mt-4">
              <span>
                Ainda não é assinante?{" "}
                <p className="hover:underline text-theNewsYellow hover:font-semibold">
                  Clique Aqui!
                </p>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
