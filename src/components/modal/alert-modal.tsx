"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { icons, Loader2 } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title: string;
  description?: string;
  children?: React.ReactNode;
  icon?: keyof typeof icons;
  className?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading, title, description, children, icon, className }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal title={title} description={description} isOpen={isOpen} onClose={onClose} icon={icon} className={className}>
      {children}
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose} className="cursor-pointer">
          Cancelar
        </Button>
        <Button disabled={loading} variant="default" onClick={onConfirm} className="cursor-pointer">
          {loading && <Loader2 className="animate-spin" />}
          Confirmar
        </Button>
      </div>
    </Modal>
  );
};
