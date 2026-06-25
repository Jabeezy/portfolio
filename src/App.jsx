import { useState, useEffect, useRef, useCallback } from "react";
import Services from "./Services";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_LINKS = ["About", "Skills", "Timeline", "Projects", "Services", "Contact"];

const STATS = [
  { num: 8, suffix: "+", label: "Years Experience" },
  { num: 80, suffix: "%", label: "CVE Backlog Reduced" },
  { num: 45, suffix: "%", label: "Viewership Growth" },
  { num: 2000, suffix: "+", label: "Tickets Managed" },
];

const SKILL_GROUPS = [
  { name: "Languages & Data", color: "#6ee7b7", tags: ["JavaScript", "TypeScript", "Python", "SQL", "C#", "Java", "Node.js", "React"] },
  { name: "Data & Infrastructure", color: "#818cf8", tags: ["ETL Processes", "Snowflake", "RDBMS", "NoSQL", "Distributed Systems", ".NET"] },
  { name: "Product & Process", color: "#f472b6", tags: ["Roadmap Strategy", "Backlog Prioritization", "Agile/Scrum", "User Stories", "Workflow Mapping"] },
  { name: "Tools & DevOps", color: "#fb923c", tags: ["Jira", "GitHub Copilot", "Web APIs", "DevOps", "Cybersecurity", "Scalable Systems"] },
];

const SKILL_BARS = [
  { label: "JavaScript / TypeScript", pct: 95, color: "#6ee7b7" },
  { label: "React / Node.js", pct: 92, color: "#6ee7b7" },
  { label: "SQL / Database Design", pct: 90, color: "#818cf8" },
  { label: "Python", pct: 82, color: "#818cf8" },
  { label: "Cybersecurity / GRC", pct: 88, color: "#fb923c" },
  { label: "Vulnerability Management", pct: 90, color: "#fb923c" },
  { label: "Cloud / DevOps", pct: 78, color: "#fb923c" },
  { label: "Agile / Scrum", pct: 85, color: "#f472b6" },
];

const TIMELINE = [
  {
    year: "2018 – Present",
    role: "Lead Full Stack Developer & Product Lead",
    company: "Free Agent Music",
    color: "#6ee7b7",
    bullets: [
      "Led end-to-end design and implementation of full-stack applications and internal tools",
      "Increased platform viewership by 45% in 6 months through UX optimization and performance tuning",
      "Utilized AI-assisted RAD to move from concept to deployment in hours",
      "Maintained robust SQL databases supporting high-traffic music streaming",
    ],
  },
  {
    year: "Aug – Nov 2025",
    role: "Vulnerability Remediation Specialist",
    company: "Apple Bank",
    color: "#818cf8",
    bullets: [
      "Owned and prioritized a backlog of 2,000+ security tickets — reduced to 400 in 3 months (80% reduction)",
      "Partnered with security and infrastructure teams for enterprise-level compliance",
      "Conducted deep-dive assessments of software lifecycles (EOL/EOS)",
      "Developed custom tooling and scripts to automate detection and remediation",
    ],
  },

  {
    year: "Jan 2026-present",
    role: "Founder & Lead Engineer",
    company: "SecureEndpoint",
    color: "#00d2ff",
    bullets: [
      "Founded and built a multi-tenant GRC compliance SaaS platform targeting FDIC-regulated financial institutions, managing the full product and client lifecycle independently",
      "Designed and implemented customer onboarding workflows, platform configuration processes, and account provisioning systems for enterprise clients",
      "Conducted live product demos with financial institution stakeholders, aligned on implementation requirements, and managed all post-sale onboarding communication",
      "Built and maintained integrations with third-party services including payment processing (Stripe), transactional email (Resend), and external APIs",
      "Developed internal automation tools to streamline repetitive onboarding and configuration tasks, reducing manual effort and accelerating time-to-live for new accounts",
    ],
  },
];

const PROJECTS = [
  {
    num: "01", title: "Free Agent Music Platform",
    desc: "Led end-to-end design and implementation of a full-stack music streaming platform. Engineered UX and performance improvements that drove a 45% viewership increase in just 6 months.",
    stack: ["React", "Node.js", "SQL", "Web APIs"],
    link: "https://freeagentmusic.org/", linkLabel: "Live Site",
  },
  {
    num: "02", title: "Vulnerability Remediation System",
    desc: "Owned and prioritized a backlog of 2,000+ security tickets at Apple Bank, reducing it by 80% in 3 months. Built custom tooling to automate detection and remediation workflows.",
    stack: ["Python", "Automation", "SQL", "Cybersecurity"],
    link: null, linkLabel: null,
  },
  {
    num: "03", title: "Internal Business Tooling",
    desc: "Designed and shipped data-driven internal tools bridging complex data engineering with business-centric automation — concept to deployment via AI-assisted RAD.",
    stack: ["ETL", "Snowflake", "JavaScript", "GitHub Copilot"],
    link: null, linkLabel: null,
  },
  {
    num: "04", title: "Larry Coleman — Artist Website",
    desc: "Designed and developed a professional artist website for Larry Coleman. Built for performance and user experience, showcasing music, branding, and audience engagement.",
    stack: ["React", "JavaScript", "CSS", "Web Design"],
    link: "https://larrycoleman2020.com", linkLabel: "Live Site",
  },
  {
    num: "05", title: "MaeForm Marketing",
    desc: "Built a sleek marketing website for MaeForm, focused on lead generation, brand storytelling, and converting visitors into clients through clean UI and strategic content layout.",
    stack: ["React", "JavaScript", "CSS", "Netlify"],
    link: "https://maeformmarketing.netlify.app/", linkLabel: "Live Site",
  },
  {
    num: "06", title: "Healthcare Equal",
    desc: "Developed a mission-driven platform advocating for healthcare equality. Designed for accessibility and impact, delivering important health equity information to a broad audience.",
    stack: ["React", "JavaScript", "CSS", "Netlify"],
    link: "https://healthcareequal.netlify.app/", linkLabel: "Live Site",
  },

  {
  num: "07", title: "SecureEndpoint",
  desc: "Multi-tenant GRC SaaS for FDIC-regulated banks. React + Node.js + PostgreSQL. Live CVE/CISA KEV feeds, PowerShell GPO agent, DPAPI encryption, and compliance reporting built for audit day.",
  stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "PowerShell", "Railway"],
  link: "https://sepsec.com/", linkLabel: "Live Site",
},
];



/* ─────────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener("mousemove", onMouse);

    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(110,231,183,${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
        // mouse connection
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 160) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(110,231,183,${0.3 * (1 - md / 160)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          // push particles away from cursor
          particles[i].vx -= (mdx / md) * 0.018;
          particles[i].vy -= (mdy / md) * 0.018;
        }
      }

      // dots
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(110,231,183,0.55)";
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      opacity: 0.7, pointerEvents: "auto",
    }} />
  );
}

/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 9999, background: "#0a0a0f" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #6ee7b7, #818cf8)", transition: "width 0.1s linear" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function Icon({ name, size = 16 }) {
  const s = { width: size, height: size, flexShrink: 0 };
  const paths = {
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    external: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    arrowDown: <><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    close: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      {paths[name]}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(target, active, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setCount(Math.floor(ease * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

/* ─────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "monospace", fontSize: "0.68rem", color: "#6ee7b7", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1rem" }}>
      {children}
      <div style={{ width: 48, height: 1, background: "#6ee7b7", opacity: 0.4 }} />
    </div>
  );
}

function Btn({ children, onClick, href, variant = "primary", style = {}, target }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  const base = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    padding: "0.8rem 2rem", borderRadius: 5, fontWeight: 700,
    fontSize: "0.85rem", letterSpacing: "0.04em", textDecoration: "none",
    cursor: "pointer", border: "none", outline: "none",
    transition: "transform 0.15s, box-shadow 0.15s, background 0.2s, border-color 0.2s, color 0.2s",
    transform: pressed ? "scale(0.96)" : hov ? "translateY(-2px)" : "none",
    userSelect: "none", ...style,
  };
  const variants = {
    primary: { background: "#6ee7b7", color: "#08080e", boxShadow: hov ? "0 10px 28px rgba(110,231,183,0.3)" : "none" },
    outline: { background: "transparent", color: hov ? "#6ee7b7" : "#e8e8f0", border: `1px solid ${hov ? "#6ee7b7" : "#2a2a3a"}` },
    ghost: { background: "transparent", color: hov ? "#6ee7b7" : "#6b6b80", border: "none", padding: "0.5rem 0" },
  };
  const props = {
    style: { ...base, ...variants[variant] },
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => { setHov(false); setPressed(false); },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
  };
  if (href) return <a href={href} target={target} rel="noreferrer" {...props}>{children}</a>;
  return <button onClick={onClick} {...props}>{children}</button>;
}

/* ─────────────────────────────────────────────
   NAV
───────────────────────────────────────────── */
function Nav({ scrolled, active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 2, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.25rem clamp(1.5rem,4vw,3rem)",
        background: scrolled || menuOpen ? "rgba(8,8,14,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #1c1c2a" : "1px solid transparent",
        transition: "all 0.35s ease",
      }}>
        {/* Logo */}
        <button onClick={() => scrollTo("hero")}
          style={{ fontFamily: "sans-serif", fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em", color: "#6ee7b7", background: "none", border: "none", cursor: "pointer", zIndex: 201 }}>
          NS<span style={{ color: "#e8e8f0" }}>.dev</span>
        </button>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0, "@media(max-width:768px)": { display: "none" } }} className="desktop-nav">
          {NAV_LINKS.map(l => {
            const id = l.toLowerCase();
            const isActive = active === id;
            return (
              <li key={l}>
                <button onClick={() => scrollTo(id)}
                  style={{ fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", background: "none", border: "none", cursor: "pointer", color: isActive ? "#6ee7b7" : "#6b6b80", transition: "color 0.2s", padding: "0.25rem 0", borderBottom: isActive ? "1px solid #6ee7b7" : "1px solid transparent" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#6ee7b7"}
                  onMouseLeave={e => e.currentTarget.style.color = isActive ? "#6ee7b7" : "#6b6b80"}>
                  {l}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(o => !o)} className="mobile-nav"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#e8e8f0", flexDirection: "column", gap: 5, padding: "0.25rem", zIndex: 201 }}>
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#6ee7b7" : "#e8e8f0", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#6ee7b7" : "#e8e8f0", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#6ee7b7" : "#e8e8f0", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 199,
        background: "rgba(8,8,14,0.98)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2.5rem",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transition: "opacity 0.3s ease",
      }}>
        {NAV_LINKS.map((l, i) => (
          <button key={l} onClick={() => scrollTo(l.toLowerCase())}
            style={{
              fontFamily: "sans-serif", fontSize: "2.2rem", fontWeight: 800, color: "#e8e8f0",
              background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.03em",
              transition: `color 0.2s, transform 0.3s ease ${i * 60}ms, opacity 0.3s ease ${i * 60}ms`,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#6ee7b7"}
            onMouseLeave={e => e.currentTarget.style.color = "#e8e8f0"}>
            {l}
          </button>
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO — with particle canvas
───────────────────────────────────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const roles = ["Security Engineer", "Full Stack Engineer", "GRC Engineer", "Systems Builder"];
  const typed = useTypewriter(roles);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const fade = (d) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${d}ms, transform 0.7s ease ${d}ms`,
  });

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 clamp(1.5rem,4vw,3rem)", position: "relative", overflow: "hidden" }}>
      <ParticleCanvas />

      {/* subtle vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 50% 50%, transparent 30%, rgba(8,8,14,0.7) 100%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 820, width: "100%", zIndex: 1 }}>
        <div style={{ ...fade(100), fontFamily: "monospace", fontSize: "0.72rem", color: "#6ee7b7", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#6ee7b7", animation: "blink 1.5s ease-in-out infinite" }} />
          Available for opportunities
        </div>
        <h1 style={{ ...fade(250), fontFamily: "sans-serif", fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "1.25rem" }}>
          Nicholas<br />
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px #6ee7b7" }}>Stanley</span>
        </h1>
        <div style={{ ...fade(400), fontFamily: "monospace", fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)", color: "#6ee7b7", marginBottom: "1.25rem", minHeight: "1.6em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#6b6b80" }}>//</span>
          <span>{typed}</span>
          <span style={{ display: "inline-block", width: 2, height: "1.1em", background: "#6ee7b7", animation: "blink 1s step-end infinite", verticalAlign: "middle" }} />
        </div>
        <p style={{ ...fade(550), fontFamily: "monospace", fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)", color: "#6b6b80", maxWidth: 500, lineHeight: 1.85, marginBottom: "3rem" }}>
          8+ years building full-stack products and securing enterprise systems. I ship clean code and lock down vulnerabilities.
        </p>
        <div style={{ ...fade(700), display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Btn onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View My Work <Icon name="arrowDown" size={15} />
          </Btn>
          <Btn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} variant="outline">
            Get In Touch <Icon name="mail" size={15} />
          </Btn>
          <Btn href="/NicholasStanley_Resume.pdf" variant="outline" target="_blank">
            Resume <Icon name="download" size={15} />
          </Btn>
          <Btn href="https://github.com/Jabeezy" variant="outline" target="_blank">
            GitHub <Icon name="external" size={15} />
          </Btn>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT — animated counters
───────────────────────────────────────────── */
function StatCard({ num, suffix, label }) {
  const [ref, visible] = useInView(0.5);
  const count = useCountUp(num, visible);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#0f0f18", border: `1px solid ${hov ? "#6ee7b7" : "#1c1c2a"}`, padding: "1.75rem", borderRadius: 8, transition: "border-color 0.2s, transform 0.2s", transform: hov ? "scale(1.03)" : "scale(1)" }}>
      <div style={{ fontFamily: "sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "#6ee7b7", letterSpacing: "-0.04em", lineHeight: 1 }}>{count}{suffix}</div>
      <div style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.4rem" }}>{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "8rem clamp(1.5rem,4vw,3rem)", borderTop: "1px solid #1c1c2a" }}>
      <SectionLabel>01 — About</SectionLabel>
      <Reveal>
        <h2 style={{ fontFamily: "sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "4rem" }}>
          Security-minded engineer.<br /><span style={{ color: "transparent", WebkitTextStroke: "1.5px #6ee7b7" }}>Product thinker by trade.</span>
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
        <Reveal delay={100}>
          <div style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#6b6b80", lineHeight: 1.85 }}>
            <p style={{ marginBottom: "1.25rem" }}>I build things that work under pressure, from cutting a <strong style={{ color: "#e8e8f0", fontWeight: 500 }}>2,000-ticket CVE backlog by 80% at Apple Bank</strong> in 90 days, to founding <strong style={{ color: "#e8e8f0", fontWeight: 500 }}>SecureEndpoint</strong>, a GRC SaaS platform built for FDIC-regulated banks.</p>
            <p style={{ marginBottom: "1.25rem" }}>8 years shipping full-stack products at <strong style={{ color: "#e8e8f0", fontWeight: 500 }}>Free Agent Music</strong>, a Warner ADA sublabel, handling everything from architecture to deployment, solo.</p>
            <p style={{ marginBottom: "2rem" }}>I sit at the intersection of security, engineering, and product. Based in <strong style={{ color: "#e8e8f0", fontWeight: 500 }}>Indian Trail, NC</strong>. Open to remote.</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          {STATS.map((s, i) => <Reveal key={s.label} delay={i * 80}><StatCard {...s} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SKILLS — progress bars + tag filter
───────────────────────────────────────────── */
function SkillBar({ label, pct, color, active }) {
  const [ref, visible] = useInView(0.3);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ opacity: active ? 1 : 0.25, transition: "opacity 0.3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: hov ? color : "#c8c8d8", transition: "color 0.2s" }}>{label}</span>
        <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: color }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: "#1c1c2a", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2,
          background: `linear-gradient(90deg, ${color}, ${color}99)`,
          width: visible ? `${pct}%` : "0%",
          transition: "width 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.1s",
          boxShadow: hov ? `0 0 8px ${color}88` : "none",
        }} />
      </div>
    </div>
  );
}

function Skills() {
  const [activeFilter, setActiveFilter] = useState(null);

  const barGroups = {
    "Languages & Data": ["JavaScript / TypeScript", "Python", "SQL / Database Design"],
    "Data & Infrastructure": ["SQL / Database Design"],
    "Product & Process": ["Product Management", "Agile / Scrum"],
    "Tools & DevOps": ["Cloud / DevOps", "Cybersecurity"],
  };

  const isBarActive = (barLabel) => {
    if (!activeFilter) return true;
    return SKILL_BARS.findIndex(b => b.label === barLabel) >= 0;
  };

  return (
    <section id="skills" style={{ padding: "8rem clamp(1.5rem,4vw,3rem)", borderTop: "1px solid #1c1c2a", background: "#0c0c14" }}>
      <SectionLabel>02 — Skills</SectionLabel>
      <Reveal>
        <h2 style={{ fontFamily: "sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "3rem" }}>
          What I<br />work with.
        </h2>
      </Reveal>

      {/* Skill bars */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem 4rem", marginBottom: "4rem" }}>
        {SKILL_BARS.map((b, i) => (
          <Reveal key={b.label} delay={i * 50}>
            <SkillBar {...b} active={!activeFilter || activeFilter === SKILL_GROUPS.find(g => g.tags.some(t => b.label.toLowerCase().includes(t.toLowerCase())))?.name || true} />
          </Reveal>
        ))}
      </div>

      {/* Filter chips */}
      <Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
          <button onClick={() => setActiveFilter(null)}
            style={{ fontFamily: "monospace", fontSize: "0.7rem", padding: "0.35rem 0.85rem", borderRadius: 20, border: `1px solid ${activeFilter === null ? "#6ee7b7" : "#2a2a3a"}`, color: activeFilter === null ? "#6ee7b7" : "#6b6b80", background: "transparent", cursor: "pointer", transition: "all 0.2s" }}>
            All
          </button>
          {SKILL_GROUPS.map(g => (
            <button key={g.name} onClick={() => setActiveFilter(activeFilter === g.name ? null : g.name)}
              style={{ fontFamily: "monospace", fontSize: "0.7rem", padding: "0.35rem 0.85rem", borderRadius: 20, border: `1px solid ${activeFilter === g.name ? g.color : "#2a2a3a"}`, color: activeFilter === g.name ? g.color : "#6b6b80", background: "transparent", cursor: "pointer", transition: "all 0.2s" }}>
              {g.name}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Tag cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
        {SKILL_GROUPS.map((g, i) => (
          <Reveal key={g.name} delay={i * 70}>
            <div onMouseEnter={e => e.currentTarget.style.borderColor = g.color} onMouseLeave={e => e.currentTarget.style.borderColor = activeFilter && activeFilter !== g.name ? "#1c1c2a" : "#1c1c2a"}
              style={{ background: "#08080e", border: "1px solid #1c1c2a", borderRadius: 8, padding: "1.5rem", transition: "all 0.3s", opacity: activeFilter && activeFilter !== g.name ? 0.25 : 1 }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: g.color, marginBottom: "1rem", paddingBottom: "0.65rem", borderBottom: "1px solid #1c1c2a" }}>{g.name}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {g.tags.map(t => <span key={t} style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#c8c8d8", background: `${g.color}12`, border: `1px solid ${g.color}22`, padding: "0.25rem 0.6rem", borderRadius: 4 }}>{t}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CAREER TIMELINE
───────────────────────────────────────────── */
function Timeline() {
  return (
    <section id="timeline" style={{ padding: "8rem clamp(1.5rem,4vw,3rem)", borderTop: "1px solid #1c1c2a" }}>
      <SectionLabel>03 — Career Timeline</SectionLabel>
      <Reveal>
        <h2 style={{ fontFamily: "sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "4rem" }}>
          Where I've<br />been.
        </h2>
      </Reveal>

      <div style={{ position: "relative", maxWidth: 760 }}>
        {/* vertical spine */}
        <div style={{ position: "absolute", left: 10, top: 8, bottom: 8, width: 1, background: "linear-gradient(to bottom, #6ee7b7, #818cf8, transparent)" }} />

        {TIMELINE.map((item, i) => (
          <Reveal key={i} delay={i * 150}>
            <TimelineItem {...item} isLast={i === TIMELINE.length - 1} />
          </Reveal>
        ))}

        {/* Education node */}
        <Reveal delay={300}>
          <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2rem" }}>
            <div style={{ position: "relative", flexShrink: 0, marginTop: 4 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#08080e", border: "2px solid #fb923c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fb923c" }} />
              </div>
            </div>
            <div style={{ background: "#0f0f18", border: "1px solid #1c1c2a", borderRadius: 10, padding: "1.5rem 1.75rem", flex: 1 }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#fb923c", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Education & Certs</div>
              <h3 style={{ fontFamily: "sans-serif", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>Full Stack Development — Codecademy</h3>
              <p style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#6b6b80", lineHeight: 1.7 }}>Advanced coursework in Database Management (RDBMS/NoSQL) and Distributed Systems.</p>
            </div>
             
            <div style={{ background: "#0f0f18", border: "1px solid #1c1c2a", borderRadius: 10, padding: "1.5rem 1.75rem", flex: 1 }}>
              <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#fb923c", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Education & Certs</div>
              <h3 style={{ fontFamily: "sans-serif", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>CS50 CyberSecurity — Harvard</h3>
              <p style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#6b6b80", lineHeight: 1.7 }}>coursework in cryptography, authentication systems, network security, SQL injection, XSS, and defensive programming practices.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TimelineItem({ year, role, company, color, bullets }) {
  const [expanded, setExpanded] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", paddingBottom: "2.5rem" }}>
      {/* dot */}
      <div style={{ position: "relative", flexShrink: 0, marginTop: 4 }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#08080e", border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "box-shadow 0.2s", boxShadow: hov ? `0 0 12px ${color}66` : "none" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
        </div>
      </div>

      {/* card */}
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: "#0f0f18", border: `1px solid ${hov ? color : "#1c1c2a"}`, borderRadius: 10, padding: "1.75rem", flex: 1, transition: "border-color 0.25s, transform 0.25s", transform: hov ? "translateX(4px)" : "none", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: 3, bottom: 0, background: color, opacity: hov ? 1 : 0, transition: "opacity 0.25s" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color, letterSpacing: "0.08em" }}>{year}</span>
          <span style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#3a3a4a", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Icon name="briefcase" size={11} /> {company}
          </span>
        </div>
        <h3 style={{ fontFamily: "sans-serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1rem", color: "#e8e8f0" }}>{role}</h3>
        <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {(expanded ? bullets : bullets.slice(0, 2)).map((b, i) => (
            <li key={i} style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#6b6b80", lineHeight: 1.65, display: "flex", gap: "0.6rem" }}>
              <span style={{ color, flexShrink: 0, marginTop: 2 }}>›</span>{b}
            </li>
          ))}
        </ul>
        {bullets.length > 2 && (
          <button onClick={() => setExpanded(e => !e)}
            style={{ marginTop: "0.9rem", fontFamily: "monospace", fontSize: "0.68rem", color, background: "none", border: "none", cursor: "pointer", padding: 0, letterSpacing: "0.05em" }}>
            {expanded ? "↑ Less" : `↓ +${bullets.length - 2} more`}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────── */
function Projects() {
  return (
    <section id="projects" style={{ padding: "8rem clamp(1.5rem,4vw,3rem)", borderTop: "1px solid #1c1c2a", background: "#0c0c14" }}>
      <SectionLabel>04 — Projects</SectionLabel>
      <Reveal>
        <h2 style={{ fontFamily: "sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "4rem" }}>
          Things I've<br />shipped.
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
        {PROJECTS.map((p, i) => <Reveal key={p.num} delay={i * 100}><ProjectCard {...p} /></Reveal>)}
      </div>
    </section>
  );
}

function ProjectCard({ num, title, desc, stack, link, linkLabel }) {
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "#0f0f18", border: `1px solid ${hov ? "#6ee7b7" : "#1c1c2a"}`, borderRadius: 10, padding: "2rem", position: "relative", overflow: "hidden", transition: "border-color 0.25s, transform 0.25s", transform: hov ? "translateY(-5px)" : "none", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #6ee7b7, #818cf8, #f472b6)", opacity: hov ? 1 : 0, transition: "opacity 0.3s" }} />
      <div style={{ fontFamily: "monospace", fontSize: "0.62rem", color: "#6b6b80", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>// {num}</div>
      <h3 style={{ fontFamily: "sans-serif", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.75rem", color: "#e8e8f0" }}>{title}</h3>
      <p style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#6b6b80", lineHeight: 1.75, marginBottom: "0.75rem", flex: 1 }}>
        {expanded ? desc : desc.slice(0, 100) + (desc.length > 100 ? "..." : "")}
      </p>
      {desc.length > 100 && (
        <button onClick={() => setExpanded(e => !e)}
          style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#6ee7b7", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: "1.25rem", textAlign: "left" }}>
          {expanded ? "↑ Show less" : "↓ Read more"}
        </button>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
        {stack.map(s => <span key={s} style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#fb923c", background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)", padding: "0.2rem 0.6rem", borderRadius: 3 }}>{s}</span>)}
      </div>
      {link
        ? <Btn href={link} target="_blank" variant="outline" style={{ fontSize: "0.72rem", padding: "0.55rem 1.2rem", alignSelf: "flex-start" }}><Icon name="external" size={13} />{linkLabel}</Btn>
        : <div style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#3a3a4a" }}>// internal project</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");

    const data = new FormData();
    data.append("form-name", "portfolio-contact");
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("message", form.message);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setErrors({});
      })
      .catch(() => setStatus("error"));
  };

  const inputStyle = (field) => ({
    width: "100%", padding: "0.85rem 1rem", borderRadius: 6,
    background: "#0f0f18", border: `1px solid ${errors[field] ? "#f87171" : "#2a2a3a"}`,
    color: "#e8e8f0", fontFamily: "monospace", fontSize: "0.85rem",
    outline: "none", transition: "border-color 0.2s",
    resize: field === "message" ? "vertical" : "none",
  });
  const labelStyle = { fontFamily: "monospace", fontSize: "0.7rem", color: "#6b6b80", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" };

  return (
    <section id="contact" style={{ padding: "8rem clamp(1.5rem,4vw,3rem)", borderTop: "1px solid #1c1c2a" }}>
      <SectionLabel>06 — Contact</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "5rem", alignItems: "start" }}>
        <div>
          <Reveal>
            <h2 style={{ fontFamily: "sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Let's build<br />something great.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontFamily: "monospace", fontSize: "0.875rem", color: "#6b6b80", lineHeight: 1.85, marginBottom: "2.5rem" }}>
              Whether you need a product leader, a full-stack engineer, or both — I'm open to new opportunities. Based in Indian Trail, NC.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { label: "njstanley08@gmail.com", href: "mailto:njstanley08@gmail.com", icon: "mail" },
                { label: "(636) 209-8799", href: "tel:6362098799", icon: "phone" },
                { label: "nicholasstanley.netlify.app", href: "https://nicholasstanley.netlify.app/", icon: "external" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/nstanley-dev/", icon: "linkedin" },
              ].map(cl => <ContactChip key={cl.label} {...cl} />)}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          {status === "sent" ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, gap: "1rem", textAlign: "center" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(110,231,183,0.1)", border: "1px solid #6ee7b7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="check" size={26} />
              </div>
              <p style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#e8e8f0" }}>Message sent!</p>
              <p style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#6b6b80" }}>Thanks for reaching out. I'll reply shortly.</p>
              <Btn onClick={() => setStatus("idle")} variant="ghost" style={{ fontSize: "0.75rem" }}>Send another →</Btn>
            </div>
          ) : (
            <form
              name="portfolio-contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {/* Netlify required hidden fields */}
              <input type="hidden" name="form-name" value="portfolio-contact" />
              <p style={{ display: "none" }}><input name="bot-field" /></p>

              {status === "error" && (
                <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#f87171", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 6, padding: "0.75rem 1rem" }}>
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              {["name", "email"].map(field => (
                <div key={field}>
                  <label style={labelStyle}>{field === "name" ? "Your Name" : "Email Address"}</label>
                  <input
                    name={field}
                    value={form[field]}
                    onChange={e => { setForm(f => ({ ...f, [field]: e.target.value })); setErrors(er => ({ ...er, [field]: "" })); }}
                    placeholder={field === "name" ? "Jane Smith" : "jane@company.com"}
                    style={inputStyle(field)}
                    onFocus={e => e.target.style.borderColor = "#6ee7b7"}
                    onBlur={e => e.target.style.borderColor = errors[field] ? "#f87171" : "#2a2a3a"}
                  />
                  {errors[field] && <p style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#f87171", marginTop: "0.3rem" }}>{errors[field]}</p>}
                </div>
              ))}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: "" })); }}
                  placeholder="Tell me about your project or opportunity..." rows={5}
                  style={inputStyle("message")}
                  onFocus={e => e.target.style.borderColor = "#6ee7b7"}
                  onBlur={e => e.target.style.borderColor = errors.message ? "#f87171" : "#2a2a3a"}
                />
                {errors.message && <p style={{ fontFamily: "monospace", fontSize: "0.68rem", color: "#f87171", marginTop: "0.3rem" }}>{errors.message}</p>}
              </div>
              <Btn style={{ alignSelf: "flex-start" }}>
                {status === "sending" ? "Sending..." : <><Icon name="send" size={15} /> Send Message</>}
              </Btn>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function ContactChip({ label, href, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", background: "#0f0f18", border: `1px solid ${hov ? "#6ee7b7" : "#1c1c2a"}`, color: hov ? "#6ee7b7" : "#c8c8d8", padding: "0.75rem 1.25rem", borderRadius: 6, fontFamily: "monospace", fontSize: "0.78rem", textDecoration: "none", transition: "all 0.2s", transform: hov ? "translateX(5px)" : "none" }}>
      <Icon name={icon} size={14} />{label}
    </a>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ padding: "2.5rem clamp(1.5rem,4vw,3rem)", borderTop: "1px solid #1c1c2a", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
      <p style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#6b6b80" }}>© 2026 <span style={{ color: "#6ee7b7" }}>Nicholas Stanley</span>. All rights reserved.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {["About", "Skills", "Timeline", "Projects", "Services", "Contact"].map(l => (
          <button key={l} onClick={() => scrollTo(l.toLowerCase())}
            style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#6b6b80", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#6ee7b7"}
            onMouseLeave={e => e.currentTarget.style.color = "#6b6b80"}>
            {l}
          </button>
        ))}
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["contact", "services", "projects", "timeline", "skills", "about", "hero"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 250) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#08080e", color: "#e8e8f0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: sans-serif; }
        a, button { cursor: pointer; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollPulse { 0%,100%{opacity:.3;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.2)} }
        input::placeholder, textarea::placeholder { color: #3a3a4a; }
        input, textarea, button { font-family: inherit; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #08080e; }
        ::-webkit-scrollbar-thumb { background: #1c1c2a; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #6ee7b7; }
        .desktop-nav { display: flex; }
        .mobile-nav { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
      <ScrollProgress />
      <Nav scrolled={scrolled} active={activeSection} />
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}