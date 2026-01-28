import { useState, useEffect, useRef } from 'react';
import profilePic from './assets/photo/photoprofil.webp';
import { FaWhatsapp } from "react-icons/fa";
import transAcademiaImg from './assets/photo/trans-academia.webp';
import angelanieImg from './assets/photo/angelanie-project.webp';
import misterbImg from './assets/photo/misterb-project.webp';
import CountUp, { useCountUp } from "react-countup";
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Briefcase, User, MessageSquare, Sun, Moon, Zap, Database, Globe, Cpu } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
  const closeMenuOnResize = () => {
    if (window.innerWidth >= 768) {
      setIsMenuOpen(false);
    }
  };

  window.addEventListener('resize', closeMenuOnResize);
  return () => window.removeEventListener('resize', closeMenuOnResize);
}, []);

useEffect(() => {
  if (!isMenuOpen) return;

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (
      menuRef.current &&
      !menuRef.current.contains(target) &&
      burgerRef.current &&
      !burgerRef.current.contains(target)
    ) {
      setIsMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isMenuOpen]);


  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      root: null,
      threshold: 0.6, // 60% visible
    }
  );

  sections.forEach((section) => observer.observe(section));

  return () => {
    sections.forEach((section) => observer.unobserve(section));
  };
}, []);


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'projects', label: 'Projets' },
    { id: 'skills', label: 'Compétences' },
    { id: 'contact', label: 'Contact' }
  ];

  const projects = [
    {
      title: 'Plateforme E-Commerce',
      description: 'Solution e-commerce complète avec gestion d\'inventaire en temps réel et traitement des paiements.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: '#',
      image: angelanieImg
    },
    {
      title: 'Trans-Academia — Plateforme de gestion académique',
      description: 'Solution web et mobile axée sur la mobilité étudiante, intégrant la gestion administrative et un système de paiement mobile par carte d’abonnement, pour un transport scolaire plus simple, connecté et efficace.',
      tech: ['HTML5','React', 'Vite', 'Tailwind CSS', 'PHP Slim', 'MySQL'],
      link: 'https://trans-academia.cd/',
      image: transAcademiaImg
    },
    {
      title: 'Tableau de Bord Analytics',
      description: 'Tableau de bord de visualisation de données pour l\'intelligence métier et le suivi de performances.',
      tech: ['React', 'D3.js', 'Express', 'MongoDB'],
      link: '#',
      image: misterbImg
    }
  ];

  const skills = [
    {
      category: 'Frontend',
      icon: Globe,
      items: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Backend',
      icon: Database,
      items: ['MySQL', 'PostgreSQL', 'REST APIs', 'AdonisJS', 'Node.js', 'PHP'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      category: 'Outils',
      icon: Zap,
      items: ['Git', 'Postman', 'Vercel', 'Figma', 'VS Code'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Soft Skills',
      icon: Cpu,
      items: ['Résolution de problèmes', 'Leadership', 'Communication', 'Agile', 'Travail en équipe', 'Adaptabilité', 'Gestion du temps', 'Pensée critique', 'Créativité'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {/* Navigation */}
<nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
  ${
    isDark
      ? isScrolled
        ? 'bg-slate-900 border-b border-slate-800 shadow-md'
        : 'bg-slate-900/80 border-b border-slate-800 backdrop-blur-md'
      : isScrolled
        ? 'bg-white border-b border-slate-200 shadow-md'
        : 'bg-white/80 border-b border-slate-200 backdrop-blur-md'
  }
`}
>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              DavidB
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600'
                      : isDark ? 'text-slate-300 hover:text-blue-400' : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                ref={burgerRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                }`}
              >
                {isMenuOpen ? (
                  <X
                    size={24}
                    className={isDark ? 'text-white' : 'text-slate-800'}
                  />
                ) : (
                  <Menu
                    size={24}
                    className={isDark ? 'text-white' : 'text-slate-800'}
                  />
                )}
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        ref={menuRef}
        className={`
          md:hidden fixed top-16 left-0 right-0 z-40
          transition-all duration-500 ease-out
          backdrop-blur-md
          ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-8 pointer-events-none'
          }
          ${
            isDark
              ? 'bg-slate-900/95 border-t border-slate-800'
              : 'bg-white/95 border-t border-slate-200'
          }
          shadow-2xl
        `}
      >
        <div className="px-4 py-6 space-y-4 text-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                block w-full text-left px-4 py-3 rounded-xl
                text-base font-medium transition-colors
                ${
                  activeSection === item.id
                    ? isDark
                      ? 'bg-blue-900 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                    : isDark
                      ? 'text-slate-300 hover:bg-slate-800'
                      : 'text-slate-700 hover:bg-slate-100'
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>


      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent leading-tight">
              David Bigomokero
            </h1>
            <p className={`text-xl sm:text-2xl mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Développeur Full Stack & Résolveur Créatif de Problèmes
            </p>
            <p className={`text-lg mb-12 max-w-2xl mx-auto ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              "Passionné par le Clean Code. Dévoué à l'expérience utilisateur. Je conçois le web de demain avec les outils d'aujourd'hui."
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Voir mon travail
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-3 rounded-lg font-medium transition-colors border-2 border-blue-600 ${
                  isDark ? 'bg-slate-800 text-blue-400 hover:bg-slate-700' : 'bg-white text-blue-600 hover:bg-slate-50'
                }`}
              >
                Me Contacter
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-12">
                            <a href="mailto:bigodavid1@gmail.com" className={`p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'
              }`}>
                <Mail size={24} />
              </a>
                            <a href="https://wa.me/243823069559?text=Bonjour%20David,%20j’ai%20vu%20votre%20portfolio" target="_blank" rel="noopener noreferrer"
              className={`p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 ${
                isDark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700'
              }`}
            >
              <FaWhatsapp size={24} />
            </a>
              <a href="https://github.com/DavidBigo" className={`p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'
              }`}>
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/david-bigomokero-44534467/" className={`p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-700'
              }`}>
                <Linkedin size={24} />
              </a>


            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 transition-colors ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <User className="text-blue-600" size={32} />
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>À Propos</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Développeur Full Stack junior avec une expérience en entreprise, maîtrisant HTML, Tailwind CSS, JavaScript, React, AdonisJS et PHP pour concevoir des applications web modernes et performantes. À l’aise avec les outils de collaboration et de test (Git, GitHub, Postman) ainsi qu’avec Figma pour l’intégration UI/UX, je transforme les besoins fonctionnels en solutions claires, fiables et esthétiques au sein d’équipes dynamiques.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className={`px-6 py-3 rounded-lg ${isDark ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-50'}`}>
                  <p className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    <CountUp end={1} duration={5} enableScrollSpy />+</p>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Années d'expérience</p>
                </div>
                <div className={`px-6 py-3 rounded-lg ${isDark ? 'bg-cyan-900 bg-opacity-50' : 'bg-cyan-50'}`}>
                  <p className={`text-3xl font-bold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    <CountUp end={3} duration={5} enableScrollSpy />+</p>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Projets complétés</p>
                </div>
                <div className={`px-6 py-3 rounded-lg ${isDark ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-50'}`}>
                  <p className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    <CountUp end={600} duration={3} enableScrollSpy />+</p>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>utilisateurs</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className={`w-full max-w-md aspect-square rounded-2xl shadow-xl flex items-center justify-center ${
                isDark ? 'bg-gradient-to-br from-slate-800 via-slate-800 to-slate-700' : 'bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200'
              }`}>
                <div className="text-center p-8">
                  <div className="w-52 h-52 mx-auto mb-6 bg-white rounded-full shadow-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={profilePic}
                      alt="Photo de profil de David"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-700'}`}>Bâtir l'Avenir</p>
                  <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Une Ligne de Code à la Fois</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-4 transition-colors ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="text-blue-600" size={32} />
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Projets Sélectionnés</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group ${
                  isDark ? 'bg-slate-900' : 'bg-white'
                }`}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-48 relative overflow-hidden group"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      size={36}
                    />
                  </div>
                </a>

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>{project.title}</h3>
                  <p className={`mb-4 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 text-sm rounded-full ${
                          isDark ? 'bg-blue-900 bg-opacity-50 text-blue-300' : 'bg-blue-50 text-blue-600'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-4 transition-colors ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-16">
            <Code className="text-blue-600" size={32} />
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Compétences & Expertise</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, index) => {
              const IconComponent = skillGroup.icon;
              return (
                <div
                  key={index}
                  className={`group rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer transform hover:-translate-y-1 ${
                    isDark ? 'bg-slate-800 hover:bg-slate-750' : 'bg-white hover:shadow-2xl'
                  }`}
                >
                  <div className={`bg-gradient-to-r ${skillGroup.color} p-8 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`p-4 rounded-xl ${isDark ? 'bg-white bg-opacity-15' : 'bg-white bg-opacity-25'} backdrop-blur transition-all group-hover:bg-opacity-30`}>
                        <IconComponent size={36} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{skillGroup.category}</h3>
                    </div>
                  </div>
                  <div className={`p-8 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-110 cursor-pointer ${
                            isDark
                              ? 'bg-slate-700 text-slate-200 border border-slate-600 hover:bg-slate-600 hover:border-slate-500'
                              : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-4 transition-colors ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-12">
            <MessageSquare className="text-blue-600" size={32} />
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Me Contacter</h2>
          </div>
          <p className={`text-xl mb-12 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Je suis toujours ouvert à discuter de nouveaux projets, d'idées créatives ou d'opportunités pour faire partie de votre vision.
          </p>
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="mailto:bigodavid1@gmail.com"
                className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 ${
                  isDark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700'
                }`}
              >
                <Mail className="text-blue-600" size={24} />
                <span className="font-medium">bigodavid1@gmail.com</span>
              </a>
              <a href="https://wa.me/243823069559?text=Bonjour%20David,%20j’ai%20vu%20votre%20portfolio" target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 ${
                isDark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700'
              }`}
            >
              <FaWhatsapp className="text-blue-600" size={24} />
              <span className="font-medium">WhatsApp</span>
            </a>
              <a
                href="https://github.com/DavidBigo"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 ${
                  isDark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700'
                }`}
              >
                <Github className="text-blue-600" size={24} />
                <span className="font-medium">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/david-bigomokero-44534467/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 ${
                  isDark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-700'
                }`}
              >
                <Linkedin className="text-blue-600" size={24} />
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-8 px-4 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            © 2026 David Bigomokero. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
