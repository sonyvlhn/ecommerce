"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Dropdown from "./dropdown";

export default function NavbarPill() {
  /* BackEnd da NavBar */
  const links = [
    { name: "início", href: "/" },
    { name: "Produtos", href: "/Products" },
    { name: "Sobre", href: "/about" },
  ];
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  const dropdownRef = useRef(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const router = useRouter();
  const pathname = usePathname();

  // A função abaixo é responsável por ativar o link clicado que quando o usuário clica no link, a navbar ativa o link clicado.
  useEffect(() => {
    const idx = links.findIndex((l) => l.href === pathname);
    if (idx >= 0) setActive(idx);
  }, [pathname]);

  useEffect(() => {
    const element = refs.current[active];
    if (element)
      setPill({ left: element.offsetLeft, width: element.offsetWidth });
  }, [active]);

  //dropdown
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    /* FrontEnd da Navbar */
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center gap-4 backdrop-blur-sm dark:backdrop-blur-sm text-foreground p-2 transition-colors duration-300 ease-in-out shadow-sm shadow-shadow">
      <h2 className="font-bold text-2xl leading-none ml-2">Logo</h2>
      <nav className="h-14 rounded-full bg-surface-muted/80 w-fit px-1.5 m-auto flex items-center justify-center inset-shadow-sm ring-1 ring-edge-subtle transition-colors duration-300 ease-in-out">
        <div className="relative flex gap-1 p-1.5">
          <div
            className="absolute top-1.5 h-[calc(100%-12px)] rounded-full bg-surface-raised transition-all duration-300 ease-in-out"
            style={{ left: pill.left, width: pill.width }}
          ></div>
          {links.map((link, index) => (
            <button
              key={index}
              ref={(element) => (refs.current[index] = element)}
              onClick={() => {
                setActive(index); //ativa o link clicado
                router.push(link.href); //redireciona para a página correspondente ao link clicado
              }}
              className={`relative cursor-pointer z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ease-in-out ${active === index ? "text-nav-link-active" : "text-nav-link hover:text-nav-link-hover"}`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </nav>
      <div className="relative">
        <button
          className="rounded-full bg-surface-muted/80 w-fit h-fit p-3 inset-shadow-sm ring-1 ring-edge-subtle"
          onClick={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 hover:scale-110 duration-100 ease-in-out cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>
        <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
