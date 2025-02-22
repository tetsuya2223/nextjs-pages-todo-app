import { useRef, useEffect } from "react";
import dialogStyles from "../styles/dialog.module.css";
import { useDialog } from "../contexts/DialogContext";

export const Dialog: React.FC = () => {
  const { isDialogOpen, title, yesButtonText, closeDialog, confirmAction } =
    useDialog();
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
        <button
          type="button"
          className={dialogStyles.cancelButton}
          onClick={closeDialog}
        >
          キャンセル
        </button>
        <button
          type="button"
          className={dialogStyles.yesButton}
          onClick={confirmAction}
        >
          {yesButtonText}
        </button>
      </div>
    </dialog>
  );
};
