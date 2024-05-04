"use client";
import { Button } from "@/components/ui/button";
import { ClientRouting } from "@/constants/routing";
import truncateAddress from "@/utils/truncateAddress";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";
import Image from "next/image";

const Header = () => {
  const { connected, address, sendTransaction } = useWallet();
  const { openWalletModal } = useWalletModal();

  const onConnect = async () => {
    if (!connected) {
      openWalletModal();
    }
  };
  return (
    <header className="w-full py-[20px] px-[60px] flex justify-end z-10 fixed top-0 left-0 container">
      <nav
        aria-label="primary"
        className="px-fluid-base 4xl:px-0 my-auto relative z-10 w-full"
      >
        <div className="flex items-center justify-between max-w-screen-3xl mx-auto h-full">
          <div className="max-w-[120px] md:max-w-[150px]">
            <a aria-label="Logo" href="/">
              <Image
                src={`${ClientRouting.imageURL}/logo.png`}
                alt="logo"
                className="w-[300px]"
                width={324}
                height={174}
              />
            </a>
          </div>
          <Button
            className="ml-auto rounded-full hover:text-black border"
            onClick={onConnect}
          >
            {address ? truncateAddress(address, 5) : "Connect Wallet"}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
