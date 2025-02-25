import "@/styles/globals.css";

import type { AppProps } from "next/app";

import { Dialog } from "../components/dialog";
import { DialogProvider } from "../components/dialog/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DialogProvider>
      <Component {...pageProps} />;
      <Dialog />
    </DialogProvider>
  );
}
