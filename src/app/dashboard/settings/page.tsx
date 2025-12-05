import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-3xl font-semibold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie sua conta e as configurações do aplicativo.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Em Breve</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Mais configurações e opções estarão disponíveis aqui em uma futura atualização.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
