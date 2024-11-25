"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "../CartStore";
import ListOfCartItems from "./listOfCartItems";
import Payment from "./payment";
import GetProducts from "@/functions/getProducts";
import { IProduct } from "../catalog/Product";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);

  const [catalog, setCatalog] = useState<IProduct[] | null>(null);

  useEffect(() => {
    async function fetchCatalog() {
      const fetchedData = await GetProducts();
      setCatalog(fetchedData.products);
    }
    fetchCatalog();
  }, []);

  return (
    <>
      <section className="flex flex-col mx-auto gap-8 px-14 w-full max-w-[1440px] ">
        <h1 className="font-semibold text-4xl self-start">Cart</h1>
        <Payment products={cart} catalog={catalog} />
        <hr className="rounded-full border-gray-700" />
        <ListOfCartItems products={cart} catalog={catalog} />
      </section>
    </>
  );
}
