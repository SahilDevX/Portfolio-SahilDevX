import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ===== Inline Icons =====
const Icon = ({ children, className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>{children}</svg>
);
const Linkedin = (p) => <Icon {...p}><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.75-2.2 4 0 4.75 2.63 4.75 6.05V24h-4v-7.8c0-1.86-.03-4.25-2.6-4.25-2.6 0-3 2.03-3 4.1V24h-4V8z"/></Icon>;
const Mail = (p) => <Icon {...p}><path d="M2 4h20v16H2V4zm10 7l10-7H2l10 7zm0 2L2 6v12h20V6l-10 7z"/></Icon>;
const Github = (p) => <Icon {...p}><path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.95c.6.1.82-.26.82-.58v-2.02c-3.25.7-3.94-1.56-3.94-1.56-.54-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.76.4-1.27.73-1.56-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.2-3.15-.12-.3-.52-1.52.12-3.18 0 0 .98-.32 3.2 1.2a11.1 11.1 0 015.84 0c2.2-1.52 3.18-1.2 3.18-1.2.64 1.66.24 2.88.12 3.18.76.82 1.2 1.87 1.2 3.15 0 4.52-2.74 5.5-5.36 5.8.42.36.8 1.1.8 2.22v3.3c0 .32.22.7.82.58A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/></Icon>;

// ===== Data =====
const profile = {
  name: "Sahil Dange",
  role: "Software Engineer @ Talescope",
  tagline: "I build scalable products with clean UX & robust APIs.",
  email: "sahildange7057@gmail.com",
  linkedin: "https://www.linkedin.com/in/sahil-dange-a314a11b2/",
  github: "https://github.com/SahilDevX",
  skills: [
    "C++","Python","JavaScript","Java","MySQL",
    "React","AWS","HTML","CSS","SCSS","Bootstrap",
    "Node","Django","REST","JWT","OAuth",
    "Git","GitHub","Visual Studio","Figma","Airtable","Make",
    "Netlify","Heroku","Hostinger"
  ],
  certifications: [
    "NPTEL - Cyber Security and Privacy",
    "VTU MOOC - Privacy and Security in Social Media",
    "Internship Certification - Talescope"
  ],
  education: [
    { degree: "MCA", school: "Oxford College of Engineering", period: "2022 — 2024" },
    { degree: "BCA", school: "IBMR College", period: "2019 — 2022" }
  ]
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

// ===== Cursor Glow =====
const CursorGlow = () => {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="pointer-events-none fixed w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"/>;
};


const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -80; // adjust based on navbar height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }
};

// ===== Navbar =====
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("home");

  const sections = ["home","skills","certifications","education","experience","projects","contact"];

  React.useEffect(() => {
  const handleScroll = () => {
    let current = "home";

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop - 200;

        if (window.scrollY >= top) {
          current = id;
        }
      }
    });

    // 🔥 FIX: detect bottom of page → force "contact"
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
      current = "contact";
    }

    setActive(current);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <div className="fixed top-0 w-full backdrop-blur-md bg-slate-950/70 border-b border-white/10 z-50">
      
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        
        {/* Logo */}
        <span
          onClick={() => scrollToSection("home")}
          className="font-logo cursor-pointer text-white hover:text-indigo-400 transition tracking-wide text-lg"
        >
          {"<SahilDevX />"}
        </span>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm">
          {sections.map((id) => (
            <span
              key={id}
              onClick={() => scrollToSection(id)}
              className={`cursor-pointer capitalize transition ${
                active === id
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {id}
            </span>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-sm">
          {sections.map((id) => (
            <span
              key={id}
              onClick={() => {
                scrollToSection(id);
                setOpen(false);
              }}
              className={`cursor-pointer capitalize transition ${
                active === id
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {id}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ===== Hero =====
const Hero = () => (
  <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden">
    
    {/* Background Text */}
    <h1 className="absolute text-[60px] sm:text-[80px] md:text-[140px] font-bold text-white/5 select-none text-center">
      @SahilDevX
    </h1>

    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl z-10 gap-10">

      {/* ===== MOBILE VIEW (Overlay) ===== */}
      <div className="relative w-full md:hidden">
        
        {/* Image */}
        <div
          className="relative group"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty("--x", `${x}px`);
            e.currentTarget.style.setProperty("--y", `${y}px`);
          }}
        >
          <img
            src="/anime.png"
            alt="anime"
            className="w-full rounded-xl object-cover"
          />

          <img
            src="/profile.png"
            alt="real"
            className="w-full rounded-xl object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle 120px at var(--x, 0px) var(--y, 0px), black 60%, transparent 100%)",
              maskImage:
                "radial-gradient(circle 120px at var(--x, 0px) var(--y, 0px), black 60%, transparent 100%)"
            }}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl" />

          {/* TEXT OVER IMAGE */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-indigo-400 text-xs">// portfolio</p>

            <h2 className="text-2xl font-bold mt-1 leading-tight">
              {profile.name}
            </h2>

            <p className="text-gray-300 text-sm mt-1">
              {profile.role}
            </p>

            <div className="flex gap-3 mt-3">
              <a href={profile.github} target="_blank" className="px-4 py-1.5 bg-white text-black text-xs rounded-md">
                GitHub
              </a>

              <a href={profile.linkedin} target="_blank" className="px-4 py-1.5 border border-white/20 text-xs rounded-md">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP VIEW (UNCHANGED) ===== */}
      <div className="hidden md:flex items-center justify-between w-full">

        {/* LEFT */}
        <div className="max-w-xl">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="text-indigo-400 text-sm">// portfolio</p>

            <h2 className="text-4xl md:text-6xl font-bold mt-2">
              {profile.name}
            </h2>

            <p className="text-gray-400 mt-3">{profile.role}</p>
            <p className="text-gray-500 mt-2">{profile.tagline}</p>

            <div className="flex gap-4 mt-6">
              <a href={profile.github} target="_blank" className="px-5 py-2 bg-white text-black rounded-lg hover:scale-105 transition">
                GitHub
              </a>

              <a href={profile.linkedin} target="_blank" className="px-5 py-2 border border-white/20 rounded-lg hover:scale-105 transition">
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="relative group"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty("--x", `${x}px`);
            e.currentTarget.style.setProperty("--y", `${y}px`);
          }}
        >
          <img
            src="/anime.png"
            alt="anime"
            className="w-80 lg:w-96 rounded-xl object-cover"
          />

          <img
            src="/profile.png"
            alt="real"
            className="w-80 lg:w-96 rounded-xl object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle 120px at var(--x, 0px) var(--y, 0px), black 60%, transparent 100%)",
              maskImage:
                "radial-gradient(circle 120px at var(--x, 0px) var(--y, 0px), black 60%, transparent 100%)"
            }}
          />
        </div>

      </div>
    </div>
  </section>
);

// ===== Skills =====
const Skills = () => (
  <section id="skills" className="py-16 px-6 max-w-5xl mx-auto">
    <h2 className="text-xl text-gray-400 mb-4">// tech stack</h2>
    <div className="flex flex-wrap gap-3">
      {profile.skills.map((s,i)=>(
        <div key={i} className="px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md hover:bg-indigo-500/20 transition">{s}</div>
      ))}
    </div>
  </section>
);

// ===== Certifications =====
const Certifications = () => (
  <section id="certifications" className="py-16 px-6 max-w-5xl mx-auto">
    <h2 className="text-xl text-gray-400 mb-6">// certifications</h2>
    <div className="grid md:grid-cols-2 gap-4">
      {profile.certifications.map((cert, i) => (
        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:scale-105 hover:border-indigo-500 transition">
          <p className="text-gray-300 text-sm">{cert}</p>
        </div>
      ))}
    </div>
  </section>
);

// ===== Education =====
const Education = () => (
  <section id="education" className="py-16 px-6 max-w-5xl mx-auto">
    <h2 className="text-xl text-gray-400 mb-6">// education</h2>
    <div className="relative border-l border-white/10 ml-3">
      {profile.education.map((edu, i) => (
        <div key={i} className="mb-8 ml-6">
          <span className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-1.5 mt-2"></span>
          <h3 className="font-semibold">{edu.degree} · {edu.school}</h3>
          <p className="text-gray-500 text-sm">{edu.period}</p>
        </div>
      ))}
    </div>
  </section>
);

// ===== Experience =====
const Experience = () => (
  <section id="experience" className="py-16 px-6 max-w-5xl mx-auto">
    <h2 className="text-xl text-gray-400 mb-6">// experience</h2>
    <div className="space-y-6">
      {[{
        title: "Full Stack Developer",
        company: "Talescope",
        period: "Dec 2023 — Present",
        points: [
          "Built hiring marketplace with React + Node",
          "Implemented OAuth/JWT auth flows",
          "Optimized UI/UX & performance"
        ]
      },{
        title: "Full Stack Intern",
        company: "Talescope",
        period: "Oct 2023 — Nov 2023",
        points: [
          "Developed expert dashboard",
          "Integrated REST APIs & RBAC"
        ]
      }].map((e,i)=>(
        <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-indigo-500 transition">
          <h3 className="font-semibold">{e.title} · {e.company}</h3>
          <p className="text-gray-500 text-sm">{e.period}</p>
          <ul className="mt-3 text-gray-400 text-sm list-disc list-inside">
            {e.points.map((p,idx)=>(<li key={idx}>{p}</li>))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);

// ===== Project Card =====
const ProjectCard = ({ p, isOpen, onClick }) => (
  <motion.div variants={fadeUp} initial="hidden" whileInView="show" whileHover={{ scale: 1.03 }} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden transition hover:border-indigo-500">
   <div onClick={onClick} className="p-6 cursor-pointer">
  
  <div className="flex justify-between items-start">
    
    {/* LEFT CONTENT */}
    <div>
      <h3 className="font-semibold">{p.name}</h3>
      <p className="text-gray-400 text-sm mt-1">{p.desc}</p>
      <p className="text-indigo-400 text-xs mt-2">{p.tech}</p>
    </div>

    {/* RIGHT LINK (only if exists) */}
    {p.link && (
      <a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()} // ✅ IMPORTANT
        className="text-gray-400 hover:text-indigo-400 transition text-sm"
      >
        ↗
      </a>
    )}

  </div>

</div>
    

    <motion.div initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden px-6">
      <ul className="pb-4 border-t border-white/10 pt-4 text-gray-300 text-sm list-disc list-inside space-y-1">
        {p.points.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>
    </motion.div>
  </motion.div>
);

// ===== Projects =====
const Projects = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const projects = [
    { name: "Expert Dashboard", tech: "React, APIs", desc: "Task tracking + admin control panel", link: "https://talescope.io/login", points: [
  "Built full-stack expert + admin platform (React, Django, MySQL)",
  "Designed job workflows: applications, referrals, offers & tracking",
  "Implemented OAuth, JWT auth & role-based access control",
  "Migrated from Airtable to scalable backend architecture"
] },
    { name: "Talescope Website", tech: "React", desc: "Corporate site", link: "https://talescope.io", points: ["Responsive company website","Lead capture forms","Dynamic job listings","Optimized performance"] },
    { name: "Weather IoT", tech: "IoT", desc: "Weather monitoring", points: ["Sensor-based system","Real-time data collection","Microcontroller integration","Dashboard visualization"] },
    { name: "Udemy Analysis", tech: "Python", desc: "Course analytics", points: ["Data preprocessing","Insight extraction","Python analysis","Data visualization"] }
  ];

  return (
    <section id="projects" className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-xl text-gray-400 mb-6">// projects</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {projects.filter((_, i) => i % 2 === 0).map((p, i) => {
            const index = i * 2;
            const isOpen = openIndex === index;
            return <ProjectCard key={index} p={p} isOpen={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)} />;
          })}
        </div>

        <div className="flex-1 space-y-6">
          {projects.filter((_, i) => i % 2 !== 0).map((p, i) => {
            const index = i * 2 + 1;
            const isOpen = openIndex === index;
            return <ProjectCard key={index} p={p} isOpen={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)} />;
          })}
        </div>
      </div>
    </section>
  );
};

// ===== Contact =====
const Contact = () => (
  <footer id="contact" className="mt-24 border-t border-white/10">

    {/* Top Bar */}
    <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center text-sm text-gray-500">
      <p>© 2026</p>

      <div
  onClick={() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }}
  className="flex items-center gap-3 cursor-pointer hover:text-white transition"
>
  BACK TO TOP
  <span className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-white transition">
    ↑
  </span>
</div>
    </div>

    {/* Main Section */}
    <div className="max-w-6xl mx-auto px-6 py-20 relative">

      {/* Heading */}
      <p className="text-gray-400 text-sm mb-2 tracking-wide">
        HAVE A PROJECT IN MIND?
      </p>

      {/* Big Text */}
      <h1 className="text-[70px] md:text-[130px] font-bold text-white/5 leading-none">
        LET’S TALK
      </h1>

      {/* Bottom Row */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-end gap-10">

        {/* Left Buttons */}
        <div className="flex flex-wrap gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-2.5 border border-white/20 rounded-full text-sm tracking-wide hover:border-indigo-400 hover:text-indigo-400 transition"
          >
            GITHUB
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-2.5 border border-white/20 rounded-full text-sm tracking-wide hover:border-indigo-400 hover:text-indigo-400 transition"
          >
            LINKEDIN
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="px-7 py-2.5 border border-white/20 rounded-full text-sm tracking-wide hover:border-indigo-400 hover:text-indigo-400 transition"
          >
            EMAIL
          </a>
        </div>

        {/* Right Credits */}
        <div className="text-right text-xs text-gray-500 leading-relaxed">
          <p>Designed & Built by {profile.name}</p>
        </div>
      </div>
    </div>

  </footer>
);

export default function App(){
  return (
    <div className="bg-slate-950 text-white min-h-screen font-mono">
      <CursorGlow/>
      <Navbar/>
      <Hero/>
      <Skills/>
      <Certifications/>
      <Education/>
      <Experience/>
      <Projects/>
      <Contact/>
    </div>
  );
}
