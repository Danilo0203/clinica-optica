"use client";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronsRight, ChevronRight, ChevronLeft, ChevronsLeft, Search } from "lucide-react";
import { Permiso } from "@/modules/administracion/interfaces/rol.interfaces";
import { IconPlus, IconTrash } from "@tabler/icons-react";

type TransferPermisosProps = {
  all: Permiso[]; // catálogo completo
  value: number[]; // IDs asignados (controlado desde el padre)
  onChange: (ids: number[]) => void;
  height?: number; // px
};

export default function TransferPermisos({ all, value, onChange, height = 280 }: TransferPermisosProps) {
  // selección dentro de cada lista
  const [selLeft, setSelLeft] = useState<number[]>([]); // disponibles
  const [selRight, setSelRight] = useState<number[]>([]); // asignados
  const [qLeft, setQLeft] = useState("");
  const [qRight, setQRight] = useState("");

  const assignedSet = useMemo(() => new Set(value), [value]);

  // ahora: LEFT = disponibles, RIGHT = asignados
  const available = useMemo(
    () => all.filter((p) => !assignedSet.has(p.id)).sort((a, b) => a.nombre.localeCompare(b.nombre)),
    [all, assignedSet]
  );
  const assigned = useMemo(
    () => all.filter((p) => assignedSet.has(p.id)).sort((a, b) => a.nombre.localeCompare(b.nombre)),
    [all, assignedSet]
  );

  const availableFiltered = useMemo(() => available.filter((p) => match(p, qLeft)), [available, qLeft]);
  const assignedFiltered = useMemo(() => assigned.filter((p) => match(p, qRight)), [assigned, qRight]);

  // ids visibles por filtro en cada lado
  const leftIdsFiltered = availableFiltered.map((p) => p.id);
  const rightIdsFiltered = assignedFiltered.map((p) => p.id);

  const toggleSelLeft = (id: number) =>
    setSelLeft((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleSelRight = (id: number) =>
    setSelRight((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // 👉 asignar (izq → der): agrega ids a value
  const assign = (ids: number[]) => {
    if (!ids.length) return;
    const next = Array.from(new Set([...value, ...ids]));
    onChange(next);
    setSelLeft([]);
  };

  // 👈 desasignar (der → izq): quita ids de value
  const unassign = (ids: number[]) => {
    if (!ids.length) return;
    const next = value.filter((id) => !ids.includes(id));
    onChange(next);
    setSelRight([]);
  };

  const assignSelected = () => assign(selLeft);
  const unassignSelected = () => unassign(selRight);
  const assignAllLeftFiltered = () => assign(leftIdsFiltered);
  const unassignAllRightFilt = () => unassign(rightIdsFiltered);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
      {/* LEFT: Disponibles */}
      <Card className="border-muted">
        <CardHeader className="py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Disponibles</CardTitle>
            <Badge variant="secondary">{available.length}</Badge>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4" />
            <Input
              value={qLeft}
              onChange={(e) => setQLeft(e.target.value)}
              placeholder="Buscar disponibles..."
              className="pl-8"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelLeft(leftIdsFiltered)}
              disabled={!leftIdsFiltered.length}
            >
              <IconPlus className="size-4" />
              Seleccionar todos
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hover:bg-red-400/20! hover:text-red-400!"
              onClick={() => setSelLeft([])}
              disabled={!selLeft.length}
            >
              <IconTrash className="size-4" />
              Limpiar selección
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-2">
          <ScrollArea style={{ height }}>
            <ul className="space-y-1">
              {availableFiltered.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/60"
                  onDoubleClick={() => assign([p.id])} // doble click asigna
                >
                  <Checkbox checked={selLeft.includes(p.id)} onCheckedChange={() => toggleSelLeft(p.id)} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{p.nombre}</span>
                    <span className="text-xs text-muted-foreground">{p.descripcion}</span>
                  </div>
                  {!p.activo ? (
                    <Badge variant="destructive" className="ml-auto">
                      inactivo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="ml-auto bg-green-400/20 text-green-400">
                      activo
                    </Badge>
                  )}
                </li>
              ))}
              {!availableFiltered.length && (
                <li className="text-sm text-muted-foreground px-2 py-4">Sin resultados.</li>
              )}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* CENTER: controles (» asignar / « desasignar) */}
      <div className="flex md:flex-col items-center justify-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={assignAllLeftFiltered}
          disabled={!leftIdsFiltered.length}
          title="Asignar todos los filtrados"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={assignSelected}
          disabled={!selLeft.length}
          title="Asignar seleccionados"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={unassignSelected}
          disabled={!selRight.length}
          title="Quitar seleccionados"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={unassignAllRightFilt}
          disabled={!rightIdsFiltered.length}
          title="Quitar todos los filtrados"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* RIGHT: Asignados */}
      <Card className="border-muted">
        <CardHeader className="py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Asignados</CardTitle>
            <Badge variant="secondary">{assigned.length}</Badge>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4" />
            <Input
              value={qRight}
              onChange={(e) => setQRight(e.target.value)}
              placeholder="Buscar asignados..."
              className="pl-8"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelRight(rightIdsFiltered)}
              disabled={!rightIdsFiltered.length}
            >
              <IconPlus className="size-4" />
              Seleccionar filtrados
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="hover:bg-red-400/20! hover:text-red-400!"
              onClick={() => setSelRight([])}
              disabled={!selRight.length}
            >
              <IconTrash className="size-4" />
              Limpiar selección
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-2">
          <ScrollArea style={{ height }}>
            <ul className="space-y-1">
              {assignedFiltered.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/60"
                  onDoubleClick={() => unassign([p.id])} // doble click desasigna
                >
                  <Checkbox checked={selRight.includes(p.id)} onCheckedChange={() => toggleSelRight(p.id)} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{p.nombre}</span>
                    <span className="text-xs text-muted-foreground">{p.descripcion}</span>
                  </div>
                  {!p.activo ? (
                    <Badge variant="destructive" className="ml-auto">
                      inactivo
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="ml-auto bg-green-400/20 text-green-400">
                      activo
                    </Badge>
                  )}
                </li>
              ))}
              {!assignedFiltered.length && <li className="text-sm text-muted-foreground px-2 py-4">Sin resultados.</li>}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

function match(p: Permiso, q: string) {
  if (!q) return true;
  const t = q.trim().toLowerCase();
  return (
    p.nombre.toLowerCase().includes(t) ||
    p.codigo.toLowerCase().includes(t) ||
    (p.descripcion?.toLowerCase().includes(t) ?? false)
  );
}
