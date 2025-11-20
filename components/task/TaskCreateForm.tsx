"use client";

import { FormEvent, useState } from "react";
import { useCreateTask } from "@/hooks/useTasks";
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
import type { TaskStatus } from "@/services/arkivTypes";

export interface TaskCreateFormProps {
  daoKey: string;
  proposalKey: string | null;
  onCreated?: () => void | Promise<void>;
}

export function TaskCreateForm({
  daoKey,
  proposalKey,
  onCreated,
}: TaskCreateFormProps) {
  const { mutate: createTask, loading, error } = useCreateTask();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [status] = useState<TaskStatus>("todo");

  const isDisabled = !proposalKey || !title.trim();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!proposalKey || !title.trim()) return;

    const deadlineIso =
      deadline.trim().length > 0 ? new Date(deadline).toISOString() : undefined;

    const budgetNumber =
      budget.trim().length > 0 ? Number.parseFloat(budget) : undefined;

    await createTask({
      daoKey,
      proposalKey,
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
        <CardTitle className="text-base">Nueva Task</CardTitle>
        <CardDescription className="text-xs">
          Tasks vinculadas a la proposal seleccionada. Se persisten como
          entidades Arkiv con referencia a la proposalKey.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3">
          {!proposalKey && (
            <p className="text-xs text-amber-300">
              Seleccioná una proposal en la columna central para poder crear
              tasks.
            </p>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-200">Título</label>
            <Input
              placeholder="Ej: Implementar endpoint /orders"
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
              placeholder="Detalle de lo que hay que hacer, contexto técnico, links, etc."
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
                placeholder="Ej: 200"
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
              Error al crear la task: {error}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={loading || isDisabled}
            className="w-full sm:w-auto"
          >
            {loading ? "Creando task..." : "Crear task"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
