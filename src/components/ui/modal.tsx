"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { icons } from "lucide-react";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  icon?: keyof typeof icons;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ title, description, isOpen, onClose, children, icon, className }) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const Icon = icon ? icons[icon] : icons.LayoutDashboard;

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={cn(className)}>
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
