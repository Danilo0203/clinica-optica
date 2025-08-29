"use client";

import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AsigarPermisosARol } from "@/modules/administracion/schemas/rol.schema";
import { UseFormReturn, SubmitHandler, useController } from "react-hook-form";
import { useMemo, useState, useEffect, useCallback, memo } from "react";
import { useQueryPermiso } from "@/modules/administracion/hooks/permiso/useQueryPermiso";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Search } from "lucide-react";
import { Label } from "@/components/ui/label";

type Permiso = { id: number; nombre: string; [k: string]: any };

// ---------- helpers puros (fuera de render) ----------
function toggleId(listSel: number[], id: number) {
  return listSel.includes(id) ? listSel.filter((x) => x !== id) : [...listSel, id];
}

function filtrarPorNombre<T extends { nombre: string }>(arr: T[], q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return arr;
  return arr.filter((p) => p.nombre.toLowerCase().includes(s));
}

function dedupe(ids: number[]) {
  return Array.from(new Set(ids));
}

// ---------- Lista memoizada ----------
type ListaProps = {
  titulo: string;
  variantBadge?: "secondary" | "default" | "outline";
  items: Permiso[];
  seleccionados: number[];
  setSeleccionados: (next: number[]) => void;
  q: string;
  setQ: (v: string) => void;
};

const ListaPermisos = memo(function ListaPermisos({
  titulo,
  variantBadge = "secondary",
  items,
  seleccionados,
  setSeleccionados,
  q,
  setQ,
}: ListaProps) {
  const todosVisible = useMemo(() => items.map((p) => p.id), [items]);
  const allChecked = items.length > 0 && seleccionados.length === items.length;

  const handleItemToggle = useCallback((id: number) => setSeleccionados(toggleId(seleccionados, id)), [seleccionados, setSeleccionados]);

  const handleAll = useCallback(
    (checked: boolean | "indeterminate") => {
      if (checked) setSeleccionados(todosVisible);
      else setSeleccionados([]);
    },
    [setSeleccionados, todosVisible]
  );

  return (
    <Card className="overflow-hidden gap-0">
      <CardHeader className="space-y-1 mb-4">
        <CardTitle className="flex items-center justify-between">
          <span>{titulo}</span>
          <Badge variant={variantBadge}>{items.length}</Badge>
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 opacity-60" />
          <Input className="pl-8" placeholder="Buscar…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id={`${titulo}-all`} checked={allChecked} onCheckedChange={handleAll} />
          <label htmlFor={`${titulo}-all`} className="text-sm">
            Seleccionar todo
          </label>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="h-56">
          <div className="min-h-56 max-h-56">
            <ul className="divide-y">
              {items.map((p) => {
                const checked = seleccionados.includes(p.id);
                return (
                  <li key={p.id}>
                    <Label
                      key={p.id}
                      className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-muted/50"
                      // onClick={() => handleItemToggle(p.id)}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          handleItemToggle(p.id);
                        }
                      }}
                      tabIndex={0}
                      aria-label={`${titulo} ${p.nombre}`}
                      htmlFor={`${p.id}`}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => handleItemToggle(p.id)}
                        onClick={(e) => e.stopPropagation()} // evita doble toggle
                        id={`${p.id}`}
                      />
                      <span className="truncate">{p.nombre}</span>
                    </Label>
                  </li>
                );
              })}
              {items.length === 0 && <div className="px-4 py-6 text-sm text-muted-foreground">No hay resultados</div>}
            </ul>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
});

// ---------- Componente principal ----------
export function FormAsignarPermisosRol({ form, onSubmit }: { form: UseFormReturn<AsigarPermisosARol>; onSubmit: SubmitHandler<AsigarPermisosARol> }) {
  // Hook 1: siempre se llama
  const { permisoQuery } = useQueryPermiso();

  // Hooks locales: siempre se llaman
  const [qDisp, setQDisp] = useState("");
  const [qAsig, setQAsig] = useState("");
  const [selDisp, setSelDisp] = useState<number[]>([]);
  const [selAsig, setSelAsig] = useState<number[]>([]);

  // Hook RHF: siempre se llama
  const { field: permisosField, fieldState: permisosFieldState } = useController({
    control: form.control,
    name: "permisos",
    defaultValue: [],
  });

  // Derivados seguros aunque no haya data
  const value: number[] = permisosField.value ?? [];
  const permisos: Permiso[] = (permisoQuery.data as Permiso[]) ?? [];

  // Hook de reset: siempre se llama
  const permisosKey = useMemo(() => (permisos.length ? permisos.map((p) => p.id).join(",") : ""), [permisos]);
  useEffect(() => {
    setSelDisp([]);
    setSelAsig([]);
  }, [permisosKey]);

  // Particiones y filtros: siempre se crean con arrays seguros
  const asignados = useMemo(() => permisos.filter((p) => value.includes(p.id)), [permisos, value]);
  const disponibles = useMemo(() => permisos.filter((p) => !value.includes(p.id)), [permisos, value]);
  const dispFiltrados = useMemo(() => filtrarPorNombre(disponibles, qDisp), [disponibles, qDisp]);
  const asigFiltrados = useMemo(() => filtrarPorNombre(asignados, qAsig), [asignados, qAsig]);

  // Acciones (useCallback) — también siempre definidas
  const moverADerecha = useCallback(() => {
    if (!selDisp.length) return;
    permisosField.onChange(dedupe([...value, ...selDisp]));
    setSelDisp([]);
  }, [selDisp, value, permisosField]);

  const moverAIzquierda = useCallback(() => {
    if (!selAsig.length) return;
    permisosField.onChange(value.filter((id) => !selAsig.includes(id)));
    setSelAsig([]);
  }, [selAsig, value, permisosField]);

  const moverTodosDerecha = useCallback(() => {
    if (!disponibles.length) return;
    permisosField.onChange(dedupe([...value, ...disponibles.map((p) => p.id)]));
    setSelDisp([]);
  }, [disponibles, value, permisosField]);

  const moverTodosIzquierda = useCallback(() => {
    if (!value.length) return;
    permisosField.onChange([]);
    setSelAsig([]);
  }, [value.length, permisosField]);

  // Flags de UI (no hooks)
  const selDispAll = dispFiltrados.length > 0 && selDisp.length === dispFiltrados.length;
  const selAsigAll = asigFiltrados.length > 0 && selAsig.length === asigFiltrados.length;

  // --- Render SIEMPRE: condiciona contenido, no hooks ---
  const isLoading = permisoQuery.isLoading;
  const isError = permisoQuery.isError;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Loading/Error dentro del JSX, sin returns tempranos */}
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="h-64 animate-pulse rounded bg-muted" />
              <div className="h-64 animate-pulse rounded bg-muted" />
              <div className="h-64 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ) : isError ? (
          <p>Error al cargar permisos</p>
        ) : (
          <FormItem className="space-y-3">
            <FormLabel className="text-base">Permisos</FormLabel>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
              {/* DISPONIBLES */}
              <ListaPermisos
                titulo="Disponibles"
                variantBadge="secondary"
                items={dispFiltrados}
                seleccionados={selDisp}
                setSeleccionados={setSelDisp}
                q={qDisp}
                setQ={setQDisp}
              />

              {/* BOTONES */}
              <div className="flex flex-col items-center justify-center gap-2">
                <Button type="button" variant="outline" className="w-36" onClick={moverADerecha} disabled={selDisp.length === 0}>
                  <ChevronRight className="mr-2 h-4 w-4" />
                  Agregar
                </Button>
                <Button type="button" variant="outline" className="w-36" onClick={moverAIzquierda} disabled={selAsig.length === 0}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Quitar
                </Button>
                <Separator className="my-2 w-24" />
                <Button type="button" variant="ghost" className="w-36" onClick={moverTodosDerecha} disabled={disponibles.length === 0}>
                  <ChevronsRight className="mr-2 h-4 w-4" />
                  Todos
                </Button>
                <Button type="button" variant="ghost" className="w-36" onClick={moverTodosIzquierda} disabled={value.length === 0}>
                  <ChevronsLeft className="mr-2 h-4 w-4" />
                  Ninguno
                </Button>
              </div>

              {/* ASIGNADOS */}
              <ListaPermisos
                titulo="Asignados"
                variantBadge="default"
                items={asigFiltrados}
                seleccionados={selAsig}
                setSeleccionados={setSelAsig}
                q={qAsig}
                setQ={setQAsig}
              />
            </div>

            {/* Chips resumen */}
            <div className="space-y-2">
              <Separator />
              <div className="flex flex-wrap gap-2">
                {asignados.slice(0, 12).map((p) => (
                  <Badge key={p.id} variant="secondary" className="cursor-default">
                    {p.nombre}
                  </Badge>
                ))}
                {asignados.length > 12 && <Badge variant="outline">+{asignados.length - 12} más</Badge>}
                {asignados.length === 0 && <span className="text-sm text-muted-foreground">Aún no hay permisos asignados.</span>}
              </div>
            </div>

            <FormMessage>{permisosFieldState.error?.message}</FormMessage>
          </FormItem>
        )}
      </form>
    </Form>
  );
}
