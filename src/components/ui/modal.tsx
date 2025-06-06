"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { icons } from "lucide-react";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  icon?: keyof typeof icons;
}

export const Modal: React.FC<ModalProps> = ({ title, description, isOpen, onClose, children, icon }) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const Icon = icon ? icons[icon] : icons.LayoutDashboard;

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            {icon ? <Icon className="size-5 mb-1" /> : null} <span> {title}</span>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
