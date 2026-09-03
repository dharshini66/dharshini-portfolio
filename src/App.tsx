import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Play,
  Pause,
  Send,
  Sun,
  X,
} from 'lucide-react';

type Project = {
  number: string;
  title: string;
  description: string;
  tech: string[];
  accent: string;
  kind: 'pack' | 'traffic' | 'fresh';
  details: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    number: '01',
    title: 'PackWise',
    description: 'A full-stack travel planning and packing assistant with secure authentication, weather-aware packing recommendations, and reusable packing blueprints.',
    tech: ['React.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    accent: '#d6c7b1',
    kind: 'pack',
    details: 'Designed and developed a full-stack travel planner with secure authentication, REST APIs, Prisma ORM, and a polished responsive experience deployed with Vercel and Railway.',
    githubUrl: 'https://github.com/dharshini66/packwise',
  },
  {
    number: '02',
    title: 'Real-Time Traffic Prediction',
    description: 'A machine learning framework that predicts traffic congestion and supports route optimization with interactive visual insights.',
    tech: ['Python', 'XGBoost', 'CatBoost', 'Pandas'],
    accent: '#c9d2c4',
    kind: 'traffic',
    details: 'Built a hybrid machine learning framework to predict urban traffic congestion, ensemble models through data preprocessing and feature engineering, and visualize insights for route optimization.',
    githubUrl: 'https://github.com/dharshini66/XatBoost-Traffic-Optimization',
  },
  {
    number: '03',
    title: 'FreshMart',
    description: 'A grocery store management system for inventory tracking, billing, supplier management, and CRUD-based product operations.',
    tech: ['HTML / CSS', 'JavaScript', 'MySQL'],
    accent: '#e4c3b8',
    kind: 'fresh',
    details: 'Created customer-facing modules with automated stock and expiry monitoring to improve day-to-day operational efficiency.',
    githubUrl: 'https://github.com/dharshini66/freshmart',
  },
];

const skillGroups = [
  { label: 'Programming', icon: Code2, skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'HTML / CSS'] },
  { label: 'Data & AI', icon: BrainCircuit, skills: ['Machine Learning', 'React.js', 'Express.js', 'Prisma ORM'] },
  { label: 'Cloud & DevOps', icon: Cloud, skills: ['AWS (EC2, S3, IAM)', 'Vercel', 'Railway', 'Jenkins', 'CI/CD'] },
  { label: 'Databases & APIs', icon: Database, skills: ['MySQL', 'PostgreSQL', 'SQL', 'REST APIs', 'JWT Authentication'] },
  { label: 'Design & Tools', icon: BarChart3, skills: ['Figma', 'Canva', 'Power BI', 'Git & GitHub', 'SAP S/4HANA'] },
];

const navItems = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['research', 'Research'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [activeSection, setActiveSection] = useState('top');
  const [theme, setTheme] = useState<'side-a' | 'side-b'>(() => {
    return (localStorage.getItem('portfolio_theme') as 'side-a' | 'side-b') || 'side-a';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'side-a' ? 'side-b' : 'side-a'));
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen || activeProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, activeProject]);

  // Scroll listener for progress bar, tape rotation, and scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrollRotation(currentScroll * 0.45);

      const sectionIds = ['contact', 'skills', 'experience', 'research', 'projects', 'about'];
      let found = false;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            found = true;
            break;
          }
        }
      }
      if (!found && currentScroll < 300) {
        setActiveSection('top');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for buttery smooth scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <div className="scroll-progress-line" style={{ width: `${scrollProgress}%` }} />
        
        <button className="brand-mark" onClick={() => scrollTo('top')} aria-label="Back to top">
          <span className="play-mark">▸</span> REC <span className="record-dot" />
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              className={activeSection === id ? 'active-nav' : ''}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-switch"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'side-a' ? 'Side B (Dark)' : 'Side A (Light)'}`}
            title={`Switch to ${theme === 'side-a' ? 'Side B (Midnight)' : 'Side A (Linen)'}`}
          >
            <span className="switch-dot" />
            {theme === 'side-a' ? 'SIDE A' : 'SIDE B'}
            {theme === 'side-a' ? <Moon size={12} /> : <Sun size={12} />}
          </button>

          <a
            href="mailto:dharshinibj66@gmail.com?subject=Resume%20Request%20-%20Dharshini%20B%20J"
            className="resume-btn"
            title="Request / Download Resume"
          >
            <FileText size={13} />
            <span>Resume</span>
          </a>

          <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-nav-wrap">
          <div className="mobile-nav-head">
            <span className="eyebrow">INDEX / 00</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">
              <X size={24} />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navItems.map(([id, label], index) => (
              <button key={id} onClick={() => scrollTo(id)}>
                <span>0{index + 1}</span>{label}<ArrowUpRight size={18} />
              </button>
            ))}
          </nav>
          <div className="mobile-nav-footer">
            <button className="theme-switch" onClick={toggleTheme}>
              <span className="switch-dot" /> {theme === 'side-a' ? 'SIDE A (LIGHT)' : 'SIDE B (DARK)'}
            </button>
          </div>
        </div>
      )}

      <main id="top">
        {/* HERO SECTION */}
        <section className="hero section-frame">
          <div className="film-number">01 <span>/ 06</span></div>
          <div className="hero-copy">
            <p className="script-note">Hi, I'm <span className="red-line" /></p>
            <h1>Dharshini <span>B J</span></h1>
            <p className="hero-kicker">Computer Science <b>×</b> AI <b>×</b> Cloud</p>
            <p className="hero-intro">
              I build intelligent solutions that connect thoughtful design, data, and dependable technology — with curiosity leading the way.
            </p>
            <div className="hero-cta-group">
              <button className="red-link" onClick={() => scrollTo('projects')}>
                Explore my work <ArrowUpRight size={16} />
              </button>
              <a
                href="mailto:dharshinibj66@gmail.com?subject=Resume%20Request%20-%20Dharshini%20B%20J"
                className="text-link"
              >
                <Download size={14} /> Get Resume
              </a>
            </div>
          </div>

          <div
            className="hero-object"
            aria-label="Interactive vintage cassette illustration"
            onClick={() => setIsPlaying(!isPlaying)}
            title="Click to spin the tape reels"
          >
            <div className="object-label">
              D.B.J. / {theme === 'side-a' ? 'SIDE A' : 'SIDE B'}<br />
              <small>FIELD NOTES 2026</small>
            </div>
            <Cassette isPlaying={isPlaying} theme={theme} scrollRotation={scrollRotation} />
            <div className="object-stamp">
              ARCHIVE<br /><span>25</span><br />08
            </div>
          </div>

          <div className="hero-meta">
            <span>CHENNAI, INDIA</span>
            <span>REC / 001</span>
            <span>AVAILABLE FOR GOOD WORK</span>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="about section-frame section-pad reveal">
          <div className="film-number">02 <span>/ 06</span></div>
          <div className="section-heading">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h2>Curious mind,<br /><em>creative heart.</em></h2>
          </div>
          <div className="about-card notebook-card reveal reveal-delay-1">
            <span className="tape" />
            <p className="card-label">NOTE / 001</p>
            <p>I enjoy solving real-world problems with code, data, and creativity.</p>
            <span className="card-mark">— D.B.J.</span>
          </div>
          <div className="about-copy reveal reveal-delay-2">
            <p>
              I’m a Computer Science and Engineering student specializing in Cloud Computing at SRM Institute of Science and Technology, with a CGPA of 9.58/10.0.
            </p>
            <p>
              I love learning, building, and turning ideas into meaningful experiences — from predictive machine learning systems to cloud-native full-stack tools.
            </p>
            <button className="text-link" onClick={() => scrollTo('experience')}>
              Read my story <ArrowUpRight size={15} />
            </button>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="projects section-frame section-pad reveal">
          <div className="film-number">03 <span>/ 06</span></div>
          <div className="section-heading projects-heading">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2>Built with<br /><em>intention.</em></h2>
            </div>
            <p className="section-intro">
              A few things I’ve made while exploring the space between technology and everyday life.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.number}
                project={project}
                delayClass={`reveal reveal-delay-${idx + 1}`}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>
          <div className="contact-sheet-label">
            KODAK / CONTACT SHEET <span>3 FRAMES</span>
          </div>
        </section>

        {/* RESEARCH SECTION */}
        <section id="research" className="research section-frame section-pad reveal">
          <div className="film-number">04 <span>/ 06</span></div>
          <div className="section-heading">
            <p className="eyebrow">RESEARCH / PUBLICATIONS</p>
            <h2>Ideas in<br /><em>motion.</em></h2>
          </div>
          <a
            href="https://github.com/dharshini66/XatBoost-Traffic-Optimization"
            target="_blank"
            rel="noopener noreferrer"
            className="research-reel reveal reveal-delay-1"
            style={{ textDecoration: 'none', color: 'inherit', display: 'grid' }}
            title="View XatBoost Research Repository"
          >
            <div className="reel-tag">REEL 01</div>
            <div className="research-visual">
              <div className="chart-line" />
              <span className="chart-label">XGB</span>
              <span className="chart-axis">TRAFFIC / ROUTE / TIME</span>
            </div>
            <div className="research-content">
              <p className="eyebrow">PEER-REVIEWED PAPER / ICAF 2025</p>
              <h3>Real-Time Traffic Prediction and Route Optimization Framework Using XatBoost Algorithm</h3>
              <p>
                Co-authored a smart-city machine learning framework utilizing a custom hybrid “XatBoost” algorithm, achieving 85.6% traffic congestion prediction accuracy.
              </p>
              <div className="tag-row">
                <span>PYTHON</span>
                <span>XGBOOST</span>
                <span>BIG DATA</span>
                <span>ROUTE OPTIMIZATION</span>
              </div>
            </div>
            <ArrowUpRight className="research-arrow" size={20} />
          </a>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="experience section-frame section-pad reveal">
          <div className="section-heading">
            <p className="eyebrow">THE FIELD NOTES</p>
            <h2>Where I’ve<br /><em>learned.</em></h2>
          </div>
          <div className="timeline">
            <div className="timeline-entry reveal reveal-delay-1">
              <div className="reel-tag">REEL 02</div>
              <div>
                <p className="entry-date">MAY 2026 — JUL 2026 <span>CHENNAI, INDIA</span></p>
                <h3>SAP Intern <small> / PwC</small></h3>
                <p>Assisted SAP consulting and enterprise workflows by analyzing business requirements, conducting testing, and supporting process documentation.</p>
              </div>
            </div>
            <div className="timeline-entry reveal reveal-delay-2">
              <div className="reel-tag">REEL 03</div>
              <div>
                <p className="entry-date">JAN 2025 — FEB 2025 <span>REMOTE</span></p>
                <h3>Machine Learning Intern <small> / Finlatics</small></h3>
                <p>Developed Python-based supervised learning workflows, focusing on data preprocessing, model evaluation, and predictive analytics.</p>
              </div>
            </div>
          </div>
          <div className="education-strip reveal reveal-delay-3">
            <div>
              <p className="eyebrow">EDUCATION</p>
              <h3>SRM Institute of Science and Technology</h3>
              <p>B.Tech — Computer Science and Engineering (Cloud Computing)</p>
            </div>
            <strong>2023 — 2027<br /><span>CGPA 9.58 / 10.0</span></strong>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="skills section-frame section-pad reveal">
          <div className="film-number">05 <span>/ 06</span></div>
          <div className="section-heading">
            <p className="eyebrow">TOOLS OF THE TRADE</p>
            <h2>Learning by<br /><em>making.</em></h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map(({ label, icon: Icon, skills }, idx) => (
              <div className={`skill-group reveal reveal-delay-${(idx % 3) + 1}`} key={label}>
                <div className="skill-icon"><Icon size={22} /></div>
                <h3>{label}</h3>
                <ul>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="archive-grid reveal">
            <div>
              <p className="eyebrow">CERTIFICATIONS</p>
              <div className="archive-list">
                <p><span>APR 2026</span> Microsoft Certified: Azure Data Fundamentals (DP-900)</p>
                <p><span>APR 2026 — APR 2028</span> Fortinet Certified Professional — Cloud Security</p>
                <p><span>MAY 2026</span> Google Cloud Engineering Certificate</p>
                <p><span>APR 2026</span> High Performance Computing — NPTEL (IIT Bombay), Elite Status</p>
              </div>
            </div>
            <div className="achievement-note">
              <p className="eyebrow">NOTABLE</p>
              <h3>Strong foundations,<br /><em>always in progress.</em></h3>
              <p>Maintaining a 9.58/10.0 CGPA while exploring cloud computing, machine learning, and the craft of building useful things.</p>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="contact section-frame section-pad reveal">
          <div className="film-number">06 <span>/ 06</span></div>
          <div className="contact-top">
            <div className="reveal reveal-delay-1">
              <p className="eyebrow">LET’S CONNECT</p>
              <h2>Let’s create<br /><em>something great.</em></h2>
              <div className="contact-links">
                <a href="mailto:dharshinibj66@gmail.com">
                  <Mail size={16} /> dharshinibj66@gmail.com <ArrowUpRight size={14} />
                </a>
                <a href="tel:+917305981706">
                  <Send size={16} /> +91 73059 81706 <ArrowUpRight size={14} />
                </a>
                <a href="https://linkedin.com/in/dharshini-bj-778415338" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
                </a>
                <a href="https://github.com/dharshini66" target="_blank" rel="noopener noreferrer">
                  <Github size={16} /> GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            <div className="reveal reveal-delay-2">
              <ContactMemoForm />
            </div>
          </div>

          <footer>
            <span>© 2026 Dharshini B J</span>
            <span>
              Made with focus & a little red ink <span className="record-dot" />
            </span>
          </footer>
        </section>
      </main>

      {/* PROJECT MODAL */}
      {activeProject && (
        <div className="modal-backdrop" onClick={() => setActiveProject(null)}>
          <div
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close project details">
              <X size={20} />
            </button>
            <p className="eyebrow">FRAME {activeProject.number} / PROJECT NOTE</p>
            <h2 id="modal-title">{activeProject.title}</h2>
            <p>{activeProject.details}</p>
            <div className="tag-row">
              {activeProject.tech.map(tech => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <div className="modal-actions">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-action-btn primary"
                  style={{ background: 'var(--red)', color: '#fff', padding: '8px 14px', fontSize: '11px' }}
                >
                  <Github size={14} /> View on GitHub
                </a>
              )}
              <button
                className="text-link"
                style={{ marginLeft: 'auto' }}
                onClick={() => {
                  setActiveProject(null);
                  scrollTo('contact');
                }}
              >
                Discuss project <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Cassette({ isPlaying, theme, scrollRotation = 0 }: { isPlaying: boolean; theme: 'side-a' | 'side-b'; scrollRotation?: number }) {
  return (
    <div className={`cassette ${isPlaying ? 'is-playing' : ''}`}>
      <div className="cassette-top">
        <span>TYPE I / {theme === 'side-a' ? 'NORMAL' : 'HIGH BIAS'}</span>
        <span>60</span>
      </div>
      <div className="cassette-window">
        <div
          className="reel reel-left reel-spool"
          style={{ transform: !isPlaying ? `rotate(${scrollRotation}deg)` : undefined }}
        >
          <span />
        </div>
        <div className="tape-window" />
        <div
          className="reel reel-right reel-spool"
          style={{ transform: !isPlaying ? `rotate(${scrollRotation}deg)` : undefined }}
        >
          <span />
        </div>
      </div>
      <div className="cassette-label">
        <span>{theme === 'side-a' ? 'A' : 'B'}</span>
        <strong>DHARSHINI B J</strong>
        <small>{isPlaying ? '▶ NOW PLAYING / CLICK TO PAUSE' : 'COMPUTER SCIENCE / CLOUD'}</small>
      </div>
      <div className="cassette-bottom">
        <i /><i /><i /><i /><i />
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen, delayClass = '' }: { project: Project; onOpen: () => void; delayClass?: string }) {
  return (
    <article
      className={`project-card ${delayClass}`}
      style={{ '--card-accent': project.accent } as CSSProperties}
      tabIndex={0}
      onKeyDown={(event) => { if (event.key === 'Enter') onOpen(); }}
    >
      <div className="project-visual" onClick={onOpen}>
        <div className={`visual-art ${project.kind}`}>
          <div className="visual-top">
            <span>PROJECT / {project.number}</span>
            <span>2026</span>
          </div>
          {project.kind === 'pack' && (
            <>
              <div className="pack-map">
                <span /><span /><span />
              </div>
              <div className="visual-ui">
                <b>PACKWISE</b>
                <small>YOUR TRIP, SORTED.</small>
                <div />
              </div>
            </>
          )}
          {project.kind === 'traffic' && (
            <>
              <div className="traffic-bars">
                <i /><i /><i /><i /><i /><i />
              </div>
              <div className="traffic-route">
                <span /><span /><span /><span />
              </div>
            </>
          )}
          {project.kind === 'fresh' && (
            <>
              <div className="fresh-grid">
                <span>F</span><span>R</span><span>E</span>
                <span>S</span><span>H</span><span>+</span>
              </div>
              <div className="fresh-caption">STOCK / TRACK / GROW</div>
            </>
          )}
        </div>
        <div className="frame-index">{project.number}</div>
      </div>

      <div className="project-info">
        <div>
          <p className="eyebrow">{project.tech.slice(0, 2).join(' / ')}</p>
          <h3>{project.title}</h3>
        </div>
        <p>{project.description}</p>
        <div className="project-footer">
          <div className="tag-row">
            {project.tech.slice(0, 3).map(tech => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-action-row">
            <div className="proj-links-group">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-action-btn"
                  title="View GitHub Repository"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={12} /> Code
                </a>
              )}
            </div>
            <button className="card-details-trigger" onClick={onOpen} aria-label={`View ${project.title} details`}>
              Details <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ContactMemoForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const mailtoUri = `mailto:dharshinibj66@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoUri;
    setStatus('sent');
  };

  return (
    <div className="contact-memo-card">
      <div className="contact-memo-header">
        <span>MEMO / DISPATCH 006</span>
        <span className="memo-stamp">DIRECT INQUIRY</span>
      </div>
      {status === 'sent' ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', color: 'var(--red)' }}>
            ✓ DISPATCH TRANSMITTED
          </p>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '8px' }}>
            Your default email client opened with your message. Looking forward to speaking with you!
          </p>
          <button
            className="text-link"
            style={{ marginTop: '16px', fontSize: '10px' }}
            onClick={() => setStatus('idle')}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="contact-field">
            <label htmlFor="memo-name">Your Name</label>
            <input
              id="memo-name"
              type="text"
              required
              placeholder="Ada Lovelace"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="contact-field">
            <label htmlFor="memo-email">Your Email</label>
            <input
              id="memo-email"
              type="email"
              required
              placeholder="ada@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="contact-field">
            <label htmlFor="memo-msg">Message / Opportunity</label>
            <textarea
              id="memo-msg"
              required
              rows={3}
              placeholder="Hello Dharshini, I'd love to discuss..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="memo-submit-btn">
            <Send size={14} /> Send Dispatch Memo
          </button>
        </form>
      )}
    </div>
  );
}

export default App;

