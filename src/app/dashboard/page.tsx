import { RealtimeMonitor } from '@/components/dashboard/realtime-monitor';
import { RuleSuggestions } from '@/components/dashboard/rule-suggestions';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Ban, CheckCircle, Network, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta, Admin. Veja o que está acontecendo na sua rede.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Requisições"
          value="12,450"
          icon={Network}
          description="+20.1% da última hora"
        />
        <StatsCard
          title="Tráfego Permitido"
          value="11,980"
          icon={CheckCircle}
          description="96.2% do total"
        />
        <StatsCard
          title="Tentativas Bloqueadas"
          value="470"
          icon={Ban}
          description="+12 desde a última hora"
        />
        <StatsCard
          title="Regras Ativas"
          value="5"
          icon={TrendingUp}
          description="Monitorando 6 categorias"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RealtimeMonitor />
        <RuleSuggestions />
      </div>
    </div>
  );
}
