import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ClientRouting } from "@/constants/routing";

const data = [
  {
    title: "Fundraise for",
    subItems: [
      { link: "/", text: "Medical" },
      { link: "/", text: "Emergency" },
      { link: "/", text: "Memorial" },
      { link: "/", text: "Education" },
      { link: "/", text: "Nonprofit" },
      { link: "/", text: "Crisis Relief" },
    ],
  },
  {
    title: "Fundraise for",
    subItems: [
      { link: "/", text: "How Planet0 Works" },
      { link: "/", text: "Why GoFundMe" },
      { link: "/", text: "Common questions" },
      { link: "/", text: "Success stories" },
      { link: "/", text: "Supported countries" },
      { link: "/", text: "Charity fundraising" },
      { link: "/", text: "Pricing" },
    ],
  },
  {
    title: "Fundraise for",
    subItems: [
      { link: "/", text: "Bao Thanh" },
      { link: "/", text: "Bao Khang" },
      { link: "/", text: "Khanh Duy" },
      { link: "/", text: "Nhu Le" },
    ],
  },
];

const Footer = () => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 container py-[50px] gap-[20px]">
      <div>
        <Link aria-label="Logo" href="/">
          <Image
            src={`${ClientRouting.imageURL}/logo.png`}
            alt="logo"
            className="w-[200px]"
            width={324}
            height={174}
          />
        </Link>
      </div>
      {data.map((menu) => {
        return (
          <div key={Math.random()} className="flex flex-col gap-[15px]">
            <div className="font-semibold">{menu.title}</div>
            {menu.subItems.map((item) => {
              return (
                <div key={Math.random()}>
                  <Link href={item.link}>{item.text}</Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
