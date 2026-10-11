"use client";
import Image from "next/image";
import { useRef, useState } from "react";

// Carrossel de imagens da página do produto.
// Usa scroll-snap nativo (arrastar no touch/trackpad) + setas, indicadores, miniaturas e teclado.
// `children` é renderizado por cima da imagem (ex.: selo de desconto).
export default function ProductCarousel({ images = [], alt = "", children }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const total = images.length;
  const hasMany = total > 1;

  const goTo = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (index + total) % total;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  // Sincroniza o índice ativo com a posição de rolagem (cobre arraste e setas)
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== active) setActive(index);
  };

  const handleKeyDown = (event) => {
    if (!hasMany) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    }
  };

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 flex size-10 items-center justify-center rounded-full bg-surface/70 text-heading ring-1 ring-edge backdrop-blur-md shadow-card-button cursor-pointer hover:bg-surface transition-colors duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-focus";

  return (
    <div className="space-y-3">
      <div
        role="region"
        aria-roledescription="carrossel"
        aria-label={`Imagens de ${alt}`}
        tabIndex={hasMany ? 0 : undefined}
        onKeyDown={handleKeyDown}
        className="relative aspect-square overflow-hidden rounded-2xl border-3 border-card-border bg-card shadow-lg shadow-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide overscroll-x-contain"
        >
          {images.map((src, index) => (
            <div
              key={src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${total}`}
              aria-hidden={index !== active}
              className="relative h-full w-full shrink-0 snap-center"
            >
              <Image
                src={src}
                alt={hasMany ? `${alt} — imagem ${index + 1}` : alt}
                fill
                unoptimized
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center dark:brightness-[0.92]"
              />
            </div>
          ))}
        </div>

        {children}

        {hasMany && (
          <>
            <button type="button" onClick={() => goTo(active - 1)} aria-label="Imagem anterior" className={`${arrowClass} left-3`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button type="button" onClick={() => goTo(active + 1)} aria-label="Próxima imagem" className={`${arrowClass} right-3`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-surface/60 px-2.5 py-1.5 ring-1 ring-edge backdrop-blur-md">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Ir para a imagem ${index + 1}`}
                  aria-current={index === active}
                  className={`h-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                    index === active ? "w-5 bg-accent" : "w-2 bg-subtle hover:bg-muted"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMany && (
        <div className="flex justify-center-safe gap-2 overflow-x-auto scrollbar-hide p-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ver imagem ${index + 1}`}
              aria-current={index === active}
              className={`relative size-16 md:size-20 shrink-0 overflow-hidden rounded-xl bg-card ring-2 cursor-pointer transition-all duration-300 ease-in-out ${
                index === active ? "ring-accent" : "ring-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill unoptimized sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
