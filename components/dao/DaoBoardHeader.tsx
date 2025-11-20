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
          <CardTitle className="text-base">DAO no encontrada</CardTitle>
          <CardDescription className="text-xs">
            No pudimos cargar los datos del DAO desde Arkiv.
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
          <CardTitle className="text-xl text-slate-50 flex items-center gap-2">
            {payload.name}
            <Badge
              variant="outline"
              className="border-emerald-500/60 text-[10px] uppercase tracking-[0.16em] text-emerald-300"
            >
              DAO
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs text-slate-300">
            {payload.description ?? "DAO sin descripción"}
          </CardDescription>
        </div>
        <div className="space-y-1 text-right text-[11px] text-slate-400">
          <p className="font-mono break-all">{dao.entityKey}</p>
          {createdAt && (
            <p>
              Creado:{" "}
              {createdAt.toLocaleString("es-AR", {
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
          Este board agrupa <strong>proposals</strong> y <strong>tasks</strong>{" "}
          que viven on-chain en Arkiv.
        </p>
      </CardContent>
    </Card>
  );
}
