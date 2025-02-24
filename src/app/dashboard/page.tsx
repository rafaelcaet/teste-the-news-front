import { AreaMetricChart } from "@/components/AreaMetricChart";
import { BarMetricChart } from "@/components/BarMetricChart";
import { DatePicker } from "@/components/DatePicker";
import Header from "@/components/Header";
import { MetricChart } from "@/components/MetricChart";
import { PieMetricChart } from "@/components/PieMetricChart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Header />
      {/* Filter section */}
      <section className="flex mt-10 items-center gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-theNewsYellow">
            Período:
          </span>
          <DatePicker />
        </div>
        <Button className="bg-theNewsYellow hover:bg-[#e6b700] self-end">
          Ok
        </Button>
      </section>

      <Separator className="mb-8" />

      {/* Charts section */}
      <section className="space-y-12">
        {/* Cliques */}
        <div className="space-y-6">
          <h2 className="text-4xl font-semibold text-theNewsYellow flex items-center gap-2">
            Métricas <span className="text-3xl">👇</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <MetricChart title="Cliques" value={200} />
            <MetricChart title="Usuários" value={90} />
            <MetricChart title="Newsletters" value={11} />
          </div>
        </div>

        {/* Campanhas */}
        <div className="space-y-6">
          <h2 className="text-4xl font-semibold text-theNewsYellow flex items-center gap-2">
            Campanhas <span className="text-3xl">📢</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <PieMetricChart title="teste" data={[]} />
            <PieMetricChart title="teste" data={[]} />
            <PieMetricChart title="teste" data={[]} />
            <BarMetricChart />
          </div>
        </div>

        {/* Newsletters */}
        <div className="space-y-6">
          <h2 className="text-4xl font-semibold text-theNewsYellow flex items-center gap-2">
            Newsletters <span className="text-3xl">📰</span>
          </h2>
          <div className="grid gap-6">
            <AreaMetricChart />
          </div>
        </div>
      </section>
    </div>
  );
}
