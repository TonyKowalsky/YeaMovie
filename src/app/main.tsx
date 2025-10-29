import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StoreProvider from "@/app/providers/store/StoreProvider";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/theme/ThemeProvider";
import "@/shared/styles/global.css";
import appRouter from "@/app/router/appRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <ThemeProvider>
        <RouterProvider router={appRouter()} />
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>
);
