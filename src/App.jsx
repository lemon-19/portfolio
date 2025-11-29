import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Zap,
  Rocket,
  Download,
} from "lucide-react";
import image from "../src/assets/image.png";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullText = "Web Developer";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["home", "about", "projects", "skills", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Finance Tracking App",
      type: "Personal Project",
      tech: ["React", "Tailwind CSS", "Firebase"],
      description:
        "Full-stack finance management application with real-time data synchronization, user authentication, and responsive design. Features include expense tracking, budget planning, and financial analytics.",
      highlights: [
        "Real-time updates",
        "User authentication",
        "Responsive design",
        "Data visualization",
      ],
      gradient: "from-emerald-500 to-teal-600",
      demoLink: "https://financeapp-8f2a9.web.app/",
      githubLink: "https://github.com/lemon-19/finance-app",
    },
    {
      title: "Product Page Custom Template",
      type: "Internship - Sprout Solutions",
      tech: ["WordPress", "ACF", "HTML", "CSS", "JavaScript", "PHP"],
      description:
        "Dynamic product page template with automated content rendering. Integrated Advanced Custom Fields for flexible content management, improving site maintainability and reducing development time.",
      highlights: [
        "ACF integration",
        "Automated rendering",
        "Improved maintainability",
      ],
      gradient: "from-blue-500 to-indigo-600",
      demoLink: "https://sprout.ph/product/concierge/",
    },
    {
      title: "Blog Page Revamp",
      type: "Internship - Sprout Solutions",
      tech: ["WordPress", "Elementor Pro", "Custom CSS"],
      description:
        "Redesigned blog template with enhanced layout and styling. Leveraged Elementor and custom CSS to create a modern, engaging user experience while maintaining brand consistency.",
      highlights: ["Modern design", "Enhanced UX", "Brand consistency"],
      gradient: "from-purple-500 to-pink-600",
      demoLink:
        "https://sprout.ph/articles/how-to-calculate-your-sss-monthly-contribution-in-2025/",
    },
  ];

  const achievements = [
    { icon: Award, label: "Cum Laude Graduate", value: "GPA 1.35" },
    { icon: Sparkles, label: "Research Award", value: "Outstanding" },
    { icon: Rocket, label: "Projects Built", value: "3+" },
    { icon: Zap, label: "Technologies", value: "10+" },
  ];

  const skills = {
    technical: [
      { name: "HTML/CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "Tailwind CSS", level: 85 },
      { name: "React", level: 80 },
      { name: "WordPress", level: 80 },
      { name: "PHP", level: 75 },
      { name: "MySQL", level: 70 },
      { name: "MongoDB", level: 65 },
    ],
    frameworks: [
      { name: "Laravel", category: "Backend" },
      { name: "Express.js", category: "Backend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Elementor Pro", category: "WordPress" },
      { name: "ACF", category: "WordPress" },
    ],
    databases: [
      { name: "MySQL", level: "Average" },
      { name: "SQL Server", level: "Average" },
      { name: "MongoDB", level: "Average" },
      { name: "Firebase", level: "Basic" },
    ],
    languages: [
      { name: "Java", level: "Fundamental" },
      { name: "C#", level: "Fundamental" },
    ],
    tools: ["Git", "VS Code", "Postman", "Figma"],
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-emerald-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles size={20} className="text-emerald-400" />
              LS
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "skills", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize transition-all duration-300 relative group ${
                      activeSection === item
                        ? "text-emerald-400"
                        : "hover:text-emerald-400"
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-emerald-400 transition-all duration-300 ${
                        activeSection === item
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </button>
                )
              )}
            </div>

            {/* Download Resume Button */}
            <a
              href="https://drive.google.com/file/d/1-aToS4laXs3_diCAGsnvCQ18FVFc0AW3/view?usp=sharingf"
              target="_blank"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition-all duration-300"
            >
              <Download size={18} />
              <span className="text-sm">Resume</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["home", "about", "projects", "skills", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-3 py-2 capitalize hover:bg-gray-800 rounded-md transition-colors"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-8"
      >
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-teal-500/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 transition-all duration-1000 ${
            isVisible.home
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6 relative">
            <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-emerald-400/30 shadow-2xl shadow-emerald-500/30 mb-6">
              <img
                src={image}
                alt="Lemon Sandicho"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="px-4 py-1 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-300">
                Available for Work
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Lemon Sandicho
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-gray-400 mb-2 h-8">
            <span className="border-r-2 border-emerald-400 pr-1">
              {typedText}
            </span>
          </div>

          <p className="text-gray-500 mb-8">
            Cum Laude Graduate • Problem Solver • Passionate Builder
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="p-4 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <Icon className="text-emerald-400 mx-auto mb-2" size={24} />
                  <p className="text-2xl font-bold text-emerald-400">
                    {achievement.value}
                  </p>
                  <p className="text-xs text-gray-400">{achievement.label}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
            >
              <Mail size={20} />
              <span>Get in Touch</span>
            </a>
            <a
              href="https://github.com/lemon-19"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-gray-700 rounded-full hover:bg-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
            >
              <Github size={20} />
              <span>View GitHub</span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-emerald-400" />
              <span>Laguna, Philippines</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-emerald-400" />
              <span>+63 905 461 3225</span>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} className="text-emerald-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/50">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            isVisible.about
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                As a{" "}
                <span className="text-emerald-400 font-semibold">
                  Cum Laude graduate
                </span>{" "}
                in Information Technology, I'm passionate about creating
                responsive, user-friendly web experiences that solve real
                problems. My journey in web development combines academic
                excellence with practical experience.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                During my internship at{" "}
                <span className="text-emerald-400 font-semibold">
                  Sprout Solutions
                </span>
                , I honed my skills in WordPress development, custom component
                creation, and performance optimization. I specialize in building
                dynamic websites using modern technologies like React, Tailwind
                CSS, and Firebase.
              </p>

              <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg border border-emerald-500/20">
                <Award
                  className="text-emerald-400 flex-shrink-0 mt-1"
                  size={24}
                />
                <div>
                  <p className="font-semibold text-emerald-400">
                    Outstanding Research Award
                  </p>
                  <p className="text-gray-400 text-sm">
                    Thesis: "Mediconnect" - Recognized for innovative healthcare
                    solution
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="text-emerald-400" size={24} />
                  <h3 className="text-xl font-semibold">Experience</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-emerald-400">
                      Web Developer Intern
                    </p>
                    <p className="text-gray-400 text-sm">
                      Sprout Solutions • Feb 2025 - May 2025
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      Developed responsive websites using WordPress, Elementor,
                      ACF, and custom PHP hooks. Built dynamic product templates
                      and optimized user experiences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="text-emerald-400" size={24} />
                  <h3 className="text-xl font-semibold">Education</h3>
                </div>
                <div>
                  <p className="font-semibold text-emerald-400">
                    BS Information Technology
                  </p>
                  <p className="text-gray-400 text-sm">
                    STI College Santa Cruz • 2025 • GPA: 1.35
                  </p>
                  <p className="text-gray-300 text-sm mt-2">
                    Graduated Cum Laude with honors
                  </p>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-emerald-400">
                    BS Industrial Technology
                  </p>
                  <p className="text-gray-400 text-sm">
                    Laguna State Polytechnic University • 2018
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            isVisible.projects
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-center text-gray-400 mb-12">
            Showcasing my best work from internship and personal projects
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`h-2 bg-gradient-to-r ${project.gradient}`}
                ></div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400">{project.type}</p>
                    </div>
                    <Code
                      className="text-emerald-400 flex-shrink-0"
                      size={24}
                    />
                  </div>

                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2 font-semibold">
                      Key Features:
                    </p>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700/50 text-emerald-400 text-xs rounded-full border border-emerald-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-700">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition-all duration-300 text-sm"
                      >
                        <ExternalLink size={16} />
                        View Live
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900/50">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            isVisible.skills
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Primary Technical Skills */}
            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Code className="text-emerald-400" />
                Core Technologies
              </h3>
              <div className="space-y-4">
                {skills.technical.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible.skills ? `${skill.level}%` : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold mb-6">
                Database Management
              </h3>
              <div className="space-y-4">
                {skills.databases.map((db, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <span className="text-gray-300 font-medium">{db.name}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        db.level === "Average"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {db.level}
                    </span>
                  </div>
                ))}
              </div>

              {/* Programming Languages */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-300">
                  Additional Languages
                </h4>
                <div className="flex flex-wrap gap-3">
                  {skills.languages.map((lang, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-gray-700/30 border border-gray-600/50 rounded-lg hover:border-purple-500/50 transition-all duration-300"
                    >
                      <p className="text-gray-300 font-medium text-sm">
                        {lang.name}
                      </p>
                      <p className="text-xs text-gray-400">{lang.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Frameworks & Tools */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold mb-6">
                Frameworks & Libraries
              </h3>
              <div className="space-y-3">
                {skills.frameworks.map((framework, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <span className="text-gray-300 font-medium">
                      {framework.name}
                    </span>
                    <span className="px-3 py-1 bg-gray-600/50 text-gray-400 text-xs rounded-full">
                      {framework.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold mb-6">Development Tools</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {skills.tools.map((tool, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-emerald-500/50 hover:bg-gray-700 transition-all duration-300"
                  >
                    {tool}
                  </div>
                ))}
              </div>

              {/* Core Competencies */}
              <div>
                <h4 className="font-semibold mb-4 text-emerald-400">
                  Core Competencies
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Communication & Team Collaboration
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Analytical & Problem-Solving
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Debugging & Software Testing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Accountability & Professionalism
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
        <div
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 relative z-10 ${
            isVisible.contact
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            I'm excited to bring my skills and fresh perspective to your team.
            Let's create something amazing!
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href="mailto:lemon.sandicho@gmail.com"
              className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <Mail
                className="text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform"
                size={32}
              />
              <p className="font-semibold mb-1">Email</p>
              <p className="text-sm text-gray-400 break-all">
                lemon.sandicho@gmail.com
              </p>
            </a>

            <a
              href="tel:+639054613225"
              className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <Phone
                className="text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform"
                size={32}
              />
              <p className="font-semibold mb-1">Phone</p>
              <p className="text-sm text-gray-400">+63 905 461 3225</p>
            </a>

            <a
              href="https://github.com/lemon-19"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <Github
                className="text-emerald-400 mx-auto mb-3 group-hover:scale-110 transition-transform"
                size={32}
              />
              <p className="font-semibold mb-1">GitHub</p>
              <p className="text-sm text-gray-400">github.com/lemon-19</p>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://drive.google.com/file/d/1-aToS4laXs3_diCAGsnvCQ18FVFc0AW3/view?usp=sharing"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-emerald-500/30 bg-emerald-500/10 rounded-full hover:bg-emerald-500/20 transition-all duration-300 hover:scale-105 text-lg font-semibold"
            >
              <Download size={20} />
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p className="mb-2">
            © 2025 Lemon Sandicho. Built with React & Tailwind CSS.
          </p>
          <p className="text-sm">
            Crafted with passion and attention to detail.
          </p>
        </div>
      </footer>
    </div>
  );
}
