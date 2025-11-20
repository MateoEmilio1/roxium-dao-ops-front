// components/home/Features.tsx
import { Container } from "../common/Container";

const FEATURES = [
  {
    title: "DAO-first, on-chain",
    description:
      "Cada DAO, proposal y task se guarda como entidad Arkiv, manteniendo el historial y la estructura en la capa de datos.",
  },
  {
    title: "TTL y deadlines reales",
    description:
      "Las proposals y tasks se crean con expiración (TTL), alineando los deadlines del equipo con el tiempo de vida on-chain.",
  },
  {
    title: "Lectura segura desde el frontend",
    description:
      "El frontend habla con un backend que firma y escribe en Arkiv; desde Next.js sólo hacés fetch de tus DAOs/proposals/tasks.",
  },
  {
    title: "Consultas y panel global",
    description:
      "Listá todas tus DAOs, proposals y tasks y construí vistas tipo Kanban, boards o dashboards personalizados.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-12">
      <Container>
        <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
          ¿Qué problema resuelve este panel?
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Muchas DAOs viven en docs, Discord y planillas. Acá el objetivo es que
          la estructura operativa quede anclada en Arkiv, pero sea usable para
          human@s: crear, leer y conectar DAOs, propuestas y tareas desde un
          frontend moderno.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold text-emerald-300">
                {f.title}
              </h3>
              <p className="mt-2 text-xs text-slate-200 sm:text-sm">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
