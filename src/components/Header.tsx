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
import { useEffect, useRef, useState } from "react";
import s from "./header.module.scss";
import { DropdownMenuDemo } from "./DropdownMenu";
import { DrawerComp } from "./Drawer";
import Navigation from "./Navigation";
import { useBallance } from "@/providers/GlobalState";

const Header = () => {
  const { connected, address } = useWallet();
  const { openWalletModal } = useWalletModal();
  const headerRef = useRef<HTMLElement>(null);
  const balance = useBallance();

  useHideDOMItem({
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
        "xl:w-full w-[90%] py-[5px] sm:px-[60px] transition-all flex justify-between z-50 fixed top-[10px] left-1/2 -translate-x-1/2 container items-center bg-white rounded-full shadow-md",
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
      <Navigation />
      <div>
        <DrawerComp />
        <div className="flex gap-24">
          <div></div>
          <Button
            className="rounded-full hover:text-black border hidden md:block"
            onClick={onConnect}
          >
            {address ? (
              <div className="flex gap-[10px] items-center">
                {truncateAddress(address, 5)}
                <span>{balance} BNB</span>
              </div>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
