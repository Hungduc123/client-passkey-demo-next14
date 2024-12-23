import { http, createConfig } from 'wagmi'
import { arbitrum, base, bsc, mainnet, optimism, polygon, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum, optimism, base, bsc],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})