import { useEffect, useState } from "react";

export type Artwork = {
  src: string;
  title: string;
  dimensions: string;
  medium: string;
  status: string;
};

export function Lightbox({
  artwork,
  onClose,
}: {
  artwork: Artwork | null;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  useEffect(() => {
    setZoomed(false);
    if (!artwork) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [artwork, onClose]);

  if (!artwork) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-sm">
      <div className="flex items-start justify-between px-6 py-6 md:px-12">
        <div>
          <h3 className="text-xl tracking-wide md:text-2xl">{artwork.title}</h3>
          <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {artwork.dimensions} · {artwork.medium} · {artwork.status}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close viewer"
          className="border border-border px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-6 md:px-12 md:pb-12">
        <div
          className="h-full w-full cursor-zoom-in overflow-hidden"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setOrigin(
              `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
            );
          }}
          onClick={() => setZoomed((z) => !z)}
        >
          <img
            src={artwork.src}
            alt={artwork.title}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="pointer-events-none h-full w-full select-none object-contain transition-transform duration-500 ease-out"
            style={{ transform: zoomed ? "scale(2.4)" : "scale(1)", transformOrigin: origin }}
          />
        </div>
      </div>
      <p className="pb-6 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Click image to inspect brushwork
      </p>
    </div>
  );
}
