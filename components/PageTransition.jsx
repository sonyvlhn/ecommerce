"use client"

import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

// mesma ordem dos links da navbar — define para que lado a página desliza
const ROUTE_ORDER = ["/", "/Products", "/about"];

const DISTANCE = 32;

// mesma duração e mesma curva em todas as propriedades: x e opacity
// percorrem o trajeto em passo constante, começando e terminando juntos
const TRANSITION = { duration: 0.20, ease: "linear" };

const BLUR = "blur(8px)";

const variants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction * DISTANCE,
    filter: BLUR,
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: TRANSITION,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction * -DISTANCE,
    filter: BLUR,
    transition: TRANSITION,
  }),
};

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const currentIndex = ROUTE_ORDER.indexOf(pathname);

  const node = useRef(null);
  const previousIndex = useRef(currentIndex);
  // 1 = avançando na navbar (entra pela direita), -1 = voltando (entra pela esquerda)
  const direction = useRef(1);

  // recalcula só quando a rota realmente muda; re-renders durante a
  // transição precisam enxergar a mesma direção do início ao fim
  if (previousIndex.current !== currentIndex) {
    direction.current = currentIndex < previousIndex.current ? -1 : 1;
    previousIndex.current = currentIndex;
  }

  // fallback quando AnimatePresence initial={false} pula a animação de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      if (node.current) {
        node.current.style.filter = "";
        node.current.style.transform = "none";
      }
    }, TRANSITION.duration * 1000 + 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    // clip (e não hidden) evita criar um contêiner de rolagem aninhado,
    // que quebraria o `sticky` do filtro lateral
    <div className="overflow-x-clip">
      <AnimatePresence
        mode="wait"
        initial={false}
        custom={direction.current}
        onExitComplete={() => window.scrollTo({ top: 0 })}
      >
        <motion.div
          ref={node}
          key={pathname}
          custom={direction.current}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationComplete={(variant) => {
            if (variant === "animate" && node.current) {
              // filter e transform criam containing block e quebram position: sticky
              node.current.style.filter = "";
              node.current.style.transform = "none";
            }
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
