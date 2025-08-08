"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { FormPermiso } from "./form-permiso";
import { useFormPermiso } from "@/modules/administracion/hooks/permiso/useFormPermiso";

export const ModalNuevoPermiso = () => {
  const [open, setOpen] = useState(false);
  const { form, onSubmit } = useFormPermiso(setOpen);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-xs md:text-sm cursor-pointer">
        <IconPlus className="size-4" /> Nuevo Permiso
      </Button>
      <AlertModal
        title="Nuevo Permiso"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={form.handleSubmit(onSubmit)}
        loading={false}
        icon="Settings2"
      >
        <FormPermiso form={form} onSubmit={onSubmit} />
      </AlertModal>
    </>
  );
};
