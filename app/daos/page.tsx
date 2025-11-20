"use client";

import { useDaos } from "@/hooks/useDaos";
import { DaoCreateForm } from "@/components/dao/DaoCreateForm";
import { DaoList } from "@/components/dao/DaoList";

// Si estos no existen, podemos reemplazar por un <div className="mx-auto max-w-5xl px-4">...
import { Container } from "@/components/common/Container";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function DaosPage() {
  const { daos, loading, error, refetch } = useDaos();

  async function handleReload(): Promise<void> {
    await refetch();
  }

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
              DAOs registradas en Roxium DAO Ops
            </h1>
            <p className="max-w-2xl text-sm text-slate-300">
              Desde esta vista podés crear nuevas DAOs y explorar las que ya
              están persistidas en Arkiv a través del backend de RoxiumLabs.
              Cada DAO actúa como un contenedor de proposals y tasks on-chain.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <DaoCreateForm onCreated={handleReload} />
            <DaoList
              daos={daos}
              loading={loading}
              error={error}
              onReload={handleReload}
            />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}
