// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roxium DAO Ops | Arkiv-powered DAO Control",
  description:
    "Orchestrate your DAOs, proposals, and tasks with on-chain persistence using Arkiv as the data layer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050816] text-slate-100">
        {children}
      </body>
    </html>
  );
}
