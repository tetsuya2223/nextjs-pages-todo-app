import { createContext } from "react";

import { ToastContextType } from "./type";

export const ToastContext = createContext<ToastContextType | null>(null);
