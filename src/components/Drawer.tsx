import * as React from "react";
import { AlignJustify, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Navigation from "./Navigation";
import Link from "next/link";
import { useWalletModal } from "@coin98-com/wallet-adapter-react-ui";
import { useWallet } from "@coin98-com/wallet-adapter-react";
import truncateAddress from "@/utils/truncateAddress";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function DrawerComp() {
  const [goal, setGoal] = React.useState(350);
  const { connected, address } = useWallet();
  const { openWalletModal } = useWalletModal();

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  const onConnect = async () => {
    if (!connected) {
      openWalletModal();
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="block md:hidden">
          <AlignJustify width={24} height={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full">
        <nav
          aria-label="primary"
          className={
            "px-fluid-base 4xl:px-0 my-auto relative z-10 sm:text-[16px] text-[12px] p-4"
          }
        >
          <ul className="flex gap-[40px] flex-col">
            <Link href="/">Docs</Link>
            <Link href="/">Project</Link>
            <Link href="/">Dashboard</Link>
          </ul>
          <Button
            className="rounded-full hover:text-black border mt-6"
            onClick={onConnect}
          >
            {address ? truncateAddress(address, 5) : "Connect Wallet"}
          </Button>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
