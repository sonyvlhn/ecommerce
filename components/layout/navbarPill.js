"use client"
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import ButtonDark from "@/components/ui/buttonDark.js";


export default function NavbarPill() {
    /* BackEnd da NavBar */
    const links = [
        { name: "Home", href:"/" },
        { name: "Produtos", href:"/Products" },
        { name: "Contact", href:"/" },
    ];
    const [active, setActive] = useState(0);
    const refs = useRef([]);
    const [pill, setPill] = useState({ left: 0, width: 0 });
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const idx = links.findIndex((l) => l.href === pathname);
        if (idx >= 0) setActive(idx);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    useEffect(() =>{
        const element =refs.current[active];
        if(element)
            setPill({left: element.offsetLeft, width: element.offsetWidth});
    }, [active]);

  return (
    /* FrontEnd da Navbar */
    <div
    className='fixed top-0 left-0 right-0 z-50 flex items-center gap-4 bg-white dark:bg-gray-900 text-black dark:text-gray-100 p-2 transition-colors duration-300 ease-in-out shadow-sm dark:shadow-gray-800/50'>
        <h2 className="font-bold text-2xl leading-none">Logo</h2>
        <nav
        className='h-14 rounded-full bg-gray-200/80 dark:bg-gray-800/80 w-fit px-1.5 m-auto flex items-center justify-center inset-shadow-sm ring-1 ring-black/5 dark:ring-white/10'>
            <div
            className='relative flex gap-1 p-1.5'>
                <div
                className='absolute top-1.5 h-[calc(100%-12px)] rounded-full bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out'
                style={{left:pill.left, width: pill.width}}>
                </div>
                {links.map((link, index) => (
                    <button
                    key={index}
                    ref={(element) => (refs.current[index] = element)}
                    onClick={() => {
                        setActive(index);
                        router.push(link.href);
                    }}
                    className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${active === index ? "text-blue-600 dark:text-sky-300" : "text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"}`}>
                        {link.name}
                    </button>
                ))}
            </div>
        </nav>
                <ButtonDark/>
    </div>
  )
}
