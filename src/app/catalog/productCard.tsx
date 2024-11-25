import Image from "next/image";
import { IProduct } from "./Product";
import { useCartStore } from "../CartStore";

export default function ProductCard(props: { product: IProduct }) {
  const { product } = props;
  const addToCart = useCartStore((state) => state.addToCart);
  const oldPrice: number = +(
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <article className="flex flex-col justify-between gap-4 max-w-[21.75rem] h-[33.4rem]">
      <div className="flex flex-col gap-4">
        <div className="relative flex justify-center p-6 rounded-2xl bg-item-bg">
          <Image
            src={product.thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            className="w-[300px]"
            alt=""
          ></Image>
          <div className="absolute right-4 top-4 flex justify-center items-center gap-1 px-3 h-8 rounded-2xl text-focus-element bg-[#EED2C7]">
            <Image
              src="/productItem/rating.svg"
              width="0"
              height="0"
              sizes="100vw"
              className="w-6 h-auto"
              alt=""
            ></Image>
            <p className="font-medium text-xl">{product.rating}</p>
          </div>
        </div>
        <h3 className="font-semibold text-xl leading-5">{product.title}</h3>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-4xl leading-9">
                {product.price + "$"}
              </p>
              <div className="flex justify-center items-center px-5 h-8 rounded-3xl bg-additional-red">
                <p className="text-pink-text text-base font-medium">{`-${product.discountPercentage}%`}</p>
              </div>
            </div>
            <div className="relative w-fit after:content-[''] after:absolute after:top-1/2 after:w-full after:border-[1px] after:border-pink-text after:rounded-full">
              <p className="">{oldPrice + "$"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-2 h-14">
        <button className="flex justify-center items-center px-4 min-w-[56px] h-[56px] rounded-2xl bg-focus-element transition-colors hover:bg-[#FA8756]">
          <Image
            src="/favoriteIcon.svg"
            width="0"
            height="0"
            sizes="100vw"
            className="w-6"
            alt=""
          ></Image>
        </button>
        <button
          onClick={() => addToCart(product.id, product.stock)}
          className="w-full h-full rounded-2xl font-semibold text-2xl text-white bg-focus-element transition-colors hover:bg-[#FA8756]"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
