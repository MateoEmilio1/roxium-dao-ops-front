"use client";

import type { TaskEntity } from "@/services/daoService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface TaskListProps {
  tasks: TaskEntity[];
  loading: boolean;
  error: string | null;
}

export function TaskList({ tasks, loading, error }: TaskListProps) {
  return (
    <Card className="border-white/10 bg-black/40">
      <CardHeader>
        <CardTitle className="text-base">Tasks</CardTitle>
        <CardDescription className="text-xs">
          List of tasks linked to the selected proposal.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading && (
          <p className="text-xs text-slate-400">Loading tasks from Arkiv...</p>
        )}

        {error && (
          <p className="text-xs text-red-400">Error loading tasks: {error}</p>
        )}

        {!loading && !error && tasks.length === 0 && (
          <p className="text-xs text-slate-400">
            This proposal doesn&apos;t have any tasks yet. Create the first one
            on the right 👉
          </p>
        )}

        <div className="space-y-2">
          {tasks.map((task, index) => {
            if (!task.entityKey) return null;

            const payload = task.payload;
            if (!payload) return null;

            const createdAt = payload.createdAt
              ? new Date(payload.createdAt)
              : null;

            return (
              <div
                key={`${task.entityKey}-${index}`}
                className="rounded-md border border-slate-800/80 bg-black/60 p-3 text-xs sm:text-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">
                        {payload.title}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-slate-600 text-[10px] uppercase tracking-[0.16em] text-slate-300"
                      >
                        {payload.status ?? "open"}
                      </Badge>
                    </div>

                    {payload.description && (
                      <p className="mt-1 text-[11px] text-slate-400">
                        {payload.description}
                      </p>
                    )}

                    <p className="mt-1 font-mono text-[10px] text-emerald-300/80 break-all">
                      {task.entityKey}
                    </p>

                    {createdAt && (
                      <p className="text-[10px] text-slate-500">
                        Created:{" "}
                        {createdAt.toLocaleString("en-US", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                    )}

                    <p className="mt-1 text-[10px] text-slate-500">
                      Proposal key:{" "}
                      <span className="font-mono break-all">
                        {payload.proposalKey}
                      </span>
                    </p>
                  </div>

                  {payload.budget != null && (
                    <div className="text-right text-[11px] text-emerald-300">
                      Budget
                      <div className="text-sm font-semibold">
                        {payload.budget}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
