import { useRef, useEffect } from "react";
import dialogStyles from "../styles/dialog.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const Dialog: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
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
      <p>本当に削除しますか？</p>
      <div className={dialogStyles.dialogButtons}>
        <button className={dialogStyles.cancelButton} onClick={onClose}>
          キャンセル
        </button>
        <button className={dialogStyles.deleteButton} onClick={onConfirm}>
          削除
        </button>
      </div>
    </dialog>
  );
};
