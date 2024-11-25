import { IProduct, IProductCount } from "../catalog/Product";
import CartItem from "./cartItem";

export default function ListOfCartItems(props: {
  products: IProductCount[];
  catalog: IProduct[] | null;
}) {
  const { products, catalog } = props;

  if (!catalog) return <div>Loading...</div>;

  const cartItems = Object.values(catalog).filter((product) =>
    products.some((pc) => pc.id === product.id)
  );
  if (products.length == 0)
    return (
      <section className="grid row-auto gap-3">
        <p className="text-3xl font-light">The cart is empty</p>
      </section>
    );
  return (
    <section className="grid row-auto gap-3">
      {cartItems.map((product) => {
        const itemCount = products.find((pc) => pc.id === product.id)?.count;
        return (
          <CartItem
            key={product.id}
            product={product}
            itemCount={itemCount ? itemCount : 1}
          />
        );
      })}
    </section>
  );
}
