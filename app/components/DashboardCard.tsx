// components/DashboardCard.tsx
import { Card, CardContent } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-3 bg-muted rounded-full">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};
