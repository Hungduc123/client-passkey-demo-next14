"use client";
import { Profile } from "@/app/Components/Profile";
import { config } from "@/app/config";
import ConnectPasskey from "@/app/ConnectPasskey";
import Transaction from "@/app/Transaction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PasskeyProvider } from "sdk-passkeyring";
import { WagmiProvider } from "wagmi";
const queryClient = new QueryClient()
export default function Home() {
  return (
    <div>
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <PasskeyProvider>
          <ConnectPasskey />
          <Profile />
        </PasskeyProvider>
      </QueryClientProvider>
      
      </WagmiProvider>
    </div>
  );
}
