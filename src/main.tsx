import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ThemeProvider } from "./hooks/use-theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {/* Backstop. The boundaries further down handle their own failures
          gracefully; this one exists so that anything they miss degrades to a
          reload prompt instead of a blank page. */}
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
