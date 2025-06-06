"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useFormRol } from "@/hooks/administracion/rol/useFormRol";
import { FormRol } from "./form-rol";

export const ModalNuevoRol = () => {
  const [open, setOpen] = useState(false);
  const { form, onSubmit } = useFormRol(setOpen);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-xs md:text-sm">
        <IconPlus className="size-4" /> Nuevo Rol
      </Button>
      <AlertModal
        title="Nuevo Rol"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={form.handleSubmit(onSubmit)}
        loading={false}
        icon="User"
      >
        <FormRol form={form} onSubmit={onSubmit} />
      </AlertModal>
    </>
  );
};
