"use client";

import type { ProposalEntity } from "@/services/daoService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ProposalListProps {
  proposals: ProposalEntity[];
  loading: boolean;
  error: string | null;
  selectedProposalKey: string | null;
  onSelectProposal: (proposalKey: string) => void;
  onReload?: () => void | Promise<void>;
}

export function ProposalList({
  proposals,
  loading,
  error,
  selectedProposalKey,
  onSelectProposal,
  onReload,
}: ProposalListProps) {
  async function handleReloadClick() {
    if (!onReload) return;
    const maybe = onReload();
    if (maybe instanceof Promise) {
      await maybe;
    }
  }

  return (
    <Card className="border-white/10 bg-black/40">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div>
          <CardTitle className="text-base">Proposals</CardTitle>
          <CardDescription className="text-xs">
            Operational proposals and decisions that live as Arkiv entities.
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void handleReloadClick()}
        >
          Refresh
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading && (
          <p className="text-xs text-slate-400">
            Loading proposals from Arkiv...
          </p>
        )}

        {error && (
          <p className="text-xs text-red-400">
            Error loading proposals: {error}
          </p>
        )}

        {!loading && !error && proposals.length === 0 && (
          <p className="text-xs text-slate-400">
            There are no proposals for this DAO yet. Create the first one on the
            side 👈
          </p>
        )}

        <div className="space-y-2">
          {proposals.map((proposal, index) => {
            // With our ProposalEntity type, entityKey is always string,
            // but we keep the guard just in case.
            if (!proposal.entityKey) return null;

            const payload = proposal.payload;
            if (!payload) return null;

            const isSelected = proposal.entityKey === selectedProposalKey;
            const createdAt = payload.createdAt
              ? new Date(payload.createdAt)
              : null;

            return (
              <button
                key={`${proposal.entityKey}-${index}`}
                type="button"
                onClick={() => onSelectProposal(proposal.entityKey)}
                className={[
                  "w-full rounded-md border px-3 py-2 text-left text-xs transition",
                  isSelected
                    ? "border-emerald-500/70 bg-emerald-500/10"
                    : "border-slate-800 bg-black/60 hover:border-emerald-500/50 hover:bg-black",
                ].join(" ")}
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
                      <p className="mt-1 text-[11px] text-slate-400 line-clamp-2">
                        {payload.description}
                      </p>
                    )}

                    <p className="mt-1 font-mono text-[10px] text-emerald-300/80 break-all">
                      {proposal.entityKey}
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
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
