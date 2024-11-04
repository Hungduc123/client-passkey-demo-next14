"use client";
import ConnectPasskey from "@/app/ConnectPasskey";
import {  PasskeyProvider } from "sdk-passkeyring";
export default function Home() {

  return (
    <div>
      <PasskeyProvider>
      <ConnectPasskey/>
      </PasskeyProvider>
    </div>
  );
}
