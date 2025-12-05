"use client";

import { useState } from "react";
import { mockRules } from "@/lib/data";
import type { AccessRule } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, PlusCircle, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { UpsertRuleSheet } from "./upsert-rule-sheet";

export function RulesTable() {
  const [rules, setRules] = useState<AccessRule[]>(mockRules);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<AccessRule | undefined>(undefined);
  const { toast } = useToast();

  const handleToggleRule = (id: string, enabled: boolean) => {
    setRules(
      rules.map((rule) => (rule.id === id ? { ...rule, enabled } : rule))
    );
    toast({
      title: `Regra ${enabled ? 'Habilitada' : 'Desabilitada'}`,
      description: `A regra foi ${enabled ? 'habilitada' : 'desabilitada'} com sucesso.`,
    });
  };

  const handleSaveRule = (ruleData: AccessRule) => {
    const isEditing = rules.some(r => r.id === ruleData.id);
    if (isEditing) {
      setRules(rules.map(r => r.id === ruleData.id ? ruleData : r));
      toast({ title: "Regra Atualizada", description: "Suas alterações foram salvas." });
    } else {
      setRules([ruleData, ...rules]);
      toast({ title: "Regra Criada", description: "Uma nova regra foi adicionada." });
    }
    setSelectedRule(undefined);
  };
  
  const handleDeleteRule = () => {
    if (selectedRule) {
      setRules(rules.filter((rule) => rule.id !== selectedRule.id));
      toast({
        title: "Regra Excluída",
        description: `A regra para "${selectedRule.target}" foi excluída.`,
        variant: "destructive",
      });
      setIsAlertOpen(false);
      setSelectedRule(undefined);
    }
  };

  const openSheetForNew = () => {
    setSelectedRule(undefined);
    setIsSheetOpen(true);
  };

  const openSheetForEdit = (rule: AccessRule) => {
    setSelectedRule(rule);
    setIsSheetOpen(true);
  };

  const openAlertForDelete = (rule: AccessRule) => {
    setSelectedRule(rule);
    setIsAlertOpen(true);
  };
  
  const getActionBadgeVariant = (action: AccessRule['action']) => {
    switch (action) {
      case 'block': return 'destructive';
      case 'limit': return 'default';
      case 'allow': return 'secondary';
      default: return 'outline';
    }
  };

  const getActionDisplayName = (action: AccessRule['action']) => {
    switch (action) {
      case 'block': return 'bloquear';
      case 'limit': return 'limitar';
      case 'allow': return 'permitir';
      default: return action;
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-headline text-3xl font-semibold">Regras de Controle de Acesso</h1>
          <p className="text-muted-foreground">Gerencie regras para o tráfego de rede.</p>
        </div>
        <Button onClick={openSheetForNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Regra
        </Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Alvo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead className="w-[50px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={(checked) =>
                      handleToggleRule(rule.id, checked)
                    }
                    aria-label={`Alternar regra para ${rule.target}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{rule.target}</TableCell>
                <TableCell>
                  <Badge variant="outline">{rule.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getActionBadgeVariant(rule.action)}>
                    {getActionDisplayName(rule.action)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openSheetForEdit(rule)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => openAlertForDelete(rule)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {(isSheetOpen || selectedRule) && (
        <UpsertRuleSheet 
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
          rule={selectedRule}
          onSave={handleSaveRule}
        />
      )}

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a regra para{' '}
              <span className="font-semibold">{selectedRule?.target}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRule}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
