import { useState, useEffect, PropsWithChildren } from "react";

import { ToastContext } from "./context";

export const ToastProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [isToastOpen, setToastOpen] = useState(false);

  const showToast = (type: "success" | "error") => {
    setToastOpen(true);
  };

  return (
    <ToastContext.Provider value={(isToastOpen, type)}>
      {children}
    </ToastContext.Provider>
  );
};
