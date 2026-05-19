"use client";

import SendTransaction from "@/app/Components/SendTransaction";
import { WriteContract } from "@/app/Components/WriteContract";
import SignMessage from "@/app/Components/SignMessage";
import ButtonConnectWallet from "@/app/Components/ButtonConnectNotInjected";
import { isWeb3Injected } from "sdk-v2-egglegamewallet";
import { useAccount, useSendTransaction } from "wagmi";
import SignTypeData from "@/app/Components/SignTypeData";
import CheckAllowance from "@/app/Components/CheckAllowance";
import { ChatWidget, clearChat } from "chat-widget-sdk";
import { getChainId } from "@wagmi/core";
import { config } from "@/context";
import KeyringCore from "@/app/Components/KeyringCore";
import KeyringCore2 from "@/app/Components/KeyringCore2";

export function Profile() {
  const account = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  console.log("account:", account);
  const chainId = getChainId(config);
  console.log("🚀 ~ Profile ~ chainId:", chainId);

  const isConnected = account.status === "connected";
  console.log("🚀 ~ addProviderToWindow ~ window.ethereum:", window.ethereum);
  console.log(
    "🚀 ~ addProviderToWindow ~ window.ethereum.providers:",
    window.ethereum?.providers,
  );

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <button
        onClick={() => {
          clearChat();
        }}
      >
        Clear Chat
      </button>
      <appkit-button />
      <ChatWidget
        theme={{
buttonSize:40

        }}
        modalConfig={{
         isShowIcon:true
        }}
        // customChatButton={
        //   <div
        //     style={{
        //       padding: 12,
        //       background: "#5B7FFF",
        //       borderRadius: 16,
        //       color: "#fff",
        //     }}
        //   >
        //     💬 Chat with AI
        //   </div>
        // }
        //  position="bottom-left"
        onTransaction={async (tx) => {
          try {
            const hash = await sendTransactionAsync({
              to: tx.to as `0x${string}`,
              value: tx.value ? BigInt(tx.value) : undefined,
              data: tx.data as `0x${string}` | undefined,
            });
            return { status: "success" as const, transactionHash: hash };
          } catch (error) {
            console.log("🚀 ~ Profile ~ error:", error);

            return { status: "fail" as const, error: (error as Error).message };
          }
        }}
        account={{
          address: account.address || "",
          // address: '0x8D1b676508f7BaC3e574dfb022c0D1B74A0FCEc5',
          // address: '0x9E172941dC11B268afE585C95384Cd912377090C',
          // address: '0xaDe5fAbF51c9B46BfaDe4E20Ea4462E2337819c9' ,
          chainId: chainId,
        }}
        additionalSuggestions={[
          { icon: "🔥", text: "Pool WISE/ETH" },
          { icon: "📊", text: "Xem vị thế của tôi" },
        ]}
        
        // chatTitle="MyChat Assistant MyChat AssistantMyChat AssistantMyChat AssistantMyChat AssistantMyChat AssistantMyChat AssistantMyChat AssistantMyChat AssistantMyChat Assistant"
        // welcomeMessage="Chào mừng!"
        // buttonIcon="/custom-icon.png"
        // customSuggestions={[
        //   {  icon: '🚀', text: 'Get Started' },
        //   {   text: 'Send token' },
        //   {  icon: '🚀', text: 'Show my balance' }
        // ]}
        // chatIcon="data:image/png;base64,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"
        // theme={{}}
        // buttonIcon="data:image/png;base64,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"
        //  language="ja"
        //  theme={{
        //   offset:{
        //     x:40,
        //     y:40,
        //   },
        //   buttonSize:20,
        //   modalChatStyle:{
        //     maxHeight:'calc(100dvh - 64px)',
        //     // borderRadius: '12px 12px 0px 0px',
        //   }
        //  }}
      />
      {isConnected && (
        <>
          {/* <KeyringCore /> */}
          <KeyringCore2/>
          {/* <SendTransaction />
          <WriteContract />
          <SignMessage />
          <SignTypeData />
          <CheckAllowance /> */}
        </>
      )}

      {!isWeb3Injected() && <ButtonConnectWallet />}
    </div>
  );
}
