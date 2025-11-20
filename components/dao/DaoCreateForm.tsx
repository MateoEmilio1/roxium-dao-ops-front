"use client";

import { FormEvent, useState } from "react";
import { useCreateDao } from "@/hooks/useDaos";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface DaoCreateFormProps {
  onCreated?: () => void | Promise<void>;
}

export function DaoCreateForm({ onCreated }: DaoCreateFormProps) {
  const { mutate: createDao, loading, error } = useCreateDao();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;

    await createDao({
      name: name.trim(),
      description: description.trim() || undefined,
    });

    setName("");
    setDescription("");

    if (onCreated) {
      const maybePromise = onCreated();
      if (maybePromise instanceof Promise) {
        await maybePromise;
      }
    }
  }

  return (
    <Card className="border-white/10 bg-black/40">
      <CardHeader>
        <CardTitle className="text-base">Crear nuevo DAO</CardTitle>
        <CardDescription className="text-xs">
          Definí el espacio donde se van a agrupar propuestas y tareas
          operativas. Cada DAO se persiste como una entidad en Arkiv.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-200">
              Nombre del DAO
            </label>
            <Input
              placeholder="Ej: Roxium Core Contributors"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-200">
              Descripción (opcional)
            </label>
            <Textarea
              rows={3}
              placeholder="¿Cuál es el propósito de este DAO? ¿Qué decisiones se toman acá?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-xs text-red-400">
              Error al crear el DAO: {error}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={loading || !name.trim()}
            className="w-full sm:w-auto"
          >
            {loading ? "Creando DAO..." : "Crear DAO"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
