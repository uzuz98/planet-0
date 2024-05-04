// modal.tsx
"use client";

import dynamic from "next/dynamic";
import { ChainInfo, evmChains } from "@coin98-com/wallet-adapter-react-ui";

const WalletModalC98 = dynamic(
  async () => (await import("@coin98-com/wallet-adapter-react-ui")).WalletModalC98,
  {
    ssr: false,
  }
);

export const BNB_TESTNET = {
  "id": "evm34",
  "blockChainName": "evm",
  "name": "BNB Testnet Chain",
  "chainId": "0x61",
  "imgUrl": "data:image/svg+xml;base64,PCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiPgo8dGl0bGU+YXBwX2JpbmFuY2U8L3RpdGxlPgo8cGF0aCBkPSJNOS40MjkgMTMuMDgwdjEuNjc1bC0xLjQ1IDAuODU5LTEuNDA3LTAuODU5di0xLjY3NWwxLjQwNyAwLjg1OSAxLjQ1LTAuODU5ek0xLjY2NyA3LjI4MWwxLjQwNyAwLjg1OXYyLjg3OGwyLjQzMSAxLjQ2djEuNjc1bC0zLjgzOS0yLjI3NnYtNC41OTZ6TTE0LjI5MSA3LjI4MXY0LjU5NmwtMy44ODEgMi4yNzZ2LTEuNjc1bDIuNDMxLTEuNDZ2LTIuODc3bDEuNDUtMC44NnpNMTAuNDEgNS4wMDVsMS40NSAwLjg1OXYxLjY3NWwtMi40MzEgMS40NnYyLjkyMWwtMS40MDcgMC44NTktMS40MDctMC44NTl2LTIuOTJsLTIuNTE2LTEuNDYxdi0xLjY3NWwxLjQ1LTAuODU5IDIuNDMxIDEuNDYgMi40MzEtMS40NnpNNC4wOTggOC43NDJsMS40MDcgMC44NTl2MS42NzVsLTEuNDA3LTAuODU5di0xLjY3NXpNMTEuODYgOC43NDJ2MS42NzVsLTEuNDA3IDAuODU5di0xLjY3NWwxLjQwNy0wLjg1OXpNMy4wNzQgMy41NDVsMS40NSAwLjg1OS0xLjQ1IDAuODU5djEuNjc1bC0xLjQwNy0wLjg1OXYtMS42NzVsMS40MDctMC44NTl6TTEyLjg4MyAzLjU0NWwxLjQ1IDAuODU5djEuNjc1bC0xLjQ1IDAuODU5di0xLjY3NWwtMS40MDctMC44NTkgMS40MDctMC44NTl6TTcuOTc5IDMuNTQ1bDEuNDUgMC44NTktMS40NSAwLjg1OS0xLjQwNy0wLjg1OSAxLjQwNy0wLjg1OXpNNy45NzkgMC42NjdsMy44ODEgMi4yNzYtMS40MDcgMC44NTktMi40MzEtMS40Ni0yLjQ3MyAxLjQ2MS0xLjQwNy0wLjg1OSAzLjgzOC0yLjI3N3oiPjwvcGF0aD4KPC9zdmc+Cg==",
  "chainName": "BNB Smart Chain Testnet",
  "nativeCurrency": {
      "name": "BNB Smart Chain Testnet",
      "symbol": "BNB",
      "decimals": 18
  },
  "rpcUrls": [
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
  ]
}

const Coin98AdapterModal = () => {
  const defaultChains = [BNB_TESTNET]; // multi-chain
  console.log("🩲 🩲 => Coin98AdapterModal => evmChains:", evmChains)
  // const defaultChains = [tomo,ether]; // single-chainds
  return <WalletModalC98 isC98Theme enableChains={defaultChains} />;
};

export default Coin98AdapterModal;