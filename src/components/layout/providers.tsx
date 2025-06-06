"use client";
import React from "react";
import { ActiveThemeProvider } from "../active-theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({
  activeThemeValue,
  children,
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </QueryClientProvider>
      </ActiveThemeProvider>
    </>
  );
}
