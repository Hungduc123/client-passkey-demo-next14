"use client";
import { useConnect, PasskeyProvider, ButtonConnect } from "sdk-passkeyring";
export default function Home() {
  const { isConnected } = useConnect();

  console.log("🚀 ~ Home ~ isConnected:", isConnected);
  return (
    <div>
      <PasskeyProvider>
        <ButtonConnect />
      </PasskeyProvider>
    </div>
  );
}
