"use client";
import { Profile } from "@/app/Components/Profile";
import useClientSide from "@/app/hooks/useClientSide";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PasskeyProvider } from "sdk-v2-keyringpasskeywallet";
const queryClient = new QueryClient();
export default function Home() {
  const isClient = useClientSide();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <PasskeyProvider config={{
        chainIdDefault: 137,
        }}>{isClient && <Profile />}</PasskeyProvider>
      </QueryClientProvider>
    </div>
  );
}
