import { IProduct } from "./Product";
import ProductCard from "./productCard";

export default function Catalog({ products }: { products: IProduct[] }) {
  return (
    <div className="grid grid-flow-row grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
