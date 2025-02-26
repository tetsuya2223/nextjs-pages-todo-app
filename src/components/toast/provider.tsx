import { useState, useContext, useEffect, PropsWithChildren } from "react";

import { ToastContext } from "./context";

export const ToastProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [isToastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (type: "success" | "error") => {
    setToastType(type);
    setToastOpen(true);
  };

  useEffect(() => {
    if (!isToastOpen) return;

    const timer = setTimeout(() => {
      setToastOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isToastOpen]);

  return (
    <ToastContext.Provider
      value={{
        isToastOpen,
        toastType,
        showToast,
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
