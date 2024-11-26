import NavButton from "@/components/header/navButton";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky z-40 mt-4 top-0 flex justify-center w-full py-4 bg-background">
      <div className="flex justify-between pl-14 pr-20 w-full max-w-[1440px]">
        <div className="flex gap-4 w-fit">
          <Link href="/catalog" className="text-5xl font-bold">
            GlowHaven
          </Link>
          <Link
            href="/catalog"
            className="flex justify-center items-center rounded-2xl p-3 px-6 bg-primary transition-all text-xl font-semibold text-white hover:bg-primary-hover hover:scale-105"
          >
            Catalog
          </Link>
        </div>

        <div className="flex items-center gap-4 w-fit">
          <NavButton imageName="favorite" path="/favorite" />
          <NavButton imageName="cart" path="/cart" />
          <NavButton imageName="user" path="/user" />
        </div>
      </div>
    </header>
  );
}
