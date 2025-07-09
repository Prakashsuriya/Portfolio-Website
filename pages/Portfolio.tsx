"use client";

import { Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import dynamic from "next/dynamic";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  MapPin,
  Calendar,
  Users,
  Award,
  Menu,
  X,
} from "lucide-react";

// Dynamically import heavy components with loading states
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {
    ssr: false,
    loading: () => <div className="opacity-0"></div>,
  },
);

const MotionH1 = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.h1),
  {
    ssr: false,
    loading: () => <h1></h1>,
  },
);

const MotionP = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.p),
  {
    ssr: false,
    loading: () => <p></p>,
  },
);

// Lightweight 3D Scene - only loads heavy version on user interaction
const ThreeDScene = dynamic(() => import("@/components/ThreeDScene"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-pulse text-cyber-blue text-sm">Loading...</div>
    </div>
  ),
});

// Optional full 3D scene for enhanced experience
const Full3DScene = dynamic(() => import("@/components/Full3DScene"), {
  ssr: false,
  loading: () => <ThreeDScene />,
});

// Component for alternating photos with CSS animations instead of Framer Motion
const AlternatingPhotos = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const photos = [
    "https://cdn.builder.io/o/assets%2F8f78a356a05540998176ea24bafbe59e%2F48a3bc2b96f6433fb7088e5329c6caa8?alt=media&token=9e5f5b58-b21d-4043-b7f6-db4ba5b88e6c&apiKey=8f78a356a05540998176ea24bafbe59e",
    "https://cdn.builder.io/o/assets%2F8f78a356a05540998176ea24bafbe59e%2F754a85c3b3644d44b48e0e37b6de8e09?alt=media&token=5a2f40b5-9a9f-4b32-8dd8-e1a1b8c6d3e7&apiKey=8f78a356a05540998176ea24bafbe59e",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-48 h-48 mx-auto">
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Prakash K ${index === 0 ? "Professional" : "Casual"}`}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-full border-4 border-cyber-blue/50 transition-all duration-500 ${
            currentPhoto === index
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90"
          }`}
        />
      ))}
      <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink p-1 animate-spin-slow">
        <div className="w-full h-full rounded-full border-4 border-background"></div>
      </div>
      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-pink/20 blur-lg animate-pulse"></div>
    </div>
  );
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [use3D, setUse3D] = useState(false);

  const roles = [
    "AI/ML Engineer",
    "Web Developer",
    "FullStack Developer",
    "Python Dev",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      title: "Personalized Chatbot",
      description:
        "Built an interactive chatbot using Python, integrating NLP libraries for intelligent conversations and user engagement.",
      tech: ["Python", "NLP", "TensorFlow"],
      github: "https://github.com/prakash-r8",
      demo: "#",
    },
    {
      title: "Virtual Mouse",
      description:
        "Developed a computer vision-based virtual mouse system using OpenCV and MediaPipe for gesture-controlled navigation.",
      tech: ["Python", "OpenCV", "MediaPipe"],
      github: "https://github.com/prakash-r8",
      demo: "#",
    },
    {
      title: "GenAI+n8n Integration",
      description:
        "Created automated workflows combining Generative AI capabilities with n8n for intelligent task automation.",
      tech: ["GenAI", "n8n", "API Integration"],
      github: "https://github.com/prakash-r8",
      demo: "#",
    },
    {
      title: "Drone Navigation System",
      description:
        "Engineered an autonomous drone navigation system using computer vision and machine learning algorithms.",
      tech: ["Python", "Computer Vision", "ML"],
      github: "https://github.com/prakash-r8",
      demo: "#",
    },
  ];

  const skills = {
    Programming: [
      { name: "Python 3", icon: "🐍" },
      { name: "JavaScript", icon: "⚡" },
      { name: "Embedded C", icon: "⚙️" },
      { name: "C++", icon: "💻" },
    ],
    "ML Frameworks": [
      { name: "PyTorch", icon: "🔥" },
      { name: "TensorFlow", icon: "🧠" },
      { name: "Scikit-learn", icon: "📊" },
    ],
    "NLP/GenAI": [
      { name: "Transformers", icon: "🤖" },
      { name: "OpenAI GPT-3.5", icon: "💬" },
      { name: "Google GenAI", icon: "🌟" },
    ],
    "Data Handling": [
      { name: "Pandas", icon: "🐼" },
      { name: "NumPy", icon: "🔢" },
      { name: "SQL", icon: "🗃️" },
      { name: "Polaris", icon: "⭐" },
    ],
    "APIs & Deployment": [
      { name: "REST APIs", icon: "🌐" },
      { name: "Docker", icon: "🐳" },
    ],
    "Cloud & Tools": [
      { name: "AWS", icon: "☁️" },
      { name: "Git", icon: "📝" },
      { name: "GitHub", icon: "🐙" },
      { name: "Jupyter", icon: "📓" },
      { name: "VS Code", icon: "💾" },
    ],
    Others: [
      { name: "OpenCV", icon: "👁️" },
      { name: "Mediapipe", icon: "🎯" },
      { name: "Raspberry Pi", icon: "🥧" },
      { name: "NVIDIA Jetpack", icon: "🚀" },
    ],
  };

  const experience = [
    {
      title: "Application Development Intern",
      company: "Zulu Defence Systems",
      period: "May 2024 - July 2024",
      location: "Bangalore",
      description:
        "Developed secure applications for defense sector using cutting-edge technologies and collaborated with cross-functional teams.",
      skills: ["Python", "Application Development", "Security Protocols"],
    },
    {
      title: "Java Fullstack Developer Intern",
      company: "Alphabit Technologies",
      period: "January 2024 - March 2024",
      location: "Remote",
      description:
        "Built full-stack web applications using Java ecosystem, implemented RESTful APIs and worked on frontend-backend integration.",
      skills: ["Java", "Spring Boot", "React", "REST APIs"],
    },
  ];

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Socialworks", href: "#socialworks" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground cyber-grid">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-cyber-blue/20 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold gradient-text">Prakash K</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-cyber-blue transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-cyber-blue/20 py-4 animate-slide-up">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-muted-foreground hover:text-cyber-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      >
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                Hi, I'm <span className="gradient-text">Prakash K</span>
              </h1>

              <div className="text-xl md:text-2xl text-muted-foreground h-8">
                <span
                  key={currentRole}
                  className="text-cyber-blue font-semibold transition-all duration-500"
                >
                  {roles[currentRole]}
                </span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg">
              Passionate about building intelligent solutions with AI/ML,
              developing scalable web applications, and exploring the
              intersection of technology and innovation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-cyber-blue hover:bg-cyber-blue/80">
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-cyber-blue/50 hover:border-cyber-blue"
              >
                <a
                  href="https://cdn.builder.io/o/assets%2F8f78a356a05540998176ea24bafbe59e%2Fbc4d2154139244e1ab261e09e1b6dfdd?alt=media&token=b1ed2727-64cc-49b1-a021-8b0a5c36b01e&apiKey=8f78a356a05540998176ea24bafbe59e"
                  download="Prakash_K_Resume.pdf"
                  target="_blank"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-8 animate-slide-up">
            <AlternatingPhotos />

            <div className="w-full h-64 lg:h-80 relative">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="animate-pulse text-cyber-blue text-sm">
                      Loading...
                    </div>
                  </div>
                }
              >
                {use3D ? <Full3DScene /> : <ThreeDScene />}
              </Suspense>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setUse3D(!use3D)}
                className="absolute bottom-2 right-2 text-xs border-cyber-blue/50"
              >
                {use3D ? "Simple" : "3D"} View
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-dark-surface/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional <span className="gradient-text">Experience</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My journey in software development and AI/ML engineering
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <div key={index} className="mb-8 animate-slide-up">
                <Card className="glass border-cyber-blue/20 p-6">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-cyber-blue mb-2">
                          {exp.title}
                        </h3>
                        <div className="text-lg font-medium mb-2">
                          {exp.company}
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="bg-cyber-blue/20 text-cyber-blue"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Showcasing my passion for AI/ML and full-stack development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="animate-slide-up">
                <Card className="glass border-cyber-blue/20 h-full hover:border-cyber-blue/40 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 gradient-text">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-cyber-blue/50 text-cyber-blue"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-cyber-blue/50 hover:border-cyber-blue"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-cyber-purple/50 hover:border-cyber-purple"
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-dark-surface/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(
              ([category, skillList], categoryIndex) => (
                <div key={category} className="animate-slide-up">
                  <Card className="glass border-cyber-blue/20 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-cyber-blue">
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {skillList.map((skill, index) => (
                          <div
                            key={skill.name}
                            className="flex items-center gap-3 p-2 rounded-lg glass hover:bg-cyber-blue/10 transition-colors"
                          >
                            <span className="text-xl">{skill.icon}</span>
                            <span className="text-sm font-medium">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Social Works Section */}
      <section id="socialworks" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Social <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Contributing to community and helping others grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="animate-slide-up">
              <Card className="glass border-cyber-blue/20 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-cyber-blue" />
                    <h3 className="text-xl font-semibold">U&I NGO</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-cyber-blue/20 text-cyber-blue"
                    >
                      City Leader
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Leading community initiatives and organizing educational
                    programs for underprivileged children, making a positive
                    impact in society through technology and education.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-slide-up">
              <Card className="glass border-cyber-blue/20 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-6 w-6 text-cyber-purple" />
                    <h3 className="text-xl font-semibold">
                      SGC (Students Guidance Cell)
                    </h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-cyber-purple/20 text-cyber-purple"
                      >
                        Core Member (2021-2024)
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-cyber-green/20 text-cyber-green"
                      >
                        Technical Head (2023-2024)
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Mentoring students in technical skills, organizing
                    workshops, and helping peers navigate their academic and
                    career paths in technology.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-surface/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let's connect and explore opportunities to work together
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="glass border-cyber-blue/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6 animate-slide-up">
                    <h3 className="text-2xl font-semibold gradient-text mb-6">
                      Let's start a conversation
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-cyber-blue/20 flex items-center justify-center">
                          <Mail className="h-6 w-6 text-cyber-blue" />
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <a
                            href="mailto:prakashranjanr8@gmail.com"
                            className="text-muted-foreground hover:text-cyber-blue transition-colors"
                          >
                            prakashranjanr8@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-cyber-green/20 flex items-center justify-center">
                          <Phone className="h-6 w-6 text-cyber-green" />
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <a
                            href="tel:+919487821387"
                            className="text-muted-foreground hover:text-cyber-green transition-colors"
                          >
                            +91 9487821387
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="border-cyber-blue/50 hover:border-cyber-blue"
                      >
                        <a
                          href="https://github.com/prakash-r8"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="border-cyber-blue/50 hover:border-cyber-blue"
                      >
                        <a
                          href="https://linkedin.com/in/prakash-r8"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6 animate-slide-up">
                    <h3 className="text-xl font-semibold">Quick Actions</h3>

                    <div className="space-y-4">
                      <Button
                        asChild
                        className="w-full bg-cyber-blue hover:bg-cyber-blue/80"
                      >
                        <a href="mailto:prakashranjanr8@gmail.com">
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        asChild
                        className="w-full border-cyber-blue/50 hover:border-cyber-blue"
                      >
                        <a
                          href="https://cdn.builder.io/o/assets%2F8f78a356a05540998176ea24bafbe59e%2Fbc4d2154139244e1ab261e09e1b6dfdd?alt=media&token=b1ed2727-64cc-49b1-a021-8b0a5c36b01e&apiKey=8f78a356a05540998176ea24bafbe59e"
                          download="Prakash_K_Resume.pdf"
                          target="_blank"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Resume
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        asChild
                        className="w-full border-cyber-purple/50 hover:border-cyber-purple"
                      >
                        <a
                          href="https://linkedin.com/in/prakash-r8"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="mr-2 h-4 w-4" />
                          Connect on LinkedIn
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyber-blue/20 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>
              &copy; 2025 Prakash K. Built with Next.js and passion for
              innovation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
