

import { abi } from "@/app/Components/abi";
import { useState } from "react";
import { useWriteContract } from "wagmi";

export function WriteContract() {
  const { writeContractAsync } = useWriteContract();
  const [hash, setHash] = useState<string | null>(null);
  // https://pass.w3w.app/egglegamewallet/mypage/0x7e11db3557433231d389c7e1341235a52daf4ecc/list-nfts
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={async () => {
          const hash = await writeContractAsync({
            abi,
            address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
            // address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            functionName: "approve",
            args: [
              "0x109105af554c00c2c419686c9e969e1fb2b6beba",
              1000000000000000000n,
            ],
          });

          setHash(hash);
        }}
      >
        Approve
      </button>
      <button
        onClick={async () => {
          const hash = await writeContractAsync({
            abi,
            address: "0xb9aD3ba23290ACB9205De5A1D3e60eB956C51227",
            // address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
            functionName: "safeTransferFrom",
            args: [
              "0x7e11db3557433231d389c7e1341235a52daf4ecc",
              "0x109105af554c00c2c419686c9e969e1fb2b6beba",
              1n,
              1n,
              '0x',
            ],
          });

          setHash(hash);
        }}
      >
        send nft
      </button>
      {hash && <div>Transaction hash: {hash}</div>}
    </div>
  );
}

