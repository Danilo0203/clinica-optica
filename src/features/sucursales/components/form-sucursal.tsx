"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Sucursal } from "@/modules/administracion/schemas/sucursal.schema";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { useQueryUusarios } from "@/modules/administracion/hooks/usuarios/useQueryUsuarios";

interface FormValues {
  form: UseFormReturn<Sucursal>;
  onSubmit: SubmitHandler<Sucursal>;
}
export const FormSucursal = ({ form, onSubmit }: FormValues) => {
  const [open, setOpen] = useState(false);
  const { usuariosQuery } = useQueryUusarios();
  const usuariosOptions = useMemo(() => {
    const usuarios = usuariosQuery.data?.usuarios ?? [];
    return usuarios.map((usuario) => ({
      value: usuario.id.toString(),
      label: usuario.nombre_completo,
    }));
  }, [usuariosQuery.data?.usuarios]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" placeholder="Ej: 12345678" pattern="[0-9]{9}" title="Debe ser un número de 8 dígitos" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="responsable"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsable</FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                        {field.value ? usuariosOptions.find((usuario) => usuario.value === field.value.toString())?.label : "Responsable..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <div className="flex items-center border-b">
                          <CommandInput
                            placeholder="Buscar usuario..."
                            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <CommandList>
                          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                          <CommandGroup>
                            {usuariosOptions.map((usuario) => (
                              <CommandItem
                                key={usuario.value}
                                value={usuario.value}
                                onSelect={(currentValue) => {
                                  const nextValue = currentValue === field.value ? "" : currentValue;
                                  field.onChange(nextValue);
                                  setOpen(false);
                                }}
                              >
                                <Check className={cn("mr-2 h-4 w-4", field.value === usuario.value ? "opacity-100" : "opacity-0")} />
                                {usuario.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="activo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="mb-2">Estado del Sucursal</FormLabel>
                <FormDescription>
                  <Badge variant={field.value ? "default" : "destructive"}>{field.value ? "Activo" : "Inactivo"}</Badge>
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
