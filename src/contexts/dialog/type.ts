import { DispatchWithoutAction } from "react";

type OpenDialogArgs = {
  title: string;
  yesButtonText: string;
  onConfirm?: DispatchWithoutAction;
};

export type DialogContextType = {
  isDialogOpen: boolean;
  title: string;
  yesButtonText: string;
  openDialog: (args: OpenDialogArgs) => void;
  closeDialog: DispatchWithoutAction;
  onConfirmAction: DispatchWithoutAction | undefined;
};
