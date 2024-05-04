import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ClientRouting } from "@/constants/routing";

const data = [
  {
    title: "Fundraise for",
    subItems: [
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
    ],
  },
  {
    title: "Fundraise for",
    subItems: [
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
    ],
  },
  {
    title: "Fundraise for",
    subItems: [
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
      { link: "/", text: "Medical" },
    ],
  },
];

const Footer = () => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[24px] container py-[50px]">
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
            <div className="font-medium">{menu.title}</div>
            {menu.subItems.map((item) => {
              return (
                <div>
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
