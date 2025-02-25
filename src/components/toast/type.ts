export type ToastContextType = {
  isToastOpen: boolean;
  toastType: "success" | "error";
  showToast: (type: "success" | "error") => void;
};
