import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Library,
  Menu,
  NotebookPen,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

import "../../styles/landingpage.css";
import heroImage from "../../assets/Images/hero.jpg";

/* =========================================================
   REUSABLE COMPONENTS
   ========================================================= */

function Logo() {
  return (
    <Link to="/landingPage" className="landing-logo">
      <span className="landing-logo-icon">
        <GraduationCap size={22} strokeWidth={2.4} />
      </span>

      <span>
        <strong>Student Hub</strong>
        <small>Academic Workspace</small>
      </span>
    </Link>
  );
}

function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    closeMenu(); // Close your mobile menu

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <header className="landing-navbar">
      <div className="landing-container landing-nav-inner">
        <Logo />

        <nav className={`landing-nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#home" onClick={(e) => handleSmoothScroll(e, "#home")}>
            Home
          </a>
          <a
            href="#features"
            onClick={(e) => handleSmoothScroll(e, "#features")}
          >
            Features
          </a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "#about")}>
            About
          </a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, "#contact")}>
            Contact
          </a>

          <Link
            to="/Dashboard/Home"
            className="nav-dashboard-button mobile-dashboard-button"
            onClick={closeMenu}
          >
            Open Dashboard
            <ArrowRight size={16} />
          </Link>
        </nav>

        <Link
          to="/Dashboard/Home"
          className="nav-dashboard-button desktop-dashboard-button"
        >
          Open Dashboard
          <ArrowRight size={16} />
        </Link>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function FloatingCard({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={`floating-card ${className || ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: {
          duration: 0.7,
          delay,
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

function DashboardPreview() {
  return (
    <motion.div
      className="dashboard-preview-wrapper"
      initial={{ opacity: 0, x: 50, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <div className="dashboard-glow" />

      <FloatingCard className="preview-task-card" delay={0.7}>
        <div className="floating-card-icon purple">
          <ClipboardCheck size={17} />
        </div>

        <div>
          <span>Today's Tasks</span>
          <strong>8 / 10 completed</strong>
        </div>

        <CheckCircle2 className="success-icon" size={19} />
      </FloatingCard>

      <FloatingCard className="preview-progress-card" delay={1}>
        <div className="mini-progress-header">
          <span>Weekly Progress</span>
          <strong>82%</strong>
        </div>

        <div className="mini-progress-bar">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "82%" }}
            transition={{ duration: 1.2, delay: 1.2 }}
          />
        </div>
      </FloatingCard>

      <div className="dashboard-browser">
        <div className="browser-header">
          <div className="browser-dots">
            <span />
            <span />
            <span />
          </div>

          <div className="browser-address">studenthub.app/dashboard</div>
        </div>

        <div className="dashboard-content">
          <aside className="preview-sidebar">
            <div className="preview-sidebar-brand">
              <div className="preview-brand-icon">
                <GraduationCap size={15} />
              </div>

              <div>
                <strong>Student Hub</strong>
                <span>Academic Workspace</span>
              </div>
            </div>

            <div className="preview-nav">
              <div className="preview-nav-item active">
                <Target size={14} />
                Home
              </div>

              <div className="preview-nav-item">
                <ClipboardCheck size={14} />
                Tasks
              </div>

              <div className="preview-nav-item">
                <NotebookPen size={14} />
                Notes
              </div>

              <div className="preview-nav-item">
                <Library size={14} />
                Resources
              </div>

              <div className="preview-nav-item">
                <GraduationCap size={14} />
                Profile
              </div>
            </div>
          </aside>

          <div className="preview-main">
            <div className="preview-topbar">
              <div>
                <span>Welcome back, Alex</span>
                <strong>Here's your academic progress today.</strong>
              </div>

              <div className="preview-avatar">A</div>
            </div>

            <div className="preview-stat-grid">
              <div className="preview-stat">
                <span>Tasks</span>
                <strong>24</strong>
                <small>+3 this week</small>
              </div>

              <div className="preview-stat">
                <span>Incomplete</span>
                <strong>15%</strong>
                <small>-2% from last week</small>
              </div>

              <div className="preview-stat">
                <span>Completed</span>
                <strong>85</strong>
                <small>+12 this month</small>
              </div>
            </div>

            <div className="preview-chart-grid">
              <div className="preview-panel">
                <div className="preview-panel-heading">
                  <span>Task Status</span>
                  <span className="panel-pill">This week</span>
                </div>

                <div className="donut-chart">
                  <div className="donut-inner">
                    <strong>24</strong>
                    <span>Active</span>
                  </div>
                </div>

                <div className="chart-legend">
                  <span>
                    <i className="legend-purple" />
                    Completed
                  </span>

                  <span>
                    <i className="legend-light" />
                    Pending
                  </span>
                </div>
              </div>

              <div className="preview-panel chart-panel">
                <div className="preview-panel-heading">
                  <span>Completion Trends</span>
                  <span className="panel-pill">Last 7 days</span>
                </div>

                <div className="bar-chart">
                  {[45, 70, 55, 90, 78, 42, 35].map((height, index) => (
                    <motion.div
                      key={index}
                      className="chart-column"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 0.7,
                        delay: 0.8 + index * 0.08,
                      }}
                    />
                  ))}
                </div>

                <div className="chart-days">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingCard className="preview-notification-card" delay={1.2}>
        <div className="floating-card-icon green">
          <CheckCircle2 size={17} />
        </div>

        <div>
          <strong>Great work!</strong>
          <span>Task completed successfully.</span>
        </div>
      </FloatingCard>
    </motion.div>
  );
}

const features = [
  {
    icon: ClipboardCheck,
    title: "Smart Task Management",
    description:
      "Break down complex assignments into manageable steps, set deadlines, and keep your priorities clear.",
  },
  {
    icon: NotebookPen,
    title: "Organized Notes",
    description:
      "Capture lectures, ideas, and research in one organized workspace that's easy to revisit.",
  },
  {
    icon: Library,
    title: "Resource Library",
    description:
      "Keep PDFs, links, references, and study materials accessible exactly when you need them.",
  },
  {
    icon: TrendingUp,
    title: "Academic Momentum",
    description:
      "Visualize your progress and understand your study habits with simple, useful insights.",
  },
  {
    icon: Target,
    title: "Focused Learning",
    description:
      "Stay focused on what matters with a workspace designed specifically around your academic goals.",
  },
  {
    icon: Sparkles,
    title: "One Connected Workspace",
    description:
      "Bring your tasks, notes, resources, and progress together instead of switching between multiple tools.",
  },
];

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <motion.article
      className="feature-card"
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -10,
        scale: 1.015,
      }}
    >
      <div className="feature-card-top">
        <motion.div
          className="feature-icon"
          whileHover={{
            rotate: -8,
            scale: 1.1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
        >
          <Icon size={22} />
        </motion.div>

        <motion.span
          className="feature-arrow"
          whileHover={{
            x: 5,
          }}
        >
          <ArrowRight size={18} />
        </motion.span>
      </div>

      <h3>{feature.title}</h3>

      <p>{feature.description}</p>

      <div className="feature-card-line">
        <motion.span
          initial={{ width: "30%" }}
          whileHover={{ width: "100%" }}
        />
      </div>
    </motion.article>
  );
}

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="landing-container about-grid">
        <motion.div
          className="about-visual"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="about-visual-background">
            <img src={heroImage} alt="" />
          </div>

          <div className="about-stat-card">
            <strong>01</strong>
            <span>Workspace</span>
          </div>

          <div className="about-floating-note">
            <BookOpen size={18} />
            <span>Learn. Organize. Grow.</span>
          </div>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow">ABOUT STUDENT HUB</span>

          <h2>
            Built around the way
            <span> students actually learn.</span>
          </h2>

          <p>
            Student Hub is a focused academic workspace designed to bring the
            most important parts of your student life into one place.
          </p>

          <p>
            Instead of jumping between task apps, note-taking tools, cloud
            folders, and spreadsheets, you can manage your academic workflow
            from a single, organized dashboard.
          </p>

          <div className="about-check-list">
            <div>
              <CheckCircle2 size={19} />
              <span>Keep your academic work organized</span>
            </div>

            <div>
              <CheckCircle2 size={19} />
              <span>Track your progress without unnecessary complexity</span>
            </div>

            <div>
              <CheckCircle2 size={19} />
              <span>Stay focused on the work that matters</span>
            </div>
          </div>

          <Link to="/Dashboard/Home" className="primary-button">
            Explore Student Hub
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function JourneySection() {
  const steps = [
    {
      number: "01",
      title: "Plan",
      description:
        "Turn your assignments and responsibilities into clear, manageable tasks.",
      icon: Target,
    },
    {
      number: "02",
      title: "Organize",
      description:
        "Keep notes, resources, and study materials structured in one workspace.",
      icon: FileText,
    },
    {
      number: "03",
      title: "Progress",
      description:
        "See your academic momentum and make better decisions about your time.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="journey-section">
      <div className="landing-container">
        <motion.div
          className="section-heading centered"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">YOUR JOURNEY</span>

          <h2>
            From scattered work to
            <span> clear progress.</span>
          </h2>

          <p>
            A simple workflow that helps you move from planning your work to
            actually getting it done.
          </p>
        </motion.div>

        <div className="journey-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                className="journey-card"
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                whileHover={{ y: -7 }}
              >
                <div className="journey-number">{step.number}</div>

                <div className="journey-icon">
                  <Icon size={21} />
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                {index < steps.length - 1 && (
                  <ChevronRight className="journey-arrow" size={20} />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="landing-container">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="contact-content">
            <span className="section-eyebrow">GET STARTED</span>

            <h2>
              Ready to take control of your
              <span> academic journey?</span>
            </h2>

            <p>
              Start organizing your tasks, notes, resources, and progress in one
              focused workspace.
            </p>

            <Link to="/Dashboard/Home" className="primary-button light-button">
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="contact-decoration">
            <div className="contact-orb orb-one" />
            <div className="contact-orb orb-two" />

            <GraduationCap size={100} strokeWidth={1.1} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="landing-footer">
      <div className="landing-container footer-inner">
        <Logo />

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="footer-top-button" onClick={scrollToTop}>
          Back to top
          <ArrowRight size={15} className="rotate-up" />
        </button>
      </div>

      <div className="landing-container footer-bottom">
        <span>© 2026 Student Hub. All rights reserved.</span>

        <span>Built for focused learning.</span>
      </div>
    </footer>
  );
}

/* =========================================================
   LANDING PAGE
   ========================================================= */

export default function LandingPage() {
  return (
    <div className="landing-page">
      <LandingNavbar />

      <main>
        {/* HERO */}
        <section id="home" className="hero-section">
          <div className="hero-background-grid" />

          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="landing-container hero-grid">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles size={15} />
                <span>Your academic workspace</span>
              </motion.div>

              <h1>
                Master Your
                <span> Academic Journey.</span>
              </h1>

              <p>
                Student Hub is your calm, organized digital workspace.
                Streamline your tasks, manage your notes, and conquer your
                deadlines with a tool designed specifically for focused
                learning.
              </p>

              <div className="hero-actions">
                <Link to="/Dashboard/Home" className="primary-button">
                  Get Started
                  <ArrowRight size={18} />
                </Link>

                <a href="#features" className="secondary-button">
                  Explore Features
                </a>
              </div>

              <div className="hero-trust">
                <div className="trust-avatars">
                  <span>A</span>
                  <span>M</span>
                  <span>S</span>
                  <span>+</span>
                </div>

                <div>
                  <strong>Everything in one place</strong>
                  <span>Designed around your academic workflow</span>
                </div>
              </div>
            </motion.div>

            <DashboardPreview />
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="features-section">
          <div className="landing-container">
            <motion.div
              className="section-heading centered"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-eyebrow">EVERYTHING YOU NEED</span>

              <h2>
                One place for your
                <span> academic life.</span>
              </h2>

              <p>
                We've designed Student Hub to reduce the noise so you can focus
                on what actually matters: learning.
              </p>
            </motion.div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <AboutSection />

        {/* JOURNEY */}
        <JourneySection />

        {/* CONTACT / CTA */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
