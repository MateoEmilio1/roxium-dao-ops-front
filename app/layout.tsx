// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roxium DAO Ops | Arkiv-powered DAO Control",
  description:
    "Orquesta tus DAOs, propuestas y tareas con persistencia on-chain usando Arkiv como capa de datos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#050816] text-slate-100">
        {children}
      </body>
    </html>
  );
}
