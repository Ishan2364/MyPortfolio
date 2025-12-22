import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei'; // NO OrbitControls here!
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Cpu, Brain, Database } from 'lucide-react';

// Import the Robot
import Robot from './components/Robot';
import { SkillCard, ProjectCard, SocialButton } from './components/UIComponents';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white tracking-wide">
            ISHAN<span className="text-blue-500">.SRIVASTAVA</span>
          </h1>
          <div className="space-x-8 text-sm font-medium hidden md:block text-slate-400">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center pt-20 relative z-10 overflow-hidden">
        <div className="max-w-6xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* TEXT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-blue-500"></span>
              <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">AI / ML Engineer</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Designing <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Intelligent Agents
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-md leading-relaxed">
              Bridging the gap between complex data models and human-centric applications. 
              Specialized in Generative AI, NLP, and Full Stack Engineering.
            </p>
            <div className="flex gap-4">
              <a href="#projects" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                View Work
              </a>
              <a href="#contact" className="px-8 py-3 border border-slate-700 hover:border-slate-500 rounded-full text-slate-300 transition-all">
                Contact
              </a>
            </div>
          </motion.div>

          {/* 3D ROBOT CONTAINER */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.2 }}
            // FIX: Fixed pixel height prevents resizing bugs
            className="h-[600px] w-full flex items-center justify-center relative z-10"
          >
            <Canvas 
              className="w-full h-full"
              // FIX: Locked Camera Position. 
              camera={{ position: [0, 0, 12], fov: 25 }} 
            >
              <Environment preset="city" /> 
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={2} />
              <pointLight position={[-2, 2, 2]} intensity={2} color="#a855f7" distance={5} />

              <group position={[0, -0.2, 0]}>
                 <Robot />
              </group>
            </Canvas>
          </motion.div>
        </div>
      </section>

      {/* OTHER SECTIONS (Keep your existing content below) */}
      <section id="about" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-900/50 p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-6">About</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              I am a 3rd-year student at <span className="text-blue-400 font-medium">IIIT Dharwad</span>, driven by the potential of Artificial Intelligence to reshape industries.
              <br /><br />
              My work focuses on building <strong>Agentic AI systems</strong>—specifically in the retail and medical domains. Whether it's optimizing inventory through synthetic data or creating conversational assistants for doctors, I aim to build software that not only "thinks" but acts.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center text-white">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SkillCard icon={<Code2 />} title="Languages" skills={['Python', 'JavaScript', 'C++', 'SQL']} />
            <SkillCard icon={<Brain />} title="AI Core" skills={['Machine Learning', 'Deep Learning', 'NLP', 'LLMs']} />
            <SkillCard icon={<Cpu />} title="Frameworks" skills={['PyTorch', 'TensorFlow', 'React', 'FastAPI']} />
            <SkillCard icon={<Database />} title="Tools" skills={['Git', 'Docker', 'LangGraph', 'AWS']} />
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
             <h2 className="text-3xl font-bold text-white">Selected Projects</h2>
             <span className="text-slate-500 text-sm hidden md:block">/// 2024 - 2025</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard title="Nexora Retail Agent" description="Conversational AI for ABFRL." tags={['Python', 'LangGraph']} color="blue" />
            <ProjectCard title="Medical 3D Portal" description="Patient-doctor interface." tags={['React', 'Three.js']} color="emerald" />
            <ProjectCard title="Credit Risk Predictor" description="Risk assessment model." tags={['XGBoost', 'Scikit-Learn']} color="violet" />
            <ProjectCard title="Synthetic Inventory Gen" description="Data generation pipeline." tags={['Python', 'Faker']} color="amber" />
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-white">Let's Connect</h2>
        <div className="flex justify-center gap-4">
           <SocialButton href="#" icon={<Mail size={20} />} label="Email" />
           <SocialButton href="#" icon={<Github size={20} />} label="GitHub" />
           <SocialButton href="#" icon={<Linkedin size={20} />} label="LinkedIn" />
        </div>
        <footer className="mt-24 text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Ishan Srivastava. Crafted with React & Three.js</p>
        </footer>
      </section>
    </div>
  );
};

export default Portfolio;