import { collection, getDocs, limit, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/config";
import { Product } from "@/types";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProductData = async () => {
    try {
      const products = collection(db, "products");
      const q = query(products, limit(4));
      const productDocs = await getDocs(q);
      const productList = productDocs.docs.map((doc) =>
        doc.data()
      ) as Product[];
      setProducts(productList);
    } catch (error) {
      console.log("🩲 🩲 => onPress => error:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  return { products };
}
