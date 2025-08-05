"use client";
import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useQueryRol } from "@/modules/administracion/hooks/rol/useQueryRol";
import { useQuerySucursal } from "@/modules/administracion/hooks/sucursal/useQuerySucursal";
import { useQueryUsuarioId } from "@/modules/administracion/hooks/usuarios/useQueryUsuarios";
import { UsuarioType } from "@/modules/administracion/interfaces/usuario.interfaces";
import { Usuario, usuarioSchema } from "@/modules/administracion/schemas/usuario.schema";
import { crearUsuario } from "@/modules/administracion/services/usuario.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UsuariosForm({
  initialData,
  pageTitle,
}: {
  initialData?: UsuarioType | null;
  pageTitle: string;
}) {
  const form = useForm<Usuario>({
    resolver: zodResolver(usuarioSchema),
    values: {
      username: initialData?.username || "",
      nombre_completo: initialData?.nombre_completo || "",
      email: initialData?.email || "",
      fotografia: initialData?.fotografia ? [initialData.fotografia] : null,
      rol: initialData?.rol?.toString() || "",
      sucursal: initialData?.sucursal?.toString() || "",
      is_active: initialData?.is_active ?? true,
      is_staff: initialData?.is_staff ?? true,
      password: "",
      confirmar_password: "",
    },
    mode: "onChange",
  });
  const router = useRouter();

  async function onSubmit(values: Usuario) {
    console.log("Formulario enviado con los siguientes valores:", values);
    try {
      const res = await crearUsuario(values);
      toast.success(`Usuario ${res.nombre_completo} creado exitosamente`);
      form.reset();
      router.push("/administracion/usuarios");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      toast.error("Error al crear el usuario. Por favor, inténtelo de nuevo.");
    }
  }

  const { rolQuery } = useQueryRol();
  const { sucursalQuery } = useQuerySucursal();
  const listRoles = rolQuery.data || [];
  const listSucursales = sucursalQuery.data || [];
  const [openSucursal, setOpenSucursal] = useState(false);
  const [openRol, setOpenRol] = useState(false);

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">{pageTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fotografia"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>Fotografía</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value ?? undefined}
                        onValueChange={field.onChange}
                        maxFiles={1}
                        maxSize={4 * 1024 * 1024}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el nombre de usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nombre_completo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el nombre completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Ingrese el correo electrónico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rol"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Rol</FormLabel>
                    <Popover open={openRol} onOpenChange={setOpenRol}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value
                              ? listRoles.find((rol) => rol.id.toString() === field.value)?.nombre ||
                                "Seleccione un rol"
                              : "Seleccione un rol"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Buscar rol..." />
                          <CommandList>
                            <CommandEmpty>No se encontraron roles.</CommandEmpty>
                            <CommandGroup>
                              {listRoles.map((rol) => (
                                <CommandItem
                                  value={rol.nombre}
                                  key={rol.id}
                                  onSelect={() => {
                                    form.setValue("rol", rol.id.toString());
                                    setOpenRol(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      rol.id.toString() === field.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {rol.nombre}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sucursal"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Sucursal</FormLabel>
                    <Popover open={openSucursal} onOpenChange={setOpenSucursal}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value
                              ? listSucursales.find((sucursal) => sucursal.id.toString() === field.value)?.nombre ||
                                "Seleccione una sucursal"
                              : "Seleccione una sucursal"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Buscar sucursal..." />
                          <CommandList>
                            <CommandEmpty>No se encontraron sucursales.</CommandEmpty>
                            <CommandGroup>
                              {listSucursales.map((sucursal) => (
                                <CommandItem
                                  value={sucursal.nombre}
                                  key={sucursal.id}
                                  onSelect={() => {
                                    form.setValue("sucursal", sucursal.id.toString());
                                    setOpenSucursal(false);
                                  }}
                                  className="flex flex-col items-start py-3"
                                >
                                  <div className="flex items-center w-full">
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4 shrink-0",
                                        sucursal.id.toString() === field.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-medium">{sucursal.nombre}</span>
                                        <span
                                          className={cn(
                                            "px-2 py-1 text-xs rounded-full",
                                            sucursal.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                          )}
                                        >
                                          {sucursal.activo ? "Activo" : "Inactivo"}
                                        </span>
                                      </div>
                                      <div className="text-sm text-muted-foreground mt-1">
                                        <div>Responsable: {sucursal.responsable}</div>
                                        <div>{sucursal.direccion}</div>
                                      </div>
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Ingrese la contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmar_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirme la contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Guardar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
