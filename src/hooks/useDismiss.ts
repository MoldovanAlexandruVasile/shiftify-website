import { useEffect, type RefObject } from "react";

// Closes a menu when the visitor clicks outside it or presses Escape.
export const useDismiss = (root: RefObject<HTMLElement | null>, isOpen: boolean, close: () => void) => {
  useEffect(() => {
    if (!isOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [root, isOpen, close]);
};
