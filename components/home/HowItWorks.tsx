// components/home/HowItWorks.tsx
import { Container } from "../common/Container";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-white/10 py-12">
      <Container>
        <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
          Cómo funciona debajo del capó
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-3 text-sm text-slate-300">
            <ol className="space-y-2 list-decimal list-inside">
              <li>
                El frontend (Next.js) llama a un backend de RoxiumLabs via REST.
              </li>
              <li>
                El backend usa el SDK de Arkiv para crear entidades:
                <span className="font-mono text-emerald-200">
                  {" "}
                  dao, user-on-dao, proposal, task
                </span>
                .
              </li>
              <li>
                Cada entidad se guarda con metadatos: status, deadlines, ids y
                relaciones (daoKey / proposalKey).
              </li>
              <li>
                El frontend consulta vistas agregadas: un board por DAO, detalle
                por proposal, etc.
              </li>
            </ol>
            <p className="text-xs text-slate-400">
              Todo esto sin exponer la private key ni el RPC de Arkiv en el
              navegador. El front sólo ve JSON amigable.
            </p>
          </div>

          <div
            id="dev"
            className="rounded-lg border border-emerald-400/40 bg-black/40 p-4 text-xs text-emerald-100"
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300">
              Dev flow
            </p>
            <pre className="whitespace-pre-wrap">
              {`// 1) Crear DAO
POST /api/arkiv/daos

// 2) Crear proposal para ese DAO
POST /api/arkiv/proposals

// 3) Crear tasks vinculadas
POST /api/arkiv/tasks

// 4) Leer todo en un board
GET /api/arkiv/daos/:daoKey/board`}
            </pre>
          </div>
        </div>
      </Container>
    </section>
  );
}
