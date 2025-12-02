import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, MessageCircle, Download, ExternalLink } from 'lucide-react';
import './App.css';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const skills = [
    'React.js', 'JavaScript', 'TypeScript',
    'Tailwind CSS', 'HTML', 'CSS', 'Git & GitHub', 'Figma'
  ];

  const projects = [
    {
      title: 'ShareABite',
      description: 'A left-over food sharing platform that help reduce food waste built',
      image: '/images/ShareABite.jpg',
      liveLink: 'https://shareabite-ten.vercel.app/',
      githubLink: 'https://github.com/Chiamaka548/shareabite'
    },
    {
      title: 'Loan Dashboard',
      description: 'An interactive dashboard for managing and tracking loans and repayments.',
      image: '/images/Dashboard.jpg',
      liveLink: 'https://loan-dashboard-rosy.vercel.app/',
      githubLink: 'https://github.com/Chiamaka548/Loan-Dashboard'
    },
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio website to showcase projects and skills.',
      image: '/images/Portfolio.jpg',
      liveLink: 'https://pennywisechee.vercel.app/',
      githubLink: 'https://github.com/Chiamaka548/my-portfolio'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="grid-background"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="floating-square" style={{ top: '20%', left: '10%' }}></div>
        <div className="floating-square" style={{ top: '60%', right: '15%' }}></div>
        <div className="floating-circle" style={{ top: '40%', right: '25%' }}></div>
        <div className="floating-square" style={{ bottom: '20%', left: '20%' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80' : 'bg-transparent'
      }`}>
        <div className="px-8 py-4 rounded-full border border-purple-500/30 backdrop-blur-md">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-purple-400">&lt;/&gt;</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 text-sm">
              <a href="#home" className="text-purple-400 hover:text-pink-400 transition-colors"># home</a>
              <a href="#about" className="text-white hover:text-purple-400 transition-colors"># about</a>
              <a href="#projects" className="text-white hover:text-purple-400 transition-colors"># projects</a>
              <a href="#experience" className="text-white hover:text-purple-400 transition-colors"># experience</a>
              <a href="#contact" className="text-white hover:text-purple-400 transition-colors"># contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-purple-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 flex flex-col gap-3 text-sm animate-slide-up">
              <a href="#home" className="text-purple-400 hover:text-pink-400 transition-colors"># home</a>
              <a href="#about" className="text-white hover:text-purple-400 transition-colors"># about</a>
              <a href="#projects" className="text-white hover:text-purple-400 transition-colors"># projects</a>
              <a href="#experience" className="text-white hover:text-purple-400 transition-colors"># experience</a>
              <a href="#contact" className="text-white hover:text-purple-400 transition-colors"># contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Side Social Icons */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        <a href="https://github.com/Chiamaka548" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-white/20 rounded-full hover:border-purple-400 hover:scale-110 transition-all duration-300" aria-label="GitHub">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://linkedin.com/in/chiamaka-nwafor-3803b3389" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-white/20 rounded-full hover:border-purple-400 hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nwaforchiamaka548@gmail.com" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-white/20 rounded-full hover:border-purple-400 hover:scale-110 transition-all duration-300" aria-label="Mail">
          <Mail className="w-5 h-5" />
        </a>
        <a href="https://wa.me/2347048949490" target="_blank" rel="noopener noreferrer" className="p-3 border-2 border-white/20 rounded-full hover:border-purple-400 hover:scale-110 transition-all duration-300" aria-label="Whatsapp">
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>

      {/* CV Download Button */}
      <div className="fixed left-8 bottom-8 z-40 hidden lg:block">
        <a href="/resume.pdf" download="Chiamaka-Nwafor-CV.pdf" className="px-6 py-3 border-2 border-purple-400 rounded-full text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300 flex items-center gap-2 font-mono">
          <span>{'{ CV '}</span>
          <Download className="w-4 h-4" />
          <span>{' }'}</span>
        </a>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Glowing orb */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
          
          <div className="relative">
            <p className="text-xl mb-4 animate-fade-in">
              <span className="text-white">Hi, I'm </span>
              <span className="text-purple-400 font-semibold">Chiamaka Nwafor</span>
            </p>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-slide-up leading-tight">
              <span className="text-white">&lt;Software Engineer</span>
              <span className="text-purple-400">/&gt;</span>
              <span className="animate-blink text-white">|</span>
            </h1>
          </div>
        </div>

        {/* Decorative Grid Squares */}
        <div className="absolute bottom-20 left-20 w-32 h-32 grid grid-cols-3 gap-2 opacity-30">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-purple-500/50 animate-float" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-6 relative ${visibleSections.has('about') ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-400">#about-me</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed text-lg">
                Hi! I'm Chiamaka, a frontend developer with a love for building clean, responsive, and user-friendly web experiences. My core stack includes React.js, TypeScript and Tailwind CSS.
                I'm big on learning, experimenting, and leveling up my craft. Whether I'm fixing UI bugs, turning designs into pages, or optimizing layouts, I'm always looking for ways to make things smoother and more efficient.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                When I'm not coding, I'm probably scrolling through socials, catching up on trends or binge-watching my favorite youtube vlogs.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative aspect-square bg-gray-900 rounded-2xl overflow-hidden border-2 border-purple-500/30 transform group-hover:scale-105 transition-all duration-500">
                <img src="/images/MyImage.jpg" alt="Portrait" className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-6 relative ${visibleSections.has('skills') ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-400">/skills</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="px-6 py-3 bg-transparent border-2 border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-300 cursor-default hover:scale-110 font-medium"
                style={{
                  animation: visibleSections.has('skills') ? `slide-up 0.5s ease-out ${index * 0.1}s forwards` : 'none',
                  opacity: visibleSections.has('skills') ? 1 : 0
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-6 relative ${visibleSections.has('projects') ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-400">#projects</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group bg-gray-900 border-2 border-purple-500/30 rounded-xl overflow-hidden hover:border-purple-400 hover:transform hover:scale-105 transition-all duration-500"
                style={{
                  animation: visibleSections.has('projects') ? `slide-up 0.6s ease-out ${index * 0.2}s forwards` : 'none',
                  opacity: visibleSections.has('projects') ? 1 : 0
                }}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-purple-400">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  
                  {/* Project Links */}
                  <div className="flex gap-3">
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </a>
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white text-sm rounded-lg transition-all duration-300 hover:scale-105"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-6 relative ${visibleSections.has('experience') ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-400">#experience</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
          </div>
          
          <div className="relative border-l-2 border-purple-400 pl-8 ml-4">
            <div className="absolute w-4 h-4 bg-purple-400 rounded-full -left-[9px] top-0 animate-pulse shadow-lg shadow-purple-500/50"></div>
            
            <div className="mb-8 group">
              <span className="text-purple-400 font-bold text-lg">2025</span>
              <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-1">Engineering Intern</h3>
              <p className="text-gray-400 mb-4 text-lg">April 2025 — June 2025 · 3 months</p>
              <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                During my internship at Cecure Intelligence Limited (CIL), I worked across three areas: frontend engineering, design engineering and cloud engineering. 
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                I improved my core frontend skills by working with HTML, CSS, JavaScript, and React, and I also gained practical exposure to UI/UX design using Figma. On the cloud side, I learned the basics of AWS services, Terraform, and general cloud infrastructure setups. 
                My time at CIL helped me understand how real engineering teams work, strengthened my documentation habits, and gave me hands-on experience across the full development process from designing interfaces to building and deploying them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 relative ${visibleSections.has('contact') ? 'visible' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nwaforchiamaka548@gmail.com" target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50">
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p className="text-lg">© Coded by Chiamaka Nwafor.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;