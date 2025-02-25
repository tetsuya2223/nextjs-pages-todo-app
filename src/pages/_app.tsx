import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { Dialog } from "../components/dialog";
import { DialogProvider } from "../components/dialog/provider";
import { Toast } from "../components/toast";
import { ToastProvider } from "../components/toast/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <DialogProvider>
        <Component {...pageProps} />;
        <Toast />
        <Dialog />
      </DialogProvider>
    </ToastProvider>
  );
}
