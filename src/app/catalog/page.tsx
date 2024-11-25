"use client";

import GetProducts from "../../functions/getProducts";
import { ICatalog, IProduct } from "./Product";
import Catalog from "./catalog";
import { useState, useEffect } from "react";

export default function Page() {
  const [catalog, setCatalog] = useState<ICatalog | null>(null);

  useEffect(() => {
    async function fetchCatalog() {
      const fetchedData = await GetProducts();
      setCatalog(fetchedData);
    }
    fetchCatalog();
  }, []);

  if (!catalog) return <div>Loaging...</div>;

  const products: IProduct[] | null = catalog ? catalog.products : null;

  if (!products) return <div>Loaging...</div>;

  return (
    <>
      <section className="flex flex-col mx-auto items-center px-14 box-border gap-8 w-fit max-w-[1440px]">
        <h1 className="font-semibold text-4xl self-start">Catalog</h1>
        <Catalog products={products} />
      </section>
    </>
  );
}
