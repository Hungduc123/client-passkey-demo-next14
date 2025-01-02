/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { signTypedData } from "@wagmi/core";
import { config, wagmiAdapter } from "@/context";
import { verifyMessage } from "@ambire/signature-validator";
import { ethers } from "ethers";
import { getChainId } from "@wagmi/core";

const SignTypeData = () => {
  const listProvider: { [key: number]: string } = {
    137: "https://rpc.ankr.com/polygon/23f34102610d22b6d3c81e37a40cb843717e15c4bb1f3ca04b2a3d9696e6988d",
    42161:
      "https://rpc.ankr.com/arbitrum/23f34102610d22b6d3c81e37a40cb843717e15c4bb1f3ca04b2a3d9696e6988d",
    8453: "https://rpc.ankr.com/base/23f34102610d22b6d3c81e37a40cb843717e15c4bb1f3ca04b2a3d9696e6988d",
  };
  const chainId = getChainId(config);
  console.log("🚀 ~ chainId:", chainId);

  const message = "Hello world";
  const address = "0x109105af554c00c2c419686c9e969e1fb2b6beba";

  const provider = new ethers.providers.JsonRpcProvider(listProvider[chainId]);
  const onSignTypeData = async () => {
    const result = await signTypedData(config, {
      types: {
        Person: [
          { name: "name", type: "string" },
          { name: "wallet", type: "address" },
        ],
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person" },
          { name: "contents", type: "string" },
        ],
      },
      primaryType: "Mail",
      message: {
        from: {
          name: "Cow",
          wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        },
        to: {
          name: "Bob",
          wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        },
        contents: "Hello, Bob!",
      },
    });

    console.log("🚀 ~ SignMessage ~ result:", result);
  };
  return <div onClick={onSignTypeData}>SignTypeData</div>;
};

export default SignTypeData;
