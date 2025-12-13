import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, MessageCircle, Download, ExternalLink } from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [titleIndex, setTitleIndex] = useState(0);
  const [titleText, setTitleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // eslint-disable-next-line
  const titles = ['Software Engineer', 'Web Developer', 'Web Designer', 'Frontend Engineer'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (titleText.length < currentTitle.length) {
          setTitleText(currentTitle.slice(0, titleText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (titleText.length > 0) {
          setTitleText(currentTitle.slice(0, titleText.length - 1));
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [titleText, isDeleting, titleIndex, titles]);

  const skills = [
    'React.js', 'JavaScript', 'TypeScript',
    'Tailwind CSS', 'HTML', 'CSS', 'Git & GitHub', 'Figma'
  ];

  const projects = [
    {
      title: 'ShareABite',
      description: 'A left-over food sharing platform that help reduce food waste',
      image: 'images/ShareABite.jpg',
      liveLink: 'https://shareabite-ten.vercel.app/',
      githubLink: 'https://github.com/Chiamaka548/shareabite'
    },
    {
      title: 'Loan Dashboard',
      description: 'An interactive dashboard for managing and tracking loans and repayments.',
      image: 'images/Dashboard.jpg',
      liveLink: 'https://loan-dashboard-rosy.vercel.app/',
      githubLink: 'https://github.com/Chiamaka548/Loan-Dashboard'
    },
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio website to showcase projects and skills.',
      image: 'images/Portfolio.jpg',
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

      {/* Navigation - Desktop */}
      <nav className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 hidden md:block ${
        scrolled ? 'bg-black/80' : 'bg-transparent'
      }`}>
        <div className="px-8 py-4 rounded-full border border-purple-500/30 backdrop-blur-md">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-purple-400">&lt;/&gt;</div>
            
            <div className="flex gap-6 text-sm">
              <a href="#home" className="text-purple-400 hover:text-pink-400 transition-colors"># home</a>
              <a href="#about" className="text-white hover:text-purple-400 transition-colors"># about</a>
              <a href="#projects" className="text-white hover:text-purple-400 transition-colors"># projects</a>
              <a href="#experience" className="text-white hover:text-purple-400 transition-colors"># experience</a>
              <a href="#contact" className="text-white hover:text-purple-400 transition-colors"># contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation - Mobile */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:hidden ${
        scrolled ? 'bg-black/90' : 'bg-black/70'
      } backdrop-blur-md border-b border-purple-500/30`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-purple-400">&lt;/&gt;</div>
            
            <button 
              className="text-purple-400 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-black/95 backdrop-blur-lg">
          <div className="h-full flex flex-col items-center justify-center gap-8 text-center px-8">
            <a 
              href="#home" 
              className="text-3xl text-purple-400 hover:text-pink-400 transition-all duration-300 hover:scale-110"
              onClick={() => setMobileMenuOpen(false)}
            >
              # home
            </a>
            <a 
              href="#about" 
              className="text-3xl text-white hover:text-purple-400 transition-all duration-300 hover:scale-110"
              onClick={() => setMobileMenuOpen(false)}
            >
              # about
            </a>
            <a 
              href="#projects" 
              className="text-3xl text-white hover:text-purple-400 transition-all duration-300 hover:scale-110"
              onClick={() => setMobileMenuOpen(false)}
            >
              # projects
            </a>
            <a 
              href="#experience" 
              className="text-3xl text-white hover:text-purple-400 transition-all duration-300 hover:scale-110"
              onClick={() => setMobileMenuOpen(false)}
            >
              # experience
            </a>
            <a 
              href="#contact" 
              className="text-3xl text-white hover:text-purple-400 transition-all duration-300 hover:scale-110"
              onClick={() => setMobileMenuOpen(false)}
            >
              # contact
            </a>
          </div>
        </div>
      </div>

      {/* Side Social Icons - Desktop */}
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

      {/* Bottom Social Icons & CV - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-black/80 backdrop-blur-md border-t border-purple-500/30">
        <div className="flex justify-around items-center px-4 py-4">
          <a href="https://github.com/Chiamaka548" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-white/20 rounded-full hover:border-purple-400 transition-all duration-300" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/chiamaka-nwafor-3803b3389" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-white/20 rounded-full hover:border-purple-400 transition-all duration-300" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nwaforchiamaka548@gmail.com" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-white/20 rounded-full hover:border-purple-400 transition-all duration-300" aria-label="Mail">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://wa.me/2347048949490" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-white/20 rounded-full hover:border-purple-400 transition-all duration-300" aria-label="Whatsapp">
            <MessageCircle className="w-5 h-5" />
          </a>
          <a href="" className="p-2 border-2 border-purple-400 rounded-full hover:bg-purple-400 hover:text-black transition-all duration-300" aria-label="Download CV">
            <Download className="w-5 h-5 text-purple-400 hover:text-black" />
          </a>
        </div>
      </div>

      {/* CV Download Button - Desktop */}
      <div className="fixed left-8 bottom-8 z-40 hidden lg:block">
        <a href="/my resume.pdf" download="Chiamaka-Nwafor-CV.pdf" className="px-6 py-3 border-2 border-purple-400 rounded-full text-purple-400 hover:bg-purple-400 hover:text-black transition-all duration-300 flex items-center gap-2 font-mono">
          <span>{'{ CV '}</span>
          <Download className="w-4 h-4" />
          <span>{' }'}</span>
        </a>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
          
          <div className="relative">
            <p className="text-xl mb-4">
              <span className="text-white">Hi, I'm </span>
              <span className="text-purple-400 font-semibold text-3xl">Chiamaka Nwafor</span>
            </p>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="text-white">&lt;{titleText}</span>
              <span className="text-purple-400">/&gt;</span>
              <span className="animate-blink text-white">|</span>
            </h1>
          </div>
        </div>

        <div className="absolute bottom-20 left-20 w-32 h-32 grid grid-cols-3 gap-2 opacity-30">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-purple-500/50" style={{ animation: `float 6s ease-in-out infinite ${i * 0.1}s` }}></div>
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
                <img src="images/MyImage.jpg" alt="Portrait" className="w-full h-full object-cover"/>
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
            <div className="absolute w-4 h-4 bg-purple-400 rounded-full -left-[9px] top-0 shadow-lg shadow-purple-500/50" style={{animation: 'pulse 2s ease-in-out infinite'}}></div>
            
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
          <a href="mailto:nwaforchiamaka548@gmail.com"
            className="inline-block px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50">
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-purple-500/20 mb-20 lg:mb-0">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p className="text-lg">© Coded by Chiamaka Nwafor.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;