"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { FormSucursal } from "../form-sucursal";
import { useFormSucursal } from "@/modules/administracion/hooks/sucursal/useFormSucursal";

export const ModalNuevoSucursal = () => {
  const [open, setOpen] = useState(false);
  const { form, onSubmit } = useFormSucursal(setOpen);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true), form.reset();
        }}
        className="text-xs md:text-sm"
      >
        <IconPlus className="size-4" /> Nuevo Sucursal
      </Button>
      <AlertModal
        title="Nuevo Sucursal"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={form.handleSubmit(onSubmit)}
        loading={form.formState.isSubmitting}
        icon="Building"
      >
        <FormSucursal form={form} onSubmit={onSubmit} />
      </AlertModal>
    </>
  );
};
