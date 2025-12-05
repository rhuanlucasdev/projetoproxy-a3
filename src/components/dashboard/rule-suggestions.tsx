'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockSuggestions } from '@/lib/data';
import type { RuleSuggestion } from '@/lib/types';
import { Check, Lightbulb, X } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function RuleSuggestions() {
  const [suggestions, setSuggestions] = useState<RuleSuggestion[]>(mockSuggestions);
  const { toast } = useToast();

  const handleSuggestion = (id: string, accepted: boolean) => {
    setSuggestions((prev) => prev.filter((s) => s.id !== id));
    toast({
      title: accepted ? 'Sugestão Aceita' : 'Sugestão Rejeitada',
      description: accepted ? 'Uma nova regra foi adicionada.' : 'A sugestão foi removida.',
      variant: 'default',
    });
  };

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Sugestões de Regras
        </CardTitle>
        <CardDescription>
          Recomendações baseadas em IA a partir de padrões de tráfego.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {suggestions.length > 0 ? (
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-start justify-between gap-4 rounded-lg border p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{suggestion.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {suggestion.basedOn}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => handleSuggestion(suggestion.id, true)}
                    aria-label="Aceitar sugestão"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={() => handleSuggestion(suggestion.id, false)}
                    aria-label="Rejeitar sugestão"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Nenhuma nova sugestão no momento.
            </p>
            <p className="text-xs text-muted-foreground">
              Volte mais tarde para recomendações automatizadas.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
