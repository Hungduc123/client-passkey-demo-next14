import React from "react";
import { signMessage } from "@wagmi/core";
import { config, wagmiAdapter } from "@/context";
import { verifyMessage } from "@ambire/signature-validator";
import { ethers } from "ethers";
import { getChainId } from '@wagmi/core'
const SignMessage = () => {
  const chainId = getChainId(config)
  console.log("🚀 ~ chainId:", chainId)
  
  const message = "Hello world";
  const address = "0x109105af554c00c2c419686c9e969e1fb2b6beba";


const listProvider: { [key: number]: string } = {
  137: "https://rpc.ankr.com/polygon/23f34102610d22b6d3c81e37a40cb843717e15c4bb1f3ca04b2a3d9696e6988d",
  42161: "https://rpc.ankr.com/arbitrum/23f34102610d22b6d3c81e37a40cb843717e15c4bb1f3ca04b2a3d9696e6988d",
  8453: "https://rpc.ankr.com/base/23f34102610d22b6d3c81e37a40cb843717e15c4bb1f3ca04b2a3d9696e6988d",
};
  

  const provider = new ethers.providers.JsonRpcProvider(
    listProvider[chainId]
  );
  return (
    <div
      onClick={async () => {
        try {
          const result = await signMessage(wagmiAdapter.wagmiConfig, {
            message,
          });
          console.log(" result:", result)

          const isValidSig = await verifyMessage({
            signer: address,
            message: message,
            signature: result,
            // this is needed so that smart contract signatures can be verified; this property can also be a viem PublicClient
            provider,
          });
          console.log("is the sig valid: ", isValidSig);
          console.log("🚀 ~ SignMessage ~ result:", result);
        } catch (error) {
          console.log("🚀  error:", error);
        }
      }}
    >
      SignMessage
    </div>
  );
};

export default SignMessage;