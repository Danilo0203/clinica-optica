"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { Usuario } from "@/modules/administracion/interfaces/usuario.interfaces";
import { IconEdit, IconTrash, IconKey } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { actualizarContraseñaUsuario } from "@/modules/administracion/services/usuario.services";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { AxiosError } from "axios";

interface CellActionProps {
  data: Usuario;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmarPasswordType, setConfirmarPasswordType] = useState("password");
  const router = useRouter();

  const passwordUpdateSchema = z.object({
    password_actual: z.string().min(8, { message: "minimo 8 caracteres" }),
    password_nuevo: z.string().min(8, { message: "minimo 8 caracteres" }),
    confirmar_password: z.string().min(8, { message: "minimo 8 caracteres" }),
  });

  const form = useForm<z.infer<typeof passwordUpdateSchema>>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      password_actual: "",
      password_nuevo: "",
      confirmar_password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof passwordUpdateSchema>) => {
    try {
      const res = await actualizarContraseñaUsuario(data);
      if ("message" in res) {
        toast.success(res.message);
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error || "Error al actualizar la contraseña. Por favor, inténtelo de nuevo.");
      } else {
        toast.error("Error inesperado al actualizar la contraseña.");
      }
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          form.reset();
        }}
        onConfirm={form.handleSubmit(onSubmit)}
        loading={form.formState.isSubmitting}
        title="Actualizar contraseña"
        description="Ingrese y confirme la nueva contraseña para este usuario."
        icon="Key"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="password_actual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña actual</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_nuevo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña nueva</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type={passwordType} />
                      {passwordType === "password" ? (
                        <EyeIcon
                          className="size-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")}
                        />
                      ) : (
                        <EyeOffIcon
                          className="size-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          onClick={() => setPasswordType(passwordType === "password" ? "text" : "password")}
                        />
                      )}
                    </div>
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
                    <div className="relative">
                      <Input {...field} type={confirmarPasswordType} />
                      {confirmarPasswordType === "password" ? (
                        <EyeIcon
                          className="size-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          onClick={() => setConfirmarPasswordType(confirmarPasswordType === "password" ? "text" : "password")}
                        />
                      ) : (
                        <EyeOffIcon
                          className="size-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                          onClick={() => setConfirmarPasswordType(confirmarPasswordType === "password" ? "text" : "password")}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </AlertModal>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={() => router.push(`/administracion/usuarios/${data.id}`)}>
              <IconEdit className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Actualizar</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={() => setOpen(true)}>
              <IconKey className="size-4 text-blue-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Actualizar contraseña</p>
          </TooltipContent>
        </Tooltip>
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={() => setOpen(true)}>
              <IconUserPlus className="size-4 text-blue-400" />
            </Button>
          </TooltipTrigger>
        </Tooltip> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer" onClick={() => setOpen(true)}>
              <IconTrash className="size-4 text-red-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};
