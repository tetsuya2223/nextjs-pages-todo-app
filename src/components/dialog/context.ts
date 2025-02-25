import { createContext } from "react";

import { DialogContextType } from "./type";

export const DialogContext = createContext<DialogContextType | null>(null);
