import { useRef, useEffect } from "react";
import { useDialogContext } from "@/components/dialog/provider";
import dialogStyles from "./style.module.css";
import { Button } from "../button";

export const Dialog: React.FC = () => {
  const { isDialogOpen, title, yesButtonText, closeDialog, onConfirmAction } =
    useDialogContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isDialogOpen) {
      if (!dialogElement.hasAttribute("open")) {
        dialogElement.showModal();
      }
    } else {
      if (dialogElement.hasAttribute("open")) {
        dialogElement.close();
      }
    }
  }, [isDialogOpen]);

  if (!isDialogOpen) return null;

  return (
    <dialog ref={dialogRef} className={dialogStyles.dialog}>
      <p>{title}</p>
      <div className={dialogStyles.dialogButtons}>
        <Button variant="tertiary" onClick={closeDialog}>
          キャンセル
        </Button>

        <Button variant="secondary" onClick={onConfirmAction}>
          {yesButtonText}
        </Button>
      </div>
    </dialog>
  );
};
