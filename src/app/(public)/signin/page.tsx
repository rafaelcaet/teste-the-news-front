"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useColorMode from "@/hooks/useColorMode";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Signin() {
  const [colorMode, setColorMode] = useColorMode();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [, setToken] = useLocalStorage("token", "");
  const router = useRouter();
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
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        toast.success("Login efetuado com sucesso!", { duration: 3000 });
        router.push("/reward");
      } else {
        const errorData = await response.json();
        console.error(
          "Erro ao enviar o email:",
          errorData.message || response.statusText
        );
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
            <div className="items-center justify-center flex flex-col gap-4 w-fit">
              <div>
                <span className="font-semibold text-sm ml-1 text-theNewsYellow">
                  Nome
                </span>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Fulano"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <span className="font-semibold text-sm ml-1 text-theNewsYellow">
                  Email
                </span>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="thenewszeiro@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="h-8 w-8 px-6 mt-4 bg-theNewsYellow hover:bg-[#e6b700] text-white font-semibold rounded-lg transition-transform hover:scale-105"
              >
                Ok
              </Button>
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
