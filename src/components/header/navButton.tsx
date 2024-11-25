"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/app/CartStore";

export default function NavButton(props: { imageName: string; path: string }) {
  const imgPath: string = "./header/" + props.imageName + ".svg";
  let cartCount: number | null = null;
  const count = useCartStore((state) => state.cartCount);
  if (props.path == "/cart") {
    cartCount = count;
  }

  return (
    <Link
      href={props.path}
      className="relative flex justify-center items-center rounded-2xl p-3 w-fit h-fit bg-primary"
    >
      <Image
        src={imgPath}
        width="0"
        height="0"
        sizes="100vw"
        priority={true}
        alt=""
        className="w-6 h-auto"
      ></Image>
      {cartCount ? (
        <span className="absolute top-0 right-0 translate-x-2 -translate-y-2 flex justify-center items-center p-1 w-6 h-6 rounded-full bg-red-400 text-white text-sm font-medium">
          {cartCount}
        </span>
      ) : null}
    </Link>
  );
}
