"use client";

import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function Reward() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <Header />
        <Separator className="my-20" />
        <section className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold text-theNewsYellow flex items-center gap-2">
              Métricas <span className="text-3xl">👇</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* <MetricTotalQuantidadeChart /> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
