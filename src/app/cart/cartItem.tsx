import Image from "next/image";
import { useState } from "react";
import { IProduct } from "../catalog/Product";
import { useCartStore } from "../CartStore";

export default function CartItem(props: {
  product: IProduct;
  itemCount: number;
}) {
  const { product } = props;
  const addToCart = useCartStore((state) => state.addToCart);
  const reduceItemsCount = useCartStore((state) => state.reduceItemsCount);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [itemCount, setItemCount] = useState<number>(props.itemCount);

  function addItem() {
    addToCart(product.id);
    if (itemCount < product.stock) setItemCount(props.itemCount + 1);
  }
  function reduceItem() {
    reduceItemsCount(product.id);
    if (itemCount == 1) setItemCount(0);
    else setItemCount(itemCount - 1);
  }

  function deleteItem() {
    removeFromCart(product.id);
    setItemCount(0);
  }

  const oldPrice: number = +(
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <article className="flex justify-between ">
      <div className="flex gap-9 ">
        (product ?
        <div className="flex justify-center items-center w-fit h-fit p-6 rounded-2xl bg-item-bg">
          <Image
            src={product.thumbnail}
            width="0"
            height="0"
            sizes="100vw"
            className="w-36 h-36"
            alt=""
          ></Image>
        </div>
        :{" "}
        <div className="flex justify-center items-center h-fit p-6 rounded-2xl w-36 h36 bg-gray-500"></div>{" "}
        )
        <div className="flex flex-col gap-6 max-w-[42rem]">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <div className="flex justify-center items-center gap-1 px-3 h-8 rounded-2xl text-focus-element bg-[#EED2C7] ">
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
          <p className="text-xl">{product.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex flex-col gap-2 w-fit">
          <div className="flex justify-end items-center gap-2 w-fit">
            <p className="font-semibold text-4xl leading-9">
              {product.price + "$"}
            </p>
            <div className="flex justify-center items-center px-5 h-8 rounded-3xl bg-additional-red">
              <p className="text-pink-text text-base font-medium">{`-${product.discountPercentage}%`}</p>
            </div>
          </div>
          <div className="relative w-fit after:content-[''] after:absolute after:top-1/2 after:w-full after:border-[1px] after:border-pink-text after:rounded-full">
            <p className="font-light text-xl leading-5 text-[#626262]">
              {oldPrice + "$"}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <button
            onClick={deleteItem}
            className="flex p-4 rounded-2xl bg-[#EF4B4B]"
          >
            <Image
              src="/cart/deleteItem.svg"
              width="0"
              height="0"
              sizes="100vw"
              className="w-6 h-6"
              alt=""
            ></Image>
          </button>
          <div className="flex items-center gap-6 px-4 py-2 rounded-2xl bg-[#D9D9D9] text-[#374957]">
            <button onClick={reduceItem}>
              <Image
                src="/cart/reduceItem.svg"
                width="0"
                height="0"
                className="w-6 h-6"
                alt=""
              ></Image>
            </button>
            <span className="text-2xl font-semibold tabular-nums">
              {/* tabular-nums к сожалению не поддерживаются шрифтом */}
              {itemCount}
            </span>
            <button onClick={addItem}>
              <Image
                src="/cart/addItem.svg"
                width="0"
                height="0"
                className="w-6 h-6"
                alt=""
              ></Image>
              {/*Я мог бы сделать "+" и "-" через after,
              но у меня и так мало времени, а через twcss
              мне слишком впадлу
              Но я могу!) ахахах*/}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
