import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Brain,
  Code,
  Zap,
  Cpu,
  Layers,
  GitBranch,
  Menu,
  X,
} from "lucide-react";

// 3D Sphere Component
function AnimatedSphere() {
  const meshRef = useRef<any>();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.4}
      />
    </Sphere>
  );
}

// Typing Animation Component
function TypingText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 100 + delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink">|</span>
    </span>
  );
}

// Rotating Role Component
function RotatingRole() {
  const roles = [
    "AI/ML Engineer",
    "Web Developer",
    "FullStack Developer",
    "Python Dev",
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000); // Change role every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      key={currentRoleIndex}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-cyber-blue"
    >
      {roles[currentRoleIndex]}
    </motion.span>
  );
}

// Floating Card Component
function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`${className} animate-float`}
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yGrid = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.8]);

  const heroRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const experienceInView = useInView(experienceRef, { once: true });
  const projectsInView = useInView(projectsRef, { once: true });
  const skillsInView = useInView(skillsRef, { once: true });
  const contactInView = useInView(contactRef, { once: true });

  const projects = [
    {
      title: "Personalized Chatbot Project",
      description:
        "Advanced AI chatbot using GPT-3.5 with custom training data for personalized responses and natural language understanding.",
      tech: ["Python", "OpenAI GPT-3.5", "NLP", "Flask"],
      color: "from-cyber-blue to-cyber-purple",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Virtual Mouse System",
      description:
        "Computer vision-based hand tracking system that converts hand gestures into mouse controls using advanced ML algorithms.",
      tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
      color: "from-cyber-purple to-cyber-pink",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "GenAI + n8n Automation",
      description:
        "Intelligent workflow automation platform combining generative AI with n8n for seamless business process automation.",
      tech: ["GenAI", "n8n", "Automation", "API Integration"],
      color: "from-cyber-pink to-cyber-green",
      icon: <Layers className="w-6 h-6" />,
    },
    {
      title: "Mobile-Controlled Drone Navigation",
      description:
        "IoT-based drone control system with real-time navigation, obstacle detection, and autonomous flight capabilities.",
      tech: ["IoT", "Python", "Mobile App", "Computer Vision"],
      color: "from-cyber-green to-cyber-orange",
      icon: <Cpu className="w-6 h-6" />,
    },
  ];

  const skillsData = {
    Programming: [
      { name: "Python 3", level: 95, color: "cyber-blue", icon: "🐍" },
      { name: "JavaScript", level: 88, color: "cyber-orange", icon: "⚡" },
      { name: "Embedded C", level: 82, color: "cyber-green", icon: "⚙️" },
      { name: "C++", level: 80, color: "cyber-purple", icon: "🔧" },
    ],
    "ML Frameworks": [
      { name: "PyTorch", level: 90, color: "cyber-pink", icon: "🔥" },
      { name: "TensorFlow", level: 88, color: "cyber-blue", icon: "🧠" },
      { name: "Scikit-learn", level: 85, color: "cyber-green", icon: "📊" },
    ],
    "NLP/GenAI": [
      { name: "Transformers", level: 88, color: "neon-blue", icon: "🤖" },
      { name: "OpenAI GPT-3.5", level: 92, color: "neon-purple", icon: "🧠" },
      { name: "Google GenAI", level: 85, color: "neon-pink", icon: "🎯" },
    ],
    "Data Handling": [
      { name: "Pandas", level: 90, color: "cyber-blue", icon: "🐼" },
      { name: "NumPy", level: 88, color: "cyber-purple", icon: "🔢" },
      { name: "SQL", level: 85, color: "cyber-green", icon: "🗄️" },
      { name: "Polaris", level: 75, color: "cyber-orange", icon: "⭐" },
    ],
    "APIs & Deployment": [
      { name: "REST APIs", level: 88, color: "neon-green", icon: "🌐" },
      { name: "Docker", level: 82, color: "neon-blue", icon: "🐳" },
    ],
    "Cloud & Tools": [
      { name: "AWS", level: 70, color: "cyber-orange", icon: "☁️" },
      { name: "Git", level: 90, color: "cyber-green", icon: "📝" },
      { name: "GitHub", level: 90, color: "cyber-purple", icon: "🐙" },
      { name: "Jupyter", level: 85, color: "cyber-blue", icon: "📓" },
      { name: "VS Code", level: 92, color: "neon-blue", icon: "����" },
    ],
    Others: [
      { name: "OpenCV", level: 85, color: "cyber-pink", icon: "👁️" },
      { name: "Mediapipe", level: 80, color: "neon-pink", icon: "🎥" },
      { name: "Raspberry Pi", level: 88, color: "cyber-green", icon: "🍓" },
      { name: "NVIDIA Jetpack", level: 75, color: "neon-green", icon: "🚀" },
    ],
  };

  const experience = [
    {
      title: "Application Development Intern",
      company: "Zulu Defence Systems Pvt. Ltd.",
      period: "May 2024 – July 2024",
      location: "Remote",
      description: [
        "Developed a hybrid AI system using Ardupilot, Embedded C, and Python on Raspberry Pi for simulation and defense applications.",
        "Integrated sensor modules (VL6180X) with ML inference pipelines for real-time control and feedback.",
        "Worked with Jetson Nano & JetPack 6.0 for edge AI deployments.",
      ],
      color: "from-cyber-blue to-cyber-purple",
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      title: "Java Fullstack Developer Intern",
      company: "Alphabit Technologies",
      period: "Jan 2024 – Mar 2024",
      location: "Chennai, India",
      description: [
        "Built full-stack AI-driven e-commerce platform using Spring Boot (backend) and ReactJS (frontend).",
        "Designed reusable ML modules and REST APIs with FastAPI.",
        "Integrated SQL Server for backend analytics and user data modeling.",
      ],
      color: "from-cyber-purple to-cyber-pink",
      icon: <Code className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          style={{ y: yBackground, rotate: rotateZ }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 rounded-full blur-xl"
        />
        <motion.div
          style={{ y: yBackground, rotate: rotateZ }}
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-cyber-pink/10 to-cyber-green/10 rounded-full blur-xl"
        />
        <motion.div
          style={{ y: yGrid }}
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-cyber-green/5 to-cyber-orange/5 rounded-full blur-2xl"
        />
        <motion.div
          style={{ y: yGrid, scale }}
          className="absolute top-1/2 right-10 w-16 h-16 border border-cyber-blue/20 rounded-lg rotate-45"
        />
        <motion.div
          style={{ y: yBackground }}
          className="absolute bottom-40 right-1/3 w-20 h-20 border border-cyber-purple/20 rounded-full"
        />
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold gradient-text"
            >
              Prakash K
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="hover:text-cyber-blue transition-colors"
              >
                Home
              </a>
              <a
                href="#experience"
                className="hover:text-cyber-purple transition-colors"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="hover:text-cyber-pink transition-colors"
              >
                Projects
              </a>
              <a
                href="#skills"
                className="hover:text-cyber-green transition-colors"
              >
                Skills
              </a>
              <a
                href="#contact"
                className="hover:text-cyber-orange transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="outline"
                className="hidden sm:flex border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-cyber-blue/30 hover:border-cyber-blue"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 pb-4 border-t border-white/10"
            >
              <div className="flex flex-col space-y-4 pt-4">
                <a
                  href="#home"
                  className="hover:text-cyber-blue transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="#projects"
                  className="hover:text-cyber-purple transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </a>
                <a
                  href="#skills"
                  className="hover:text-cyber-pink transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Skills
                </a>
                <a
                  href="#contact"
                  className="hover:text-cyber-green transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <Button
                  variant="outline"
                  className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black w-fit"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center cyber-grid overflow-hidden"
      >
        {/* Animated Grid Background */}
        <motion.div
          style={{ y: yGrid }}
          className="absolute inset-0 cyber-grid opacity-30"
        />

        {/* 3D Canvas */}
        <motion.div
          style={{ y, scale }}
          className="absolute inset-0 z-0 hidden lg:block"
        >
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </motion.div>

        {/* Mobile-friendly background effect */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 z-0 lg:hidden flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-96 h-96 border border-cyber-blue/20 rounded-full"
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="w-full h-full border border-cyber-purple/20 rounded-full relative"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 z-10 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:space-y-8 text-center lg:text-left"
            >
              <div className="space-y-4">
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Hi, I'm{" "}
                  <span className="gradient-text block sm:inline">
                    <TypingText text="Prakash K" delay={1000} />
                  </span>
                </motion.h1>

                <motion.h2
                  className="text-xl sm:text-2xl lg:text-4xl font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <RotatingRole />
                </motion.h2>

                <motion.p
                  className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed mx-auto lg:mx-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  Crafting intelligent solutions with cutting-edge AI/ML
                  technologies. Specializing in Python, PyTorch, TensorFlow, and
                  Generative AI to build the future of intelligent systems.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white hover:scale-105 transition-transform w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black w-full sm:w-auto"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Projects
                </Button>
              </motion.div>

              <motion.div
                className="flex space-x-8 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
              >
                <a
                  href="https://github.com/Prakashsuriya"
                  className="text-muted-foreground hover:text-cyber-blue transition-colors transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-7 h-7" />
                </a>
                <a
                  href="https://www.linkedin.com/in/prakashkbtech/"
                  className="text-muted-foreground hover:text-cyber-purple transition-colors transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-7 h-7" />
                </a>
                <a
                  href="mailto:prakashranjanr8@gmail.com"
                  className="text-muted-foreground hover:text-cyber-pink transition-colors transform hover:scale-110"
                >
                  <Mail className="w-7 h-7" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative order-first lg:order-last"
            >
              <div className="relative w-full h-80 sm:h-96 lg:h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-pink/20 rounded-full blur-3xl animate-pulse-glow"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple p-1 animate-glow"
                  >
                    <div className="w-full h-full rounded-full bg-dark-surface flex items-center justify-center relative overflow-hidden">
                      <motion.img
                        src="https://cdn.builder.io/api/v1/image/assets%2F8f78a356a05540998176ea24bafbe59e%2Fe65fd045fa2647879a8958d38ff15b33?format=webp&width=800"
                        alt="Prakash K - AI/ML Engineer"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="w-full h-full object-cover rounded-full"
                      />
                      {/* Floating particles */}
                      <motion.div
                        animate={{
                          y: [-10, 10, -10],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyber-blue rounded-full"
                      />
                      <motion.div
                        animate={{ y: [10, -10, 10], opacity: [0.3, 0.8, 0.3] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-cyber-purple rounded-full"
                      />
                      {/* Glowing overlay */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyber-blue/20 via-transparent to-cyber-purple/20" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section
        id="experience"
        ref={experienceRef}
        className="py-16 lg:py-20 relative bg-dark-surface/30"
      >
        {/* Parallax background elements */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-32 left-16 w-24 h-24 bg-gradient-to-r from-cyber-orange/5 to-cyber-pink/5 rounded-full blur-xl" />
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-r from-cyber-green/5 to-cyber-blue/5 rounded-full blur-2xl" />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold gradient-text mb-4 lg:mb-6">
              Professional Experience
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              My journey through innovative technology companies, building AI
              solutions and full-stack applications
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue via-cyber-purple to-cyber-pink hidden md:block" />

              <div className="space-y-8 lg:space-y-12">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={experienceInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.3 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full border-4 border-background z-10 hidden md:block" />

                    <div className="md:ml-20">
                      <FloatingCard delay={index * 0.2}>
                        <Card className="glass border-white/10 group hover:glow-blue transition-all duration-300 hover:scale-105">
                          <CardContent className="p-6 lg:p-8">
                            <div className="flex items-start space-x-4 mb-6">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`p-3 rounded-full bg-gradient-to-r ${exp.color} shadow-lg`}
                              >
                                {exp.icon}
                              </motion.div>
                              <div className="flex-1">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                                  <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                                    {exp.title}
                                  </h3>
                                  <Badge
                                    variant="secondary"
                                    className="bg-cyber-blue/20 text-cyber-blue border-cyber-blue/30 w-fit mt-2 lg:mt-0"
                                  >
                                    {exp.period}
                                  </Badge>
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center text-muted-foreground mb-4">
                                  <span className="text-lg font-semibold text-cyber-purple">
                                    {exp.company}
                                  </span>
                                  <span className="hidden lg:inline mx-2">
                                    •
                                  </span>
                                  <span className="text-sm">
                                    {exp.location}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              {exp.description.map((desc, descIndex) => (
                                <motion.div
                                  key={descIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={
                                    experienceInView ? { opacity: 1, x: 0 } : {}
                                  }
                                  transition={{
                                    duration: 0.5,
                                    delay: index * 0.3 + descIndex * 0.1,
                                  }}
                                  className="flex items-start space-x-3"
                                >
                                  <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-muted-foreground leading-relaxed">
                                    {desc}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </FloatingCard>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="py-16 lg:py-20 relative"
      >
        {/* Parallax background elements */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyber-purple/5 to-cyber-pink/5 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-cyber-green/5 to-cyber-blue/5 rounded-full blur-2xl" />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold gradient-text mb-4 lg:mb-6">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Innovative AI/ML solutions that push the boundaries of what's
              possible
            </p>
          </motion.div>

          <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <FloatingCard key={index} delay={index * 0.2} className="h-full">
                <Card className="glass border-white/10 h-full group hover:glow-blue transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                    <div className="flex items-center space-x-4 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`p-3 rounded-full bg-gradient-to-r ${project.color} shadow-lg`}
                      >
                        {project.icon}
                      </motion.div>
                      <h3 className="text-xl lg:text-2xl font-bold">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground mb-6 flex-grow text-sm lg:text-base leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="bg-dark-secondary text-xs lg:text-sm hover:bg-cyber-blue/20 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black transform hover:scale-105 transition-all"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className="py-16 lg:py-20 bg-dark-surface/50 relative overflow-hidden"
      >
        {/* Parallax background elements */}
        <motion.div
          style={{ y: yGrid }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-40 left-20 w-24 h-24 border border-cyber-green/10 rounded-lg rotate-12" />
          <div className="absolute bottom-32 right-16 w-32 h-32 border border-cyber-orange/10 rounded-full" />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold gradient-text mb-4 lg:mb-6">
              Technical Skills
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technologies and frameworks I use to build
              intelligent systems
            </p>
          </motion.div>

          <div className="space-y-8 lg:space-y-12">
            {Object.entries(skillsData).map(
              ([category, skills], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl lg:text-3xl font-bold text-center gradient-text">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {skills.map((skill, skillIndex) => {
                      const globalIndex = categoryIndex * 10 + skillIndex;
                      return (
                        <FloatingCard
                          key={skillIndex}
                          delay={globalIndex * 0.05}
                        >
                          <Card className="glass border-white/10 p-4 lg:p-6 text-center group hover:scale-105 hover:glow-blue transition-all duration-300">
                            <CardContent className="p-0">
                              <motion.div
                                className="text-3xl lg:text-4xl mb-3"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                transition={{ duration: 0.3 }}
                              >
                                {skill.icon}
                              </motion.div>
                              <h4 className="text-sm lg:text-base font-semibold mb-3 lg:mb-4">
                                {skill.name}
                              </h4>
                              <div className="relative">
                                <div className="w-full bg-dark-secondary rounded-full h-2 lg:h-3 mb-2">
                                  <motion.div
                                    className={`bg-gradient-to-r from-${skill.color} to-neon-blue h-full rounded-full relative overflow-hidden`}
                                    initial={{ width: 0 }}
                                    animate={
                                      skillsInView
                                        ? { width: `${skill.level}%` }
                                        : {}
                                    }
                                    transition={{
                                      duration: 1.5,
                                      delay: globalIndex * 0.05,
                                      ease: "easeOut",
                                    }}
                                  >
                                    <motion.div
                                      className="absolute inset-0 bg-white/20"
                                      animate={{ x: ["-100%", "100%"] }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                      }}
                                    />
                                  </motion.div>
                                </div>
                                <motion.span
                                  className="text-xs lg:text-sm text-muted-foreground font-medium"
                                  initial={{ opacity: 0 }}
                                  animate={skillsInView ? { opacity: 1 } : {}}
                                  transition={{ delay: globalIndex * 0.05 + 1 }}
                                >
                                  {skill.level}%
                                </motion.span>
                              </div>
                            </CardContent>
                          </Card>
                        </FloatingCard>
                      );
                    })}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-16 lg:py-20 relative"
      >
        {/* Parallax background elements */}
        <motion.div
          style={{ y: yBackground }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-20 right-20 w-28 h-28 bg-gradient-to-r from-cyber-blue/5 to-cyber-purple/5 rounded-full blur-xl" />
          <div className="absolute bottom-32 left-16 w-36 h-36 bg-gradient-to-r from-cyber-pink/5 to-cyber-green/5 rounded-full blur-2xl" />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold gradient-text mb-4 lg:mb-6">
              Let's Connect
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to collaborate on the next breakthrough AI project? Let's
              build the future together.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <FloatingCard>
                <Card className="glass border-white/10 p-4 lg:p-6 text-center group hover:glow-blue transition-all duration-300 hover:scale-105">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-block"
                    >
                      <Mail className="w-8 h-8 mx-auto mb-3 lg:mb-4 text-cyber-blue" />
                    </motion.div>
                    <h3 className="font-semibold mb-2 text-lg">Email</h3>
                    <p className="text-xs lg:text-sm text-muted-foreground break-all leading-relaxed">
                      prakashranjanr8@gmail.com
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.1}>
                <Card className="glass border-white/10 p-4 lg:p-6 text-center group hover:glow-purple transition-all duration-300 hover:scale-105">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-block"
                    >
                      <Phone className="w-8 h-8 mx-auto mb-3 lg:mb-4 text-cyber-purple" />
                    </motion.div>
                    <h3 className="font-semibold mb-2 text-lg">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                      +91 9487821387
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.2}>
                <Card className="glass border-white/10 p-4 lg:p-6 text-center group hover:glow-pink transition-all duration-300 hover:scale-105">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-block"
                    >
                      <Linkedin className="w-8 h-8 mx-auto mb-3 lg:mb-4 text-cyber-pink" />
                    </motion.div>
                    <h3 className="font-semibold mb-2 text-lg">LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">
                      /in/prakashkbtech
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>

              <FloatingCard delay={0.3}>
                <Card className="glass border-white/10 p-4 lg:p-6 text-center group hover:glow-green transition-all duration-300 hover:scale-105">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-block"
                    >
                      <Github className="w-8 h-8 mx-auto mb-3 lg:mb-4 text-cyber-green" />
                    </motion.div>
                    <h3 className="font-semibold mb-2 text-lg">GitHub</h3>
                    <p className="text-sm text-muted-foreground">
                      /Prakashsuriya
                    </p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </div>

            <motion.div
              className="text-center mt-8 lg:mt-12"
              initial={{ opacity: 0 }}
              animate={contactInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink text-white hover:scale-105 transition-transform w-full sm:w-auto px-8 py-4"
              >
                <Mail className="w-5 h-5 mr-2" />
                Start a Conversation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 lg:py-8 border-t border-white/10 bg-dark-surface/30">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.p
            className="text-muted-foreground text-sm lg:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            © 2024 Prakash K. Crafted with cutting-edge tech and futuristic
            design.
          </motion.p>
          <motion.div
            className="flex justify-center space-x-6 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="https://github.com/Prakashsuriya"
              className="text-muted-foreground hover:text-cyber-blue transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/prakashkbtech/"
              className="text-muted-foreground hover:text-cyber-purple transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:prakashranjanr8@gmail.com"
              className="text-muted-foreground hover:text-cyber-pink transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
