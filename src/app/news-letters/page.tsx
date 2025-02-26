"use client";
import Header from "@/components/Header";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNewsletter } from "@/hooks/useNewsletter";
import { extractDateParts } from "@/utils/dateUtils";
import { ArrowUpRightFromSquare } from "lucide-react";
import { useEffect, useState } from "react";

export default function NewsLetter() {
  const { newsletters } = useNewsletter();
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
            Histórico <span className="text-3xl">📰</span>
          </h2>
          <div className="grid grid-cols-2 gap-6 items-center">
            {newsletters.map((nl) => (
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
