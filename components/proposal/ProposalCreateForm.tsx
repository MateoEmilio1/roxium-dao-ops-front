"use client";

import { FormEvent, useState } from "react";
import { useCreateProposal } from "@/hooks/useProposals";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ProposalStatus } from "@/services/arkivTypes";

export interface ProposalCreateFormProps {
  daoKey: string;
  onCreated?: () => void | Promise<void>;
}

export function ProposalCreateForm({
  daoKey,
  onCreated,
}: ProposalCreateFormProps) {
  const { mutate: createProposal, loading, error } = useCreateProposal();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [deadline, setDeadline] = useState<string>(""); // datetime-local
  const [status] = useState<ProposalStatus>("open"); // por ahora fijo

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;

    const deadlineIso =
      deadline.trim().length > 0 ? new Date(deadline).toISOString() : undefined;

    const budgetNumber =
      budget.trim().length > 0 ? Number.parseFloat(budget) : undefined;

    await createProposal({
      daoKey,
      title: title.trim(),
      description: description.trim() || undefined,
      budget: budgetNumber,
      deadline: deadlineIso,
      status,
    });

    setTitle("");
    setDescription("");
    setBudget("");
    setDeadline("");

    if (onCreated) {
      const maybe = onCreated();
      if (maybe instanceof Promise) {
        await maybe;
      }
    }
  }

  return (
    <Card className="border-white/10 bg-black/40">
      <CardHeader>
        <CardTitle className="text-base">Nueva Proposal</CardTitle>
        <CardDescription className="text-xs">
          Crea una propuesta de trabajo, budget o decisión que el equipo va a
          ejecutar y trackear con tasks.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-200">Título</label>
            <Input
              placeholder="Ej: Definir horario de la daily"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-200">
              Descripción
            </label>
            <Textarea
              rows={3}
              placeholder="Contexto, objetivos y alcance de esta propuesta."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-200">
                Budget (opcional)
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="Ej: 1000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-200">
                Deadline (opcional)
              </label>
              <Input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400">
              Error al crear la proposal: {error}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={loading || !title.trim()}
            className="w-full sm:w-auto"
          >
            {loading ? "Creando proposal..." : "Crear proposal"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
