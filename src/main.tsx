import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import customeTheme from "./theme.ts";
import AuthProvider from "react-auth-kit";
import { store } from "./store.ts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={customeTheme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <AuthProvider store={store}>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
