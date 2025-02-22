import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { DialogProvider } from "@/contexts/DialogContext";
import { Dialog } from "../components/Dialog";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DialogProvider>
      <Component {...pageProps} />;
      <Dialog />
    </DialogProvider>
  );
}
