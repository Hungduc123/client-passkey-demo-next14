import React from "react";
import {
  AgentCore,
  BaseTool,
  PoolTool,
  ToolParameter,
} from "keyring-agent-core";

const agent = new AgentCore({
  llm: {
    model: "gemini-2.5-flash-lite",
  },
  maxIterations: 8,
  maxHistoryMessages: 40,
  // systemPrompt:
  //   'You are the CoinPool assistant. Help users with questions about the CoinPool platform, crypto, and blockchain. Be friendly and concise.',
  debug: true,
  // moralis: { url: 'https://custom-url.com/chat' },  // optional: override URL
  // moralis: false,  // optional: disable built-in Moralis tool
});

class FaqTool extends BaseTool {
  name = "get-faq";
  description =
    "Fetch CoinPool FAQs for platform support and liquidity topics, including supported chains, token/ETH requirements, automated liquidity flow, pool creation, earnings, impermanent loss, out-of-range positions, fee tier selection, swaps, buy ETH, tracking positions, liquidity withdrawal, liquidity NFT burn, transaction failure troubleshooting, site safety, and sub-account asset withdrawal.";
  category = "knowledge";
  parameters: ToolParameter[] = [
    {
      name: "query",
      type: "string",
      description: "Optional search keyword to filter FAQs",
      required: false,
    },
  ];

  protected async run(args: Record<string, unknown>) {
    const query = typeof args.query === "string" ? args.query.trim() : "";
    const url = query
      ? `https://api.coinpool.app/faq?query=${encodeURIComponent(query)}`
      : "https://api.coinpool.app/faq";
    const res = await fetch(url);
    return res.json();
  }
}

// agent.registerTools([new FaqTool(), new PoolTool()]);
agent.registerTools([new FaqTool()]);

agent.setUserContext({
  walletAddress: "0x8d1B676508F7Bac3e574DFB022C0d1B74a0fcEC4",
  chain: "optimism",
});

const KeyringCore = () => {
  const arrQuestions = [
    "0.01",
    "send usdt",
    "usdt",
    "Thời tiết hôm nay ở Hà Nội thế nào?",
    "giá vàng hôm nay",
    "Show my liquidity",
    "show my balances",
    "yes",
    "show more",
    "0x8d1B676508F7Bac3e574DFB022C0d1B74a0fcEC4",
    "Which blockchains does it support on this site?",
    "show position no.1",
    "What tokens can I use to add liquidity?",
  ];
  return (
    <div>
      {/* <div
      onClick={async () => {
        // const r1 = await agent.chat("tell me about jpyt token");
        // const r1 = await agent.chat("chain 10 ");
        // const r1 = await agent.chat("giá vàng hôm nay");
        // const r1 = await agent.chat("Thời tiết hôm nay ở Hà Nội thế nào?");
        // const r1 = await agent.chat("Can I lose money by providing liquidity?");
        // const r1 = await agent.chat("what this page chain support?");
        // const r1 = await agent.chat("How do I track my liquidity position?");
        // const r1 = await agent.chat("Which blockchains does it support on this site?");
        // const r1 = await agent.chat("Show me ETH/USDC pools on Base?");
        const r1 = await agent.chat("Show my liquidity");
        console.log("\n=== Answer 1 ===");
        console.log(r1.answer);
      }}
    >
    Show my liquidity
    </div>
       <div
      onClick={async () => {
        // const r1 = await agent.chat("tell me about jpyt token");
        // const r1 = await agent.chat("chain 10 ");
        // const r1 = await agent.chat("giá vàng hôm nay");
        // const r1 = await agent.chat("Thời tiết hôm nay ở Hà Nội thế nào?");
        // const r1 = await agent.chat("Can I lose money by providing liquidity?");
        // const r1 = await agent.chat("what this page chain support?");
        // const r1 = await agent.chat("How do I track my liquidity position?");
        // const r1 = await agent.chat("Which blockchains does it support on this site?");
        // const r1 = await agent.chat("Show me ETH/USDC pools on Base?");
        const r1 = await agent.chat("Show my liquidity");
        console.log("\n=== Answer 1 ===");
        console.log(r1.answer);
      }}
    >
    Show my liquidity
    </div> */}

      {arrQuestions.map((q, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <div
            onClick={async () => {
              const r1 = await agent.chat(q);
              console.log(`\n=== Answer ${i + 1} ===`);
              console.log(r1.answer);
            }}
          >
            {q}
          </div>
        
        </div>
      ))}
        <input
            type="text"
            placeholder="Ask a question..."
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                const query = (e.target as HTMLInputElement).value;
                const r1 = await agent.chat(query);
                console.log(`\n=== Answer for "${query}" ===`);
                console.log(r1.answer);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
    </div>
  );
};

export default KeyringCore;
