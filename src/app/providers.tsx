import type { ReactNode } from "react";
import { HashRouter } from "react-router-dom";
import { SwasthyaProvider } from "../context/SwasthyaContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HashRouter>
      <SwasthyaProvider>{children}</SwasthyaProvider>
    </HashRouter>
  );
}
