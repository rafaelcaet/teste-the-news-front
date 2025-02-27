"use client";
import React from "react";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useNewsletter } from "@/hooks/useNewsletter";

interface INewsletter {
  id: string;
  title: string;
  sentAt: string;
  utmCampaign: string;
  utmSource: string;
  utmMedium: string;
  utmChannel: string;
  createdAt: string;
}

// Função para contar os registros por campanha e desktop
const countUtmCampaigns = (newsletters: INewsletter[]) => {
  const campaignCounts: Record<string, number> = {};

  newsletters.forEach((newsletter) => {
    const campaign = newsletter.utmCampaign;
    if (campaignCounts[campaign]) {
      campaignCounts[campaign] += 1;
    } else {
      campaignCounts[campaign] = 1;
    }
  });

  return Object.keys(campaignCounts).map((campaign) => ({
    name: campaign,
    value: campaignCounts[campaign],
  }));
};

// Configuração do gráfico
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarUTMCampaign() {
  const { newsletters } = useNewsletter();

  // Contando as campanhas
  const data = React.useMemo(
    () => countUtmCampaigns(newsletters),
    [newsletters]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>UTM Campaigns</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 60,
              right: 60,
            }}
            barSize={50}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="value"
              fill="var(--color-desktop)"
              radius={8}
              className="text-black dark:text-white"
            >
              <LabelList dataKey="value" position="right" fontSize={14} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
