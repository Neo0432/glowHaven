import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-6 w-full h-fit bg-item-bg">
      <p>
        © 2024{"\u00A0"}
        <Link href="https://github.com/Neo0432" target="_blank">
          Neo
        </Link>
        .
      </p>
    </footer>
  );
}
