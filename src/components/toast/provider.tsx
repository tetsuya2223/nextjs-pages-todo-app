import { useState, useContext, useEffect, PropsWithChildren } from "react";

import { ToastContext } from "./context";

export const ToastProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (type: "success" | "error") => {
    setToastType(type);
    setIsToastOpen(true);
  };

  const closeToast = () => {
    setIsToastOpen(false);
  };

  return (
    <ToastContext.Provider
      value={{
        isToastOpen,
        toastType,
        showToast,
        closeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("ToastProvider must be used within a ToastContext");
  }

  return context;
};
