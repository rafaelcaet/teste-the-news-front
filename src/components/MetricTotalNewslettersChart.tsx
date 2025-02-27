import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewsletter } from "@/hooks/useNewsletter";

export function MetricTotalNewslettersChart() {
  const { newsletters } = useNewsletter();
  return (
    <>
      <Card className="flex flex-col items-center text-center">
        <CardHeader>
          <CardTitle className="text-lg text-[#240E0B] dark:text-white">
            Total de newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-semibold text-[#240E0B] dark:text-white">
            {newsletters.length}
          </span>
        </CardContent>
      </Card>
    </>
  );
}
