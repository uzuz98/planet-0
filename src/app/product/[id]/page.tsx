import { db } from "@/config";
import React from "react"
import { collection, getDocs, query, where } from "firebase/firestore";
import { Product } from "@/types";

export const revalidate = 1

const Page = async ({params}: {params: {id: string}}) => {
  const products = collection(db, "products");
  const q = query(products, where('__name__', '==', params.id));
  const productDocs = await getDocs(q);
  const productList = productDocs.docs.map(doc => doc.data()) as Product[]
  const product: Product = productList[0]
  
  return (
    <div>{product?.name}</div>
  )
}

export default Page