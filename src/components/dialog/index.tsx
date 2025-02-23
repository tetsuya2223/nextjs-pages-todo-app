import { useRef, useEffect } from "react";
import dialogStyles from "./style.module.css";
import { Button } from "../button";

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
        <Button variant="tertiary" onClick={onClose}>
          キャンセル
        </Button>

        <Button variant="secondary" onClick={onConfirm}>
          {yesButtonText}
        </Button>
      </div>
    </dialog>
  );
};
