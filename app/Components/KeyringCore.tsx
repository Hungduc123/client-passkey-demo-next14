import React, { use, useEffect } from "react";
import { AgentCore, KnowledgeBaseEntry } from "keyring-agent-core";
import { Input } from "antd";
import { getChainId } from "wagmi/actions";
import { config } from "@/context";
const faqData: KnowledgeBaseEntry[] = [
  {
    question: "Unveiling the Truth of Liquidity Pools & Earn Over 20% APR. How Is This Possible?",
    answer: "The high APR of liquidity pools comes from trading fees, impermanent loss compensation, yield farming incentives, and market volatility.",
  },
  {
    question: "What Is a Liquidity Pool?",
    answer: "A liquidity pool is a smart contract holding two tokens that enables swaps using an AMM model.",
  },
  {
    question: "What Are the Benefits of Liquidity Providers?",
    answer: "LPs earn passive income from trading fees and yield rewards.",
  },
  {
    question: "What risks do liquidity providers face?",
    answer: "Risks include impermanent loss, out-of-range liquidity, and asset imbalance.",
  },
  {
    question: "What is CoinPool?",
    answer: "CoinPool is a non-custodial platform that simplifies liquidity provision.",
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
  {
     question: "Send tokens",
    answer: "Yes, you can send tokens directly from the platform.",
  }
];
const KeyringCore = () => {

  const chainId = getChainId(config);

  const agent = new AgentCore({
    llm: {
      model: "gemini-2.5-flash-lite",
    },
    maxIterations: 8,
    maxHistoryMessages: 40,
    debug: true,
    storage: localStorage, // ← truyền thẳng
    // knowledgeBase: faqData
  });

  useEffect(() => {
    const loadHistory = async () => {
      await agent.loadHistory(); // khôi phục từ <storage></storage>
    };
    loadHistory();
  }, []);

  // Set wallet context (simulates a connected wallet from the UI)
  agent.setUserContext({
    walletAddress: "0x1Ac2890dB904dFa125e59448368fA2B4Ffcca29A",
    chain: chainId?.toString(),
  });

  return (
    <Input
      placeholder="Type your message here..."
      onPressEnter={async (e) => {
        const input = (e.target as HTMLInputElement).value;
        const response = await agent.chat(input);
        // console.log("🚀 ~ KeyringCore ~ response:", response)

        console.log("\n=== Answer ===");
        console.log(response.answer);
      }}
    />
  );
};

export default KeyringCore;
