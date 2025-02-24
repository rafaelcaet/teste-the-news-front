import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUsers } from "@/hooks/useUsers";

export function MetricTotalUsersChart() {
  const { users } = useUsers();
  return (
    <>
      <Card className="flex flex-col items-center text-center">
        <CardHeader>
          <CardTitle className="text-xl text-[#240E0B] dark:text-white">
            Total de usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-semibold text-[#240E0B] dark:text-white">
            {users.length}
          </span>
        </CardContent>
      </Card>
    </>
  );
}
