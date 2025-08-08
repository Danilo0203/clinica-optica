"use client";

import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useQueryPermiso } from "@/modules/administracion/hooks/permiso/useQueryPermiso";
import { AsigarPermisosARol, asignarPermisosARolSchema } from "@/modules/administracion/schemas/rol.schema";
import { Controller, SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const FormAsignarPermisosRol = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<AsigarPermisosARol>;
  onSubmit: SubmitHandler<AsigarPermisosARol>;
}) => {
  const { permisoQuery } = useQueryPermiso();

  if (permisoQuery.isLoading) return <p>Cargando permisos…</p>;
  if (permisoQuery.isError) return <p>Error al cargar permisos</p>;

  const permisos = permisoQuery.data!;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          control={form.control}
          name="permisos"
          render={({ field, fieldState }) => {
            // Filtrar disponibles y asignados según field.value (array de IDs)
            const asignados = permisos.filter((p) => field.value.includes(p.id));
            const disponibles = permisos.filter((p) => !field.value.includes(p.id));

            // estado local para las selecciones de cada caja
            const [selDisp, setSelDisp] = useState<number[]>([]);
            const [selAsig, setSelAsig] = useState<number[]>([]);

            return (
              <FormItem>
                <FormLabel>Permisos</FormLabel>
                <div className="flex gap-4">
                  {/* Lista Disponibles */}
                  <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium">Disponibles</label>
                    <select
                      multiple
                      size={10}
                      className="w-full border rounded p-1"
                      value={selDisp.map(String)}
                      onChange={(e) => {
                        const opts = Array.from(e.target.selectedOptions).map((o) => parseInt(o.value, 10));
                        setSelDisp(opts);
                      }}
                    >
                      {disponibles.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Botones de traslado */}
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <button
                      type="button"
                      className="px-2 py-1 border rounded disabled:opacity-50"
                      disabled={selDisp.length === 0}
                      onClick={() => {
                        field.onChange([...field.value, ...selDisp]);
                        setSelDisp([]);
                      }}
                    >
                      &gt;
                    </button>
                    <button
                      type="button"
                      className="px-2 py-1 border rounded disabled:opacity-50"
                      disabled={selAsig.length === 0}
                      onClick={() => {
                        field.onChange(field.value.filter((id) => !selAsig.includes(id)));
                        setSelAsig([]);
                      }}
                    >
                      &lt;
                    </button>
                    <hr className="w-full" />
                    <button type="button" className="px-2 py-1 border rounded" onClick={() => field.onChange(permisos.map((p) => p.id))}>
                      &gt;&gt;
                    </button>
                    <button type="button" className="px-2 py-1 border rounded" onClick={() => field.onChange([])}>
                      &lt;&lt;
                    </button>
                  </div>

                  {/* Lista Asignados */}
                  <div className="flex-1">
                    <label className="block mb-1 text-sm font-medium">Asignados</label>
                    <select
                      multiple
                      size={10}
                      className="w-full border rounded p-1"
                      value={selAsig.map(String)}
                      onChange={(e) => {
                        const opts = Array.from(e.target.selectedOptions).map((o) => parseInt(o.value, 10));
                        setSelAsig(opts);
                      }}
                    >
                      {asignados.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
};

// Hook de ejemplo para inicializar y usar en tu modal
export function useFormAsignarPermisosRol(setOpen: (o: boolean) => void) {
  const form = useForm<AsigarPermisosARol>({
    defaultValues: { permisos: [] },
    resolver: zodResolver(asignarPermisosARolSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<AsigarPermisosARol> = async (data) => {
    // aquí llamas a tu mutate para enviar { permisos: data.permisos } al endpoint
    // p.ej. await mutateAsignarPermisos.mutateAsync({ permisos: data.permisos }, rolId)
    setOpen(false);
  };

  return { form, onSubmit };
}
