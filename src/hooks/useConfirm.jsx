"use client";

import {useState} from "react";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: "Are you absolutely sure?",
    description: "This action cannot be undone.",
    confirmText: "Confirm",
    cancelText: "Cancel",
    onConfirm: () => {},
  });
  const [loading, setLoading] = useState(false);

  const confirm = ({
    title = "Are you sure?",
    description = "This action cannot be undone.",
    confirmText = "Continue",
    cancelText = "Cancel",
    onConfirm,
  }) => {
    setConfig({title, description, confirmText, cancelText, onConfirm});
    setIsOpen(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await config.onConfirm();
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const ConfirmationDialog = () => (
    <Dialog open={isOpen} onOpenChange={(open) => !loading && setIsOpen(open)}>
      <DialogContent showCloseButton={false} className="sm:max-w-[380px]">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(false)}
            disabled={loading}
            className="cursor-pointer"
          >
            {config.cancelText}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleConfirm}
            disabled={loading}
            className="cursor-pointer"
          >
            {loading && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
            {loading ? "Deleting..." : config.confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return {confirm, ConfirmationDialog};
}
