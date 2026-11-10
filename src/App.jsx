import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink,
  FileDown, Menu, X, ChevronRight, BookOpen, Award,
  Briefcase, Code2, Database, Wrench, Globe, FlaskConical,
  GraduationCap, FileText, Star, Building2,
} from "lucide-react";
import profileImage from "/profile.png";
import "./App.css";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Experience",   href: "#experience" },
  { label: "Projects",     href: "#projects" },
  { label: "Research",     href: "#research" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",      href: "#contact" },
];

const SKILL_CATEGORIES = [
  {
    icon: Code2,
    title: "Programming Languages",
    skills: ["Python", "Java", "C", "C++", "SQL"],
  },
  {
    icon: Globe,
    title: "Web Technologies",
    skills: ["HTML5", "CSS3", "JavaScript"],
  },
  {
    icon: FlaskConical,
    title: "Frameworks & Libraries",
    skills: ["React", "Node.js", "FastAPI", "Flask", "Tailwind CSS"],
  },
  {
    icon: Database,
    title: "Databases",
    skills: ["Firebase Firestore", "MongoDB"],
  },
  {
    icon: Wrench,
    title: "Developer Tools",
    skills: ["Git", "GitHub", "Firebase Hosting", "Render"],
  },
  {
    icon: Briefcase,
    title: "Technical Areas",
    skills: [
      "REST API Development",
      "Full-Stack Development",
      "Database Management",
      "AI Application Integration",
      "Data Analysis",
    ],
  },
];

const EXPERIENCE = [
  {
    company: "Webbed",
    role: "Software Engineer Intern",
    period: "December 2025 – January 2026",
    type: "On-site",
    points: [
      "Developed full-stack web application interfaces using React and Tailwind CSS.",
      "Built and integrated backend REST APIs using Python FastAPI.",
      "Integrated Firebase Firestore for real-time data management.",
      "Deployed backend services via Render and frontend via Firebase Hosting.",
    ],
    tags: ["React", "FastAPI", "Firebase", "Tailwind CSS", "Render"],
  },
  {
    company: "Cognifyz Technologies",
    role: "Web Development Intern",
    period: "February 2026 – March 2026",
    type: "Virtual",
    points: [
      "Completed a virtual web development internship program.",
      "Gained practical exposure to web development workflows and best practices.",
    ],
    tags: ["Web Development"],
    note: "Internship completed. Certificate details to be verified.",
  },
];

const PROJECTS = [
  {
    title: "ResumeAI – AI Resume Analyzer",
    subtitle: "Full-Stack AI Application",
    description:
      "An AI-powered resume analysis platform that evaluates resumes against job descriptions and provides structured insights into ATS compatibility, keyword matching and skill gaps.",
    features: [
      "Resume upload & job description comparison",
      "ATS compatibility scoring with 6-category breakdown",
      "Keyword matching & missing skill identification",
      "AI-powered improvement suggestions via Gemini 2.5 Flash",
      "Personalized learning roadmaps",
      "Firebase auth & Firestore history tracking",
      "Auto-generated PDF reports & interactive dashboard",
    ],
    tags: ["React", "FastAPI", "Gemini AI", "Firebase", "Tailwind CSS"],
    github: "https://github.com/mukesh0630/ai-resume-analyzer",
    demo: "https://ai-resume-analyzer-ea4bd.web.app/",
    color: "from-blue-900/30 to-cyan-900/20",
    accent: "#3b82f6",
  },
  {
    title: "Chai Talès – Premium Chai Experience",
    subtitle: "Frontend Web Development",
    description:
      "A fully responsive multi-page branded website for a premium chai café, showcasing product menus, signature beverages, customer testimonials and franchise enquiry functionality.",
    features: [
      "Multi-page responsive site: Home, Menu, About, Contact",
      "Custom animation engine: scroll-reveal, parallax & tilt cards",
      "Interactive menu with category filtering",
      "Glassmorphism UI, animated gradient text & floating particles",
      "Mobile hamburger navigation & scroll progress bar",
      "Franchise enquiry contact section",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/mukesh0630/Chai-Tales",
    demo: "https://mukesh0630.github.io/Chai-Tales/",
    color: "from-amber-900/25 to-orange-900/15",
    accent: "#f59e0b",
  },
];

const CERTIFICATIONS = [
  {
    title: "Data Science with Python",
    org: "MSME Technology Development Centre, Chennai",
    orgSub: "Government of India",
    area: "Data Science · Machine Learning",
    year: "2025",
    icon: "🏛️",
  },
  {
    title: "Post Graduate Diploma in Computer Applications (PGDCA)",
    org: "Computer Software Institute",
    orgSub: "Distinction",
    area: "Computer Applications · Software",
    year: "2024",
    icon: "🎓",
  },
  {
    title: "Software Engineering Virtual Internship",
    org: "Webbed",
    orgSub: "Completion Certificate",
    area: "Software Engineering · Web Development",
    year: "2026",
    icon: "💻",
  },
];

const RESEARCH = [
  {
    title: "Hybrid LLM-RM Agent Architecture for Autonomous & Reliable On-Demand Task Execution",
    conference: "International Conference on Cybernetic Nexus (ICCN 2026)",
    institution: "Dwaraka Doss Goverdhan Doss Vaishnav College",
    type: "Research Paper Presentation",
    description:
      "Presented a research paper exploring a hybrid agent architecture combining Large Language Models with Retrieval-augmented Memory for autonomous and reliable on-demand task execution. The paper investigates approaches to improve agent reliability in complex multi-step workflows.",
    year: "2026",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Best Team – GROW RYLA 2025",
    org: "Rotary Club of Chennai",
    date: "December 2025",
    description:
      "Recognized as part of the Best Team at GROW RYLA 2025, a youth leadership and professional development program.",
    icon: Award,
  },
];

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

/* ═══════════════════════════════════════════
   HOOK – active section
═══════════════════════════════════════════ */
function useActiveSection(ids) {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}

/* ═══════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════ */

/* ── SectionWrapper ── */
function SectionWrapper({ id, className = "", children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </section>
  );
}

/* ── SectionHeader ── */
function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="mb-12">
      <p className="section-label">{label}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">{title}</h2>
      {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
      <div className="section-divider mt-4" />
    </div>
  );
}

/* ── Navbar ── */
function Navbar() {
  const sections = NAV_LINKS.map((n) => n.href.slice(1));
  const active = useActiveSection(sections);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on Esc
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = useCallback((href) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 10);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050810]/90 backdrop-blur-xl border-b border-blue-500/10 shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-2 text-slate-100 font-bold text-lg tracking-tight hover:text-blue-400 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              M
            </span>
            Mukesh V
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`nav-link text-sm font-medium transition-colors ${
                  active === link.href.slice(1)
                    ? "text-blue-400 active"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/my_portfolio/Mukesh_V_Resume.pdf"
              download="Mukesh_V_Resume.pdf"
              className="btn-primary text-sm py-2 px-4"
            >
              <FileDown size={15} />
              Resume
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-slate-300 hover:text-white p-2 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-overlay lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button top-right */}
            <button
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col items-center gap-6 w-full px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`text-xl font-semibold transition-colors ${
                    active === link.href.slice(1) ? "text-blue-400" : "text-slate-300"
                  }`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="/my_portfolio/Mukesh_V_Resume.pdf"
                download="Mukesh_V_Resume.pdf"
                className="btn-primary mt-2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
              >
                <FileDown size={16} />
                Download Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Blue glow top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-28 md:py-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left – text */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 leading-tight mb-4"
            >
              Mukesh V
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base md:text-lg font-medium text-blue-400 mb-5"
            >
              Computer Science Undergraduate&nbsp;·&nbsp;Aspiring IT Analyst&nbsp;·&nbsp;Software Developer
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Building practical software solutions through programming, analytical thinking and modern technologies.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector("#projects").scrollIntoView({ behavior: "smooth" }); }} className="btn-primary">
                <ChevronRight size={16} />
                View Projects
              </a>
              <a
                href="/my_portfolio/Mukesh_V_Resume.pdf"
                download="Mukesh_V_Resume.pdf"
                className="btn-outline"
              >
                <FileDown size={16} />
                Download Resume
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact").scrollIntoView({ behavior: "smooth" }); }} className="btn-ghost">
                <Mail size={16} />
                Contact Me
              </a>
            </motion.div>

            {/* Social */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex items-center gap-4"
            >
              <a
                href="https://github.com/mukesh0630"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium"
                aria-label="GitHub profile"
              >
                <Github size={18} />
                GitHub
              </a>
              <span className="w-px h-4 bg-slate-700" />
              <a
                href="https://www.linkedin.com/in/mukesh0604"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={18} />
                LinkedIn
              </a>
              <span className="w-px h-4 bg-slate-700" />
              <a
                href="mailto:mukesh.velm06042007@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium"
                aria-label="Send email"
              >
                <Mail size={18} />
                Email
              </a>
            </motion.div>
          </div>

          {/* Right – profile image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex justify-center md:justify-end"
          >
            <div className="profile-ring-wrap">
              {/* Inner white ring spacer */}
              <div className="relative z-10 rounded-full p-1 bg-[#050810]">
                <img
                  src={profileImage}
                  alt="Mukesh V – Software Developer and Computer Science Undergraduate"
                  loading="eager"
                  className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover object-top"
                  style={{ objectPosition: "center 10%" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600 text-xs"
        >
          <span>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-blue-500/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  return (
    <SectionWrapper id="about" className="bg-[#0a0f1e] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          label="About Me"
          title="Who I Am"
          subtitle="A Computer Science undergraduate building practical software solutions."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bio */}
          <div className="space-y-5">
            <p className="text-slate-300 leading-relaxed text-[0.95rem]">
              I am a Computer Science undergraduate at{" "}
              <span className="text-blue-400 font-medium">
                Dwaraka Doss Goverdhan Doss Vaishnav College
              </span>{" "}
              with practical experience in software engineering, web development and AI-driven application development.
            </p>
            <p className="text-slate-300 leading-relaxed text-[0.95rem]">
              My technical interests include programming, database management, application development and analytical problem-solving.
            </p>
            <p className="text-slate-300 leading-relaxed text-[0.95rem]">
              Through internships, academic projects and research paper presentation, I have developed an understanding of building practical technology solutions and working with modern development tools.
            </p>
            <p className="text-slate-300 leading-relaxed text-[0.95rem]">
              I am continuously improving my technical knowledge and preparing to contribute to professional IT and software development environments.
            </p>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { icon: MapPin, text: "Chennai, Tamil Nadu" },
                { icon: GraduationCap, text: "B.Sc. Computer Science" },
                { icon: Briefcase, text: "2 Internships" },
                { icon: FileText, text: "Research Presenter" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 text-sm text-slate-400 bg-slate-800/50 border border-slate-700/50 px-3 py-1.5 rounded-lg"
                >
                  <Icon size={13} className="text-blue-400" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Education card */}
          <div>
            <div
              className="card-hover rounded-2xl border border-blue-500/15 bg-gradient-to-br from-[#0f1629] to-[#111827] p-6 md:p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-lg">Education</h3>
                  <p className="text-slate-500 text-sm">Academic Background</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-blue-400 font-semibold text-sm uppercase tracking-wide mb-1">Degree</p>
                  <p className="text-slate-200 font-medium">B.Sc. Computer Science</p>
                </div>
                <div>
                  <p className="text-blue-400 font-semibold text-sm uppercase tracking-wide mb-1">Institution</p>
                  <p className="text-slate-200 font-medium leading-snug">
                    Dwaraka Doss Goverdhan Doss Vaishnav College
                  </p>
                  <p className="text-slate-500 text-sm">Chennai, Tamil Nadu</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-400 font-semibold text-sm uppercase tracking-wide mb-1">Graduation</p>
                    <p className="text-slate-200 font-medium">2027 (Expected)</p>
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold text-sm uppercase tracking-wide mb-1">CGPA</p>
                    <p className="text-slate-200 font-medium">6.9 / 10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ── Skills ── */
function Skills() {
  return (
    <SectionWrapper id="skills" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          label="Technical Skills"
          title="My Technology Stack"
          subtitle="A categorised overview of the technologies, tools and areas I work with."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map(({ icon: Icon, title, skills }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={i}
              className="card-hover rounded-2xl border border-blue-500/12 bg-gradient-to-br from-[#0f1629] to-[#111827] p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-blue-600/15 border border-blue-500/25 flex items-center justify-center">
                  <Icon size={17} className="text-blue-400" />
                </div>
                <h3 className="font-semibold text-slate-200 text-sm">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="skill-chip">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ── Experience ── */
function Experience() {
  return (
    <SectionWrapper id="experience" className="bg-[#0a0f1e] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          label="Experience"
          title="Professional Experience"
          subtitle="Practical software development experience through industry internships."
        />

        <div className="space-y-6">
          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={exp.company}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={i}
              className="card-hover rounded-2xl border border-blue-500/12 bg-gradient-to-br from-[#0f1629] to-[#111827] p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <div className="timeline-dot mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
                    <p className="text-blue-400 font-semibold flex items-center gap-1.5 mt-0.5">
                      <Building2 size={14} />
                      {exp.company}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1 ml-6 sm:ml-0 flex-shrink-0">
                  <span className="text-slate-400 text-sm font-medium">{exp.period}</span>
                  <span className="tag">{exp.type}</span>
                </div>
              </div>

              <ul className="ml-6 space-y-2 mb-4">
                {exp.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed">
                    <ChevronRight size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>

              {exp.note && (
                <p className="ml-6 text-xs text-slate-600 italic border-t border-slate-800 pt-3 mt-3">
                  ⚠ {exp.note}
                </p>
              )}

              <div className="flex flex-wrap gap-2 ml-6 mt-4">
                {exp.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ── Projects ── */
function Projects() {
  return (
    <SectionWrapper id="projects" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          label="Projects"
          title="Featured Projects"
          subtitle="Practical software projects demonstrating full-stack development and AI integration."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              custom={i}
              className={`card-hover rounded-2xl border border-blue-500/12 bg-gradient-to-br ${p.color} backdrop-blur-sm p-6 md:p-8 flex flex-col`}
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="tag mb-2 inline-block">{p.subtitle}</span>
                    <h3 className="text-xl font-bold text-slate-100 leading-snug">{p.title}</h3>
                  </div>
                  <Star size={18} className="text-yellow-500/70 flex-shrink-0 mt-1" />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">{p.description}</p>
              </div>

              {/* Features */}
              <div className="mb-5 flex-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Key Features</p>
                <ul className="space-y-1.5">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-slate-400 text-sm">
                      <ChevronRight size={13} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 mt-auto pt-2 border-t border-white/5">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2 px-4 flex-1 justify-center"
                    aria-label={`View live demo of ${p.title}`}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2 px-4 flex-1 justify-center"
                  aria-label={`View ${p.title} source code on GitHub`}
                >
                  <Github size={14} />
                  View Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ── Research ── */
function Research() {
  return (
    <SectionWrapper id="research" className="bg-[#0a0f1e] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          label="Research"
          title="Research & Technical Presentations"
          subtitle="Academic research contributions and conference presentations."
        />

        <div className="space-y-6">
          {RESEARCH.map((r, i) => (
            <motion.div
              key={r.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={i}
              className="card-hover rounded-2xl border border-blue-500/12 bg-gradient-to-br from-[#0f1629] to-[#111827] p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={20} className="text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <span className="tag">{r.type}</span>
                    <span className="text-slate-500 text-sm">{r.year}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-100 leading-snug mb-3">
                    "{r.title}"
                  </h3>
                  <p className="text-blue-400 font-semibold text-sm mb-1">{r.conference}</p>
                  <p className="text-slate-500 text-sm mb-4">{r.institution}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{r.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ── Certifications ── */
function Certifications() {
  return (
    <SectionWrapper id="certifications" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          label="Certifications"
          title="Credentials & Certifications"
          subtitle="Professional certifications validating technical knowledge and skills."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              custom={i}
              className="card-hover rounded-2xl border border-blue-500/12 bg-gradient-to-br from-[#0f1629] to-[#111827] p-6 flex flex-col"
            >
              <div className="text-3xl mb-4">{cert.icon}</div>
              <h3 className="font-bold text-slate-200 text-sm leading-snug mb-2">{cert.title}</h3>
              <p className="text-blue-400 text-sm font-semibold mb-0.5">{cert.org}</p>
              <p className="text-slate-500 text-xs mb-3">{cert.orgSub}</p>
              <div className="mt-auto space-y-2">
                <span className="tag block w-fit">{cert.area}</span>
                <p className="text-slate-600 text-xs">{cert.year}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements inside this section */}
        <div className="mt-14">
          <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
            <Award size={20} className="text-yellow-500" />
            Achievements
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {ACHIEVEMENTS.map((ach, i) => {
              const Icon = ach.icon;
              return (
                <motion.div
                  key={ach.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  custom={i}
                  className="card-hover rounded-2xl border border-yellow-500/12 bg-gradient-to-br from-yellow-900/10 to-[#111827] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 mb-1">{ach.title}</h4>
                      <p className="text-yellow-400/80 text-sm font-medium mb-0.5">{ach.org}</p>
                      <p className="text-slate-500 text-xs mb-2">{ach.date}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{ach.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ── Contact ── */
function Contact() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState(""); // "success" | "error" | ""
  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      setFormStatus("Please fill in all required fields.");
      return;
    }
    setFormLoading(true);
    setFormStatus("");
    try {
      const res = await fetch("https://formsubmit.co/ajax/mukesh.velm06042007@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          subject: formSubject || "Portfolio Message",
          message: formMessage,
          _captcha: "false",
        }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormName(""); setFormEmail(""); setFormSubject(""); setFormMessage("");
      } else {
        setFormStatus("Error sending message. Please email me directly.");
      }
    } catch {
      setFormStatus("Network error. Please email me directly.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-[#0a0f1e] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          label="Contact"
          title="Get In Touch"
          subtitle="Open to internships, entry-level developer roles and analyst trainee opportunities."
        />

        <div className="grid md:grid-cols-2 gap-10">
          {/* Info */}
          <div>
            <p className="text-slate-400 leading-relaxed mb-8 text-[0.95rem]">
              I am actively seeking opportunities as an{" "}
              <span className="text-slate-200 font-medium">IT Analyst Trainee</span>,{" "}
              <span className="text-slate-200 font-medium">Software Developer</span> or{" "}
              <span className="text-slate-200 font-medium">Graduate Trainee</span>. Feel free to reach out via any of the channels below.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "mukesh.velm06042007@gmail.com",
                  href: "mailto:mukesh.velm06042007@gmail.com",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/mukesh0604",
                  href: "https://www.linkedin.com/in/mukesh0604",
                },
                {
                  icon: Github,
                  label: "GitHub",
                  value: "github.com/mukesh0630",
                  href: "https://github.com/mukesh0630",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Chennai, Tamil Nadu, India",
                  href: null,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 9080541906",
                  href: "tel:+919080541906",
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-blue-600/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs font-semibold uppercase tracking-wide">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-slate-300 text-sm hover:text-blue-400 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Resume CTA */}
            <div className="mt-8 p-5 rounded-xl border border-blue-500/15 bg-blue-500/5">
              <p className="text-slate-300 text-sm mb-3 font-medium">Looking for my resume?</p>
              <a
                href="/my_portfolio/Mukesh_V_Resume.pdf"
                download="Mukesh_V_Resume.pdf"
                className="btn-primary text-sm w-full justify-center"
              >
                <FileDown size={15} />
                Download Resume (PDF)
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="card-hover rounded-2xl border border-blue-500/12 bg-gradient-to-br from-[#0f1629] to-[#111827] p-6 md:p-8">
            <h3 className="font-bold text-slate-200 mb-5">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1 block">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full bg-slate-800/50 border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1 block">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-slate-800/50 border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1 block">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder="Subject (optional)"
                  className="w-full bg-slate-800/50 border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1 block">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Your message..."
                  required
                  rows={5}
                  className="w-full bg-slate-800/50 border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition resize-none"
                />
              </div>

              {formStatus && formStatus !== "success" && (
                <p className="text-red-400 text-sm">{formStatus}</p>
              )}
              {formStatus === "success" && (
                <p className="text-green-400 text-sm">✓ Message sent! I will get back to you soon.</p>
              )}

              <div className="flex gap-3">
                <button type="submit" disabled={formLoading} className="btn-primary flex-1 justify-center">
                  {formLoading ? "Sending…" : "Send Message"}
                </button>
                <button
                  type="button"
                  onClick={() => { setFormName(""); setFormEmail(""); setFormSubject(""); setFormMessage(""); setFormStatus(""); }}
                  className="btn-ghost"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ── Footer ── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-blue-500/8 bg-[#050810] py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">M</span>
            <span className="text-slate-400 text-sm font-medium">Mukesh V</span>
          </div>

          <p className="text-slate-600 text-sm text-center">
            © {year} Mukesh V. Computer Science Undergraduate · Chennai, India.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://github.com/mukesh0630" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-300 transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/mukesh0604" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-300 transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:mukesh.velm06042007@gmail.com" className="text-slate-600 hover:text-slate-300 transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen bg-[#050810] text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Research />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
