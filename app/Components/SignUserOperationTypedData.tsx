/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { signTypedData } from "@wagmi/core";
import { config, wagmiAdapter } from "@/context";
import { verifyMessage } from "@ambire/signature-validator";
import { ethers } from "ethers";
import { getChainId } from "@wagmi/core";

const SignUserOperationTypedData = () => {
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
    // const result =  await signUserOperation({
    //   callData: '0xdeadbeef',
    //   callGasLimit: BigInt(141653),
    //   factory: '0xfb6dab6200b8958c2655c3747708f82243d3f32e',
    //   factoryData:
    //     '0xf14ddffc000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb922660000000000000000000000000000000000000000000000000000000000000000',
    //   maxFeePerGas: BigInt(15000000000),
    //   maxPriorityFeePerGas: BigInt(2000000000),
    //   nonce: BigInt(0),
    //   paymasterPostOpGasLimit: BigInt(0),
    //   paymasterVerificationGasLimit: BigInt(0),
    //   preVerificationGas: BigInt(53438),
    //   sender: '0xE911628bF8428C23f179a07b081325cAe376DE1f',
    //   verificationGasLimit: BigInt(259350),
    // })

    // console.log("🚀 ~ SignMessage ~ result:", result);
  };
  return <div onClick={onSignTypeData}>SignTypeData</div>;
};

export default SignUserOperationTypedData;
