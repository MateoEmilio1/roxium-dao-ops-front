// app/daos/[daoKey]/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { useDaoBoard } from "@/hooks/useDaos";

import { DaoBoardHeader } from "@/components/dao/DaoBoardHeader";
import { ProposalCreateForm } from "@/components/proposal/ProposalCreateForm";
import { ProposalList } from "@/components/proposal/ProposalList";
import { TaskCreateForm } from "@/components/task/TaskCreateForm";
import { TaskList } from "@/components/task/TaskList";

import { Container } from "@/components/common/Container";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function DaoBoardPage() {
  // ✅ En app router usamos useParams en componentes client
  const params = useParams<{ daoKey?: string }>();
  const daoKey = params.daoKey ?? null;

  // DAO + proposals + tasks desde el backend / Arkiv
  const { dao, proposals, tasks, loading, error, refetch } =
    useDaoBoard(daoKey);

  // Sólo guardamos lo que el user selecciona explícitamente
  const [userSelectedProposalKey, setUserSelectedProposalKey] = useState<
    string | null
  >(null);

  // Proposal seleccionada (user → primera → null)
  const selectedProposalKey = useMemo<string | null>(() => {
    if (userSelectedProposalKey) return userSelectedProposalKey;
    if (proposals.length > 0) {
      return proposals[0].entityKey;
    }
    return null;
  }, [userSelectedProposalKey, proposals]);

  // Tasks filtradas por proposalKey
  const tasksForSelectedProposal = useMemo(
    () =>
      selectedProposalKey
        ? tasks.filter(
            (task) => task.payload?.proposalKey === selectedProposalKey
          )
        : [],
    [tasks, selectedProposalKey]
  );

  async function handleReload(): Promise<void> {
    await refetch();
  }

  // Si no hay daoKey en la URL
  if (!daoKey) {
    return (
      <div className="flex min-h-screen flex-col bg-[#050816] text-slate-100">
        <SiteHeader />
        <main className="flex-1 py-8">
          <Container>
            <p className="text-sm text-red-400">
              No se encontró el parámetro <code>daoKey</code> en la URL.
            </p>
          </Container>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const hasDao = !!dao && !!dao.payload;

  return (
    <div className="flex min-h-screen flex-col bg-[#050816] text-slate-100">
      <SiteHeader />
      <main className="flex-1 py-8">
        <Container>
          <div className="mb-6 space-y-2">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-300/80">
              Arkiv · Mendoza Testnet
            </p>
            <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
              DAO Board
            </h1>
            <p className="max-w-2xl text-sm text-slate-300">
              Visualizá y administrá las proposals y tasks de este DAO. Todo se
              persiste en Arkiv a través del backend de RoxiumLabs.
            </p>
          </div>

          {!hasDao && loading && (
            <p className="mb-4 text-xs text-slate-400">
              Cargando información del DAO desde Arkiv…
            </p>
          )}

          {!hasDao && !loading && !error && (
            <p className="mb-4 text-xs text-red-400">
              No se encontró información del DAO en Arkiv.
            </p>
          )}

          {error && (
            <p className="mb-4 text-xs text-red-400">
              Error al cargar el board: {error}
            </p>
          )}

          {hasDao && (
            <>
              <div className="mb-6">
                <DaoBoardHeader dao={dao} />
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)_minmax(0,1.1fr)]">
                {/* Columna 1: Crear Proposal */}
                <ProposalCreateForm daoKey={daoKey} onCreated={handleReload} />

                {/* Columna 2: Lista de Proposals */}
                <ProposalList
                  proposals={proposals}
                  loading={loading}
                  error={error}
                  selectedProposalKey={selectedProposalKey}
                  onSelectProposal={setUserSelectedProposalKey}
                  onReload={handleReload}
                />

                {/* Columna 3: Tasks de la proposal seleccionada */}
                <div className="space-y-4">
                  <TaskList
                    tasks={tasksForSelectedProposal}
                    loading={loading}
                    error={error}
                  />
                  <TaskCreateForm
                    daoKey={daoKey}
                    proposalKey={selectedProposalKey}
                    onCreated={handleReload}
                  />
                </div>
              </div>
            </>
          )}
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}
