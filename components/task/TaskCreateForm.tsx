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
        <CardTitle className="text-base">New Task</CardTitle>
        <CardDescription className="text-xs">
          Tasks linked to the selected proposal. They are persisted as Arkiv
          entities with a reference to the proposalKey.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3">
          {!proposalKey && (
            <p className="text-xs text-amber-300">
              Select a proposal in the middle column to create tasks.
            </p>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-200">Title</label>
            <Input
              placeholder="Ex: Implement /orders endpoint"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-200">
              Description
            </label>
            <Textarea
              rows={3}
              placeholder="Details of what needs to be done, technical context, links, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-200">
                Budget (optional)
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex: 200"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-200">
                Deadline (optional)
              </label>
              <Input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400">Error creating task: {error}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={loading || isDisabled}
            className="w-full sm:w-auto"
          >
            {loading ? "Creating task..." : "Create task"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
