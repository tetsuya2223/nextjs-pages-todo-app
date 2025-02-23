import {
  DispatchWithoutAction,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { DialogContext } from "./context";

type OpenDialogArgs = {
  title: string;
  yesButtonText: string;
  onConfirm?: DispatchWithoutAction;
};

export const DialogProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogYesButtonText, setDialogYesButtonText] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState<
    DispatchWithoutAction | undefined
  >(undefined);

  const openDialog = (args: OpenDialogArgs) => {
    setDialogTitle(args.title);
    setDialogYesButtonText(args.yesButtonText);

    setOnConfirmAction(() => {
      if (!args.onConfirm) return;
      return args.onConfirm;
    });

    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogTitle("");
    setDialogYesButtonText("");
    setOnConfirmAction(undefined);
    setIsDialogOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{
        isDialogOpen: isDialogOpen,
        title: dialogTitle,
        yesButtonText: dialogYesButtonText,
        openDialog,
        closeDialog,
        onConfirmAction,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("DialogProvider must be used within a DialogContext");
  }

  return context;
};
