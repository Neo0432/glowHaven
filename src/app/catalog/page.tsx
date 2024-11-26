"use client";

import GetProducts from "../../functions/getProducts";
import { IProduct } from "./Product";
import Catalog from "./catalog";
import { useQuery } from "react-query";

export default function Page() {
  const { data, isLoading, isError } = useQuery("products", GetProducts);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;
  if (!data?.products) return <div>No products available</div>;

  const products: IProduct[] = data.products;

  return (
    <>
      <section className="flex flex-col mx-auto items-center px-14 box-border gap-8 w-fit max-w-[1440px]">
        <h1 className="font-semibold text-4xl self-start">Catalog</h1>
        <Catalog products={products} />
      </section>
    </>
  );
}
