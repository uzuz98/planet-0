import useProducts from "@/hook/useProducts";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ClientRouting } from "@/constants/routing";
import RightIcon from "@/components/svgs/right-icon";

const Projects = () => {
  const { products } = useProducts();
  return (
    <div className="w-full container vertical-spacing">
      <div className="">
        {products.slice(0, 1).map((product) => {
          return (
            <div className="flex flex-col sm:flex-row h-full min-h-[315px] rounded-xl overflow-hidden" key={product.id}>
              <div className="flex-1 relative">
                <Image
                  src={`${ClientRouting.imageURL}/bg.png`}
                  alt="logo"
                  className="w-full h-full top-0 left-0 absolute object-cover min-h-[315px]"
                  width={324}
                  height={174}
                />
              </div>
              <div className="flex-1 pl-[25px] py-[64px] text-[24px] flex flex-col justify-between bg-[#F8F8F8]">
                <div>
                  <h3>{product.name}</h3>
                  <p className="text-[18px] text-[#767676] mt-4">
                    {product.description}
                  </p>
                </div>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-auto flex gap-[10px] items-center"
                >
                  Learn more <RightIcon />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px] mt-[30px]">
        {products.slice(1, 3).map((product) => {
          return (
            <div className="relative h-full" key={product.id}>
              <div className=" w-full h-full relative min-h-[200px]">
                <Image
                  src={`${ClientRouting.imageURL}/bg.png`}
                  alt="logo"
                  className="w-full h-full top-0 left-0 absolute object-cover rounded-t-xl"
                  width={324}
                  height={174}
                />
              </div>
              <div className="bg-[#F8F8F8] p-[24px] flex flex-col gap-[24px] relative rounded-b-xl">
                <h3>{product.name}</h3>
                <Link
                  href={`/product/${product.id}`}
                  className="flex gap-[10px] items-center"
                >
                  Learn more <RightIcon />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
