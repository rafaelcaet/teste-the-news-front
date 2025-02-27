"use client";

import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Check, Coffee } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const dayStreakMessages = [
  "Mais um dia de boas leituras! 📖",
  "Seu conhecimento só cresce! 🚀",
  "A cada dia, mais insights! 🔥",
  "Leitura em dia, mente afiada! 🧠",
  "Você está criando um hábito poderoso! 💪",
  "Manter-se informado nunca foi tão fácil! 📩",
  "Boas leituras constroem grandes ideias! 💡",
  "Seu streak está impecável! 👏",
  "Consistência na leitura, poder na mente! ⚡",
  "Mais um dia absorvendo conhecimento! 📚",
  "Leu hoje? Então já ganhou o dia! ✅",
  "A cada newsletter, uma nova perspectiva! 👀",
  "Seu streak está virando um clássico! 🏆",
  "Mais um capítulo na sua jornada! ✨",
  "Saber mais todo dia é um superpoder! 🔥",
];

const prizes = [
  {
    id: 1,
    name: "Assinatura Premium",
    emoji: "🎟️",
    description: "Acesso VIP à nossa plataforma.",
  },
  {
    id: 2,
    name: "Livro Digital",
    emoji: "📖",
    description: "E-book exclusivo sobre tendências do mercado.",
  },
  {
    id: 3,
    name: "Vale-Compras",
    emoji: "🎁",
    description: "Ganhe R$100 para usar em lojas parceiras.",
  },
  {
    id: 4,
    name: "Acesso a Sorteios",
    emoji: "🎲",
    description: "Participe de sorteios mensais exclusivos.",
  },
  {
    id: 5,
    name: "Workshop Online",
    emoji: "💻",
    description: "Curso gratuito sobre produtividade e inovação.",
  },
  {
    id: 6,
    name: "Certificado de Conquista",
    emoji: "🏅",
    description: "Mostre sua dedicação com um certificado especial.",
  },
] as const;

type UserType = {
  id: string;
  email: string;
  dayStreak: string;
  isAdmin: number;
};

const arrDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export default function Reward() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<UserType>({
    id: "",
    email: "",
    dayStreak: "",
    isAdmin: 0,
  });
  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    try {
      const response = await fetch("http://localhost:3000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch newsletters:", error);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, [fetchData]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Header />
      <Separator className="my-10" />
      <section className="space-y-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-theNewsYellow flex items-center gap-2">
            Meu Desempenho <span className="text-3xl">📈</span>
          </h2>
          <div className="flex p-10 flex-col gap-5 items-center justify-center antialiased">
            {/* Circulo contendo o daysterak do usuario */}
            <div className="rounded-full bg-theNewsYellow w-52 h-52 flex items-center justify-center">
              <div className="rounded-full dark:bg-black bg-white w-48 h-48 flex items-center justify-center">
                <div className="text-theNewsYellow font-semibold text-lg flex flex-col justify-center text-center items-center">
                  <span className="text-7xl font-semibold text-theNewsYellow text-center">
                    {user.dayStreak}
                  </span>{" "}
                  <span className="text-lg font-bold">dias</span>
                </div>
              </div>
            </div>
            {/* mensagem motivacional */}
            <div className="text-theNewsYellow font-semibold text-lg">
              <span>{dayStreakMessages[Math.floor(Math.random() * 15)]}</span>
            </div>
            <div className="flex gap-10">
              {arrDays.map((day, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="relative w-8 h-8">
                    <Coffee className="w-full h-full" />
                    <Check
                      className={` ${
                        index < Number(user.dayStreak) ? "" : "hidden"
                      } absolute -bottom-1 -right-1 text-black bg-theNewsYellow rounded-full p-0.5 shadow-md w-4 h-4`}
                    />
                  </div>
                  <span className="text-sm font-medium">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-theNewsYellow flex items-center gap-2">
            Prêmios <span className="text-3xl">🏆</span>
          </h2>
          <div className="grid grid-cols-6 gap-6 items-center">
            {prizes.map((prize, index) => (
              <div key={prize.id} className="flex gap-3 items-center">
                <Card className="hover:scale-105 transition-transform duration-300 shadow-lg w-full">
                  <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                    <span className="text-4xl">{prize.emoji}</span>
                    <h3 className="mt-3 text-lg font-semibold">{prize.name}</h3>
                    <p className="text-sm text-gray-500">{prize.description}</p>
                  </CardContent>
                </Card>
                {index < prizes.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-400 mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
