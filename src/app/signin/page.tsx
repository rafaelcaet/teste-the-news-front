"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useColorMode from "@/hooks/useColorMode";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Signin() {
  const [colorMode, setColorMode] = useColorMode();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [, setToken] = useLocalStorage("token", "");
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        window.location.href = "/reward";
      } else {
        console.error("Erro ao enviar o email:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center container mt-28">
        <Card className="p-11 flex flex-col mt-20 shadow-lg">
          <CardTitle className="flex justify-center font-bold text-center mb-10 text-2xl">
            ☕ Cadastro
            <div className="flex ml-4 items-center justify-center mt-1 hover:cursor-pointer text-theNewsYellow rounded-full hover:text-[#e6b700]">
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
          </CardTitle>
          <CardContent className="flex flex-grow justify-center">
            <div className="items-center gap-2 w-fit">
              <span className="font-semibold text-sm ml-1 text-theNewsYellow">
                Email
              </span>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="thenewszeiro@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  onClick={handleSubmit}
                  className="h-8 w-8 px-6 bg-theNewsYellow hover:bg-[#e6b700] text-white font-semibold rounded-lg transition-transform hover:scale-105"
                >
                  Ok
                </Button>
              </div>
            </div>
          </CardContent>
          <div className="font-semibold text-sm text-center justify-center mt-4">
            <span className="flex flex-col gap-2">
              <p>
                📩 Entre para o <span className="font-bold">☕ The News</span> e
                fique por dentro das principais notícias do mundo!
              </p>
              <p>
                Cadastre seu email e receba conteúdos exclusivos diretamente na
                sua caixa de entrada. Informação de qualidade, sem complicação!
                🚀
              </p>
            </span>
          </div>
        </Card>
      </div>
    </>
  );
}
