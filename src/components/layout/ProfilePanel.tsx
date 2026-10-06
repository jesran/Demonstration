"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfilePanel({ isOpen, onClose }: ProfilePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-72 bg-[#F9F9F8] border border-[#E5E5E3] z-50 p-6 shadow-xl"
    >
      <div className="space-y-5">
        <div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#767674] block mb-1 font-mono">
            CLIENT ARCHIVE
          </span>
          <p className="text-xs text-[#767674] font-light leading-relaxed">
            Access order history, customized sizing and reserved editorial collections.
          </p>
        </div>

        <div className="pt-2 space-y-2 border-t border-[#E5E5E3]">
          <button
            type="button"
            onClick={() => {
              alert("Client Portal authentication will connect in Phase 4.");
              onClose();
            }}
            className="w-full h-11 bg-[#0D0D0D] text-white text-[10px] uppercase tracking-[0.18em] font-medium hover:bg-[#1C1C1C] transition-colors flex items-center justify-center"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              alert("Client Registration will connect in Phase 4.");
              onClose();
            }}
            className="w-full h-11 border border-[#E5E5E3] text-[#0D0D0D] text-[10px] uppercase tracking-[0.18em] font-medium hover:border-[#0D0D0D] bg-[#F3F4F3]/50 transition-colors flex items-center justify-center"
          >
            Create Account
          </button>
        </div>

        <div className="pt-3 border-t border-[#E5E5E3] space-y-2.5">
          <Link
            href="/shipping"
            onClick={onClose}
            className="block text-[10px] uppercase tracking-[0.14em] text-[#767674] hover:text-[#0D0D0D] transition-colors font-medium"
          >
            Orders & Tracking
          </Link>
          <Link
            href="/returns"
            onClick={onClose}
            className="block text-[10px] uppercase tracking-[0.14em] text-[#767674] hover:text-[#0D0D0D] transition-colors font-medium"
          >
            Exchanges & Returns
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="block text-[10px] uppercase tracking-[0.14em] text-[#767674] hover:text-[#0D0D0D] transition-colors font-medium"
          >
            Client Service
          </Link>
        </div>
      </div>
    </div>
  );
}
