"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AccessRule } from "@/lib/types";
import { Switch } from "../ui/switch";

const ruleSchema = z.object({
  target: z.string().min(1, "O alvo é obrigatório."),
  category: z.enum([
    'Social Media',
    'Gambling',
    'Streaming',
    'Adult',
    'News',
    'Custom',
  ]),
  action: z.enum(['allow', 'block', 'limit']),
  enabled: z.boolean(),
});

type RuleFormValues = z.infer<typeof ruleSchema>;

interface UpsertRuleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule?: AccessRule;
  onSave: (values: AccessRule) => void;
}

export function UpsertRuleSheet({
  open,
  onOpenChange,
  rule,
  onSave,
}: UpsertRuleSheetProps) {
  const form = useForm<RuleFormValues>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      target: rule?.target || "",
      category: rule?.category || 'Custom',
      action: rule?.action || 'block',
      enabled: rule?.enabled ?? true,
    },
  });

  const onSubmit = (values: RuleFormValues) => {
    onSave({
      id: rule?.id || `rule-${Date.now()}`,
      ...values,
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col"
          >
            <SheetHeader>
              <SheetTitle className="font-headline">
                {rule ? "Editar Regra" : "Criar Nova Regra"}
              </SheetTitle>
              <SheetDescription>
                Defina uma regra de controle de acesso para sua rede.
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 space-y-6 py-6">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alvo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: youtube.com, 192.168.1.100"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      O site ou endereço IP ao qual a regra será aplicada.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Social Media">Mídia Social</SelectItem>
                        <SelectItem value="Gambling">Apostas</SelectItem>
                        <SelectItem value="Streaming">Streaming</SelectItem>
                        <SelectItem value="Adult">Conteúdo Adulto</SelectItem>
                        <SelectItem value="News">Notícias</SelectItem>
                        <SelectItem value="Custom">Personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ação</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma ação" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="block">Bloquear</SelectItem>
                        <SelectItem value="allow">Permitir</SelectItem>
                        <SelectItem value="limit">Limitar</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Habilitar Regra</FormLabel>
                      <FormDescription>
                        Ative ou desative esta regra.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </SheetClose>
              <Button type="submit">Salvar Regra</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
