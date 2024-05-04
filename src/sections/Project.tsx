import useProducts from "@/hook/useProducts";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ClientRouting } from "@/constants/routing";

const Projects = () => {
  const { products } = useProducts();
  return (
    <div className="w-full container vertical-spacing">
      <div className="min-h-[315px]">
        {products.slice(0, 1).map((product) => {
          return (
            <div className="flex h-full">
              <div className="flex-1 relative">
                <Image
                  src={`${ClientRouting.imageURL}/bg.png`}
                  alt="logo"
                  className="w-full h-full top-0 left-0 absolute object-cover"
                  width={324}
                  height={174}
                />
              </div>
              <div className="flex-1">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>

                <Link href={`/product/${product.id}`} className="mt-auto">
                  Learn more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {products.slice(1, 3).map((product) => {
          return <div></div>;
        })}
      </div>
    </div>
  );
};

export default Projects;
