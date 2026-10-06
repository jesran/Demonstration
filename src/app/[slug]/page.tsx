import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";

type StaticPage = {
  title: string;
  eyebrow: string;
  description: string;
  sections: {
    heading: string;
    body: string;
  }[];
};

const pages: Record<string, StaticPage> = {
  lookbook: {
    title: "Editorial",
    eyebrow: "Seasonal Study",
    description:
      "Quiet campaign notes from the DEMONSTATION uniform: dense cotton, structured layers, and silhouettes built for daily repetition.",
    sections: [
      {
        heading: "Look 01",
        body: "Heavyweight jersey anchors the first release with a boxy shoulder, clean neckline, and enough structure to hold its form through movement.",
      },
      {
        heading: "Look 02",
        body: "Outer layers stay architectural without feeling ceremonial. Overshirts, hoodies, and jackets are designed to sit naturally over the core tee.",
      },
      {
        heading: "Look 03",
        body: "Trousers finish the uniform with relaxed volume and precise proportion, keeping the line easy without collapsing into softness.",
      },
    ],
  },
  about: {
    title: "About",
    eyebrow: "Brand Notes",
    description:
      "DEMONSTATION is a contemporary clothing study focused on form, movement, and everyday uniform pieces with a strong visual presence.",
    sections: [
      {
        heading: "Material First",
        body: "The collection centers heavyweight cottons, reinforced trims, and silhouettes that keep their shape after repeated wear.",
      },
      {
        heading: "Built For Repetition",
        body: "Each garment is made to become part of a weekly rhythm: straightforward to wear, precise in proportion, and quiet in finish.",
      },
    ],
  },
  contact: {
    title: "Contact",
    eyebrow: "Client Service",
    description:
      "For product questions, sizing guidance, or order support, reach the DEMONSTATION client service desk.",
    sections: [
      {
        heading: "Email",
        body: "Write to care@demonstation.example with your name, order reference if available, and the garment you need help with.",
      },
      {
        heading: "Response Window",
        body: "Messages are reviewed Monday through Saturday. Most questions receive a reply within one business day.",
      },
    ],
  },
  shipping: {
    title: "Shipping",
    eyebrow: "Delivery",
    description:
      "Orders are packed from the DEMONSTATION studio and prepared with simple tracking for every shipment.",
    sections: [
      {
        heading: "India Delivery",
        body: "Complimentary express delivery is available across India. Most orders dispatch within 24 hours after confirmation.",
      },
      {
        heading: "Tracking",
        body: "A tracking link is sent after dispatch so you can follow the shipment from studio release to arrival.",
      },
    ],
  },
  returns: {
    title: "Returns",
    eyebrow: "Exchanges",
    description:
      "Garments can be returned or exchanged within the stated window when they are unworn and still carry their original tags.",
    sections: [
      {
        heading: "14-Day Window",
        body: "Return or exchange requests must be opened within 14 days of delivery. Items should be unused, unwashed, and in original condition.",
      },
      {
        heading: "Size Exchanges",
        body: "When replacement stock is available, size exchanges are prioritized before refunds so the garment can stay in rotation.",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    eyebrow: "Data Care",
    description:
      "DEMONSTATION collects only the information needed to process orders, provide support, and improve the shopping experience.",
    sections: [
      {
        heading: "Information Used",
        body: "Contact, delivery, and order details are used for checkout, fulfillment, returns, and client service communication.",
      },
      {
        heading: "Retention",
        body: "Order records are retained only as needed for service, accounting, and legal requirements.",
      },
    ],
  },
  terms: {
    title: "Terms",
    eyebrow: "Store Policy",
    description:
      "Use of the DEMONSTATION website and purchase of garments are subject to standard availability, payment, and return conditions.",
    sections: [
      {
        heading: "Availability",
        body: "Products may sell through or change without prior notice. A confirmed order email indicates that the purchase has been received.",
      },
      {
        heading: "Pricing",
        body: "Prices are displayed in Indian rupees and may be updated for future releases, promotions, or stock changes.",
      },
    ],
  },
};

interface StaticPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: StaticPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) {
    return {
      title: "Page Not Found - DEMONSTATION",
    };
  }

  return {
    title: `${page.title} - DEMONSTATION`,
    description: page.description,
  };
}

export default async function StaticPage({ params }: StaticPageProps) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) {
    notFound();
  }

  // If this is the lookbook/editorial page, render as a high-fashion lookbook
  if (slug === "lookbook") {
    return (
      <main className="min-h-screen pt-32 md:pt-40 pb-28">
        <Container>
          {/* Header */}
          <header className="max-w-2xl mb-20 md:mb-28">
            <span className="text-[10px] uppercase tracking-[0.22em] text-demon-muted block mb-4 font-medium">
              Seasonal Study
            </span>
            <h1
              className="text-demon-black font-normal font-serif leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }}
            >
              Editorial
            </h1>
            <p className="mt-6 text-sm md:text-base text-demon-muted leading-relaxed font-light">
              Quiet campaign notes from the DEMONSTATION uniform: dense cotton, structured layers, and silhouettes built for daily repetition.
            </p>
          </header>

          {/* Look 01: Hero Asymmetric Spread */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-28 md:mb-40">
            <div className="lg:col-span-8">
              <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden border border-[#DAD6CE]/70">
                <img
                  src="/images/editorial/editorial-standing.jpg"
                  alt="Look 01 - Heavyweight Jersey Silhouette"
                  className="w-full h-full object-cover object-[55%_center] filter contrast-[1.03]"
                />
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-demon-muted font-medium">
                LOOK 01
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-demon-black">
                The Heavyweight Jersey
              </h2>
              <p className="text-sm text-demon-muted leading-relaxed font-light">
                Anchors the first release with a boxy shoulder, clean neckline, and enough structure to hold its form through movement.
              </p>
              <Link
                href="/product/heavyweight-tee"
                className="inline-block text-[11px] uppercase tracking-[0.14em] text-demon-black border-b border-demon-black pb-1 pt-2 font-medium"
              >
                View Piece →
              </Link>
            </div>
          </section>

          {/* Look 02: Inverted Asymmetric Spread */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-28 md:mb-40">
            <div className="lg:col-span-4 lg:order-1 order-2 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-demon-muted font-medium">
                LOOK 02
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-demon-black">
                Architectural Layers
              </h2>
              <p className="text-sm text-demon-muted leading-relaxed font-light">
                Outer layers stay architectural without feeling ceremonial. Overshirts, hoodies, and jackets are designed to sit naturally over the core tee.
              </p>
              <Link
                href="/product/check-overshirt"
                className="inline-block text-[11px] uppercase tracking-[0.14em] text-demon-black border-b border-demon-black pb-1 pt-2 font-medium"
              >
                View Piece →
              </Link>
            </div>
            <div className="lg:col-span-8 lg:order-2 order-1">
              <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden border border-[#DAD6CE]/70">
                <img
                  src="/images/products/check-overshirt-plaid.jpg"
                  alt="Look 02 - Architectural Layer"
                  className="w-full h-full object-cover object-center filter contrast-[1.02]"
                />
              </div>
            </div>
          </section>

          {/* Look 03: Balanced Two-Up Spread */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 mb-28 md:mb-40">
            <div className="space-y-6">
              <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden border border-[#DAD6CE]/70">
                <img
                  src="/images/products/relaxed-trouser-charcoal.jpg"
                  alt="Look 03 - Relaxed Volume"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-demon-muted block mb-2 font-medium">
                  LOOK 03
                </span>
                <h3 className="text-xl font-serif text-demon-black">
                  Relaxed Volume
                </h3>
                <p className="mt-2 text-sm text-demon-muted font-light leading-relaxed">
                  Trousers finish the uniform with relaxed volume and precise proportion.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden border border-[#DAD6CE]/70">
                <img
                  src="/images/editorial/editorial-walking.jpg"
                  alt="Look 04 - Structured Form"
                  className="w-full h-full object-cover object-[52%_center]"
                />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-demon-muted block mb-2 font-medium">
                  LOOK 04
                </span>
                <h3 className="text-xl font-serif text-demon-black">
                  Structured Jacket
                </h3>
                <p className="mt-2 text-sm text-demon-muted font-light leading-relaxed">
                  Precision tailoring engineered for enduring presence and composure.
                </p>
              </div>
            </div>
          </section>

          {/* Discovery Link */}
          <div className="text-center pt-10 border-t border-[#DAD6CE]/70">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 h-12 px-9 bg-demon-black text-white text-xs uppercase tracking-[0.18em] hover:bg-demon-charcoal transition-colors font-medium"
            >
              <span>Explore The Collection</span>
              <span>→</span>
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  // Standard informational pages (About, Contact, Shipping, Returns, Privacy, Terms)
  return (
    <main className="min-h-screen pt-32 md:pt-40 pb-28">
      <Container>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-[#DAD6CE] pb-16 md:pb-24">
          <div className="lg:col-span-5">
            <span className="text-[10px] uppercase tracking-[0.22em] text-demon-muted block mb-3 font-medium">
              {page.eyebrow}
            </span>
            <h1
              className="text-demon-black font-normal font-serif leading-none tracking-tight"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
            >
              {page.title}
            </h1>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-end">
            <p className="text-base md:text-lg text-demon-muted leading-relaxed font-light max-w-2xl">
              {page.description}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 py-14 md:py-20">
          {page.sections.map((section) => (
            <article
              key={section.heading}
              className="border-t border-[#DAD6CE] pt-6"
            >
              <h2 className="text-xs uppercase tracking-[0.16em] text-demon-black font-medium">
                {section.heading}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-demon-muted font-light">
                {section.body}
              </p>
            </article>
          ))}
        </section>

        <div className="flex flex-col sm:flex-row gap-4 border-t border-[#DAD6CE] pt-10">
          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center px-8 bg-demon-black text-white text-[11px] uppercase tracking-[0.18em] hover:bg-demon-charcoal transition-colors font-medium"
          >
            Shop Collection
          </Link>
          <Link
            href="/search"
            className="inline-flex h-12 items-center justify-center px-8 border border-demon-stone text-demon-black text-[11px] uppercase tracking-[0.18em] hover:border-demon-black transition-colors"
          >
            Search Garments
          </Link>
        </div>
      </Container>
    </main>
  );
}
