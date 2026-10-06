"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";

const shopLinks = [
  { label: "NEW ARRIVALS", href: "/shop?filter=new" },
  { label: "MEN", href: "/shop?category=men" },
  { label: "WOMEN", href: "/shop?category=women" },
  { label: "KIDS", href: "/shop?category=kids" },
  { label: "COLLECTIONS", href: "/shop" },
];

const brandLinks = [
  { label: "ABOUT THE BRAND", href: "/about" },
  { label: "CAMPAIGN EDITORIAL", href: "/lookbook" },
  { label: "CONTACT DIRECTORY", href: "/contact" },
  { label: "SUSTAINABILITY STUDY", href: "/about" },
];

const clientServiceLinks = [
  { label: "SHIPPING & DELIVERY", href: "/shipping" },
  { label: "RETURNS & EXCHANGES", href: "/returns" },
  { label: "MEASUREMENTS GUIDE", href: "/about" },
  { label: "CLIENT CARE", href: "/contact" },
  { label: "PRIVACY POLICY", href: "/privacy" },
];

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    shop: false,
    brand: false,
    service: false,
  });

  // If user is on the collection/shop page, hide footer per specification
  if (pathname === "/shop") {
    return null;
  }

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="border-t border-[#E5E5E3] bg-[#F9F9F8] pt-16 md:pt-20 pb-14 md:pb-20 text-[#0D0D0D] relative z-10 mt-24 md:mt-32">
      <Container>
        {/* ==========================================================
            4-COLUMN FOOTER DIRECTORY & NEWSLETTER
            ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 md:gap-y-16 lg:gap-x-12 pb-16 md:pb-24 border-b border-[#E5E5E3]">
          {/* COLUMN 1: SHOP (Desktop / Tablet) */}
          <div className="hidden md:block lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#767674] mb-6">
              [01 // DIRECTORY]
            </h3>
            <ul className="space-y-3 font-mono">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[11px] text-[#0D0D0D] hover:text-[#767674] transition-colors tracking-[0.06em]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: DEMONSTATION (Desktop / Tablet) */}
          <div className="hidden md:block lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#767674] mb-6">
              [02 // ARCHIVE]
            </h3>
            <ul className="space-y-3 font-mono">
              {brandLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[11px] text-[#0D0D0D] hover:text-[#767674] transition-colors tracking-[0.06em]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CLIENT SERVICE (Desktop / Tablet) */}
          <div className="hidden md:block lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#767674] mb-6">
              [03 // CLIENT CARE]
            </h3>
            <ul className="space-y-3 font-mono">
              {clientServiceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[11px] text-[#0D0D0D] hover:text-[#767674] transition-colors tracking-[0.06em]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MOBILE ACCORDIONS */}
          <div className="md:hidden space-y-4 border-b border-[#E5E5E3] pb-6">
            <div className="border-b border-[#E5E5E3] pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("shop")}
                className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.16em] font-mono text-[#0D0D0D] py-2"
              >
                <span>DIRECTORY</span>
                <span className="text-xs">{openAccordions.shop ? "−" : "+"}</span>
              </button>
              {openAccordions.shop && (
                <ul className="pt-2 pb-3 space-y-2.5 pl-1 font-mono">
                  {shopLinks.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-xs text-[#767674]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-b border-[#E5E5E3] pb-3">
              <button
                type="button"
                onClick={() => toggleAccordion("brand")}
                className="w-full flex items-center justify-between text-[11px] uppercase tracking-[0.16em] font-mono text-[#0D0D0D] py-2"
              >
                <span>ARCHIVE</span>
                <span className="text-xs">{openAccordions.brand ? "−" : "+"}</span>
              </button>
              {openAccordions.brand && (
                <ul className="pt-2 pb-3 space-y-2.5 pl-1 font-mono">
                  {brandLinks.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-xs text-[#767674]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* COLUMN 4: NEWSLETTER / PRIVATE REGISTER */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#767674] mb-6">
              [04 // REGISTER]
            </h3>
            <p className="text-xs text-[#767674] leading-relaxed mb-6 font-light">
              Receive private dispatch notifications, textile specifications, and seasonal campaign launches.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <div className="flex items-center border-b border-[#0D0D0D] pb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER EMAIL ADDRESS"
                  aria-label="Email Address"
                  className="w-full bg-transparent text-xs uppercase tracking-[0.1em] text-[#0D0D0D] placeholder:text-[#767674]/60 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="text-[10px] uppercase tracking-[0.18em] font-mono text-[#0D0D0D] hover:text-[#767674] transition-colors pl-4 shrink-0"
                >
                  JOIN
                </button>
              </div>
              {subscribed && (
                <p className="absolute -bottom-6 left-0 text-[10px] uppercase tracking-[0.14em] text-[#0D0D0D] font-mono">
                  REGISTER CONFIRMED ✓
                </p>
              )}
            </form>
          </div>
        </div>

        {/* ==========================================================
            3. BOTTOM ROW: COPYRIGHT & METADATA
            ========================================================== */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-[#767674] font-mono">
          <div>
            &copy; {new Date().getFullYear()} DEMONSTATION. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#0D0D0D] transition-colors">
              PRIVACY
            </Link>
            <Link href="/terms" className="hover:text-[#0D0D0D] transition-colors">
              TERMS
            </Link>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0D0D0D] transition-colors">
              INSTAGRAM
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0D0D0D] transition-colors">
              X
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
