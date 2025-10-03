"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createPortal } from "react-dom";

export type LightboxItem = {
  type: "image" | "video";
  url: string;
};

export default function Lightbox({
  items,
  startIndex = 0,
  onClose,
}: {
  items: LightboxItem[];
  startIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length, onClose]);

  // block page scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  if (typeof document === "undefined") return null;

  const curr = items[index];

  
  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
  
      {/* Modal content */}
      <div className="relative flex flex-col items-center justify-center max-w-[90vw] md:max-w-[70vw] max-h-[90vh] rounded z-10">
        {/* Close */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="fixed top-5 right-5 p-1 rounded-full bg-white/60 hover:bg-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
  
        {/* Main media */}
        <div className="w-[90vw] md:w-[70vw] max-h-[70vh] flex items-center justify-center mt-10 md:mt-4 mb-20 md:mb-10">
          {curr?.type === "video" ? (
            <video
              src={curr.url}
              controls
              autoPlay
              className="max-h-[70vh] max-w-full rounded"
            />
          ) : (
            <img
              src={curr.url}
              alt=""
              className="max-h-[70vh] max-w-full object-contain rounded"
            />
          )}
        </div>
  
        {/* Thumbnails */}
        {items.length > 1 && (
          <div className="fixed bottom-10 w-full flex items-center justify-center">
            <div className="max-w-[95vw] md:max-w-[70vw] overflow-x-auto no-scrollbar">
              <div className="flex gap-2 px-2 pb-1">
                {items.map((it, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`shrink-0 border rounded ${
                      i === index ? "border-blue-500" : "border-transparent"
                    }`}
                    aria-label={`Thumb ${i + 1}`}
                  >
                    {it.type === "video" ? (
                      <video
                        src={it.url}
                        className="h-16 w-24 object-cover rounded"
                        muted
                      />
                    ) : (
                      <img
                        src={it.url}
                        alt=""
                        className="h-16 w-24 object-cover rounded"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
  
}
