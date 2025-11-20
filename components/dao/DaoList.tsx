// components/dao/DaoList.tsx
"use client";

import Link from "next/link";
import type { DaoEntity } from "@/services/daoService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface DaoListProps {
  daos: DaoEntity[];
  loading: boolean;
  error: string | null;
  onReload?: () => void | Promise<void>;
}

export function DaoList({ daos, loading, error, onReload }: DaoListProps) {
  async function handleReloadClick() {
    if (!onReload) return;
    const maybePromise = onReload();
    if (maybePromise instanceof Promise) {
      await maybePromise;
    }
  }

  return (
    <Card className="border-white/10 bg-black/40">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div>
          <CardTitle className="text-base">DAOs on-chain</CardTitle>
          <CardDescription className="text-xs">
            DAOs registradas en Arkiv a través del backend de RoxiumLabs.
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void handleReloadClick()}
        >
          Refrescar
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading && (
          <p className="text-xs text-slate-400">Cargando DAOs desde Arkiv...</p>
        )}

        {error && (
          <p className="text-xs text-red-400">Error al cargar DAOs: {error}</p>
        )}

        {!loading && !error && daos.length === 0 && (
          <p className="text-xs text-slate-400">
            Todavía no hay DAOs creadas. Usá el formulario para crear la primera
            🚀
          </p>
        )}

        <div className="space-y-2">
          {daos.map((dao, index) => {
            const payload = dao.payload;
            const attrs = dao.attributes ?? {};
            if (!payload) return null;

            const name = payload.name ?? "(DAO sin nombre)";
            const description = payload.description ?? "";
            const createdAt = payload.createdAt
              ? new Date(payload.createdAt)
              : null;

            const daoKey = dao.entityKey ?? null;

            // key estable: si tenemos id lo usamos, si no, el índice
            const stableKey =
              typeof payload.id !== "undefined"
                ? `dao-${payload.id}`
                : `dao-${index}`;

            return (
              <div
                key={stableKey}
                className="rounded-md border border-slate-800/80 bg-black/60 p-3 text-xs sm:text-sm"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100">
                        {name}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-emerald-500/60 text-[10px] uppercase tracking-[0.16em] text-emerald-300"
                      >
                        {attrs.type ?? "dao"}
                      </Badge>
                    </div>

                    {description && (
                      <p className="text-[11px] text-slate-400">
                        {description}
                      </p>
                    )}

                    <p className="font-mono text-[10px] text-emerald-300/80 break-all">
                      owner: {attrs.ownerAddress ?? payload.ownerAddress}
                    </p>

                    {createdAt && (
                      <p className="text-[10px] text-slate-500">
                        Creado:{" "}
                        {createdAt.toLocaleString("es-AR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start justify-end">
                    {daoKey ? (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/daos/${daoKey}`}>Ver board</Link>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        Ver board (sin entityKey)
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
