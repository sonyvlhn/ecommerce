"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import ButtonDark from "@/components/ui/buttonDark.jsx";

export default function UserPanel({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setVisible(false);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    setClosing(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      setVisible(false);
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (panelRef.current && !panelRef.current.contains(e.target)) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed top-0 right-0 left-0 bottom-0 z-40 flex items-end justify-center bg-black/60 dark:bg-black/75 backdrop-blur-sm ${
        closing ? "fadeOut" : "fadeIn"
      }`}
    >
      <div
        ref={panelRef}
        onTransitionEnd={(e) => {
          const isSlide =
            e.propertyName === "translate" || e.propertyName === "transform";
          if (closing && isSlide && e.target === panelRef.current) onClose();
        }}
        className={`flex flex-col w-full max-w-xl rounded-t-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-2xl dark:shadow-black/50 transition-transform duration-300 ease-in-out ${
          visible && !closing ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full h-18 bg-white dark:bg-gray-900 flex items-center justify-between p-4 shadow-md transition-all duration-300 ease-in-out">
          <p className="text-2xl font-bold dark:text-white transition-colors duration-300 ease-in-out">
            Preferências
          </p>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="py-2 pb-30 bg-gray-100 dark:bg-gray-900 overflow-y-auto transition-colors duration-300 ease-in-out">
          <a
            href="#"
            className="flex gap-3 items-center justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:rounded-md"
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
            className="flex gap-3 items-center justify-start px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:rounded-md"
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
          <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
            <p>Alternar Tema</p>
            <ButtonDark />
          </div>
        </div>
      </div>
    </div>
  );
}
