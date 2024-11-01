"use client";
import Image from "next/image";
import { useConnect, ButtonRegister, PasskeyProvider, ButtonConnect } from "sdk-passkeyring";

export default function Home() {
  const { onConnect, isConnected, onRegister } = useConnect();

  console.log("🚀 ~ Home ~ isConnected:", isConnected);
  return (
    <div>
      <PasskeyProvider>
        <span/>
  
          <ButtonConnect />
  
      </PasskeyProvider>
     
    </div>
  );
}
