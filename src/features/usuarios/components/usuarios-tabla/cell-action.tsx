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
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useFormUpadatePassword } from "@/modules/administracion/hooks/usuarios/useFormUpadatePassword";

interface CellActionProps {
  data: Usuario;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmarPasswordType, setConfirmarPasswordType] = useState("password");
  const router = useRouter();
  const { form, onSubmit } = useFormUpadatePassword(setOpen);

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
