import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockLogs } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '../ui/scroll-area';
import { ptBR } from 'date-fns/locale';

export function RealtimeMonitor() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Atividade em Tempo Real</CardTitle>
        <CardDescription>
          Feed ao vivo de tentativas de acesso à rede.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Destino
                </TableHead>
                <TableHead className="hidden md:table-cell">IP de Origem</TableHead>
                <TableHead className="text-right">Horário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge
                      variant={
                        log.status === 'allowed' ? 'secondary' : 'destructive'
                      }
                    >
                      {log.status === 'allowed' ? 'permitido' : 'bloqueado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium hidden sm:table-cell">
                    {log.destination}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {log.sourceIp}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDistanceToNow(new Date(log.timestamp), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
