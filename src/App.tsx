import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Github,
  Linkedin,
  FileText,
  Dumbbell,
  Code2,
  Puzzle,
  Rocket,
  MapPin,
  ChevronDown,
  ArrowUpRight,
  ExternalLink,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";

// ─── Real details ───────────────────────────────────────────────────────────
const NAME_FIRST = "Mohammad";
const NAME_LAST = "Alatiyat";
const TAGLINE = "Full-Stack Developer";
const LINKEDIN_URL = "https://linkedin.com/";
const GITHUB_URL = "https://github.com/";
// Drop a PDF at `public/resume.pdf` and this link will work.
const RESUME_URL = "/resume.pdf";
const EMAIL = "moalatiyat05@gmail.com";
// ───────────────────────────────────────────────────────────────────────────

// ─── Custom Cursor ──────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.09;
      ring.y += (mouse.y - ring.y) * 0.09;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x - 3}px, ${mouse.y - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x - 20}px, ${ring.y - 20}px)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }
        ::selection { background: rgba(255,255,255,0.15); }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 bg-white rounded-full"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-10 h-10 rounded-full border border-white/[0.18]"
        style={{ boxShadow: "0 0 16px rgba(255,255,255,0.04)" }}
      />
    </>
  );
}

// ─── Wayne NJ Map SVG ───────────────────────────────────────────────────────
function WayneMap() {
  const hLines = Array.from({ length: 16 }, (_, i) => i * 40);
  const vLines = Array.from({ length: 31 }, (_, i) => i * 40);
  const hMajor = Array.from({ length: 5 }, (_, i) => (i + 1) * 120);
  const vMajor = Array.from({ length: 9 }, (_, i) => (i + 1) * 133);

  return (
    <svg
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="locGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="centerVignette" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="edgeVignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0" />
          <stop offset="85%" stopColor="#0a0a0a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.95" />
        </radialGradient>
        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base */}
      <rect width="1200" height="600" fill="#080808" />

      {/* Fine street grid */}
      {hLines.map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} stroke="#181818" strokeWidth="0.5" />
      ))}
      {vLines.map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="600" stroke="#181818" strokeWidth="0.5" />
      ))}

      {/* Secondary collector roads */}
      {hMajor.map((y) => (
        <line key={`hm${y}`} x1="0" y1={y} x2="1200" y2={y} stroke="#202020" strokeWidth="1" />
      ))}
      {vMajor.map((x) => (
        <line key={`vm${x}`} x1={x} y1="0" x2={x} y2="600" stroke="#202020" strokeWidth="1" />
      ))}

      {/* Passaic River — dark teal-gray fill */}
      <path
        d="M -20 500 Q 80 470 200 485 Q 340 502 480 472 Q 600 444 740 462 Q 880 480 1020 460 Q 1100 448 1220 468"
        stroke="#192820" strokeWidth="16" fill="none" strokeLinecap="round"
      />
      <path
        d="M -20 500 Q 80 470 200 485 Q 340 502 480 472 Q 600 444 740 462 Q 880 480 1020 460 Q 1100 448 1220 468"
        stroke="#1e3025" strokeWidth="7" fill="none" strokeLinecap="round"
      />

      {/* Route 23 — main north-south artery */}
      <path d="M 625 0 L 645 600" stroke="#2c2c2c" strokeWidth="6" strokeLinecap="round" />
      <path d="M 625 0 L 645 600" stroke="#363636" strokeWidth="2.5" strokeDasharray="none" />

      {/* Hamburg Turnpike — main east-west */}
      <path
        d="M 0 290 Q 160 280 380 294 Q 580 307 820 286 Q 1000 270 1220 282"
        stroke="#2c2c2c" strokeWidth="5" fill="none" strokeLinecap="round"
      />
      <path
        d="M 0 290 Q 160 280 380 294 Q 580 307 820 286 Q 1000 270 1220 282"
        stroke="#363636" strokeWidth="2" fill="none"
      />

      {/* Valley Road — diagonal through western Wayne */}
      <path
        d="M 310 0 Q 430 160 475 310 Q 510 430 490 600"
        stroke="#252525" strokeWidth="3" fill="none"
      />

      {/* Preakness Ave — local diagonal */}
      <path
        d="M 700 80 Q 760 190 790 300 Q 810 390 790 490"
        stroke="#222222" strokeWidth="2" fill="none"
      />

      {/* Parish Drive / local loop */}
      <path
        d="M 550 180 Q 620 170 680 195 Q 720 215 710 260 Q 695 300 640 305 Q 580 308 555 280 Q 535 255 550 220"
        stroke="#1e1e1e" strokeWidth="1.5" fill="none"
      />

      {/* Pines Lake loop */}
      <path
        d="M 820 140 Q 900 120 960 155 Q 1000 180 990 240 Q 975 290 910 300 Q 850 305 820 270 Q 795 240 820 200"
        stroke="#1c1c1c" strokeWidth="1.5" fill="none"
      />

      {/* Location glow — Wayne center approx at Route 23 × Hamburg Tpk */}
      <circle cx="635" cy="294" r="80" fill="url(#locGlow)" />

      {/* Location pin dot */}
      <circle cx="635" cy="294" r="7" fill="#ffffff" opacity="0.15" filter="url(#dotGlow)" />
      <circle cx="635" cy="294" r="4" fill="#ffffff" opacity="0.9" />
      <circle cx="635" cy="294" r="2" fill="#ffffff" />

      {/* Coordinate labels — subtle editorial touch */}
      <text x="18" y="588" fill="#282828" fontSize="9" fontFamily="monospace" letterSpacing="0.06em">
        40.9279° N  74.2554° W
      </text>
      <text x="18" y="20" fill="#282828" fontSize="9" fontFamily="monospace" letterSpacing="0.06em">
        PASSAIC COUNTY — NEW JERSEY
      </text>

      {/* Center read-through darkening */}
      <rect width="1200" height="600" fill="url(#centerVignette)" />
      {/* Edge vignette */}
      <rect width="1200" height="600" fill="url(#edgeVignette)" />
    </svg>
  );
}

// ─── Scroll fade-in wrapper ──────────────────────────────────────────────────
function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  pop = false,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  // pop: scale-punch entrance instead of a plain fade
  pop?: boolean;
  // once=false: replays every time the element enters/exits the viewport,
  // instead of firing a single time and staying put
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 36 : 0,
    x: direction === "left" ? -36 : direction === "right" ? 36 : 0,
    scale: pop ? 0.85 : 1,
  };
  const animate = inView
    ? { opacity: 1, y: 0, x: 0, scale: 1 }
    : initial;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={
        pop
          ? { type: "spring", stiffness: 300, damping: 20, mass: 0.8, delay }
          : { duration: 0.85, delay, ease: [0.22, 0.03, 0.26, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

// ─── Section label ───────────────────────────────────────────────────────────
function Label({ children }: { children: string }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.22em] text-white/25 uppercase">
      {children}
    </span>
  );
}

// ─── Social icon button ──────────────────────────────────────────────────────
function SocialBtn({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      className="group w-9 h-9 rounded-full border border-white/15 flex items-center justify-center transition-all duration-300 hover:border-white/50 hover:bg-white/8 hover:scale-110"
      style={{ backdropFilter: "blur(6px)" }}
    >
      <Icon
        size={14}
        className="text-white/45 group-hover:text-white transition-colors duration-300"
      />
    </a>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <WayneMap />
      </div>

      {/* Bottom fade to page bg */}
      <div className="absolute inset-x-0 bottom-0 h-48 z-10 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      {/* Side fades */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#0a0a0a]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-20 px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.03, 0.26, 1] }}
        >
          <Label>Portfolio · Wayne, NJ</Label>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 0.03, 0.26, 1] }}
          className="mt-4 flex items-center gap-5 flex-wrap justify-center"
        >
          <h1
            className="text-[clamp(2.75rem,9vw,6.5rem)] font-black tracking-tighter text-white leading-none select-none"
            style={{ textShadow: "0 0 80px rgba(255,255,255,0.06)" }}
          >
            <span className="block">{NAME_FIRST}</span>
            <span className="block">{NAME_LAST}</span>
          </h1>

          {/* Social icons — stacked vertically beside name */}
          <div className="flex flex-row md:flex-col gap-2 mt-1">
            <SocialBtn href={LINKEDIN_URL} icon={Linkedin} label="LinkedIn" />
            <SocialBtn href={GITHUB_URL} icon={Github} label="GitHub" />
            <SocialBtn href={RESUME_URL} icon={FileText} label="Resume" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-5 font-mono text-xs tracking-[0.28em] text-white/30 uppercase"
        >
          {TAGLINE}
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="font-mono text-[9px] tracking-[0.26em] text-white/18 uppercase">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-white/18" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-5xl mx-auto">
      <FadeIn>
        <Label>01 — About Me</Label>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h2 className="mt-5 text-[clamp(2rem,6vw,4.5rem)] font-bold text-white tracking-tight leading-tight">
          I build things that<br />
          <span className="text-white/22">feel inevitable.</span>
        </h2>
      </FadeIn>

      <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-16">
        <FadeIn delay={0.15}>
          <p className="text-white/55 text-[1.05rem] leading-[1.85] font-light">
            I&apos;m a full-stack developer from Wayne, NJ with a strong passion for coding — one
            that started back in high school, when a small class project turned into a habit I
            never grew out of. I graduated from Rutgers University with a B.S. in Computer
            Science and a minor in Mathematics.
          </p>
        </FadeIn>
        <FadeIn delay={0.22}>
          <p className="text-white/55 text-[1.05rem] leading-[1.85] font-light">
            What drives me is turning ideas into real, working software — from the first line of
            code to a polished finished product. Off-screen, I train as an amateur kickboxer
            (currently 1–0), and the discipline and focus it takes in the ring carries straight
            over into how I approach a hard bug.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.3} className="mt-20 pt-10 border-t border-white/[0.055]">
        <div className="grid grid-cols-3 gap-6 md:gap-10">
          {[
            { value: "B.S.", label: "Computer Science" },
            { value: "1–0", label: "Kickboxing record" },
            { value: "∞", label: "Passion for code" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-[2.8rem] font-black text-white tracking-tight leading-none">
                {s.value}
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.18em] text-white/25 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Hobbies ─────────────────────────────────────────────────────────────────
const HOBBIES = [
  {
    Icon: Dumbbell,
    title: "Amateur Kickboxing",
    desc: "Competing as an amateur kickboxer with a 1-0 record. The discipline and focus it takes in the ring carries straight over into how I approach code.",
  },
  {
    Icon: Code2,
    title: "Coding Since High School",
    desc: "What started as curiosity in high school turned into a full-blown passion for building software — from small class projects to full-stack apps.",
  },
  {
    Icon: Puzzle,
    title: "Problem Solving",
    desc: "I get just as much satisfaction untangling a gnarly bug or algorithm as I do shipping a finished feature.",
  },
  {
    Icon: Rocket,
    title: "Always Learning",
    desc: "Constantly picking up new frameworks, languages, and tools — staying sharp and curious is part of the job.",
  },
];

function Hobbies() {
  return (
    <section id="hobbies" className="py-32 px-6 max-w-5xl mx-auto">
      <FadeIn>
        <Label>02 — Hobbies</Label>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="mt-5 text-[clamp(2rem,6vw,4rem)] font-bold text-white tracking-tight">
          Beyond the code.
        </h2>
      </FadeIn>

      {/* Grid with hairline separators */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-white/[0.055]">
        {HOBBIES.map(({ Icon, title, desc }, i) => (
          <FadeIn
            key={title}
            delay={0.05 + i * 0.06}
            pop
            once={false}
            className="border-b border-r border-white/[0.055]"
          >
            <div className="p-8 group hover:bg-white/[0.02] transition-colors duration-400 h-full">
              <div className="w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center mb-6 group-hover:border-white/25 transition-all duration-300">
                <Icon
                  size={16}
                  className="text-white/35 group-hover:text-white/75 transition-colors duration-300"
                />
              </div>
              <h3 className="text-white font-semibold text-[0.95rem] mb-2.5">{title}</h3>
              <p className="text-white/38 text-sm leading-relaxed font-light">{desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────
interface ProjectEntry {
  title: string;
  description: string;
  tags: string[];
  year?: string;
  image: string;
  badge?: string;
  liveUrl?: string;
  repoUrl?: string;
  gallery?: { src: string; caption: string }[];
  inspiration?: string;
  stack?: { label: string; value: string }[];
}

const PROJECTS: ProjectEntry[] = [
  {
    title: "MatCall",
    description:
      "A cross-platform mobile app that helps martial artists find nearby training partners and open gym sessions in real time — plus a community feed for discussion and video showcases.",
    tags: ["React Native", "Expo", "TypeScript", "Supabase", "PostGIS"],
    image: "/projects/matcall/nearby-feed.png",
    badge: "/projects/matcall/mark.svg",
    inspiration:
      "Finding a sparring partner or an open mat nearby shouldn't mean scrolling through a general social feed. MatCall started from that frustration — the idea was a fast, utilitarian tool people check right before or after training, where distance and time-until-session are the most visible numbers on the screen, because the whole point is knowing who's available right now.",
    stack: [
      { label: "App", value: "React Native + Expo (managed workflow), TypeScript" },
      { label: "Navigation", value: "React Navigation — bottom tabs, stack per tab" },
      { label: "Backend", value: "Supabase — Postgres, Auth, Storage, Realtime" },
      { label: "Location", value: "Expo Location + PostGIS for radius queries" },
      { label: "State", value: "TanStack Query (server state) + React Context (session/auth)" },
    ],
    gallery: [
      { src: "/projects/matcall/gallery-1-nearby.png", caption: "Nearby feed, sorted by distance and time until the session" },
      { src: "/projects/matcall/gallery-2-session.png", caption: "Session detail — tap \"I'm in\" to respond" },
      { src: "/projects/matcall/gallery-3-community.png", caption: "Community feed — discussion and video showcases" },
      { src: "/projects/matcall/gallery-4-gym-profile.png", caption: "Verified gym profile with weekly schedule" },
    ],
  },
];

function ProjectCard({ project, onOpen }: { project: ProjectEntry; onOpen: () => void }) {
  const { title, description, tags, year, image, badge } = project;

  return (
    <button
      onClick={onOpen}
      className="group block w-full text-left overflow-hidden bg-[#0a0a0a] hover:bg-[#0e0e0e] transition-colors duration-500 h-full cursor-pointer"
    >
      {/* Screenshot */}
      <div className="h-56 relative overflow-hidden">
        <img
          src={image}
          alt={`${title} app screenshot`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {year && (
          <span className="absolute top-5 right-5 font-mono text-[10px] text-white/70 tracking-widest">
            {year}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {badge && <img src={badge} alt="" className="w-5 h-5" />}
            <h3 className="text-white font-semibold text-xl tracking-tight">{title}</h3>
          </div>
          <ArrowUpRight
            size={15}
            className="text-white/18 group-hover:text-white/55 transition-colors duration-300 mt-1 flex-shrink-0"
          />
        </div>
        <p className="mt-3 text-white/40 text-sm leading-relaxed font-light">{description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-white/28 border border-white/[0.08] px-2.5 py-0.5 tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function ProjectModal({ project, onClose }: { project: ProjectEntry; onClose: () => void }) {
  const { title, description, badge, tags, liveUrl, repoUrl, gallery, inspiration, stack } = project;
  const href = liveUrl || repoUrl;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl max-h-[100vh] sm:max-h-[85vh] overflow-y-auto bg-[#0a0a0a] border border-white/10"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors duration-300 bg-[#0a0a0a]/70 backdrop-blur-sm"
        >
          <X size={16} />
        </button>

        <div className="p-7 sm:p-10">
          <div className="flex items-center gap-3">
            {badge && <img src={badge} alt="" className="w-8 h-8" />}
            <h3 className="text-white font-bold text-2xl sm:text-3xl tracking-tight">{title}</h3>
          </div>

          <p className="mt-5 text-white/55 text-base leading-relaxed font-light">{description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-white/28 border border-white/[0.08] px-2.5 py-0.5 tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {href && (
            <div className="mt-6 flex flex-wrap gap-4">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300"
                >
                  <ExternalLink size={12} /> View Live
                </a>
              )}
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300"
                >
                  <Github size={12} /> View Code
                </a>
              )}
            </div>
          )}

          {inspiration && (
            <div className="mt-10 pt-10 border-t border-white/[0.07]">
              <Label>Inspiration</Label>
              <p className="mt-3 text-white/50 text-sm leading-relaxed font-light">{inspiration}</p>
            </div>
          )}

          {stack && (
            <div className="mt-10 pt-10 border-t border-white/[0.07]">
              <Label>Tech Stack</Label>
              <div className="mt-4 space-y-3">
                {stack.map((item) => (
                  <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-white/25 sm:w-28 shrink-0">
                      {item.label}
                    </span>
                    <span className="text-white/50 text-sm font-light">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {gallery && (
            <div className="mt-10 pt-10 border-t border-white/[0.07]">
              <Label>Gallery</Label>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {gallery.map((shot) => (
                  <figure key={shot.src}>
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      className="w-full rounded-sm border border-white/[0.08] object-cover"
                    />
                    <figcaption className="mt-2 text-white/30 text-xs font-light leading-snug">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  const isSingle = PROJECTS.length === 1;
  const [openProject, setOpenProject] = useState<ProjectEntry | null>(null);

  return (
    <section id="projects" className="py-32 px-6 max-w-5xl mx-auto">
      <FadeIn>
        <Label>03 — Projects</Label>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="mt-5 text-[clamp(2rem,6vw,4rem)] font-bold text-white tracking-tight">
          Selected work.
        </h2>
      </FadeIn>

      <div
        className={`mt-14 grid grid-cols-1 gap-px bg-white/[0.055] ${
          isSingle ? "max-w-md mx-auto" : "md:grid-cols-2"
        }`}
      >
        {PROJECTS.map((project, i) => (
          <FadeIn key={project.title} delay={0.08 + i * 0.09} pop once={false}>
            <ProjectCard project={project} onOpen={() => setOpenProject(project)} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.15}>
        <p className="mt-8 text-center font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase">
          More projects coming soon
        </p>
      </FadeIn>

      <AnimatePresence>
        {openProject && (
          <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Education ───────────────────────────────────────────────────────────────
interface EducationEntry {
  school: string;
  degree: string;
  minor?: string;
  location: string;
}

const EDUCATION: EducationEntry[] = [
  {
    school: "Pioneer Academy",
    degree: "High School Diploma",
    location: "Wayne, NJ",
  },
  {
    school: "Freelance Web Developer",
    degree: "Website design & development for local clients",
    location: "Wayne, NJ",
  },
  {
    school: "Rutgers University",
    degree: "B.S. Computer Science",
    minor: "Minor in Mathematics",
    location: "Newark, NJ",
  },
];

function Education() {
  return (
    <section id="education" className="py-32 px-6 max-w-5xl mx-auto pb-48">
      <FadeIn>
        <Label>04 — Education</Label>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 className="mt-5 text-[clamp(2rem,6vw,4rem)] font-bold text-white tracking-tight">
          The journey.
        </h2>
      </FadeIn>

      <div className="mt-16 relative">
        {/* Vertical timeline spine */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.07]" />

        <div className="space-y-0">
          {EDUCATION.map(({ school, degree, minor, location }, i) => (
            <FadeIn key={school} delay={0.1 + i * 0.14} direction="left">
              <div className="relative pl-10 md:pl-16 pb-16 group">
                {/* Timeline node — solid, completed degree */}
                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full border border-white/45 bg-white/75 -translate-x-[3px] group-hover:bg-white transition-all duration-400" />

                {/* School + degree */}
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
                  {school}
                </h3>
                <p className="mt-1.5 text-white/50 text-base font-light">{degree}</p>
                {minor && (
                  <p className="text-white/40 text-base font-light">{minor}</p>
                )}

                {/* Location */}
                <div className="mt-4 flex items-center gap-1.5">
                  <MapPin size={10} className="text-white/20" />
                  <span className="font-mono text-[10px] text-white/22 tracking-widest">
                    {location}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/18 uppercase">
          Wayne, NJ · {new Date().getFullYear()}
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="flex items-center gap-5">
            {[
              { href: LINKEDIN_URL, Icon: Linkedin, label: "LinkedIn" },
              { href: GITHUB_URL, Icon: Github, label: "GitHub" },
              { href: RESUME_URL, Icon: FileText, label: "Resume" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/18 hover:text-white/60 transition-colors duration-300"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="font-mono text-[10px] tracking-[0.15em] text-white/25 hover:text-white/70 transition-colors duration-300"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#hobbies", label: "Hobbies" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-5">
      {/* Name mark */}
      <a
        href="#"
        aria-label="Home"
        className="block w-9 h-9 rounded-full overflow-hidden border border-white/15 hover:border-white/50 transition-colors duration-300"
      >
        <img
          src="/headshot.jpg"
          alt=""
          className="w-full h-full object-cover grayscale"
        />
      </a>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-7">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="font-mono text-[10px] tracking-[0.2em] text-white/30 hover:text-white/80 uppercase transition-colors duration-300"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white antialiased">
      <CustomCursor />
      <Nav />
      <Hero />
      <About />
      <Hobbies />
      <Projects />
      <Education />
      <Footer />
    </div>
  );
}
