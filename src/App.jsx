import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Cpu, Brain, Database, Globe, GraduationCap, Briefcase, Camera, Terminal, Users, ExternalLink, School } from 'lucide-react';

// Import Components
import Robot from './components/Robot';
import { SkillCard, ProjectCard, TimelineCard, SocialButton } from './components/UIComponents';

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
            {['About', 'Skills', 'Projects', 'Experience'].map((item) => (
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
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-blue-500"></span>
              <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">Data Science & AI Undergrad</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Designing <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Intelligent Agents
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-md leading-relaxed">
              Bridging the gap between complex data models and human-centric applications. 
              Specialized in Agentic AI, NLP, and Deep Learning (NeRF).
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

          {/* ROBOT CONTAINER */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[600px] w-full flex items-center justify-center relative z-10"
          >
            <Canvas 
              className="w-full h-full"
              camera={{ position: [0, 0, 12], fov: 25 }} 
              gl={{ toneMappingExposure: 0.9 }} // Controls overall brightness
            >
              {/* Darker Environment to keep the face black */}
              <Environment preset="city" environmentIntensity={0.3} /> 
              
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 10, 5]} intensity={2} />
              <pointLight position={[-5, 5, 5]} intensity={2} color="#a855f7" distance={10} />

              <group position={[0, -0.6, 0]}>
                 <Robot />
              </group>

              {/* BLOOM EFFECT */}
              <EffectComposer>
                <Bloom 
                    intensity={2.5} 
                    luminanceThreshold={1.1} // Only glow VERY bright things (eyes)
                    mipmapBlur 
                />
              </EffectComposer>
            </Canvas>
          </motion.div>
        </div>
      </section>
      
      {/* ... KEEP YOUR OTHER SECTIONS BELOW (About, Skills, etc.) ... */}
      <section id="about" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-900/50 p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-8">About Me</h2>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>Hello! I am <strong>Ishan Srivastava</strong>, a pre-final year undergraduate pursuing a B.Tech in <strong>Data Science and Artificial Intelligence</strong> at <span className="text-blue-400 font-medium">IIIT Dharwad</span>. My journey in technology is defined by a passion for building systems that bridge the gap between complex data models and human-centric utility.</p>
              <p>Technically, I specialize in <strong>Agentic AI</strong> and <strong>Frontend Development</strong>. I don't just train models; I build complete ecosystems around them. Whether it's architecting multi-agent retail systems like <em>Nexora</em> or fine-tuning LLMs for medical diagnostics in <em>ArogyAI</em>, I love the challenge of making AI "act" rather than just "speak."</p>
              <p>Beyond code, I am a firm believer in community and storytelling. As the <strong>Vice President</strong> of the Microsoft Student Ambassador Club and the <strong>AI/ML Team Lead</strong> at the Open Source Code Club, I actively mentor peers and organize tech events. I also explore my creative side as a member of <strong>Inmotion</strong> (Filmography) and <strong>Iridescence</strong> (Photography), where I learn that the best engineering, like art, requires a unique perspective.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="skills" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center text-white">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SkillCard icon={<Code2 />} title="Languages" skills={['Python', 'C++', 'JavaScript', 'SQL', 'LaTeX']} />
            <SkillCard icon={<Brain />} title="AI & DL" skills={['PyTorch', 'TensorFlow', 'NeRF', 'LLMs', 'LangGraph']} />
            <SkillCard icon={<Globe />} title="Web Stack" skills={['React.js', 'FastAPI', 'AWS', 'Docker', 'Tailwind']} />
            <SkillCard icon={<Database />} title="Tools" skills={['Git', 'VS Code', 'PyCharm', 'Streamlit', 'Hugging Face']} />
          </div>
        </div>
      </section>
      <section id="projects" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
             <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
             <span className="text-slate-500 text-sm hidden md:block">/// 2024 - 2025</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard title="Nexora Retail Agent" description="A multi-agent retail concierge orchestrating specialized workers for catalog, inventory, and sales using LangGraph and React." tags={['Agentic AI', 'LangGraph', 'FastAPI']} color="blue" link="https://github.com/Ishan2364/NEXORA" />
             <ProjectCard title="StayPredict" description="Employee attrition prediction system using Stacking Ensemble (XGBoost, SVM, Random Forest) with SHAP explainability." tags={['Ensemble ML', 'XGBoost', 'SHAP']} color="emerald" link="https://github.com/Ishan2364" />
            <ProjectCard title="Inquiro News Bot" description="Real-time news analytics dashboard integrating Reddit & Google News APIs with Hugging Face Transformers for sentiment analysis." tags={['NLP', 'PRAW', 'React.js']} color="amber" link="https://github.com/Ishan2364/Inquiro-News-Bot" />
            <ProjectCard title="Heart Disease Prediction" description="Medical risk assessment model using Logistic Regression and Random Forest, optimized with Hugging Face Transformers." tags={['Healthcare', 'Scikit-Learn', 'Research']} color="violet" link="https://github.com/Ishan2364/Heart_Disease_Prediction_Model" />
          </div>
        </div>
      </section>
      <section id="experience" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3"><Briefcase className="text-blue-500" /> Research Experience</h2>
                <TimelineCard title="Research Intern (Deep Learning)" subtitle="IIIT Dharwad (Prof. Pavan Kumar C)" date="Autumn 2025" description="Exploring Deep Learning-based 2D-to-3D image conversion techniques. Analyzing advancements in depth estimation and NeRF for efficiency." icon={<Brain size={20} />} />
                <TimelineCard title="Research Intern (NLP)" subtitle="IIT BHU (Prof. Anil Kumar Singh)" date="Summer 2025" description="Conducted research on Named Entity Recognition (NER) for Indic languages. Fine-tuned LLMs and participated in FIRE benchmarking efforts." icon={<Terminal size={20} />} />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3"><GraduationCap className="text-blue-500" /> Education History</h2>
                <TimelineCard title="B.Tech in DSAI" subtitle="IIIT Dharwad" date="2023 - 2027" description="CGPA: 8.4. Specializing in Data Science and AI. Vice President of Microsoft Student Ambassadors." icon={<GraduationCap size={20} />} />
                 <TimelineCard title="Higher Secondary (XII)" subtitle="Sunbeam English School" date="2022" description="Percentage: 88.6%. CBSE Board." icon={<GraduationCap size={20} />} />
            </div>
        </div>
      </section>
      <section className="py-16 relative z-10 bg-slate-900/20">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3"><School className="text-blue-400" /> Alma Mater</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <a href="https://iiitdwd.ac.in/" target="_blank" rel="noopener noreferrer" className="group bg-slate-900/40 border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-all flex flex-col relative overflow-hidden">
                    <div className="absolute top-6 right-6 text-slate-600 group-hover:text-blue-400 transition-colors"><ExternalLink size={24} /></div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">IIIT Dharwad</h3>
                    <p className="text-sm text-blue-500 font-medium mb-4 uppercase tracking-wider">Institute of National Importance</p>
                    <p className="text-slate-400 leading-relaxed">Indian Institute of Information Technology Dharwad is an Institute of National Importance set up under a Public-Private Partnership mode by the Ministry of Education, Government of India.</p>
                </a>
                <a href="https://www.sunbeamschools.com/school/bhagwanpur/" target="_blank" rel="noopener noreferrer" className="group bg-slate-900/40 border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-all flex flex-col relative overflow-hidden">
                    <div className="absolute top-6 right-6 text-slate-600 group-hover:text-blue-400 transition-colors"><ExternalLink size={24} /></div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Sunbeam English School</h3>
                    <p className="text-sm text-blue-500 font-medium mb-4 uppercase tracking-wider">Bhagwanpur, Varanasi</p>
                    <p className="text-slate-400 leading-relaxed">Sunbeam English School Bhagwanpur is a premier educational institution in Varanasi, known for its excellence in academics and holistic development.</p>
                </a>
            </div>
        </div>
      </section>
      <section className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Leadership & Co-Curricular</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl hover:border-yellow-500/30 transition-all">
                    <div className="text-yellow-500 mb-3"><Users size={28} /></div>
                    <h3 className="text-white font-bold text-lg mb-2">Vice President</h3>
                    <p className="text-slate-400 text-sm">Microsoft Student Ambassador (MSA), IIIT Dharwad</p>
                </div>
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl hover:border-yellow-500/30 transition-all">
                    <div className="text-yellow-500 mb-3"><Terminal size={28} /></div>
                    <h3 className="text-white font-bold text-lg mb-2">AI/ML Team Lead</h3>
                    <p className="text-slate-400 text-sm">Open Source Code Club (OSCC)</p>
                </div>
                <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl hover:border-yellow-500/30 transition-all">
                    <div className="text-yellow-500 mb-3"><Camera size={28} /></div>
                    <h3 className="text-white font-bold text-lg mb-2">Club Member</h3>
                    <p className="text-slate-400 text-sm">Inmotion (Filmography) & Iridescence (Photography) Clubs</p>
                </div>
            </div>
        </div>
      </section>
      <section id="contact" className="py-24 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-white">Let's Connect</h2>
        <div className="flex justify-center gap-4">
           <SocialButton href="mailto:helloishan23@gmail.com" icon={<Mail size={20} />} label="Email" />
           <SocialButton href="https://github.com/Ishan2364" icon={<Github size={20} />} label="GitHub" />
           <SocialButton href="https://www.linkedin.com/in/ishan-srivastava-976993288/" icon={<Linkedin size={20} />} label="LinkedIn" />
        </div>
        <footer className="mt-24 text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Ishan Srivastava. Crafted with React & Three.js</p>
        </footer>
      </section>
    </div>
  );
};

export default Portfolio;