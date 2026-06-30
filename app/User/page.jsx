"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonDark from "@/components/ui/buttonDark.jsx";

export default function User() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  function handleClose() {
    setClosing(true);
    setTimeout(() => router.back(), 350);
  }

  return (
    <div className="flex flex-col h-screen w-screen absolute">
      <div
        className={`flex flex-col h-full w-full bg-white transition-transform duration-350 ease-in-out ${
          visible && !closing ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full h-18 bg-white dark:bg-gray-800 flex items-center justify-between p-4 shadow-md z-50 transition-all duration-300">
          <p className="text-2xl font-bold dark:text-white transition-colors duration-300">Preferências</p>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="py-2 bg-gray-100 dark:bg-gray-800 h-screen transition-colors duration-300">
          <a
            href="#"
            className="flex gap-3 items-center justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            Carrinho
          </a>
          <a
            href="#"
            className="flex gap-3 items-center justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            Favoritos
          </a>
          <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded-md">
            <p>Alternar Tema</p>
            <ButtonDark />
          </div>
        </div>
      </div>
    </div>
  );
}
