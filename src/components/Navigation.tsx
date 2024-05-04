import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { FC, HTMLAttributes, forwardRef } from "react";

const Navigation = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="primary"
        {...props}
        className={cn(
          className,
          "px-fluid-base 4xl:px-0 my-auto relative z-10 hidden md:block sm:text-[16px] text-[12px]"
        )}
      >
        <ul className="flex gap-[40px]">
          <Link href="/">Docs</Link>
          <Link href="/">Project</Link>
          <Link href="/">Dashboard</Link>
        </ul>
      </nav>
    );
  }
);

Navigation.displayName = "Navigaiton";

export default Navigation;
