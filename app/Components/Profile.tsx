"use client";

import SendTransaction from "@/app/Components/SendTransaction";
import { WriteContract } from "@/app/Components/WriteContract";
import SignMessage from "@/app/Components/SignMessage";
import ButtonConnectWallet from "@/app/Components/ButtonConnectNotInjected";
import { isWeb3Injected } from "sdk-v2-egglepasskeywallet";
import { useAccount } from "wagmi";

export function Profile() {
  const account=useAccount()
  const isConnected = account.status === "connected";

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <appkit-button />
      {isConnected && (
        <>
          <SendTransaction />
          <WriteContract />
          <SignMessage />
        </>
      )}

      {!isWeb3Injected() && <ButtonConnectWallet />}
    </div>
  );
}