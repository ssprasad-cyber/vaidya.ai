import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Users, 
  Calendar, 
  Shield, 
  Activity, 
  Clock, 
  Award, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  X,
  ChevronRight,
  Stethoscope,
  UserCheck,
  FileText,
  Database,
  Zap,
  Sparkles,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const particlesRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize floating particles
  useEffect(() => {
    particlesRef.current = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  const features = [
    {
      icon: UserCheck,
      title: "Patient Management",
      description: "Comprehensive patient records, medical history, and appointment scheduling in one unified system.",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "Smart scheduling system with automated reminders and real-time availability tracking.",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: FileText,
      title: "Electronic Health Records",
      description: "Secure, compliant digital health records with instant access and seamless sharing.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Database,
      title: "Inventory Management",
      description: "Track medical supplies, pharmaceuticals, and equipment with automated reorder alerts.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Activity,
      title: "Real-time Analytics",
      description: "Advanced reporting and analytics to optimize operations and improve patient outcomes.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Bank-level security with end-to-end encryption ensuring complete patient data protection.",
      color: "from-emerald-500 to-green-600"
    }
  ];

  const stats = [
    { number: "50,000",suffix: '+', label: "Patients Managed", icon: Users },
    { number: "99.9%", suffix: '%', label: "Uptime Guaranteed", icon: Shield },
    { number: "24", suffix: '/7', label: "Support Available", icon: Clock },
    { number: "500+", suffix: '+',label: "Healthcare Providers", icon: Award }
  ];

  // 3D Card Component
  const Card3D = ({ children, className = "" }) => {
    const [transform, setTransform] = useState('');
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    };

    const handleMouseLeave = () => {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    };

    return (
      <div 
        ref={cardRef}
        className={`transform-gpu transition-all duration-200 ${className}`}
        style={{ transform }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    );
  };

  // Floating Particles Component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 animate-ping"></div>
        </div>
      ))}
    </div>
  );

 // Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startCount = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startCount + (end - startCount) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isVisible, end, duration]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-xl transform group-hover:rotate-12 transition-transform duration-300">
                <Heart className="h-6 w-6 text-white animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Vaidya.Ai
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 relative overflow-hidden group"
               onClick={() => navigate('/getstarted')}
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <button 
              className="md:hidden transform hover:scale-110 transition-transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t transform transition-all duration-300">
            <div className="px-4 py-2 space-y-2">
              <a href="#features" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full mt-2 transform hover:scale-105 transition-all"
               onClick={() => navigate('/getstarted')}>
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
        
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: "2s"}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: "4s"}}></div>
          
          {/* Mouse Follower */}
          <div 
            className="absolute w-96 h-96 bg-gradient-radial from-blue-300/20 to-transparent rounded-full pointer-events-none transition-all duration-300"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
              transform: 'translate3d(0, 0, 0)'
            }}
          ></div>
        </div>

        <FloatingParticles />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            {/* 3D Floating Icons */}
            <div className="absolute -top-20 left-1/4 animate-bounce" style={{animationDelay: "0s", animationDuration: "3s"}}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg transform rotate-12">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="absolute -top-16 right-1/4 animate-bounce" style={{animationDelay: "1s", animationDuration: "2.5s"}}>
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-3 rounded-2xl shadow-lg transform -rotate-12">
                <Activity className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="absolute top-1/4 -left-10 animate-bounce" style={{animationDelay: "2s", animationDuration: "3.5s"}}>
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-2xl shadow-lg transform rotate-45">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent animate-pulse">
                Transform
              </span>
              <div className="absolute -top-5 -right-10">
                <Sparkles className="h-12 w-12 text-yellow-400 animate-spin" style={{animationDuration: "3s"}} />
              </div>
              <br />
              Healthcare Management
              <div className="absolute -bottom-5 -left-10">
                <Zap className="h-10 w-10 text-blue-500 animate-pulse" />
              </div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline operations, enhance patient care, and boost efficiency with our comprehensive hospital management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Start Free Trial</span>
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                <span className="relative z-10">Watch Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card3D key={index} className="text-center text-white">
                <div className="group">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-white/30 transition-all duration-300">
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <AnimatedCounter 
                              end={stat.number.replace(/[^0-9]/g, '')} 
                              suffix={stat.suffix} 
                              prefix={stat.prefix}
                              duration={2500}
                            />
                  <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
                  </div>
                </div>
              </Card3D>
            ))}
            
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-gray-50 relative">
        <FloatingParticles />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 animate-pulse" style={{animationDelay: `${i * 0.2}s`}} />
                  ))}
                </div>
              </div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your healthcare facility efficiently and effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card3D key={index} className="h-full">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full group border-2 border-transparent hover:border-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-10`}></div>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Why Choose Vaidya.Ai?
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Built by healthcare professionals for healthcare professionals. Our system integrates seamlessly 
                with existing workflows while providing cutting-edge technology to enhance patient care.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Award, text: "Award-winning customer support", color: "green" },
                  { icon: Clock, text: "Quick implementation in 48 hours", color: "blue" },
                  { icon: Shield, text: "Enterprise-grade security", color: "purple" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className={`bg-${item.color}-100 p-2 rounded-full group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`h-5 w-5 text-${item.color}-600`} />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card3D className="w-full">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 transform hover:rotate-0 transition-transform duration-500 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="bg-white rounded-2xl p-6 shadow-xl relative z-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-xl animate-pulse">
                        <Stethoscope className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Patient Dashboard</h3>
                        <p className="text-gray-600">Real-time overview</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Today's Appointments", value: "24", color: "blue" },
                        { label: "Pending Reviews", value: "8", color: "cyan" },
                        { label: "Active Patients", value: "156", color: "purple" }
                      ].map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 group/item">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{item.label}</span>
                            <span className={`font-bold text-${item.color}-600 group-hover/item:scale-110 transition-transform duration-200`}>{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-600/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: "2s"}}></div>
        </div>
        <FloatingParticles />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your healthcare management today. Contact us for a personalized demo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Phone, title: "Call Us", info: "+1 (555) 123-4567" },
              { icon: Mail, title: "Email Us", info: "hello@Vaidya.Aipro.com" },
              { icon: MapPin, title: "Visit Us", info: "123 Healthcare Ave, Medical City" }
            ].map((contact, index) => (
              <Card3D key={index} className="text-center">
                <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <contact.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">{contact.title}</h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">{contact.info}</p>
                </div>
              </Card3D>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10">Schedule a Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
            </button>
          </div>
        </div>
      </section>
       {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Vaidya.Ai</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 Vaidya.Ai. All rights reserved.</p>
              <p className="text-sm mt-1">Transforming healthcare, one system at a time.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;