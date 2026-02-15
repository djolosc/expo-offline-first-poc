import { initDB } from "@/src/services/storage/dbService";
import { startNetworkListener } from "@/src/services/sync/network";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
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
