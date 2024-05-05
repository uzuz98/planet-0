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
          <a href={"https://planet0.gitbook.io/untitled"} target="_blank">
            Docs
          </a>
        </ul>
      </nav>
    );
  }
);

Navigation.displayName = "Navigaiton";

export default Navigation;
