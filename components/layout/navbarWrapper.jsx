"use client"
import useWindowSize from "@/app/Products/useWindowSize";
import NavbarPill from "./navbarPill";
import NavbarMobile from "@/components/layout/navbarMobile";

export default function NavbarWrapper() {
  const { isMobile } = useWindowSize();
  if (isMobile === null) return null;
  return isMobile ? <NavbarMobile /> : <NavbarPill />;
}