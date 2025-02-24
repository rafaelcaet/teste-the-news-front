"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useColorMode from "@/hooks/useColorMode";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [colorMode, setColorMode] = useColorMode();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useLocalStorage("token", "");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        window.location.href = "/reward";
      } else {
        setErrorMessage("Email ou formato inválido");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErrorMessage("Erro na conexão com o servidor.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="p-8 sm:p-12 md:p-16 flex flex-col mt-8 shadow-xl rounded-3xl w-full max-w-md transition-all">
          <CardTitle className="flex justify-center font-semibold text-center mb-8 text-3xl text-gray-800 dark:text-gray-100">
            ☕ Login
            <div className="flex ml-4 items-center justify-center mt-2 hover:cursor-pointer text-theNewsYellow rounded-full hover:text-[#e6b700] transition-colors">
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
          <CardContent className="mt-6">
            <label className="font-semibold text-sm text-theNewsYellow">
              Email
            </label>
            <div className="flex items-center gap-4 mb-10">
              <Input
                placeholder="thenewszeiro@email.com"
                className="w-full py-3 px-4 border-2 border-gray-300 focus:ring-2 focus:ring-theNewsYellow rounded-lg focus:outline-none transition-all"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="h-8 w-8 px-6 bg-theNewsYellow hover:bg-[#e6b700] text-white font-semibold rounded-lg transition-transform hover:scale-105"
                onClick={handleSubmit}
              >
                Ok
              </Button>
            </div>

            {errorMessage && (
              <div className="text-sm text-red-600 text-center">
                {errorMessage}
              </div>
            )}

            <div className="text-sm text-center mt-6">
              <span>
                Ainda não é assinante?{" "}
                <p
                  className="hover:underline text-theNewsYellow hover:font-semibold transition-all cursor-pointer"
                  onClick={() => (window.location.href = "/signin")}
                >
                  Clique aqui!
                </p>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
