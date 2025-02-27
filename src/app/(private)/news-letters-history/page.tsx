"use client";
import Header from "@/components/Header";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { extractDateParts } from "@/utils/dateUtils";
import { ArrowUpRightFromSquare, Coffee } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserNewslettersType = {
  id: string;
  url: string;
  title: string;
  sentAt: string;
  openAt: string;
};

export default function NewsLettersHistory() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userNewsLetters, setUserNewsletters] = useState<UserNewslettersType[]>(
    []
  );

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    try {
      const response = await fetch("http://localhost:3000/user/newsletters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setUserNewsletters([]);
        return;
      }
      const data = await response.json();
      setUserNewsletters(data);
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

  const handleRedirectClick = (url: string) => {
    router.push(url);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Header />
      <Separator className="my-10" />
      <section className="space-y-12 mb-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-theNewsYellow flex items-center gap-2">
            Meu histórico <span className="text-3xl font-semibold">📰</span>
          </h2>
          {userNewsLetters.length === 0 && (
            <div className="flex flex-col items-center pt-20">
              <Coffee size={60} className="dark:text-white opacity-20" />
              <span className="font-bold text-xl opacity-20">
                Você ainda não leu nenhuma notícia...
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-6 items-center">
            {userNewsLetters.map((nl) => (
              <Card
                key={nl.id}
                className="hover:scale-105 transition-all hover:cursor-default"
              >
                <CardTitle>
                  <div className="flex justify-between m-6">
                    {" "}
                    <h3 className="text-theNewsYellow font-bold hover:underline hover:cursor-pointer text-2xl">
                      {nl.title}
                    </h3>
                    <ArrowUpRightFromSquare
                      className="hover:text-theNewsYellow hover:cursor-pointer transition-all hover:scale-110 opacity-40 hover:opacity-100"
                      size={20}
                      onClick={() => {
                        handleRedirectClick(nl.url);
                      }}
                    />
                  </div>
                </CardTitle>
                <CardContent>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  sint explicabo tenetur cupiditate exercitationem, esse eaque
                  dolores beatae, deleniti quas placeat ratione adipisci
                  officiis vel? Ipsum, sequi. Voluptatem, fugiat similique!
                </CardContent>
                <CardFooter className="gap-2">
                  {" "}
                  <span className="text-sm font-semibold">Data de envio: </span>
                  <span className="font-light text-sm">
                    {(() => {
                      const { day, month, year } = extractDateParts(nl.sentAt);
                      return `${day}/${month}/${year}`;
                    })()}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
