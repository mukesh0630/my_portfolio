import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import profileImage from '/profile.jpg';

const skills = [
  "Python", "Java", "C", "C++", "JavaScript"
];

const webSkills = ["HTML", "CSS", "React", "TailwindCSS", "Node.js"];
const tools = ["Git", "GitHub", "SQL", "Firebase", "MongoDB"];
const softSkills = ["Communication", "Teamwork", "Leadership", "Time Management"];

const projects = [
  {
    title: "AI Resume Analyzer",
    description:
      "Analyzes resumes vs job descriptions to produce ATS score, missing skills, learning roadmap, and AI insights. Built with React + Tailwind, Python + FastAPI, Firebase Firestore.",
    tags: ["React", "FastAPI", "Firebase", "Tailwind"],
    github: "https://github.com/mukesh0630/ai-resume-analyzer",
    demo: "https://ai-resume-analyzer-ea4bd.web.app/"
  }
];

export default function Portfolio() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Use imported profile image
  const [profileUrl] = useState(profileImage);

  const [imgModalOpen, setImgModalOpen] = useState(false);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setImgModalOpen(false); };
    if (imgModalOpen) document.body.style.overflow = 'hidden'; else document.body.style.overflow = '';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [imgModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      setFormStatus('Please fill all required fields.');
      return;
    }
    setFormLoading(true);
    setFormStatus('');
    try {
      const res = await fetch('https://formsubmit.co/ajax/mukesh.velm06042007@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName, email: formEmail, subject: formSubject || 'Portfolio message', message: formMessage, _captcha: 'false' })
      });
      if (res.ok) {
        setFormStatus('Thanks — message sent!');
        setFormName(''); setFormEmail(''); setFormSubject(''); setFormMessage('');
      } else {
        setFormStatus('Error sending message. Please try emailing directly.');
      }
    } catch (err) {
      setFormStatus('Network error. Please email directly.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-purple-50">
      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-black/40 backdrop-blur border-b border-purple-500/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Mukesh V</span>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-purple-200">
            <a href="#home" className="hover:text-purple-300 transition-transform duration-150 hover:-translate-y-1">Home</a>
            <a href="#about" className="hover:text-purple-300 transition-transform duration-150 hover:-translate-y-1">About</a>
            <a href="#skills" className="hover:text-purple-300 transition-transform duration-150 hover:-translate-y-1">Skills</a>
            <a href="#projects" className="hover:text-purple-300 transition-transform duration-150 hover:-translate-y-1">Projects</a>
            <a href="#experience" className="hover:text-purple-300 transition-transform duration-150 hover:-translate-y-1">Experience</a>
            <a href="#contact" className="hover:text-purple-300 transition-transform duration-150 hover:-translate-y-1">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="max-w-6xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm text-purple-400 mb-2 font-semibold uppercase tracking-wider">Hello! 👋 I'm here to help</p>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">I&apos;m a Software Engineer</h1>
          <p className="text-purple-200 mb-6 max-w-xl text-lg">Currently in a Software Engineer at Webbed. I build modern, reliable full-stack web applications with an emphasis on clean interfaces, solid APIs and practical AI-powered solutions.</p>

          <div className="flex gap-4 mb-8">
            <a href="#projects" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:-translate-y-1 font-semibold">View Projects</a>
            <a href="#contact" className="inline-flex items-center gap-2 border-2 border-purple-500 text-purple-300 px-6 py-3 rounded-lg hover:bg-purple-500/10 transition transform hover:-translate-y-1 font-semibold">Contact Me</a>
          </div>

          <div className="flex gap-4 mt-4 text-purple-300">
            <a href="https://github.com/mukesh0630" target="_blank" aria-label="GitHub" className="hover:text-purple-100 transform transition duration-150 hover:-translate-y-1 hover:scale-110"><Github size={24}/></a>
            <a href="https://www.linkedin.com/in/mukesh0604" target="_blank" aria-label="LinkedIn" className="hover:text-purple-100 transform transition duration-150 hover:-translate-y-1 hover:scale-110"><Linkedin size={24}/></a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="">
          <div className="relative flex justify-center items-center">
            {/* glowing rings behind the image */}
            <div className="absolute -inset-8 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-10"></div>
            </div>

            <button type="button" onClick={() => setImgModalOpen(true)} className="rounded-full focus:outline-none focus:ring-4 focus:ring-purple-500/30 transform hover:-translate-y-1 transition relative">
              {profileUrl ? (
                <motion.img whileHover={{ scale: 1.06, rotate: 2 }} src={profileUrl} alt="Mukesh" className="profile-img w-80 h-80 rounded-full object-cover ring-4 ring-purple-500 shadow-2xl shadow-purple-500/50" />
              ) : (
                <motion.div whileHover={{ scale: 1.06, rotate: 2 }} className="profile-img w-80 h-80 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-4xl">MV</motion.div>
              )}
            </button>
          </div>
        </motion.div>
      </section>

      {imgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md" role="dialog" aria-modal="true" onClick={() => setImgModalOpen(false)}>
          <div className="relative max-w-[90%] max-h-[90%]" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Close" onClick={() => setImgModalOpen(false)} className="absolute -top-6 -right-6 bg-purple-900 text-purple-200 p-2 rounded-full shadow-lg hover:bg-purple-800">✕</button>
            <motion.img src={profileUrl} alt="Mukesh large" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-[100%] max-h-[80vh] rounded-lg shadow-2xl shadow-purple-500/50 object-cover" />
          </div>
        </div>
      )}

      {/* About */}
      <section id="about" className="bg-gradient-to-br from-purple-950/50 to-slate-950/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">About Me</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-8 shadow-lg border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 transition transform hover:-translate-y-2">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-3">Passionate Software Engineer</h3>
              <p className="text-purple-100 mb-4">I build modern, user-friendly, and scalable web applications. I enjoy solving practical problems with a focus on clean UI, strong APIs, and reliable systems. My main stack includes React, Tailwind CSS, Python, FastAPI and Firebase.</p>
              <div className="flex gap-3">
                <a href="#projects" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:-translate-y-1 font-semibold">See projects</a>
                <a href="#contact" className="inline-flex items-center gap-2 border border-purple-500 text-purple-300 px-4 py-2 rounded-lg hover:bg-purple-500/10 transition transform hover:-translate-y-1 font-semibold">Contact</a>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 shadow-lg border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 transition transform hover:-translate-y-2">
              <h4 className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-semibold mb-3 text-lg">Highlights</h4>
              <ul className="text-purple-100 list-disc ml-5 space-y-2">
                <li>Built production-ready full-stack projects with React + FastAPI</li>
                <li>Experience with Firebase and RESTful API development</li>
                <li>Practical knowledge of deployment and CI workflows</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Skills</h2>
            <p className="text-sm text-purple-300 mt-3 md:mt-0">Proficiencies I use to build projects and deliver reliable software.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 shadow-lg border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 transition transform hover:-translate-y-2">
              <h3 className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-semibold mb-4 text-lg">Programming Languages</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map(s => (
                  <span key={s} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-purple-200 bg-purple-500/20 ring-1 ring-purple-500/50 hover:bg-purple-500/30 transition">{s}</span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 shadow-lg border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 transition transform hover:-translate-y-2">
              <h3 className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-semibold mb-4 text-lg">Web Development</h3>
              <div className="flex flex-wrap gap-3">
                {webSkills.map(s => (
                  <span key={s} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-purple-200 bg-purple-500/20 ring-1 ring-purple-500/50 hover:bg-purple-500/30 transition">{s}</span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 shadow-lg border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 transition transform hover:-translate-y-2">
              <h3 className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-semibold mb-4 text-lg">Tools & Database</h3>
              <div className="flex flex-wrap gap-3">
                {tools.map(s => (
                  <span key={s} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-purple-200 bg-purple-500/20 ring-1 ring-purple-500/50 hover:bg-purple-500/30 transition">{s}</span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 shadow-lg border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 transition transform hover:-translate-y-2">
              <h3 className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-semibold mb-4 text-lg">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                {softSkills.map(s => (
                  <span key={s} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-purple-200 bg-purple-500/20 ring-1 ring-purple-500/50 hover:bg-purple-500/30 transition">{s}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-gradient-to-br from-purple-950/50 to-slate-950/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map(p => (
              <div key={p.title} className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 shadow-lg border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 transition transform hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent flex items-center gap-2"><Star size={18}/> {p.title}</h3>
                <p className="text-purple-100 mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {p.tags.map(t => (
                    <span key={t} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-purple-200 bg-purple-500/20 ring-1 ring-purple-500/50 hover:bg-purple-500/30 transition">{t}</span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {p.demo ? (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:-translate-y-1 font-semibold">Live Demo <ExternalLink className="ml-1" size={16} /></a>
                  ) : (
                    <button disabled className="inline-flex items-center gap-2 bg-slate-700 text-slate-400 px-4 py-2 rounded-lg opacity-60 cursor-not-allowed">Live Demo <ExternalLink className="ml-1" size={16} /></button>
                  )}

                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-purple-500 text-purple-300 px-4 py-2 rounded-lg hover:bg-purple-500/10 transition transform hover:-translate-y-1 font-semibold">Code <Github className="ml-1" size={16} /></a>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Experience</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 shadow-lg border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 transition transform hover:-translate-y-2">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Software Engineer Intern — Webbed</h3>
              <p className="text-purple-400">Dec 2025 – Jan 2026</p>
              <p className="text-purple-100 mt-2">At Webbed, I worked on developing a full-stack web application using React, Tailwind CSS, Python, FastAPI, and Firebase. I contributed to building responsive user interfaces, integrating backend APIs, and improving application functionality. This internship gave me hands-on experience with real-world development workflows, debugging, and writing clean, maintainable code in a team environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gradient-to-br from-purple-950/50 to-slate-950/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Contact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 p-6 shadow-lg border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/30 transition transform hover:-translate-y-2">
              <div className="flex flex-col gap-3 text-purple-100">
                <p className="flex items-center gap-2"><Mail size={18}/> <a href="mailto:mukesh.velm06042007@gmail.com" className="text-purple-300 hover:text-purple-100 transition">mukesh.velm06042007@gmail.com</a></p>
                <p className="flex items-center gap-2"><Phone size={18}/> <a href="tel:+919080541906" className="text-purple-300 hover:text-purple-100 transition">9080541906</a></p>
                <p className="flex items-center gap-2"><Linkedin size={18}/> <a href="https://www.linkedin.com/in/mukesh0630" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-100 transition">linkedin.com/in/mukesh0630</a></p>
                <p className="flex items-center gap-2"><Github size={18}/> <a href="https://github.com/mukesh0630" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-100 transition">github.com/mukesh0630</a></p>

                <div className="mt-4 flex gap-3">
                  <a href="mailto:mukesh.velm06042007@gmail.com" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:-translate-y-1 font-semibold">Send Email</a>
                  <a href="tel:+919080541906" className="inline-flex items-center gap-2 bg-slate-700 text-slate-100 px-4 py-2 rounded-lg hover:bg-slate-600 transition transform hover:-translate-y-1 font-semibold">Call Me</a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-zinc-900/60 to-zinc-800/60 p-6 shadow-md hover:shadow-2xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold mb-3 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent text-lg">Let's work together</h3>
              <p className="text-purple-100 mb-4">Open to internships and junior developer roles. Feel free to reach out!</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input value={formName} onChange={e => setFormName(e.target.value)} placeholder="Your name" required className="bg-purple-900/40 border border-purple-500/30 rounded-lg px-3 py-2 text-sm text-purple-50 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  <input value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="Your email" type="email" required className="bg-purple-900/40 border border-purple-500/30 rounded-lg px-3 py-2 text-sm text-purple-50 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>

                <input value={formSubject} onChange={e => setFormSubject(e.target.value)} placeholder="Subject (optional)" className="bg-purple-900/40 border border-purple-500/30 rounded-lg px-3 py-2 text-sm text-purple-50 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />

                <textarea value={formMessage} onChange={e => setFormMessage(e.target.value)} placeholder="Message" required rows={4} className="bg-purple-900/40 border border-purple-500/30 rounded-lg px-3 py-2 text-sm text-purple-50 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />

                <div className="flex gap-3 items-center">
                  <button type="submit" disabled={formLoading} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transform transition duration-150 hover:-translate-y-1 disabled:opacity-60 font-semibold">
                    {formLoading ? 'Sending...' : 'Send Message'}
                  </button>
                  <button type="button" onClick={() => { setFormName(''); setFormEmail(''); setFormSubject(''); setFormMessage(''); setFormStatus(''); }} className="bg-slate-700 text-slate-100 px-4 py-2 rounded-lg hover:bg-slate-600 transform transition duration-150 hover:-translate-y-1 font-semibold">Reset</button>
                </div>

                {formStatus && <p className="text-sm mt-2 text-purple-300" aria-live="polite">{formStatus}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-purple-400 py-8 bg-gradient-to-br from-purple-950/30 to-slate-950/50">
        © {new Date().getFullYear()} Mukesh V. All rights reserved.
      </footer>
    </div>
  );
}
