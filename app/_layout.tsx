import { startNetworkListener } from "@/src/sync/network";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { initDB } from "../src/db";
import { queryClient } from "../src/store/queryClient";

initDB();
startNetworkListener();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
