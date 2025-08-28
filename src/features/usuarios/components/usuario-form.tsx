"use client";
import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useQueryRol } from "@/modules/administracion/hooks/rol/useQueryRol";
import { useQuerySucursal } from "@/modules/administracion/hooks/sucursal/useQuerySucursal";
import { useQueryUsuarioId } from "@/modules/administracion/hooks/usuarios/useQueryUsuarios";
import { UsuarioType } from "@/modules/administracion/interfaces/usuario.interfaces";
import { Usuario, usuarioSchema } from "@/modules/administracion/schemas/usuario.schema";
import { actualizarUsuario, crearUsuario } from "@/modules/administracion/services/usuario.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  console.log(initialData);
  const isEdit = Boolean(initialData);
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
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: Usuario) {
    const { dirtyFields } = form.formState;

    // Crear vs Editar estaba invertido. Si hay initialData => EDITAR, sino => CREAR
    if (!isEdit) {
      try {
        const payload = {
          username: values.username,
          nombre_completo: values.nombre_completo,
          email: values.email,
          fotografia:
            Array.isArray(values.fotografia) && values.fotografia.length > 0 ? values.fotografia[0] : undefined,
          rol: values.rol ? Number(values.rol) : undefined,
          sucursal: values.sucursal ? Number(values.sucursal) : undefined,
          is_active: values.is_active,
          is_staff: values.is_staff,
          password: values.password,
          confirmar_password: values.confirmar_password,
        } as const;

        const res = await crearUsuario(payload as unknown as Usuario);
        toast.success(`Usuario ${res.nombre_completo} creado exitosamente`);
        form.reset();
        router.push("/administracion/usuarios");
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Error al crear el usuario:", error);
          toast.error(error.response?.data?.error || "Error al crear el usuario. Por favor, inténtelo de nuevo.");
        } else {
          console.error("Error inesperado:", error);
          toast.error("Error inesperado al crear el usuario.");
        }
      }
      return;
    }

    // MODO EDICIÓN: enviar solo los campos modificados
    const patch: Partial<Usuario> = {};

    if (dirtyFields.username) patch.username = values.username;
    if (dirtyFields.nombre_completo) patch.nombre_completo = values.nombre_completo;
    if (dirtyFields.email) patch.email = values.email;
    if (dirtyFields.fotografia) {
      // si usas single file, tomar primer valor
      const foto = Array.isArray(values.fotografia) ? values.fotografia[0] : values.fotografia;
      if (foto) (patch as any).fotografia = foto;
    }
    if (dirtyFields.rol) patch.rol = values.rol ? values.rol : undefined;
    if (dirtyFields.sucursal) patch.sucursal = values.sucursal ? values.sucursal : undefined;
    if (dirtyFields.is_active) patch.is_active = values.is_active;
    if (dirtyFields.is_staff) patch.is_staff = values.is_staff;

    // Password solo si se cambió y coincide la confirmación
    const changedPassword = dirtyFields.password || dirtyFields.confirmar_password;
    if (changedPassword) {
      if (values.password && values.confirmar_password && values.password === values.confirmar_password) {
        patch.password = values.password;
        (patch as any).confirmar_password = values.confirmar_password;
      } else {
        toast.error("Las contraseñas no coinciden o están incompletas.");
        return;
      }
    }

    // Si no hay nada que actualizar, notificar y salir
    if (Object.keys(patch).length === 0) {
      toast.message("No hay cambios para guardar.");
      return;
    }

    try {
      const res = await actualizarUsuario({ id: initialData?.id ?? 0, values: patch });
      toast.success(`Usuario ${res?.nombre_completo ?? values.nombre_completo} actualizado correctamente`);
      router.push("/administracion/usuarios");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al actualizar el usuario:", error);
        toast.error(error.response?.data?.error || "Error al actualizar el usuario. Por favor, inténtelo de nuevo.");
      } else {
        console.error("Error inesperado:", error);
        toast.error("Error inesperado al actualizar el usuario.");
      }
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
        <p className="text-sm text-muted-foreground">
          Complete los datos del usuario. Los campos marcados con * son obligatorios.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* <div>
              <h3 className="text-lg font-semibold">Fotografía</h3>
              <p className="text-sm text-muted-foreground mb-4">Opcional. Formato JPG/PNG, máximo 4MB.</p>
              <FormField
                control={form.control}
                name="fotografia"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormItem className="w-full">
                      <FormLabel>Subir fotografía</FormLabel>
                      <FormControl>
                        <FileUploader
                          value={field.value ?? undefined}
                          onValueChange={field.onChange}
                          maxFiles={1}
                          maxSize={4 * 1024 * 1024}
                        />
                      </FormControl>
                      <FormDescription>Esta imagen se mostrará en el perfil del usuario.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            </div>
            <hr className="my-6" /> */}

            <h3 className="text-lg font-semibold mb-0">Datos básicos *</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nombre de usuario, nombre completo y correo electrónico.
            </p>
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
            </div>
            <hr className="my-6" />
            <h3 className="text-lg font-semibold mb-0">Asignación *</h3>
            <p className="text-sm text-muted-foreground mb-4">Seleccione el rol y la sucursal para el usuario.</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Activo</FormLabel>
                      <FormDescription>Si está desactivado, el usuario no podrá iniciar sesión.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="is_staff"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Staff</FormLabel>
                      <FormDescription>Otorga acceso a herramientas internas del panel.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              /> */}
            </div>
            <hr className="my-6" />

            <h3 className="text-lg font-semibold mb-0">Credenciales *</h3>
            <p className="text-sm text-muted-foreground mb-4">Cree una contraseña segura para el usuario.</p>
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
                    <FormDescription>Mínimo 8 caracteres. Use mayúsculas, minúsculas y números.</FormDescription>
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
                    <FormDescription>Debe coincidir con la contraseña.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/administracion/usuarios">Cancelar</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
