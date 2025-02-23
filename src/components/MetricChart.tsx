import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type metricChart = {
  title: string;
  value: number;
};

export function MetricChart({ title, value }: metricChart) {
  return (
    <>
      <Card className="flex flex-col items-center text-center">
        <CardHeader>
          <CardTitle className="text-xl text-[#240E0B] dark:text-white">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-semibold text-[#240E0B] dark:text-white">
            {value}
          </span>
        </CardContent>
      </Card>
    </>
  );
}
