import { DispatchWithoutAction } from "react";

type openDialogArgs = {
  title: string;
  yesButtonText: string;
  onConfirm: DispatchWithoutAction;
};

export type DialogContextType = {
  isDialogOpen: boolean;
  title: string;
  yesButtonText: string;
  openDialog: (args: openDialogArgs) => void;
  closeDialog: DispatchWithoutAction;
  onConfirmAction: DispatchWithoutAction | undefined;
};
