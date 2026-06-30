import Image from "next/image";
import products from "@/data/products.json";
import Card from "../components/ui/Card";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      Página Inicial
    </div>
  );
}
