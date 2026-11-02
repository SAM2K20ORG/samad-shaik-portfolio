import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import avatar from './assets/samad-avatar.jpg';
import './styles.css';

const GITHUB_URL = 'https://github.com/samaelkde098-sudo';
const EMAIL = ''; // Add Samad's confirmed professional email before publishing.

const projects = [
  {
    number: '01',
    type: 'WEB DEVELOPMENT',
    title: 'Portfolio — this website',
    description: 'A personal portfolio designed and developed from scratch, with a responsive layout, accessible navigation and a distinct editorial visual identity.',
    status: 'IN DEVELOPMENT',
    tags: ['React', 'Vite', 'CSS'],
    href: '',
  },
  {
    number: '02',
    type: 'PYTHON',
    title: 'Python fundamentals',
    description: 'A growing body of practical exercises and learning work focused on strengthening programming fundamentals.',
    status: 'LEARNING WORK',
    tags: ['Python', 'Problem solving'],
    href: '',
  },
  {
    number: '03',
    type: 'EXPERIMENTS',
    title: 'More work in progress',
    description: 'Small prototypes, experiments and technical explorations. New entries will be added as they become presentable projects.',
    status: 'ONGOING',
    tags: ['Technology', 'Exploration'],
    href: '',
  },
];

const skills = [
  'Python', 'JavaScript', 'HTML & CSS', 'React',
  'Git & GitHub', 'Linux', 'Problem solving', 'Continuous learning',
];

const navigation = [
  ['About', '#about'], ['Work', '#work'], ['Skills', '#skills'], ['Journey', '#journey'],
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

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
      }, { threshold: 0.12 });
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
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const copyEmail = async () => {
    if (!EMAIL) return;
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Samad Shaik, home">SAMAD<span>.</span></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <nav id="primary-navigation" className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          {navigation.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <Arrow diagonal /></a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> PERSONAL PORTFOLIO <span className="eyebrow-line" /> 2026</div>
            <p className="hero-kicker">HELLO, I'M SAMAD SHAIK.</p>
            <h1 id="hero-title">Curious by nature.<br /><em>Building</em> by choice.</h1>
            <p className="hero-description">Developer, Computer Science & Engineering student, and technology enthusiast. I enjoy understanding how things work — then making something useful out of what I learn.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <Arrow diagonal /></a>
              <a className="text-link" href="#about">A little about me <Arrow /></a>
            </div>
            <div className="hero-meta"><span>BASED IN INDIA</span><span className="meta-divider" /><span>LEARNING · BUILDING · ITERATING</span></div>
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
          <div className="about-content reveal"><p className="large-copy">I’m a Computer Science & Engineering student with a growing interest in building software and exploring technology.</p><p className="body-copy">I like learning by doing: taking an idea, understanding the fundamentals, experimenting, and improving it until it becomes something real. I’m still early in the journey, and that’s exactly what makes the process exciting.</p><p className="body-copy">This portfolio is my evolving record — a place for projects, experiments, skills and the lessons that come with building them.</p><a className="underlined-link" href="#contact">Have something in mind? <Arrow diagonal /></a></div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title"><div className="section-wrap">
          <div className="work-top reveal"><div><span className="section-number">02 / SELECTED WORK</span><h2 id="work-title">Ideas into<br /><em>interfaces.</em></h2></div><p className="work-note">A selection of things I’ve built, studied or explored. As the work grows, this space will grow with it.</p></div>
          <div className="project-list">{projects.map((project) => <article className="project-row reveal" key={project.number}><span className="project-number">{project.number}</span><div className="project-main"><span className="project-type">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><span className="project-status">{project.status}</span>{project.href ? <a className="project-arrow" href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><Arrow diagonal /></a> : <span className="project-arrow muted-arrow" aria-hidden="true">—</span>}</article>)}</div>
          <div className="work-footer"><p className="honesty-note"><span>NOTE</span> Project entries will be linked to real repositories and demos as they are ready. No invented achievements.</p><a className="underlined-link" href={GITHUB_URL} target="_blank" rel="noreferrer">Explore my GitHub <Arrow diagonal /></a></div>
        </div></section>

        <section className="content-section section-wrap skills-section" id="skills" aria-labelledby="skills-title">
          <div className="section-heading reveal"><span className="section-number">03 / TOOLKIT</span><h2 id="skills-title">Things I’m<br /><em>working with.</em></h2></div>
          <div className="skills-content reveal"><p className="body-copy">A practical, evolving toolkit. The list reflects the technologies and skills I’m currently learning and using — not a claim of mastery.</p><div className="skill-grid">{skills.map((skill, index) => <div className="skill-item" key={skill}><span>{String(index + 1).padStart(2, '0')}</span>{skill}<span className="skill-mark" aria-hidden="true">↗</span></div>)}</div></div>
        </section>

        <section className="journey-section" id="journey" aria-labelledby="journey-title"><div className="section-wrap journey-inner">
          <div className="journey-title reveal"><span className="section-number">04 / THE JOURNEY</span><h2 id="journey-title">Learning is<br /><em>the work.</em></h2></div>
          <div className="timeline reveal"><article className="timeline-item"><span className="timeline-date">PRESENT</span><div><h3>Computer Science & Engineering</h3><p>Building foundations in computing, programming and software development.</p></div><span className="timeline-state">ONGOING</span></article><article className="timeline-item"><span className="timeline-date">2026</span><div><h3>Codomax — Python Internship</h3><p>Working through Python fundamentals and practical learning deliverables.</p></div><span className="timeline-state">EXPERIENCE</span></article></div>
        </div></section>

        <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title"><div className="contact-top reveal"><span className="section-number">05 / GET IN TOUCH</span><span className="contact-aside">OPEN TO LEARNING, COLLABORATION<br />& INTERESTING OPPORTUNITIES.</span></div><div className="contact-main reveal"><h2 id="contact-title">Have a good<br /><em>idea?</em></h2><p>I'm always interested in thoughtful conversations, new perspectives and opportunities to build something meaningful.</p>{EMAIL ? <><button className="contact-link contact-copy" type="button" onClick={copyEmail}>{EMAIL} <Arrow diagonal /></button><span className="email-note" role="status">{copied ? 'Email address copied.' : 'Select to copy my email address.'}</span></> : <><a className="contact-link" href={GITHUB_URL} target="_blank" rel="noreferrer">Connect with me on GitHub <Arrow diagonal /></a><span className="email-note">Professional email contact will be added before launch.</span></>}</div></section>
      </main>

      <footer className="footer"><div className="section-wrap footer-inner"><a className="footer-brand" href="#home">SAMAD<span>.</span></a><span className="footer-note">DESIGNED WITH INTENTION. BUILT WITH CURIOSITY.</span><div className="footer-links"><a href={GITHUB_URL} target="_blank" rel="noreferrer">GITHUB <Arrow diagonal /></a><a href="#contact">CONTACT <Arrow diagonal /></a><a href="#home" className="back-to-top">BACK TO TOP ↑</a></div><span className="copyright">© {new Date().getFullYear()} SAMAD SHAIK</span></div></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
