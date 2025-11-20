// components/home/Hero.tsx
import { Container } from "../common/Container";

export function Hero() {
  return (
    <section className="border-b border-white/10 bg-gradient-to-b from-[#050816] via-[#020617] to-black">
      <Container>
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              On-chain DAO Ops
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
              Orquestá tus DAOs, propuestas y tasks{" "}
              <span className="text-emerald-300">sobre Arkiv</span>.
            </h1>

            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Este panel convierte la estructura clásica{" "}
              <span className="font-mono text-emerald-200">
                DAO → Proposal → Task
              </span>{" "}
              en entidades on-chain usando Arkiv. Cada decisión, tarea y rol
              queda registrada con TTL, queries avanzadas y eventos en tiempo
              real.
            </p>

            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Creá DAOs y miembros sin exponer claves en el frontend.</li>
              <li>
                • Definí propuestas con deadlines on-chain y TTL explícito.
              </li>
              <li>
                • Rompé tu roadmap en tasks trackeables y consultables por
                Arkiv.
              </li>
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#dev"
                className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-medium text-black shadow-md shadow-emerald-500/30 hover:bg-emerald-300"
              >
                Empezar a construir
              </a>
              <a
                href="#how-it-works"
                className="rounded-md border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 hover:border-emerald-400/70 hover:text-emerald-200"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>

          <div className="mt-4 flex-1 md:mt-0">
            <div className="rounded-xl border border-emerald-500/40 bg-black/40 p-4 shadow-[0_0_60px_-30px_rgba(16,185,129,0.8)]">
              <pre className="max-h-80 overflow-auto text-xs text-emerald-100">
                {`dao: Roxium DAO Ops
  ├─ proposal: "Daily standup a las 9:30?"
  │    ├─ task: "Actualizar calendario"
  │    └─ task: "Avisar en canal #dev"
  └─ proposal: "Nueva política de PR review"
       └─ task: "Configurar reglas en GitHub"

storage: Arkiv · Mendoza Testnet
TTL-aware · Queryable · Subscribable`}
              </pre>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
