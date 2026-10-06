"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { useBag } from "@/context/BagContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchOverlay } from "./SearchOverlay";
import { ProfilePanel } from "./ProfilePanel";
import { BagDrawer } from "./BagDrawer";
import { cn } from "@/lib/utils";

// Ribbon Navigation Items: NEW, MEN, WOMEN, KIDS, COLLECTIONS, EDITORIAL
const ribbonItems = [
  { label: "NEW", href: "/shop?filter=new" },
  { label: "MEN", href: "/shop?category=men" },
  { label: "WOMEN", href: "/shop?category=women" },
  { label: "KIDS", href: "/shop?category=kids" },
  { label: "COLLECTIONS", href: "/shop" },
  { label: "EDITORIAL", href: "/lookbook" },
];

export function Navbar() {
  const pathname = usePathname();
  const { itemCount, openBag } = useBag();
  const { itemCount: wishlistCount, openWishlist } = useWishlist();

  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modals on route change
  useEffect(() => {
    setIsSearchOpen(false);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-colors duration-200 border-b border-[#E5E5E3]",
          scrolled
            ? "bg-[#F9F9F8]/98 backdrop-blur-md"
            : "bg-[#F9F9F8]"
        )}
      >
        {/* ==========================================================
            LEVEL 1: PRIMARY HEADER (Brand Left, Clean Center, Utility Right)
            ========================================================== */}
        <div className="h-14 md:h-16 flex items-center border-b border-[#E5E5E3]">
          <Container className="flex items-center justify-between">
            {/* Left: Brand Name (Monolithic Architectural Sans) */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#0D0D0D] hover:opacity-60 transition-opacity"
              >
                DEMONSTATION
              </Link>
            </div>

            {/* Center: Clean negative space per Stitch standard */}
            <div className="hidden md:block flex-1" />

            {/* Right: Actions (SEARCH, WISHLIST, ACCOUNT, BAG) */}
            <div className="flex items-center gap-5 md:gap-7 relative">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search Collection"
                className="group flex items-center gap-1.5 text-[#767674] hover:text-[#0D0D0D] transition-colors"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="stroke-current"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <span className="hidden lg:inline text-[10px] uppercase tracking-[0.14em] font-normal">
                  Search
                </span>
              </button>

              {/* Wishlist Trigger */}
              <button
                type="button"
                onClick={openWishlist}
                aria-label={`Wishlist (${wishlistCount} items)`}
                className="group flex items-center gap-1.5 text-[#767674] hover:text-[#0D0D0D] transition-colors"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill={wishlistCount > 0 ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className={cn("stroke-current", wishlistCount > 0 && "text-[#0D0D0D]")}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="hidden lg:inline text-[10px] uppercase tracking-[0.14em] font-normal">
                  Wishlist ({wishlistCount})
                </span>
              </button>

              {/* Profile / Account Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-label="Account Profile"
                  className="group flex items-center gap-1.5 text-[#767674] hover:text-[#0D0D0D] transition-colors"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="stroke-current"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="hidden lg:inline text-[10px] uppercase tracking-[0.14em] font-normal">
                    Account
                  </span>
                </button>

                <ProfilePanel
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                />
              </div>

              {/* Bag Trigger */}
              <button
                type="button"
                onClick={openBag}
                aria-label={`Shopping Bag (${itemCount} items)`}
                data-cursor="cta"
                className="group flex items-center gap-1.5 text-[#0D0D0D] hover:opacity-60 transition-opacity"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="stroke-current"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="text-[10px] uppercase tracking-[0.14em] font-medium flex items-center gap-0.5">
                  Bag (
                  <span
                    key={itemCount}
                    className="inline-block transition-transform duration-300 font-mono scale-100 animate-in zoom-in-75"
                  >
                    {itemCount}
                  </span>
                  )
                </span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="md:hidden flex h-8 w-8 items-center justify-center text-[#0D0D0D] ml-1"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  {isMobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>
            </div>
          </Container>
        </div>

        {/* ==========================================================
            LEVEL 2: SHOPPING NAVIGATION RIBBON
            ========================================================== */}
        <div className="h-10 md:h-11 flex items-center overflow-x-auto no-scrollbar">
          <Container className="flex items-center justify-center">
            <nav
              aria-label="Shopping Navigation Ribbon"
              className="flex items-center gap-7 md:gap-12 whitespace-nowrap"
            >
              {ribbonItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[10px] md:text-[11px] uppercase tracking-[0.16em] font-medium text-[#0D0D0D] hover:text-[#767674] transition-colors relative py-1"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      </header>

      {/* ==========================================================
          MOBILE NAVIGATION DRAWER
          ========================================================== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[108px] z-50 bg-[#F9F9F8] border-t border-[#E5E5E3] flex flex-col justify-between p-8 md:hidden overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#767674] block font-mono">
              DIRECTORY
            </span>
            <div className="flex flex-col space-y-4">
              {ribbonItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg uppercase tracking-[0.08em] font-normal text-[#0D0D0D] border-b border-[#E5E5E3] pb-3"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-[#E5E5E3] space-y-3">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em]">
              <span className="text-[#767674]">Wishlist Saved:</span>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openWishlist();
                }}
                className="font-medium text-[#0D0D0D] underline"
              >
                {wishlistCount} Pieces
              </button>
            </div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em]">
              <span className="text-[#767674]">Currency:</span>
              <span className="text-[#0D0D0D]">INR (₹)</span>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Bag Slide-out Drawer */}
      <BagDrawer />
    </>
  );
}
