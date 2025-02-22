import { useContext, useState, createContext, useEffect } from "react";

type DialogContextType = {
  isDialogOpen: boolean;
  title: string;
  yesButtonText: string;
  openDialog: (
    title: string,
    yesButtonText: string,
    onConfirm: () => () => void
  ) => void;
  closeDialog: () => void;
  confirmAction: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    title: "",
    yesButtonText: "",
  });
  const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(
    null
  );

  const openDialog = (
    title: string,
    yesButtonText: string,
    onConfirm: () => void
  ) => {
    setDialogConfig({ title, yesButtonText });
    setOnConfirmAction(onConfirm);
    setIsDialogOpen(true);
  };

  const confirmAction = () => {
    if (onConfirmAction) {
      onConfirmAction();
    }
    setIsDialogOpen(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{
        isDialogOpen,
        title: dialogConfig.title,
        yesButtonText: dialogConfig.yesButtonText,
        openDialog,
        closeDialog,
        confirmAction,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("DialogProvider must be used within a DialogContext");
  }
  return context;
};
