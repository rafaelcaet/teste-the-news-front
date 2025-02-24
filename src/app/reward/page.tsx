"use client";

import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

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
];

export default function Reward() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Header />
      <Separator className="my-20" />
      <section className="space-y-12">
        <div className="space-y-6">
          <h2 className="text-4xl font-semibold text-theNewsYellow flex items-center gap-2">
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
