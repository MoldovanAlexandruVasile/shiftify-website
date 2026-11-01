import { useCallback, useRef, useState } from "react";

import { useDismiss } from "./useDismiss";

// Open/closed state for a menu, closing on a click outside it or Escape.
// Put `root` on the element that holds both the toggle and the menu.
export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((open) => !open), []);
  useDismiss(root, isOpen, close);
  return { root, isOpen, close, toggle };
};
