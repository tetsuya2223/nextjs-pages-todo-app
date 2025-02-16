import { useRef, useEffect } from "react";
import dialogStyles from "../styles/dialog.module.css";

type Props = {
  title: string;
  yesButtonText: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const Dialog: React.FC<Props> = ({
  title,
  yesButtonText,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      if (!dialogElement.hasAttribute("open")) {
        dialogElement.showModal();
      }
    } else {
      if (dialogElement.hasAttribute("open")) {
        dialogElement.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className={dialogStyles.dialog}>
      <p>{title}</p>
      <div className={dialogStyles.dialogButtons}>
        <button
          type="button"
          className={dialogStyles.cancelButton}
          onClick={onClose}
        >
          キャンセル
        </button>
        <button
          type="button"
          className={dialogStyles.deleteButton}
          onClick={onConfirm}
        >
          {yesButtonText}
        </button>
      </div>
    </dialog>
  );
};
