"use client";

import type { DaoEntity } from "@/services/arkivTypes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface DaoBoardHeaderProps {
  dao: DaoEntity | null;
}

export function DaoBoardHeader({ dao }: DaoBoardHeaderProps) {
  if (!dao || !dao.payload) {
    return (
      <Card className="border-white/10 bg-black/40">
        <CardHeader>
          <CardTitle className="text-base">DAO not found</CardTitle>
          <CardDescription className="text-xs">
            We couldn&apos;t load this DAO&apos;s data from Arkiv.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const payload = dao.payload;
  const createdAt = payload.createdAt ? new Date(payload.createdAt) : null;

  return (
    <Card className="border-white/10 bg-black/40">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl text-slate-50">
            {payload.name}
            <Badge
              variant="outline"
              className="border-emerald-500/60 text-[10px] uppercase tracking-[0.16em] text-emerald-300"
            >
              DAO
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs text-slate-300">
            {payload.description ?? "DAO without description"}
          </CardDescription>
        </div>
        <div className="space-y-1 text-right text-[11px] text-slate-400">
          <p className="break-all font-mono">{dao.entityKey}</p>
          {createdAt && (
            <p>
              Created:{" "}
              {createdAt.toLocaleString("en-US", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </p>
          )}
          <p className="font-mono text-emerald-300/80">
            Owner: {payload.ownerAddress}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-400">
          This board groups <strong>proposals</strong> and{" "}
          <strong>tasks</strong> that live on-chain in Arkiv.
        </p>
      </CardContent>
    </Card>
  );
}
