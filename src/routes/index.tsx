import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Reveal } from "@/components/Reveal";
import { Lightbox, type Artwork } from "@/components/Lightbox";


import h1 from "@/assets/20260829_202744-2.jpg.asset.json";
import h2 from "@/assets/20260829_202748-2.jpg.asset.json";
import h3 from "@/assets/20260829_202804-2.jpg.asset.json";
import h4 from "@/assets/20260829_202829-2.jpg.asset.json";
import h5 from "@/assets/20260829_202840-2.jpg.asset.json";
import h6 from "@/assets/20260829_202919-2.jpg.asset.json";

import studio from "@/assets/artist-studio.jpg.asset.json";
import logo from "@/assets/lm-logo.png.asset.json";
import c1 from "@/assets/c1-bugatti.jpg.asset.json";
import c2 from "@/assets/c2-amggt.jpg.asset.json";
import c3 from "@/assets/c3-300sl.jpg.asset.json";
import c4 from "@/assets/c4-250gto.jpg.asset.json";
import c5 from "@/assets/c5-laferrari.jpg.asset.json";
import c6 from "@/assets/c6-redline.jpg.asset.json";

const TITLE = "London Melania — Automotive Fine Art";
const DESCRIPTION =
  "Bespoke oil on canvas portraits of exotic and classic automobiles, hand-painted for distinguished private collectors worldwide.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const HERO_SLIDES = [h1.url, h2.url, h3.url, h4.url, h5.url, h6.url];

const COLLECTION: Artwork[] = [
  {
    src: c1.url,
    title: "Bugatti Chiron — Bavarian Midnight",
    dimensions: '36 × 27"',
    medium: "Oil on Canvas",
    status: "Private Collection",
  },
  {
    src: c2.url,
    title: "AMG GT Black Series — Red Shift",
    dimensions: '24 × 34"',
    medium: "Oil on Canvas",
    status: "Private Collection",
  },
  {
    src: c3.url,
    title: "Mercedes-Benz 300SL Roadster, 1963",
    dimensions: '30 × 24"',
    medium: "Oil on Canvas",
    status: "Private Collection",
  },
  {
    src: c4.url,
    title: "Ferrari 250 GTO, 1962",
    dimensions: '48 × 60"',
    medium: "Oil on Canvas",
    status: "Private Collection",
  },
  {
    src: c5.url,
    title: "Ferrari LaFerrari — Rosso Corsa",
    dimensions: '33 × 42"',
    medium: "Oil on Canvas",
    status: "Private Collection",
  },
  {
    src: c6.url,
    title: "Ferrari LaFerrari — Redline",
    dimensions: '21 × 15"',
    medium: "Oil on Canvas",
    status: "Private Collection",
  },
];

const NAV = [
  { label: "Collection", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "Commission Process", href: "#process" },
  { label: "Inquire", href: "#inquire" },
];

function Index() {
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState<Artwork | null>(null);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header />

      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        {HERO_SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Macro detail of oil paint brushwork on an automotive fine art canvas"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: i === slide ? 0.55 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="text-[10px] uppercase track-widest-xl text-silver">
            Automotive Fine Art · Est. Private Commissions
          </p>
          <h1 className="sr-only">London Melania — Automotive Fine Art</h1>
          <img
            src={logo.url}
            alt="London Melania Automotive Artist"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="pointer-events-none mx-auto mt-10 w-[min(90%,34rem)] select-none"
          />
          <p className="mx-auto mt-10 max-w-xl text-xs uppercase tracking-[0.32em] text-muted-foreground sm:text-sm">
            Bespoke Oil on Canvas for Distinguished Collectors
          </p>
          <a
            href="#inquire"
            className="mt-14 inline-block border border-foreground px-10 py-5 text-[10px] uppercase tracking-[0.35em] transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
          >
            Request a Bespoke Commission
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s}
              onClick={() => setSlide(i)}
              aria-label={`View slide ${i + 1}`}
              className={`h-px w-10 transition-colors duration-500 ${i === slide ? "bg-foreground" : "bg-border"}`}
            />
          ))}
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <SectionLabel>The Collection</SectionLabel>
          <h2 className="mt-6 max-w-2xl text-3xl tracking-wide md:text-5xl">
            Six curated masterworks in pure oil
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {COLLECTION.map((art, i) => (
            <Reveal key={art.title} delay={(i % 3) * 120}>
              <button
                onClick={() => setActive(art)}
                className="group block w-full text-left"
              >
                <div className="relative aspect-4/5 overflow-hidden border border-border">
                  <img
                    src={art.src}
                    alt={`${art.title}, ${art.medium}`}
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="pointer-events-none h-full w-full select-none object-cover brightness-[0.78] grayscale-[0.35] transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background via-background/20 to-transparent p-6 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <h3 className="text-lg tracking-wide">{art.title}</h3>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {art.dimensions} · {art.medium}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-silver">
                      {art.status}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  {art.title}
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 md:grid-cols-2 md:px-12 md:py-40 lg:gap-24">
          <Reveal>
            <img
              src={studio.url}
              alt="Portrait of the artist London Melania"
              loading="lazy"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              width={1024}
              height={1280}
              className="pointer-events-none aspect-4/5 w-full select-none border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={140} className="flex flex-col justify-center">
            <SectionLabel>About the Artist</SectionLabel>
            <h2 className="mt-6 text-3xl tracking-wide md:text-5xl">
              The craft &amp; the philosophy
            </h2>
            <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                London Melania is a realist painter whose work sits at the intersection of fine
                art, physics and automotive engineering. Specializing in high-end oil on canvas,
                Melania employs classical Renaissance Old Master techniques to depict the
                contrasting world of modern supercars.
              </p>
              <p>
                Her paintings possess a striking three-dimensional presence, capturing not only
                the aesthetic beauty of these vehicles but the precise physics and fluid
                aerodynamics driving their design.
              </p>
              <p>
                Driven by a lifelong fascination with speed and mechanical form, Melania seeks to
                dissolve the modern boundary between art and science. Historically, art,
                mathematics and physics were treated as unified disciplines; her practice
                intentionally reunites them, embedding mathematical principles and aerodynamic
                concepts directly into her visual compositions.
              </p>
            </div>
            <div className="mt-14 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
              {["100% Hand-Painted Oil", "Archival Canvas", "Private World-Wide Delivery"].map(
                (stat) => (
                  <div key={stat}>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-foreground">
                      {stat}
                    </p>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-12 md:py-40">
          <Reveal>
            <SectionLabel>Commissioning Process</SectionLabel>
            <h2 className="mt-6 max-w-2xl text-3xl tracking-wide md:text-5xl">
              Three considered stages
            </h2>
          </Reveal>
          <div className="mt-20 grid gap-14 md:grid-cols-3 md:gap-10">
            {[
              {
                n: "I",
                t: "Initial Consultation & Subject Selection",
                d: "A private discussion of your vehicle selection, canvas proportion, composition and the vision for the finished work.",
              },
              {
                n: "II",
                t: "Creation & Progress Updates",
                d: "Hand-painted in pure oil media over a four to eight week process, with discreet progress imagery at each layer.",
              },
              {
                n: "III",
                t: "Delivery",
                d: "Museum-grade packaging, insured worldwide delivery and a signed Certificate of Authenticity.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 140}>
                <div className="border-t border-border pt-8">
                  <p className="font-serif-display text-3xl text-silver">{step.n}</p>
                  <h3 className="mt-6 text-xl leading-snug tracking-wide">{step.t}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InquiryForm />
      <Footer />
      <Lightbox artwork={active} onClose={() => setActive(null)} />
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[10px] uppercase track-widest-xl text-silver">{children}</p>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="leading-none" aria-label="London Melania Automotive Artist">
          <img
            src={logo.url}
            alt="London Melania Automotive Artist"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="pointer-events-none h-8 w-auto select-none md:h-10"
          />
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <button
          className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-6 border-t border-border px-6 py-8 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function InquiryForm() {
  const [sent, setSent] = useState(false);
  const inputClass =
    "w-full border-0 border-b border-input bg-transparent py-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none";

  return (
    <section id="inquire" className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-28 md:py-40">
        <Reveal className="text-center">
          <SectionLabel>Private Commission</SectionLabel>
          <h2 className="mt-6 text-3xl tracking-wide md:text-5xl">
            Inquire for Private Commission
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Direct commissions are limited per year to preserve masterwork quality.
          </p>
        </Reveal>

        <Reveal delay={140}>
          {sent ? (
            <p className="mt-20 border border-border p-12 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Thank you. Your inquiry has been received — you will receive a private response
              shortly.
            </p>
          ) : (
            <form
              className="mt-20 space-y-12"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input required maxLength={100} placeholder="Full Name" className={inputClass} />
              <input
                required
                type="email"
                maxLength={255}
                placeholder="Email Address"
                className={inputClass}
              />
              <input
                required
                maxLength={160}
                placeholder="Vehicle Year, Make & Model to be Painted"
                className={inputClass}
              />
              <select required defaultValue="" className={`${inputClass} appearance-none`}>
                <option value="" disabled>
                  Preferred Canvas Size
                </option>
                {['24 × 36"', '36 × 48"', '48 × 60"', "Custom"].map((s) => (
                  <option key={s} value={s} className="bg-background">
                    {s}
                  </option>
                ))}
              </select>
              <textarea
                rows={4}
                maxLength={1500}
                placeholder="Additional Custom Details / Private Message"
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                className="w-full border border-foreground py-5 text-[10px] uppercase tracking-[0.35em] transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-14 text-center md:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          © London Melania Automotive Fine Artist. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
