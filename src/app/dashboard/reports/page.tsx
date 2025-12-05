import { OverviewCharts } from '@/components/reports/overview-charts';

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-semibold">
          Relatórios e Análises
        </h1>
        <p className="text-muted-foreground">
          Visualize o tráfego de rede e a postura de segurança.
        </p>
      </div>
      <OverviewCharts />
    </div>
  );
}
