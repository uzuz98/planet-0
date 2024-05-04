import useProducts from "@/hook/useProducts";
import Link from "next/link";
import React from "react";

const Projects = () => {
  const { products } = useProducts();
  return (
    <div>
      <div>
        {products.slice(0, 1).map((product) => {
          return (
            <div className="flex">
              <div className="flex-1"></div>
              <div className="flex-1">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>

                <Link href={"/"} className="">Learn more</Link>
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
