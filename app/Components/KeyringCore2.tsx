"use client";
import { config } from "@/context";
import { Button, Input } from "antd";
import { AgentCore } from "keyring-agent-core";
import React, { useEffect } from "react";
import { getCreate2Address, keccak256 } from "viem";
import { getChainId } from "wagmi/actions";
const faqData = [
  {
    question:
      "Unveiling the Truth of Liquidity Pools & Earn Over 20% APR. How Is This Possible?",
    answer:
      "The high APR of liquidity pools comes from trading fees, impermanent loss compensation, yield farming incentives, and market volatility.",
  },
  {
    question: "What Is a Liquidity Pool?",
    answer:
      "A liquidity pool is a smart contract holding two tokens that enables swaps using an AMM model.",
  },
  {
    question: "What Are the Benefits of Liquidity Providers?",
    answer: "LPs earn passive income from trading fees and yield rewards.",
  },
  {
    question: "What risks do liquidity providers face?",
    answer:
      "Risks include impermanent loss, out-of-range liquidity, and asset imbalance.",
  },
  {
    question: "What is CoinPool?",
    answer:
      "CoinPool is a non-custodial platform that simplifies liquidity provision.",
  },
  {
    question: "How Do I Get Started with CoinPool?",
    answer: "Deposit a token and CoinPool automatically provides liquidity.",
  },
  {
    question: "Why Should You Use CoinPool?",
    answer: "It automates liquidity provisioning and optimizes APR.",
  },
  {
    question: "What does CoinPool allow users to do?",
    answer: "Create LP positions using a single token.",
  },
  {
    question: "How do you manage Liquidity Positions?",
    answer: "Manage LP positions via your wallet interface.",
  },
  {
    question: "Why use High APR Pairs?",
    answer: "To quickly access high-yield pools.",
  },
  {
    question: "What is the Earnings Overview Dashboard?",
    answer: "Shows your liquidity value and earnings.",
  },
  {
    question: "What tokens can I use?",
    answer: "Supported tokens like ETH are automatically converted.",
  },
  {
    question: "How does CoinPool simplify liquidity provision?",
    answer: "It automates swaps and liquidity provisioning.",
  },
  {
    question: "Can I create my own liquidity pool?",
    answer: "Yes, users can create custom pools.",
  },
  {
    question: "How do I earn from liquidity?",
    answer: "You earn trading fees proportional to your share.",
  },
  {
    question: "How to choose fee tier?",
    answer: "Choose based on volatility: 0.01% to 1%.",
  },
  {
    question: "Can I lose money providing liquidity?",
    answer: "Yes, mainly due to impermanent loss.",
  },
  {
    question: "What happens if liquidity is out of range?",
    answer: "You stop earning fees and must reposition.",
  },
  {
    question: "What is Collect Profit vs Delete?",
    answer: "Collect = profit only. Delete = withdraw all.",
  },
  {
    question: "Can I withdraw anytime?",
    answer: "Yes, you have full control of funds.",
  },
  {
    question: "Is CoinPool safe?",
    answer: "Non-custodial, user-controlled, on-chain execution.",
  },
  {
    question: "Can CoinPool guarantee profits?",
    answer: "No, profits depend on market conditions.",
  },
  {
    question: "What is a Sub-Account?",
    answer: "A smart contract account for managing operations.",
  },
  {
    question: "What is an Operator?",
    answer: "An operator manages liquidity on your behalf.",
  },
  {
    question: "Can Operators access funds?",
    answer: "No, they cannot withdraw funds.",
  },
  {
    question: "Does CoinPool use third-party services?",
    answer: "Yes, integrates with protocols like Uniswap.",
  },
];
const agent = new AgentCore({
  llm: {
    model: "gemini-2.5-flash-lite",
  },
  // knowledgeBase : faqData,
  // knowledgeBase : [],
  maxIterations: 8,
  maxHistoryMessages: 20,
  debug: true,
  storage: localStorage, // ← truyền thẳng
  generateSuggestions: true, // ← tắt gợi ý
  uniswap: {
    gatewayAddresses: { '0xa': '0xd2f370796ba72b2996dc42c5b5dfc16d5b3bab76' }, // CoinPool gateway per chain
    positionManagerAddresses: { '0xa': '0xC36442b4a4522E871399CD717aBDD847Ab11FE88' },
    rpcUrls: { '0xa': 'https://mainnet.optimism.io' }, // optional override
  }
  // kbAnswerThreshold: 0.0306,
  // vectorKB: {
  //   enabled: true,
  //   // namespace: process.env.UPSTASH_VECTOR_NAMESPACE,
  //   minScore: 0.9,
  //   // autoIngest: true,  // ← uncomment to push knowledgeBase entries on first chat
  // },
});
function KeyringCore2() {
  const chainId = getChainId(config);

  // Set wallet context (simulates a connected wallet from the UI)
  agent.setUserContext({
    walletAddress: "0x8d1B676508F7Bac3e574DFB022C0d1B74a0fcEC4",
    chain: chainId.toString(), // Ensure chain ID is a string
  });

  const [respone, setResponse] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  return (
    <div>
      {/* <Button
        onClick={async () => {
          // const res = await fetch("/api/pool?chain=BASE&address=0x6c561b446416e1a00e8e93e221854d6ea4171372");
          const res = await fetch(
            "https://defiadapters.api.cx.metamask.io/positions/0x718E7B7e03F9370394CC8a3BD41B395C72B90fa2?filterChainIds=%5B1%2C10%2C137%2C1329%2C8453%2C42161%2C43114%2C59144%5D",
          );
          const data = await res.json();
          console.log("🚀 ~ KeyringCore2 ~ data:", data);
        }}
      >
        Fetch Uniswap Data
      </Button> */}
      <Input
        disabled={loading}
        placeholder="Type your message to the agent..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={async (e) => {
          setLoading(true);
          const input = e.currentTarget.value;
          if (!input) return;
          const r1 = await agent.chat(input);
          console.log("\n=== Answer 1 ===");
          console.log("🚀 ~ KeyringCore2 ~ r1:", r1);
          console.log(r1.answer);
          // e.currentTarget.value = "";
          setResponse(r1.answer);
          setSuggestions(r1.suggestedPrompts || []);
          setInputValue("");
          setLoading(false);
        }}
      />
      {/* {respone && (
        <div>
          <h3>Agent Response:</h3>
          <p>{respone}</p>
        </div>
      )} */}
      {suggestions.length > 0 && (
        <div>
          <h4>Suggested Prompts:</h4>
          <ul className="whitespace-pre-line">
            {suggestions.map((s, idx) => (
              <li
                className="whitespace-pre-line"
                onClick={async () => {
                  setLoading(true);
                  setInputValue(s);

                  const r1 = await agent.chat(s);
                  console.log("\n=== Answer 1 ===");
                  console.log("🚀 ~ KeyringCore2 ~ r1:", r1);
                  console.log(r1.answer);
                  // e.currentTarget.value = "";
                  setResponse(r1.answer);
                  setSuggestions(r1.suggestedPrompts || []);
                  setInputValue("");
                  setLoading(false);
                }}
                key={idx}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default KeyringCore2;


function computePoolAddress(
  factory: string,
  tokenA: string,
  tokenB: string,
  fee: number,
  initCodeHash: string
) {
  const [token0, token1] =
    tokenA.toLowerCase() < tokenB.toLowerCase()
      ? [tokenA, tokenB]
      : [tokenB, tokenA]

  const salt = keccak256(
    pa(
      ['address', 'address', 'uint24'],
      [token0, token1, fee]
    )
  )

  return getCreate2Address(factory, salt, initCodeHash)
}