import React from "react";
import "./Rentall.css";
import b1 from "../assets/images/b1.jpeg";
import b2 from "../assets/images/b2.jpeg";
import b3 from "../assets/images/b3.jpeg";
import a1 from "../assets/images/a1.webp";
import a2 from "../assets/images/a2.webp";
import a3 from "../assets/images/a3.webp";
import p1 from "../assets/images/p1.webp";
import p2 from "../assets/images/p2.webp";
import Footer from "../components/Footer/Footer";

const products = [
  {
    id: "elitebook-840-g9",
    name: "HP EliteBook 840 G9",
    specs: "i7 • 16GB • 512GB • 14\"",
    price: 2650,
    mrp: 3100,
    stock: "Only 3 left",
    image:
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "thinkpad-t14",
    name: "Lenovo ThinkPad T14",
    specs: "i5 • 16GB • 512GB • 14\"",
    price: 2280,
    mrp: 2600,
    stock: "Only 5 left",
    image:
      "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "macbook-air-m2",
    name: "MacBook Air M2",
    specs: "M2 • 8GB • 256GB • 13\"",
    price: 3450,
    mrp: 3900,
    stock: "Only 2 left",
    image:
      "https://images.unsplash.com/photo-1539376248633-cf94fa8b7bd8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dell-latitude-5420",
    name: "Dell Latitude 5420",
    specs: "i5 • 8GB • 256GB • 14\"",
    price: 1980,
    mrp: 2300,
    stock: "Only 6 left",
    image:
      "https://images.unsplash.com/photo-1575909812264-6902b55846ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hp-probook-450",
    name: "HP ProBook 450 G8",
    specs: "i5 • 8GB • 512GB • 15.6\"",
    price: 2050,
    mrp: null,
    stock: "Only 4 left",
    image:
      "https://images.unsplash.com/photo-157024357670-2b5164f470c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dell-precision-3560",
    name: "Dell Precision 3560",
    specs: "i7 • 16GB • 512GB • 15.6\"",
    price: 2890,
    mrp: 3250,
    stock: "Only 3 left",
    image:
      "https://images.unsplash.com/photo-1593642633279-1796119d5482?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  {
    id: "Laptops",
    label: "Laptops",
    tag: "Bestseller",
    startingAt: "2,100.00",
    image: p1,
    link: "/products?category=Laptops",
  },
  {
    id: "Workstations",
    label: "Workstations",
    tag: null,
    startingAt: "2,890.00",
    image: p2,
    link: "/products?category=Workstations",
  },
];

const steps = [
  {
    title: "Pick Your Laptop",
    copy: "Browse through our collection and select the laptop that suits your needs.",
    image: b1,
  },
  {
    title: "Select Tenure Plan",
    copy: "Choose a flexible monthly rental duration that works best for you.",
    image: b2,
  },
  {
    title: "Get It Delivered",
    copy: "Complete verification and receive the laptop at your doorstep.",
    image: b3,
  },
];

const reasons = [
  {
    title: "Tested before it ships",
    copy: "Every unit is checked and benchmarked so it performs from day one.",
    image: a1,
  },
  {
    title: "Pricing you can read in one glance",
    copy: "One monthly number, deposit shown upfront, nothing added later.",
    image: a2,
  },
  {
    title: "Support through the whole term",
    copy: "Doorstep delivery, swaps, and help desk access while you rent.",
    image: a3,
  },
];

function LaptopGlyph() {
  return (
    <svg viewBox="0 0 64 44" className="rt-glyph" aria-hidden="true">
      <rect x="10" y="4" width="44" height="28" rx="2.5" className="rt-glyph-screen" />
      <rect x="14" y="8" width="36" height="20" rx="1" className="rt-glyph-panel" />
      <path d="M2 36h60l-5 6H7l-5-6z" className="rt-glyph-base" />
    </svg>
  );
}

export default function Rentall() {
  return (
    <div className="rentall-page">
      {/* Hero */}
      <section className="rt-hero">
        <div className="rt-container rt-hero-grid">
          <div className="rt-hero-copy">
            <div className="rt-hero-badge">
              <span className="rt-pill">Rentals</span>
              <span>Starting at &#8377;1,980/month</span>
            </div>
            <h1 className="rt-hero-title">
              Flexible laptop rentals for work and study.
            </h1>
            <p className="rt-hero-sub">
              Premium laptops on monthly plans, delivered to your door — swap
              or upgrade whenever your needs change.
            </p>
            <div className="rt-hero-actions">
              <a href="#products" className="rt-btn rt-btn-primary">
                Explore laptops
              </a>
              <a href="#business" className="rt-link-arrow">
                For business <span>&rarr;</span>
              </a>
            </div>
          </div>

          <div className="rt-hero-art" aria-hidden="true">
            <div className="rt-laptop-wrap">
              <div className="rt-laptop">
                <div className="rt-laptop-screen">
                  <span className="rt-laptop-cam" />
                  <div className="rt-laptop-wave" />
                </div>
                <div className="rt-laptop-body">
                  <span className="rt-laptop-hinge" />
                  <span className="rt-laptop-trackpad" />
                </div>
              </div>
              <div className="rt-laptop-shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="rt-trust">
        <div className="rt-container">
          <p className="rt-trust-label">
            Trusted by teams and students across India
          </p>
          <div className="rt-trust-row">
            {[
              "Nimbus Labs",
              "Cursor Studio",
              "Bright Path Edu",
              "Forge & Co",
              "Nova Systems",
              "Kestrel Tech",
            ].map((name) => (
              <span className="rt-trust-item" key={name}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Popular products */}
      <section className="rt-products" id="products">
        <div className="rt-container">
          <div className="rt-section-head">
            <div>
              <h2 className="rt-h2">Most rented right now</h2>
              <p className="rt-section-sub">
                A wide range of laptops on flexible tenures, with fast
                delivery and support included.
              </p>
            </div>
            <a href="#all" className="rt-link-arrow rt-link-desktop">
              View all laptops <span>&rarr;</span>
            </a>
          </div>

          <div className="rt-product-grid">
            {products.map((p) => (
              <article className="rt-card" key={p.id}>
                <div className="rt-card-media">
                  <LaptopGlyph />
                  <img
                    src={p.image}
                    alt={p.name}
                    className="rt-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="rt-card-body">
                  <h3 className="rt-card-title">{p.name}</h3>
                  <div className="rt-card-row">
                    <span className="rt-card-specs">{p.specs}</span>
                    <div className="rt-card-price">
                      {p.mrp && <span className="rt-badge-off">12% off</span>}
                      <div className="rt-price-now">
                        &#8377;{p.price.toLocaleString("en-IN")}
                        <span>/mo</span>
                      </div>
                      {p.mrp && (
                        <div className="rt-price-mrp">
                          &#8377;{p.mrp.toLocaleString("en-IN")}/mo
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="rt-card-stock">{p.stock}</p>
                </div>
                <div className="rt-card-actions">
                  <button type="button" className="rt-btn rt-btn-outline">
                    Add to cart
                  </button>
                  <a href={`#${p.id}`} className="rt-btn rt-btn-dark">
                    View details
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="rt-link-mobile">
            <a href="#all" className="rt-link-arrow">
              View all laptops <span>&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="rt-categories">
        <div className="rt-container">
          <div className="rt-section-head">
            <div>
              <h2 className="rt-h2">Browse by category</h2>
              <p className="rt-section-sub">
                Pick a device, complete quick verification, and get it
                delivered — no long-term commitment.
              </p>
            </div>
            <a href="#all" className="rt-link-arrow rt-link-desktop">
              View all laptops <span>&rarr;</span>
            </a>
          </div>

          <div className="rt-category-grid">
            {categories.map((c) => (
              <div
                key={c.id}
                className="relative overflow-hidden rounded-lg bg-[#E9E9E9] p-8 text-center"
              >
                {c.tag && (
                  <span className="absolute left-2 top-2 rounded-full bg-[#7CE0E6] px-3 py-1 text-xs font-light text-[#053436]">
                    {c.tag}
                  </span>
                )}
                <div className="flex justify-center">
                  <span className="rounded-full border border-slate-300 bg-white/40 px-4 py-1 text-xs text-slate-700">
                    {c.label}
                  </span>
                </div>
                <div className="mt-2 text-3xl font-semibold text-slate-950 md:text-[28px]">
                  {c.label}
                </div>
                <div className="mt-5 flex justify-center">
                  <img
                    alt={c.label}
                    loading="lazy"
                    className="h-40 w-auto object-contain"
                    src={c.image}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="mt-10 flex justify-center">
                  <a
                    className="inline-flex items-center justify-center rounded-full bg-[#003F43] px-8 py-2 text-sm font-normal !text-white shadow-sm transition-colors hover:bg-[#053f3f]"
                    href={c.link}
                  >
                    Rent Now
                  </a>
                </div>
                <div className="mt-4 text-sm font-normal text-[#053436]">
                  Starting at ₹{c.startingAt} per month
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="rt-steps">
        <div className="rt-container">
          <div className="rt-section-head rt-section-head-center">
            <h2 className="rt-h2">Renting takes three steps.</h2>
            <p className="rt-section-sub">
              Choose a device, select a plan, and get it delivered.
            </p>
          </div>

          <div className="rt-steps-grid">
            {steps.map((s) => (
              <div
                className="rt-step-card"
                key={s.title}
                style={{ backgroundImage: `url(${s.image})` }}
              >
                <div className="rt-step-overlay"></div>
                <div className="rt-step-content">
                  <div className="rt-step-text-wrapper">
                    <div className="rt-step-card-title">{s.title}</div>
                    <div className="rt-step-card-desc">{s.copy}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="rt-whyus">
        <div className="rt-container">
          <div className="rt-section-head rt-section-head-center">
            <h2 className="rt-h2">Why rent with Zaid Infotech</h2>
            <p className="rt-section-sub">
              Transparent pricing and support that stays with you for the
              whole rental term.
            </p>
          </div>

          <div className="rt-why-grid">
            {reasons.slice(0, 2).map((r) => (
              <div className="rt-why-card" key={r.title}>
                <div className="rt-why-media">
                  <img src={r.image} alt={r.title} loading="lazy" />
                </div>
                <div className="rt-why-body">
                  <h3 className="rt-why-title">{r.title}</h3>
                  <p className="rt-why-copy">{r.copy}</p>
                </div>
              </div>
            ))}
          </div>

          {reasons[2] && (
            <div className="rt-why-wide">
              <div className="rt-why-wide-media">
                <img src={reasons[2].image} alt={reasons[2].title} loading="lazy" />
              </div>
              <div className="rt-why-wide-body">
                <h3 className="rt-why-title">{reasons[2].title}</h3>
                <p className="rt-why-copy">{reasons[2].copy}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Business banner */}
      <section className="rt-business" id="business">
        <div className="rt-container rt-business-inner">
          <div className="rt-business-copy">
            <h2 className="rt-h2">Laptop rentals for growing teams</h2>
            <p className="rt-section-sub">
              Bulk plans for startups, corporates, and institutions, with one
              invoice and one point of contact.
            </p>
            <a href="/contact" className="rt-btn rt-btn-dark">
              Request a quote
            </a>
          </div>
          <div className="rt-business-art">
            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80"
              alt="Laptop for business rentals"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}