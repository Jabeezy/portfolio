import { useState } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const TIERS = [
  {
    num: "01",
    name: "Refresh",
    price: "$500",
    color: "#6ee7b7",
    desc: "For sites that need a modernized look without starting over. Same platform, better everything.",
    features: [
      "Visual redesign of existing pages",
      "Mobile responsiveness fixes",
      "Speed & performance cleanup",
      "Typography and color improvements",
    ],
  },
  {
    num: "02",
    name: "Redesign",
    price: "$2,000",
    color: "#818cf8",
    featured: true,
    desc: "A full visual rebuild — new layout, better branding, improved UX across all devices.",
    features: [
      "New layout from scratch",
      "Brand identity alignment",
      "Improved UX and information flow",
      "Contact forms & integrations",
      "SEO-ready structure",
    ],
  },
  {
    num: "03",
    name: "Full Build",
    price: "$5,000",
    color: "#f472b6",
    desc: "Brand new site built from the ground up with every page and feature you need.",
    features: [
      "Full custom build from scratch",
      "Events, calendar, or booking pages",
      "Membership or join page",
      "E-commerce or payment ready",
      "Launch-ready and fully tested",
    ],
  },
];

const PHASES = [
  {
    num: "Phase 01",
    name: "Core Site",
    price: "$1,500",
    color: "#6ee7b7",
    desc: "Homepage, about, contact — your brand built out properly from the start.",
    items: ["Homepage", "About page", "Contact page", "Mobile responsive", "Custom design language"],
  },
  {
    num: "Phase 02",
    name: "Events & Content",
    price: "+ $500",
    color: "#818cf8",
    desc: "Events calendar, listings, and content-heavy pages added once the core is live.",
    items: ["Events listing page", "Date and location display", "Sign-up or RSVP flow", "Easy to update"],
  },
  {
    num: "Phase 03",
    name: "Membership & More",
    price: "+ $500",
    color: "#f472b6",
    desc: "Membership pages, join forms, portals, or e-commerce layered on top.",
    items: ["Join / membership page", "Member info display", "Optional payment integration", "Gated content"],
  },
];

const ADDONS = [
  { name: "Monthly Maintenance", desc: "Content updates, bug fixes, keeping things running", price: "$200/mo" },
  { name: "Logo & Brand Identity", desc: "Custom logo design and basic brand guidelines", price: "$200" },
  { name: "Extra Pages", desc: "Any page beyond what's included in your tier", price: "$100/page" },
  { name: "Rush Delivery", desc: "Priority turnaround — delivery within 5 business days", price: "+25%" },
];

/* ─────────────────────────────────────────────
   TIER CARD
───────────────────────────────────────────── */
function TierCard({ num, name, price, color, featured, desc, features }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: featured ? "#0f0f18" : "#08080e",
        border: `1px solid ${hov || featured ? color : "#1c1c2a"}`,
        borderRadius: 10,
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s, transform 0.25s",
        transform: hov ? "translateY(-5px)" : "none",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* top gradient bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: color,
        opacity: hov || featured ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      {featured && (
        <div style={{
          position: "absolute", top: "1.25rem", right: "1.25rem",
          fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.12em",
          textTransform: "uppercase", color: "#08080e",
          background: color, padding: "3px 10px", borderRadius: 2,
        }}>
          Most Popular
        </div>
      )}

      <div style={{ fontFamily: "monospace", fontSize: "0.62rem", color: "#6b6b80", letterSpacing: "0.1em" }}>// {num}</div>

      <div>
        <div style={{ fontFamily: "monospace", fontSize: "0.7rem", color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{name}</div>
        <div style={{ fontFamily: "sans-serif", fontSize: "2.8rem", fontWeight: 800, color: "#e8e8f0", letterSpacing: "-0.04em", lineHeight: 1 }}>{price}</div>
        <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#6b6b80", marginTop: "0.25rem" }}>flat rate</div>
      </div>

      <p style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#6b6b80", lineHeight: 1.75 }}>{desc}</p>

      <div style={{ height: 1, background: "#1c1c2a" }} />

      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        {features.map((f) => (
          <li key={f} style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#c8c8d8", display: "flex", gap: "0.6rem", alignItems: "flex-start", lineHeight: 1.5 }}>
            <span style={{ color, flexShrink: 0, marginTop: 1 }}>›</span>{f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PHASE CARD
───────────────────────────────────────────── */
function PhaseCard({ num, name, price, color, desc, items }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#0f0f18",
        border: `1px solid ${hov ? color : "#1c1c2a"}`,
        borderRadius: 10,
        padding: "1.75rem",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.25s, transform 0.25s",
        transform: hov ? "translateX(4px)" : "none",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: 3, bottom: 0, background: color, opacity: hov ? 1 : 0, transition: "opacity 0.25s" }} />
      <div style={{ fontFamily: "monospace", fontSize: "0.62rem", color, letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{num}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ fontFamily: "sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#e8e8f0" }}>{name}</div>
        <div style={{ fontFamily: "monospace", fontSize: "1.1rem", fontWeight: 700, color }}>{price}</div>
      </div>
      <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#6b6b80", lineHeight: 1.75, marginBottom: "1rem" }}>{desc}</p>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
        {items.map((item) => (
          <li key={item} style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#6b6b80", display: "flex", gap: "0.6rem" }}>
            <span style={{ color, opacity: 0.6 }}>//</span>{item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ADDON ROW
───────────────────────────────────────────── */
function AddonRow({ name, desc, price }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "#0f0f18",
        border: `1px solid ${hov ? "#6ee7b7" : "#1c1c2a"}`,
        borderRadius: 8,
        padding: "1.25rem 1.5rem",
        transition: "border-color 0.2s, transform 0.2s",
        transform: hov ? "translateX(4px)" : "none",
        gap: "1rem",
      }}
    >
      <div>
        <div style={{ fontFamily: "monospace", fontSize: "0.82rem", color: "#e8e8f0", marginBottom: "0.25rem" }}>{name}</div>
        <div style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#6b6b80" }}>{desc}</div>
      </div>
      <div style={{ fontFamily: "sans-serif", fontSize: "1rem", fontWeight: 700, color: "#6ee7b7", whiteSpace: "nowrap", flexShrink: 0 }}>{price}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SERVICES SECTION (drop-in)
───────────────────────────────────────────── */
export default function Services() {
  return (
    <section id="services" style={{ padding: "8rem clamp(1.5rem,4vw,3rem)", borderTop: "1px solid #1c1c2a" }}>
      <style>{`
        @media (max-width: 768px) {
          .services-tiers-grid { grid-template-columns: 1fr !important; }
          .services-phases-grid { grid-template-columns: 1fr !important; }
          .services-addons-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "monospace", fontSize: "0.68rem", color: "#6ee7b7", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1rem" }}>
        06 — Services
        <div style={{ width: 48, height: 1, background: "#6ee7b7", opacity: 0.4 }} />
      </div>

      <h2 style={{ fontFamily: "sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.75rem" }}>
        Web Dev<br /><span style={{ color: "transparent", WebkitTextStroke: "1.5px #6ee7b7" }}>Services.</span>
      </h2>
      <p style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#6b6b80", lineHeight: 1.85, maxWidth: 520, marginBottom: "4rem" }}>
        Fixed pricing, no surprises. Three tiers built around what your project actually needs — with a phased option if you want to start small.
      </p>

      {/* ── Tiers ── */}
      <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#6ee7b7", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        // Packages
        <div style={{ width: 32, height: 1, background: "#6ee7b7", opacity: 0.3 }} />
      </div>
      <div className="services-tiers-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "5rem" }}>
        {TIERS.map((t) => <TierCard key={t.num} {...t} />)}
      </div>

      {/* ── Phases ── */}
      <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#818cf8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        // Phased Approach
        <div style={{ width: 32, height: 1, background: "#818cf8", opacity: 0.3 }} />
      </div>
      <p style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#6b6b80", lineHeight: 1.75, maxWidth: 520, marginBottom: "1.5rem" }}>
        If a full build isn't in the budget right now, we can break it into phases. Pay for what you need today — expand later.
      </p>
      <div className="services-phases-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "5rem" }}>
        {PHASES.map((p) => <PhaseCard key={p.num} {...p} />)}
      </div>

      {/* ── Add-ons ── */}
      <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#fb923c", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        // Add-Ons
        <div style={{ width: 32, height: 1, background: "#fb923c", opacity: 0.3 }} />
      </div>
      <div className="services-addons-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.85rem", marginBottom: "4rem" }}>
        {ADDONS.map((a) => <AddonRow key={a.name} {...a} />)}
      </div>

      {/* ── Negotiation Note ── */}
      <div style={{
        background: "rgba(110,231,183,0.04)",
        border: "1px solid rgba(110,231,183,0.15)",
        borderRadius: 10,
        padding: "2rem 2.25rem",
        display: "flex",
        gap: "1.25rem",
        alignItems: "flex-start",
      }}>
        <div style={{ fontFamily: "monospace", fontSize: "1.1rem", color: "#6ee7b7", flexShrink: 0, marginTop: 2 }}>ℹ</div>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#6ee7b7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>On Budget</div>
          <p style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#6b6b80", lineHeight: 1.85 }}>
            Budget tighter than expected? Let's talk before you walk away. Tell me what you're working with and we'll figure out the right fit. I'd rather land a smaller project and build a relationship than lose you over a number.
          </p>
        </div>
      </div>

    </section>
  );
}