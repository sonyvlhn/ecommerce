"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5"
      >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
      </svg>
    ),
  },
  {
    name: "Produtos",
    href: "/Products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5"
      >
        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
      </svg>
    ),
  },
  {
    name: "Contact",
    href: "/contact",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5"
      >
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
      </svg>
    ),
  },
  {
    name: "Usuário",
    href: "/User",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 23 23"
        fill="currentColor"
        class="size-5"
      >
        <path
          fill-rule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clip-rule="evenodd"
        />
      </svg>
    ),
  },
];

export default function NavbarMobile() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const idx = links.findIndex((l) => l.href === pathname);
    if (idx >= 0) setActive(idx);
  }, [pathname]);

  useEffect(() => {
    const element = refs.current[active];
    if (element)
      setPill({ left: element.offsetLeft, width: element.offsetWidth });
  }, [active]);

  return (
    <div className="fixed bottom-0 right-0 left-0 z-50 flex items-center justify-center py-2 backdrop-blur-sm">
      <nav className="h-17 rounded-full bg-gray-200/80 dark:bg-gray-800/80 w-fit flex items-center justify-center inset-shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-300">
        <div className="relative flex gap-1 p-1.5">
          <div
            className="absolute top-1.5 h-[calc(100%-12px)] rounded-full bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out"
            style={{ left: pill.left, width: pill.width }}
          ></div>
          {links.map((link, index) => (
            <button
              key={index}
              ref={(element) => (refs.current[index] = element)}
              onClick={() => {
                setActive(index);
                router.push(link.href);
              }}
              className={`relative z-10 flex flex-col items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${active === index ? "text-blue-600 dark:text-sky-300" : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"}`}
            >
              {link.icon}
              {link.name}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
