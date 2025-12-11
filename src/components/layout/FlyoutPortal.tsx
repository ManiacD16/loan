// FlyoutPortal.tsx
import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

type Pos = { top: number; left: number; width: number };

export function FlyoutPortal({
  anchorEl, gap = 8, width = 360, children, onEnter, onLeave,
}: {
  anchorEl: HTMLElement | null;
  gap?: number;
  width?: number;
  children: React.ReactNode;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  const [pos, setPos] = useState<Pos | null>(null);

  const place = () => {
    if (!anchorEl) return;
    const r = anchorEl.getBoundingClientRect();
    let left = r.right + gap;
    let top = r.top;
    // flip if overflowing right
    if (left + width > window.innerWidth - 8) left = r.left - gap - width;
    setPos({ top: Math.max(8, top), left, width });
  };

  useLayoutEffect(place, [anchorEl, gap, width]);
  useEffect(() => {
    if (!anchorEl) return;
    const h = () => place();
    window.addEventListener("scroll", h, { passive: true });
    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("scroll", h);
      window.removeEventListener("resize", h);
    };
  }, [anchorEl]);

  if (!pos) return null;

  return createPortal(
    <div
      className="rounded-xl bg-white text-basic-dark shadow-2xl ring-1 ring-black/5 p-2 z-[9999]"
      style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width, maxHeight: "66vh", overflowY: "auto" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </div>,
    document.body
  );
}
