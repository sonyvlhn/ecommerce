"use client";
import React from "react";
import Link from "next/link";
import ButtonDark from "@/components/ui/buttonDark.js";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 text-black dark:text-gray-100 block p-2 transition-colors duration-300 ease-in-out shadow-sm dark:shadow-gray-800/50">
      <nav className="flex items-center justify-between px-4">
        <h2 className="font-bold text-2xl">Logo</h2>
        <ul className="bg-gray-200 dark:bg-gray-800 rounded-full flex flex-row space-x-3 p-4 text-gray-600 dark:text-gray-300 transition-colors duration-300 ease-in-out">
          <li>
            <Link 
            className="px-4 py-3 rounded-full transition-colors duration-300 ease-in-out hover:bg-white dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400"
            href="/">Home</Link>
          </li>
          <li >
            <Link 
            className="px-4 py-3 rounded-full transition-colors duration-300 ease-in-out hover:bg-white dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400"
            href="/Products">Produtos</Link>
          </li>
          <li >
            <Link 
            className="px-4 py-3 rounded-full transition-colors duration-300 ease-in-out hover:bg-white dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400"
            href="/">Contact</Link>
          </li>
        </ul>
        <span className="flex justify-end">
          <ButtonDark />
        </span>
      </nav>
    </div>
  );
}
