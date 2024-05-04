"use client";
import { Button } from "@/components/ui/button";
import { ClientRouting } from "@/constants/routing";
import useHideDOMItem from "@/hook/useHideDOMItem";
import { cn } from "@/lib/utils";
import truncateAddress from "@/utils/truncateAddress";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import s from "./header.module.scss";

const Header = () => {
  const { connected, address } = useWallet();
  const { openWalletModal } = useWalletModal();
  const headerRef = useRef<HTMLElement>(null);

  const { isTop } = useHideDOMItem({
    initCB: () => {
      if (!headerRef?.current?.classList?.contains(s.hide)) return;
      headerRef?.current?.classList.remove(s.hide);
    },
    scrollDownCB: () => {
      if (headerRef?.current?.classList?.contains(s.hide)) return;
      headerRef?.current?.classList.add(s.hide);
    },
    scrollUpCB: () => {
      if (!headerRef?.current?.classList?.contains(s.hide)) return;
      headerRef?.current?.classList.remove(s.hide);
    },
  });

  const onConnect = async () => {
    if (!connected) {
      openWalletModal();
    }
  };
  return (
    <header
      className={cn(
        "w-full py-[5px] px-[60px] transition-all flex justify-between z-50 fixed top-[10px] left-1/2 -translate-x-1/2 container items-center bg-white rounded-full shadow-md",
        s.header
      )}
      ref={headerRef}
    >
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
      <nav
        aria-label="primary"
        className="px-fluid-base 4xl:px-0 my-auto relative z-10"
      >
        <ul className="flex gap-[40px]">
          <Link href="/">Docs</Link>
          <Link href="/">Project</Link>
          <Link href="/">Dashboard</Link>
        </ul>
      </nav>
      <Button
        className="rounded-full hover:text-black border"
        onClick={onConnect}
      >
        {address ? truncateAddress(address, 5) : "Connect Wallet"}
      </Button>
    </header>
  );
};

export default Header;
