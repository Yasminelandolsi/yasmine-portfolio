"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ─── Intersection Observer hook ─────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .stagger");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Typewriter ──────────────────────────────────────────────── */
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDeleting(true), 1400);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDeleting(false); setIdx((i) => i + 1); }
      }
    }, deleting ? 50 : 80);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words]);

  return (
    <span>
      {text}
      <span className="animate-blink text-ember">|</span>
    </span>
  );
}

/* ─── Nav ─────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Experience", "Skills", "Projects", "Contact"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-coal/90 backdrop-blur-md border-b border-white/5" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="font-mono text-sm text-ember tracking-widest uppercase">YL</a>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}
                className="font-mono text-xs tracking-widest uppercase text-cream/50 hover:text-ember transition-colors duration-200">
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span className={`block w-6 h-px bg-cream transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-cream transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-cream transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate border-t border-white/5 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-mono text-xs tracking-widest uppercase text-cream/60 hover:text-ember">
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(#F5F0E8 1px, transparent 1px), linear-gradient(90deg, #F5F0E8 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Ember glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #E8532A, transparent)" }} />

      <div className="max-w-6xl mx-auto w-full pt-24 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left: Text content */}
        <div className="flex-1">
          <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase mb-6 animate-fade-in">
            Software Engineer · Tunis, Tunisia
          </p>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-4 animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards", opacity: 0 }}>
            Yasmine<br />
            <span className="italic text-gold">Landolsi</span>
          </h1>

          <div className="h-px w-24 bg-ember my-8" style={{ animation: "slideRight 0.8s 0.3s ease forwards", opacity: 0 }} />

          <p className="font-mono text-lg md:text-xl text-cream/70 mb-4 max-w-xl" style={{ animation: "fadeUp 0.7s 0.4s ease forwards", opacity: 0 }}>
            I build&nbsp;
            <span className="text-cream font-medium">
              <Typewriter words={["scalable web apps.", "e-commerce platforms.", "beautiful interfaces.", "WordPress solutions."]} />
            </span>
          </p>

          <p className="text-cream/40 font-body max-w-lg mb-12 text-sm leading-relaxed" style={{ animation: "fadeUp 0.7s 0.5s ease forwards", opacity: 0 }}>
            Full-Stack Engineer at Decade · SUP'COM graduate · Passionate about clean architecture,
            modern DX, and building things that actually work.
          </p>

          <div className="flex flex-wrap gap-4" style={{ animation: "fadeUp 0.7s 0.6s ease forwards", opacity: 0 }}>
            <a href="#experience"
              className="px-6 py-3 bg-ember text-cream font-mono text-xs tracking-widest uppercase hover:bg-ember/80 transition-colors">
              View Work
            </a>
            <a href="#contact"
              className="px-6 py-3 border border-cream/20 text-cream/60 font-mono text-xs tracking-widest uppercase hover:border-ember hover:text-ember transition-colors">
              Contact Me
            </a>
            <a href="https://github.com/Yasminelandolsi" target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 border border-cream/20 text-cream/60 font-mono text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors">
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Right: Profile image */}
        <div className="flex-shrink-0" style={{ animation: "fadeUp 0.8s 0.3s ease forwards", opacity: 0 }}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-ember/40 shadow-[0_0_60px_rgba(232,83,42,0.15)]">
            <Image
              src="/profile.jpg"
              alt="Yasmine Landolsi"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About ───────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="reveal">
          <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase mb-4">01 · About</p>
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
            Building for<br /><span className="italic text-gold">the web</span>
          </h2>
          <div className="h-px w-16 bg-ember mb-8" />
          <p className="text-cream/60 leading-relaxed mb-4 font-body">
            I'm a full-stack software engineer based in Tunis, Tunisia. I graduated from the Higher School of Communication of Tunis (SUP'COM) after ranking
            <span className="text-cream"> 71st out of 1,491 students</span> in the national competitive exam — a benchmark I'm proud of.
          </p>
          <p className="text-cream/60 leading-relaxed mb-4 font-body">
            Currently at <span className="text-ember">Decade</span>, I architect and build e-commerce solutions for European market leaders using
            Next.js, Java, SAP Commerce Cloud, and modern software engineering practices including Domain-Driven Design.
          </p>
          <p className="text-cream/60 leading-relaxed font-body">
            Outside of engineering, I've led student clubs, managed community events, and competed in hackathons — because I believe great engineers are also great communicators.
          </p>
        </div>

        <div className="reveal grid grid-cols-2 gap-4">
          {[
            { label: "National Rank", value: "71 / 1491", sub: "PC Exam" },
            { label: "TOEIC Score", value: "910 / 990", sub: "English" },
            { label: "Experience", value: "1 year", sub: "Full-Stack" },
            { label: "Certifications", value: "7+", sub: "AWS, CCNA, Scrum" },
          ].map((s) => (
            <div key={s.label} className="border border-white/10 p-6 hover:border-ember/40 transition-colors">
              <p className="font-mono text-xs text-cream/30 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="font-display text-3xl text-cream mb-1">{s.value}</p>
              <p className="font-mono text-xs text-ember">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Experience ──────────────────────────────────────────────── */
const experiences = [
  {
    role: "Software Engineer",
    company: "Decade",
    period: "July 2025 – Present",
    type: "Full-Time",
    tags: ["Next.js", "Java", "SAP Commerce Cloud", "TypeScript"],
    points: [
      "Full-Stack engineering with Next.js, Java, and SAP Commerce Cloud",
      "Applying Domain-Driven Design on React/TypeScript front-ends",
      "Multi-country localization for European e-commerce platforms",
      "Google Analytics integration for insight-driven improvements",
    ],
  },
  {
    role: "End-of-Studies Intern",
    company: "Decade (for Rubix)",
    period: "Feb 2025 – Jun 2025",
    type: "Internship",
    tags: ["Next.js", "TypeScript", "PIM", "Architecture"],
    points: [
      "Led full redesign of a PIM Product Visualizer architecture",
      "Selected modern tech stack & applied software engineering best practices",
      "Improved performance, maintainability and scalability of the tool",
      "Ensured seamless integration with Rubix's e-commerce platform",
    ],
  },
  {
    role: "WordPress Developer",
    company: "Freelance",
    period: "2023 – 2024",
    type: "Freelance",
    tags: ["WordPress", "Elementor", "WooCommerce", "PHP", "ACF"],
    points: [
      "Designed and developed custom WordPress themes from scratch using PHP, HTML, and CSS",
      "Built WooCommerce stores with custom product templates, checkout flows, and payment gateway integrations",
      "Created advanced custom fields (ACF) and post types for flexible content management",
      "Optimized site performance — achieved 90+ Lighthouse scores via caching, lazy loading, and image optimization",
      "Delivered multilingual sites (Arabic/French/English) with WPML and Polylang",
      "Maintained and extended existing client sites with plugin customization and security hardening",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Tagamuta Valley",
    period: "Jun 2024 – Aug 2024",
    type: "Internship",
    tags: ["Angular", "Spring Boot", "MySQL"],
    points: [
      "Built a web app with Angular & Spring Boot for CNAM process automation",
      "Digitized and streamlined health insurance application workflows",
      "Improved efficiency and accessibility for thousands of users",
    ],
  },
  {
    role: "Network & Telecom Intern",
    company: "Tunisie Telecom",
    period: "Jun 2023 – Jul 2023",
    type: "Internship",
    tags: ["Networking", "CCNA", "Telecom"],
    points: [
      "Hands-on network troubleshooting (signal, data networks)",
      "Explored mobile technology frameworks and optimization",
      "Coordinated tasks and delivered solutions under project management workflows",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase mb-4">02 · Experience</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">Work History</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={i} className="reveal md:pl-12 relative group">
                {/* dot */}
                <div className={`absolute left-0 top-2 w-2 h-2 rounded-full -translate-x-[3.5px] hidden md:block group-hover:scale-150 transition-transform ${exp.type === "Freelance" ? "bg-gold" : "bg-ember"}`} />

                <div className={`border p-8 transition-colors ${exp.type === "Freelance" ? "border-gold/10 hover:border-gold/30 bg-gold/[0.02]" : "border-white/5 hover:border-ember/20 bg-slate/40"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display text-xl text-cream">{exp.role}</h3>
                      <p className={`font-mono text-sm ${exp.type === "Freelance" ? "text-gold" : "text-ember"}`}>{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-cream/30">{exp.period}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-mono ${
                        exp.type === "Full-Time" ? "bg-ember/10 text-ember border border-ember/20" :
                        exp.type === "Freelance" ? "bg-gold/10 text-gold border border-gold/20" :
                        "bg-white/5 text-cream/40 border border-white/10"
                      }`}>
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-xs font-mono bg-white/5 text-cream/30 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2">
                    {exp.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-sm text-cream/50 font-body">
                        <span className={`mt-0.5 shrink-0 ${exp.type === "Freelance" ? "text-gold" : "text-ember"}`}>→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Skills ──────────────────────────────────────────────────── */
const skillGroups = [
  {
    category: "Frontend",
    icon: "◈",
    items: ["React.js", "Next.js", "TypeScript", "Angular", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: "◉",
    items: ["Node.js", "Express", "Spring Boot", "Java", "Firebase"],
  },
  {
    category: "Databases",
    icon: "◫",
    items: ["MySQL", "MongoDB", "SQL Developer"],
  },
  {
    category: "WordPress",
    icon: "◐",
    items: ["Custom Themes", "WooCommerce", "ACF", "Elementor", "WPML", "PHP"],
  },
  {
    category: "DevOps & Cloud",
    icon: "◳",
    items: ["AWS", "Docker", "Git", "Linux", "Docker Swarm"],
  },
  {
    category: "Languages",
    icon: "◪",
    items: ["JavaScript", "Python", "C++", "Java", "PHP"],
  },
  {
    category: "Testing",
    icon: "◬",
    items: ["Postman", "JMeter", "JProfiler"],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase mb-4">03 · Skills</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">Tech Stack</h2>
        </div>

        <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group) => (
            <div key={group.category}
              className={`border p-6 transition-all group ${group.category === "WordPress" ? "border-gold/10 hover:border-gold/30 hover:bg-gold/5" : "border-white/5 hover:border-ember/30 hover:bg-ember/5"}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xl ${group.category === "WordPress" ? "text-gold" : "text-ember"}`}>{group.icon}</span>
                <p className="font-mono text-xs tracking-widest uppercase text-cream/40">{group.category}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill}
                    className={`px-2.5 py-1 text-xs font-mono border transition-colors ${group.category === "WordPress" ? "border-gold/10 text-cream/60 group-hover:border-gold/20 group-hover:text-cream/80" : "border-white/10 text-cream/60 group-hover:border-ember/20 group-hover:text-cream/80"}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft skills strip */}
        <div className="reveal mt-8 border border-white/5 p-6 flex flex-wrap gap-3 items-center">
          <p className="font-mono text-xs tracking-widest text-ember uppercase mr-4">Soft Skills</p>
          {["Leadership", "Public Speaking", "Event Management", "Writing", "Time Management"].map((s) => (
            <span key={s} className="px-3 py-1.5 text-xs font-mono bg-white/5 text-cream/50 border border-white/5">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Projects ────────────────────────────────────────────────── */
const projects = [
  {
    number: "01",
    title: "Rubix PIM Visualizer",
    category: "End-of-Studies Project",
    type: "enterprise",
    tech: ["Next.js", "TypeScript", "React", "DDD"],
    desc: "Full redesign of a Product Information Management visualizer for Rubix — a major European industrial distributor. Rebuilt the architecture from scratch, introducing Domain-Driven Design and a modern component library. Resulted in significantly improved load times and maintainability.",
    highlights: ["Architecture redesign", "DDD implementation", "Performance +40%", "Seamless PIM integration"],
    link: null,
  },
  {
    number: "02",
    title: "CNAM Health Insurance Portal",
    category: "Internship Project",
    type: "enterprise",
    tech: ["Angular", "Spring Boot", "MySQL", "REST API"],
    desc: "End-to-end web application automating health insurance claim workflows for the Tunisian national insurer (CNAM). Digitized paper-based processes, enabling thousands of users to submit and track claims online with real-time status updates.",
    highlights: ["Full workflow digitization", "RESTful API design", "Role-based access control", "PDF report generation"],
    link: null,
  },
  {
    number: "03",
    title: "E-Commerce Store — Fashion Boutique",
    category: "WordPress / WooCommerce",
    type: "wordpress",
    tech: ["WordPress", "WooCommerce", "ACF", "PHP", "Stripe"],
    desc: "Custom WooCommerce store for a Tunisian fashion boutique. Built a bespoke theme from scratch (no page-builder), implemented a custom product configurator with Advanced Custom Fields, integrated Stripe & local payment gateways, and achieved a 94 Lighthouse performance score.",
    highlights: ["Custom theme (no builder)", "Stripe + local payment", "94 Lighthouse score", "Arabic RTL support"],
    link: "#",
  },
  {
    number: "04",
    title: "Corporate Site — Law Firm",
    category: "WordPress",
    type: "wordpress",
    tech: ["WordPress", "Elementor Pro", "WPML", "PHP"],
    desc: "Trilingual (Arabic/French/English) corporate website for a Tunis-based law firm. Implemented WPML for seamless language switching with full RTL support, custom post types for case studies and attorney profiles, and a contact form integrated with the firm's CRM.",
    highlights: ["3-language WPML setup", "Full RTL/Arabic support", "Custom CPTs", "CRM integration"],
    link: "#",
  },
  {
    number: "05",
    title: "Restaurant Booking Platform",
    category: "WordPress",
    type: "wordpress",
    tech: ["WordPress", "WooCommerce Bookings", "ACF", "Custom PHP"],
    desc: "Online reservation and menu showcase site for a Tunis restaurant group with multiple locations. Custom booking logic built on WooCommerce Bookings with location-specific availability, Google Maps integration, and an admin dashboard for managing reservations by branch.",
    highlights: ["Multi-location bookings", "Google Maps API", "Custom admin panel", "Email automation"],
    link: "#",
  },
  {
    number: "06",
    title: "Webcure — Health Hackathon App",
    category: "Hackathon · 3rd Place",
    type: "achievement",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    desc: "Web app built in 48 hours at ISI Ariana's Web Development hackathon focused on health-tech. The platform connected patients with pharmacies for medication availability checks and allowed users to book teleconsultations. Awarded 3rd place by the jury.",
    highlights: ["48-hour build", "Teleconsultation module", "Pharmacy stock API", "3rd place · ISI Ariana"],
    link: null,
  },
];

function Projects() {
  const [filter, setFilter] = useState<"all" | "wordpress" | "enterprise" | "achievement">("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <section id="projects" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-10">
          <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase mb-4">04 · Projects</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Selected<br /><span className="italic text-gold">Work</span>
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="reveal flex flex-wrap gap-2 mb-12">
          {(["all", "enterprise", "wordpress", "achievement"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 font-mono text-xs tracking-widest uppercase transition-all border ${
                filter === f
                  ? "bg-ember text-cream border-ember"
                  : "text-cream/40 border-white/10 hover:border-ember/30 hover:text-cream/70"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div key={p.number}
              className={`border p-8 relative group transition-all hover:translate-y-[-2px] ${
                p.type === "wordpress"
                  ? "border-gold/10 hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(201,168,76,0.06)]"
                  : p.type === "achievement"
                  ? "border-white/5 hover:border-ember/30 hover:shadow-[0_8px_40px_rgba(232,83,42,0.06)]"
                  : "border-white/5 hover:border-ember/20 hover:shadow-[0_8px_40px_rgba(232,83,42,0.04)]"
              }`}>

              {/* Number watermark */}
              <span className="absolute top-4 right-6 font-display text-6xl text-white/[0.03] select-none pointer-events-none">
                {p.number}
              </span>

              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-0.5 text-xs font-mono border ${
                  p.type === "wordpress"
                    ? "bg-gold/10 text-gold/70 border-gold/20"
                    : p.type === "achievement"
                    ? "bg-ember/10 text-ember border-ember/20"
                    : "bg-white/5 text-cream/30 border-white/10"
                }`}>
                  {p.category}
                </span>
                {p.link && (
                  <a href={p.link} className="font-mono text-xs text-cream/20 hover:text-ember transition-colors">
                    View ↗
                  </a>
                )}
              </div>

              <h3 className="font-display text-2xl text-cream mb-3 leading-tight">{p.title}</h3>
              <p className="text-sm text-cream/50 font-body leading-relaxed mb-5">{p.desc}</p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-1.5 mb-5">
                {p.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-xs font-mono text-cream/30">
                    <span className={p.type === "wordpress" ? "text-gold/50" : "text-ember/50"}>◆</span>
                    {h}
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {p.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs font-mono border border-white/10 text-cream/30">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Awards / Certs ──────────────────────────────────────────── */
const highlights = [
  {
    label: "Hackathon",
    title: "3rd Place — Webcure",
    desc: "Web Development focused on health, held at ISI Ariana.",
    tag: "Achievement",
  },
  {
    label: "Competition",
    title: "10th Place — Code Her Ways 2.0",
    desc: "Problem-solving contest at ISI Ariana.",
    tag: "Achievement",
  },
  {
    label: "Competition",
    title: "TCPC 2024 — Rank 32",
    desc: "Tunisian Collegiate Programming Contest.",
    tag: "Achievement",
  },
  {
    label: "Certification",
    title: "AWS Cloud Foundations",
    desc: "AWS Academy Graduate — Cloud Foundations certification.",
    tag: "Certification",
  },
  {
    label: "Certification",
    title: "CCNA V1 & V2",
    desc: "Cisco Certified Network Associate — V1 and V2.",
    tag: "Certification",
  },
  {
    label: "Certification",
    title: "Scrum & DevOps Fundamentals",
    desc: "Scrum for Operations & DevOps Fundamentals certified.",
    tag: "Certification",
  },
];

function Awards() {
  return (
    <section className="py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase mb-4">05 · Highlights</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">Awards &<br /><span className="italic text-gold">Certifications</span></h2>
        </div>

        <div className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((h) => (
            <div key={h.title}
              className="border border-white/5 p-6 hover:border-gold/30 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(circle at top right, rgba(201,168,76,0.06), transparent)" }} />

              <p className="font-mono text-xs tracking-widest text-ember/60 uppercase mb-3">{h.label}</p>
              <h3 className="font-display text-lg text-cream mb-2 leading-tight">{h.title}</h3>
              <p className="text-sm text-cream/40 font-body leading-relaxed">{h.desc}</p>
              <div className="mt-4">
                <span className="px-2 py-0.5 text-xs font-mono bg-gold/10 text-gold/60 border border-gold/20">
                  {h.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Education ───────────────────────────────────────────────── */
function Education() {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-12">
          <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase mb-4">06 · Education</p>
          <h2 className="font-display text-4xl leading-tight">Academic<br /><span className="italic text-gold">Background</span></h2>
        </div>

        <div className="stagger space-y-4">
          {[
            {
              school: "Higher School of Communication of Tunis — SUP'COM",
              degree: "Engineering Degree",
              period: "2022 – 2025",
              note: null,
            },
            {
              school: "Preparatory Institute For Engineering Studies of Monastir",
              degree: "Preparatory Classes (PC)",
              period: "2020 – 2022",
              note: "Ranked 71 / 1,491 in the national PC exam",
            },
          ].map((edu) => (
            <div key={edu.school}
              className="border border-white/5 p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-ember/20 transition-colors">
              <div>
                <h3 className="font-display text-xl text-cream mb-1">{edu.school}</h3>
                <p className="font-mono text-sm text-ember">{edu.degree}</p>
                {edu.note && (
                  <p className="mt-2 text-xs font-mono text-gold/70 border border-gold/20 bg-gold/5 inline-block px-2 py-1">
                    🏆 {edu.note}
                  </p>
                )}
              </div>
              <p className="font-mono text-xs text-cream/30 shrink-0">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal text-center mb-16">
          <p className="font-mono text-xs tracking-[0.3em] text-ember uppercase mb-4">07 · Contact</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight mb-6">
            Let's build<br /><span className="italic text-gold">something great</span>
          </h2>
          <p className="text-cream/40 max-w-md mx-auto font-body text-sm">
            Open to exciting roles, collaborations, and conversations about technology.
          </p>
        </div>

        <div className="stagger max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="mailto:yasmine.landolsi@supcom.tn"
            className="border border-white/10 p-6 text-center hover:border-ember/40 hover:bg-ember/5 transition-all group">
            <div className="text-2xl mb-3">✉</div>
            <p className="font-mono text-xs text-cream/30 uppercase tracking-widest mb-1">Email</p>
            <p className="text-sm text-cream/60 group-hover:text-cream break-all transition-colors">
              yasmine.landolsi@supcom.tn
            </p>
          </a>

          <a href="https://github.com/Yasminelandolsi" target="_blank" rel="noopener noreferrer"
            className="border border-white/10 p-6 text-center hover:border-gold/40 hover:bg-gold/5 transition-all group">
            <div className="text-2xl mb-3">⌥</div>
            <p className="font-mono text-xs text-cream/30 uppercase tracking-widest mb-1">GitHub</p>
            <p className="text-sm text-cream/60 group-hover:text-cream transition-colors">Yasminelandolsi</p>
          </a>

          <a href="tel:+21657138608"
            className="border border-white/10 p-6 text-center hover:border-ember/40 hover:bg-ember/5 transition-all group">
            <div className="text-2xl mb-3">◎</div>
            <p className="font-mono text-xs text-cream/30 uppercase tracking-widest mb-1">Phone</p>
            <p className="text-sm text-cream/60 group-hover:text-cream transition-colors">+216 57 138 608</p>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-cream/20">© 2025 Yasmine Landolsi</p>
        <p className="font-mono text-xs text-cream/20">Built with Next.js · Deployed on Vercel</p>
        <div className="flex gap-6">
          {["Arabic · Native", "French · B2", "English · C1"].map((l) => (
            <span key={l} className="font-mono text-xs text-cream/20">{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ────────────────────────────────────────────────────── */
export default function Portfolio() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Awards />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}