import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import avatar from './assets/samad-avatar.jpg';
import './styles.css';

const LINKS = {
  github: 'https://github.com/SAM2K20ORG',
  linkedin: 'https://www.linkedin.com/in/samadshaik-engr/',
  instagram: 'https://www.instagram.com/samadshaik.llm/',
  email: 'sam2k20org.official@gmail.com',
  certificates: 'https://drive.google.com/drive/folders/1dJZnYwhd5kqSkSv7gFb5X3xxHzh_oXT6',
  portfolioRepo: 'https://github.com/SAM2K20ORG/samad-shaik-portfolio',
};

const projects = [
  {
    number: '01', category: 'WEB', type: 'WEB DEVELOPMENT', title: 'Personal portfolio',
    description: 'A responsive portfolio built with React and Vite to document my work, technical interests and learning journey. Designed with a dark editorial visual system and accessibility in mind.',
    status: 'LIVE SOURCE', tags: ['React', 'Vite', 'CSS'], href: LINKS.portfolioRepo,
  },
  {
    number: '02', category: 'PYTHON', type: 'PROGRAMMING', title: 'Python fundamentals',
    description: 'Hands-on exercises and internship deliverables covering core Python concepts, problem solving and practical programming fundamentals.',
    status: 'LEARNING WORK', tags: ['Python', 'Fundamentals', 'Problem solving'], href: LINKS.github,
  },
  {
    number: '03', category: 'AI / ML', type: 'MACHINE LEARNING', title: 'Iris flower classification',
    description: 'An introductory machine-learning exercise exploring the Iris dataset and the workflow behind a basic classification task.',
    status: 'COURSEWORK', tags: ['Python', 'Machine learning', 'Classification'], href: LINKS.github,
  },
];

const skills = [
  { group: 'PROGRAMMING', items: ['Python', 'JavaScript', 'HTML', 'CSS'] },
  { group: 'DEVELOPMENT', items: ['React', 'Vite', 'Git & GitHub'] },
  { group: 'ENVIRONMENT', items: ['Linux', 'Arch Linux', 'Hyprland'] },
  { group: 'FOUNDATIONS', items: ['Problem solving', 'OOP fundamentals', 'Continuous learning'] },
];

const nav = [['About', '#about'], ['Work', '#work'], ['Skills', '#skills'], ['Certificates', '#certificates'], ['Journey', '#journey']];
const filters = ['ALL', 'WEB', 'PYTHON', 'AI / ML'];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function SocialLink({ href, label, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{children} <Arrow diagonal /></a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const visibleProjects = useMemo(
    () => activeFilter === 'ALL' ? projects : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);

    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      revealElements.forEach((element) => observer.observe(element));
      return () => {
        window.removeEventListener('scroll', updateScroll);
        window.removeEventListener('resize', updateScroll);
        observer.disconnect();
      };
    }
    revealElements.forEach((element) => element.classList.add('is-visible'));
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [activeFilter]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);



  const closeMenu = () => setMenuOpen(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Samad Shaik, home">SAMAD<span>.</span></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span /><span />
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          {nav.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <Arrow diagonal /></a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> PERSONAL PORTFOLIO <span className="eyebrow-line" /> 2026</div>
            <p className="hero-kicker">HELLO, I'M SAMAD SHAIK.</p>
            <h1 id="hero-title">Curious by nature.<br /><em>Building</em> by choice.</h1>
            <p className="hero-description">Computer Science & Engineering student, developer and technology enthusiast. I enjoy understanding how things work — then making something useful out of what I learn.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <Arrow diagonal /></a>
              <a className="text-link" href="#about">A little about me <Arrow /></a>
            </div>
            <div className="hero-meta"><span>BASED IN INDIA</span><span className="meta-divider" /><span>LEARNING · BUILDING · ITERATING</span></div>
            <div className="hero-socials" aria-label="Social profiles">
              <SocialLink href={LINKS.github} label="GitHub profile">GITHUB</SocialLink>
              <SocialLink href={LINKS.linkedin} label="LinkedIn profile">LINKEDIN</SocialLink>
              <SocialLink href={LINKS.instagram} label="Instagram profile">INSTAGRAM</SocialLink>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-backdrop" />
            <div className="portrait-frame"><img src={avatar} alt="Pixel-art portrait avatar representing Samad Shaik" fetchPriority="high" /></div>
            <div className="portrait-index">FIG. 01 <span>— THE PERSON BEHIND THE PIXELS</span></div>
            <div className="orbit-note">CURRENTLY<br /><strong>IN THE MAKING</strong></div>
            <span className="visual-cross cross-one" aria-hidden="true">+</span><span className="visual-cross cross-two" aria-hidden="true">+</span>
          </div>
          <a className="scroll-cue" href="#about"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="intro-strip" aria-label="Introduction"><div className="section-wrap strip-inner"><span className="mono-label">A SHORT INTRODUCTION</span><p>I’m at the intersection of <strong>software, curiosity and creativity.</strong> This is where I document the work, the learning and the ideas along the way.</p><span className="strip-mark">SS<span>.</span></span></div></section>

        <section className="content-section section-wrap" id="about" aria-labelledby="about-title">
          <div className="section-heading reveal"><span className="section-number">01 / ABOUT</span><h2 id="about-title">A work in<br /><em>progress.</em></h2></div>
          <div className="about-content reveal"><p className="large-copy">I’m a Computer Science & Engineering student with a growing interest in building software and exploring technology.</p><p className="body-copy">I like learning by doing: taking an idea, understanding the fundamentals, experimenting, and improving it until it becomes something real. My interests span programming, web development, Linux and the wider technology ecosystem.</p><p className="body-copy">This portfolio is my evolving record — a place for projects, experiments, skills and the lessons that come with building them.</p><a className="underlined-link" href="#contact">Have something in mind? <Arrow diagonal /></a></div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title"><div className="section-wrap">
          <div className="work-top reveal"><div><span className="section-number">02 / SELECTED WORK</span><h2 id="work-title">Ideas into<br /><em>interfaces.</em></h2></div><p className="work-note">A selection of projects and learning work. Filter the collection to explore different areas.</p></div>
          <div className="project-filters" role="group" aria-label="Filter projects">
            {filters.map((filter) => <button key={filter} type="button" className={activeFilter === filter ? 'filter-button active' : 'filter-button'} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
          </div>
          <div className="project-list" aria-live="polite">{visibleProjects.map((project) => <article className="project-row reveal" key={project.number}>
            <span className="project-number">{project.number}</span><div className="project-main"><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            <span className="project-status">{project.status}</span><a className="project-arrow" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${project.title} on GitHub`}><Arrow diagonal /></a>
          </article>)}</div>
          <div className="work-footer"><p className="honesty-note"><span>NOTE</span> Project links lead to my GitHub profile or the exact portfolio repository. More individual repositories will be added as they are published.</p><a className="underlined-link" href={LINKS.github} target="_blank" rel="noopener noreferrer">Explore my GitHub <Arrow diagonal /></a></div>
        </div></section>

        <section className="content-section section-wrap skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading reveal"><span className="section-number">03 / TOOLKIT</span><h2 id="skills-title">Things I’m<br /><em>working with.</em></h2></div>
          <div className="skills-content reveal"><p className="body-copy">A practical, evolving toolkit. These are technologies and foundations I’m currently learning and using — not a claim of mastery.</p><div className="skill-groups">{skills.map((group) => <div className="skill-group" key={group.group}><span className="skill-group-title">{group.group}</span><div className="skill-pills">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></div>
        </section>

        <section className="cert-section" id="certificates" aria-labelledby="certificates-title"><div className="section-wrap">
          <div className="cert-heading reveal"><div><span className="section-number">04 / CERTIFICATIONS</span><h2 id="certificates-title">Learning,<br /><em>documented.</em></h2></div><p className="work-note">Certificates and supporting documents are available in my Google Drive collection.</p></div>
          <div className="cert-link-wrap reveal"><a className="button button-primary" href={LINKS.certificates} target="_blank" rel="noopener noreferrer">View certificates on Google Drive <Arrow diagonal /></a></div>
        </div></section>

        <section className="journey-section" id="journey" aria-labelledby="journey-title"><div className="section-wrap journey-inner">
          <div className="journey-title reveal"><span className="section-number">05 / THE JOURNEY</span><h2 id="journey-title">Learning is<br /><em>the work.</em></h2></div>
          <div className="timeline reveal"><article className="timeline-item"><span className="timeline-date">PRESENT</span><div><h3>Computer Science & Engineering</h3><p>Building foundations in computing, programming and software development.</p></div><span className="timeline-state">ONGOING</span></article><article className="timeline-item"><span className="timeline-date">2026</span><div><h3>Codomax — Python Programming Internship</h3><p>Completed a 45-day internship focused on Python programming, from 11 September to 25 October 2026.</p></div><span className="timeline-state">COMPLETED</span></article><article className="timeline-item"><span className="timeline-date">ONGOING</span><div><h3>Independent learning & building</h3><p>Developing personal projects, strengthening technical fundamentals and documenting the process.</p></div><span className="timeline-state">IN PROGRESS</span></article></div>
        </div></section>

        <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title"><div className="contact-top reveal"><span className="section-number">06 / GET IN TOUCH</span><span className="contact-aside">OPEN TO LEARNING, COLLABORATION<br />& INTERESTING OPPORTUNITIES.</span></div><div className="contact-main reveal"><h2 id="contact-title">Have a good<br /><em>idea?</em></h2><p>I'm always interested in thoughtful conversations, new perspectives and opportunities to build something meaningful.</p><a className="contact-link" href={`mailto:${LINKS.email}`}>{LINKS.email} <Arrow diagonal /></a><button className="email-copy" type="button" onClick={copyEmail}>{copied ? 'EMAIL COPIED ✓' : 'COPY EMAIL'}</button><span className="email-note" role="status" aria-live="polite">{copied ? 'The email address is on your clipboard.' : 'Prefer email? Start a message or copy the address.'}</span></div></section>
      </main>

      <footer className="footer"><div className="section-wrap footer-inner"><a className="footer-brand" href="#home">SAMAD<span>.</span></a><span className="footer-note">DESIGNED WITH INTENTION. BUILT WITH CURIOSITY.</span><div className="footer-links"><a href={LINKS.github} target="_blank" rel="noopener noreferrer">GITHUB <Arrow diagonal /></a><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN <Arrow diagonal /></a><a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">INSTAGRAM <Arrow diagonal /></a><a href="#home" className="back-to-top">BACK TO TOP ↑</a></div><span className="copyright">© {new Date().getFullYear()} SAMAD SHAIK</span></div></footer>

    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
