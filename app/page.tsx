"use client";
import { Profile } from "@/app/Components/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PasskeyProvider } from "sdk-passkeyring";
const queryClient = new QueryClient();
export default function Home() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <PasskeyProvider config={{}}>
          <Profile />
        </PasskeyProvider>
      </QueryClientProvider>
    </div>
  );
}
