import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
// Added new icons: Trophy, Zap, Video, Aperture, Target
import { Github, Linkedin, Mail, Code2, Brain, Database, Globe, GraduationCap, Briefcase, Camera, Terminal, Users, ExternalLink, School, Sun, Moon, Calendar, MapPin, Award, Trophy, Zap, Video, Aperture, Target } from 'lucide-react';
import Robot from './components/Robot';
import Background3D from './components/Background3D';
import CreativeGallery from './components/CreativeGallery';
// --- SUB-COMPONENTS ---

const SkillCard = ({ icon, title, skills }) => (
  <div className="skill-card glass-effect">
    <div className="skill-icon">{icon}</div>
    <h3>{title}</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {skills.map((skill, index) => (
        <span key={index} className="tag">{skill}</span>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ title, description, tags, link }) => (
  <div className="project-card glass-effect">
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 className="project-title">{title}</h3>
        <a href={link} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
            <ExternalLink size={24} />
        </a>
    </div>
    <p className="project-desc">{description}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
      {tags.map((tag, i) => (
        <span key={i} className="tag">{tag}</span>
      ))}
    </div>
  </div>
);

const TimelineCard = ({ title, subtitle, date, description, icon }) => (
  <div className="timeline-item">
    <div className="timeline-marker">
      <div className="timeline-circle">{icon}</div>
      <div className="timeline-line"></div>
    </div>
    <div className="timeline-content glass-effect">
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '8px' }}>
         <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>{title}</h3>
         <span className="timeline-date"><Calendar size={12} style={{marginRight:4}}/>{date}</span>
      </div>
      <div style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '12px' }}>{subtitle}</div>
      <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
    </div>
  </div>
);

// New Component for Positions of Responsibility
const LeadershipCard = ({ role, org, icon, color }) => (
  <div className="glass-effect" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
    <div style={{ 
      minWidth: '50px', height: '50px', borderRadius: '12px', 
      background: `rgba(${color}, 0.1)`, color: `rgb(${color})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {icon}
    </div>
    <div>
      <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{role}</h3>
      <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontWeight: 500 }}>{org}</p>
    </div>
  </div>
);

// New Component for Hackathons
const AchievementCard = ({ title, result, date, icon, statusColor = 'var(--accent)' }) => (
  <div className="glass-effect" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ color: statusColor }}>{icon}</div>
        <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{title}</h3>
            <p style={{ margin: '4px 0 0', color: statusColor, fontSize: '0.9rem', fontWeight: 600 }}>{result}</p>
        </div>
    </div>
    <span className="tag" style={{ background: 'rgba(255,255,255,0.05)', whiteSpace: 'nowrap' }}>{date}</span>
  </div>
);

// --- MAIN APP ---

const Portfolio = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDark]);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      
      <Background3D isDark={isDark} />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            ISHAN<span>.SRIVASTAVA</span>
          </div>
          
          <div className="nav-actions">
            <ul className="nav-links">
                {['About', 'Skills', 'Projects', 'Experience'].map((item) => (
                <li key={item}>
                    <a href={`#${item.toLowerCase()}`} onClick={(e) => handleScroll(e, item.toLowerCase())}>
                        {item}
                    </a>
                </li>
                ))}
            </ul>
            <button onClick={() => setIsDark(!isDark)} className="theme-toggle">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <span className="badge">Data Science & AI Undergrad</span>
            <h1>
              Designing <br/>
              <span className="gradient-text">Intelligent Agents</span>
            </h1>
            <p>
              Bridging the gap between complex data models and human-centric applications. 
              Specialized in Agentic AI, NLP, and Deep Learning (NeRF).
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#projects" onClick={(e) => handleScroll(e, 'projects')} className="btn primary">View Work</a>
              <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="btn outline">Contact</a>
            </div>
          </motion.div>

          <div 
            style={{ 
              height: '600px', 
              width: '100%', 
              position: 'relative', 
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Canvas 
              camera={{ position: [0, 0, 12], fov: 25 }} 
              gl={{ toneMappingExposure: 0.9 }}
              resize={{ scroll: false, debounce: 0 }} 
            >
              <Environment preset="city" environmentIntensity={isDark ? 0.3 : 0.8} /> 
              <ambientLight intensity={isDark ? 0.4 : 0.7} />
              <directionalLight position={[5, 10, 5]} intensity={2} />
              <pointLight position={[-5, 5, 5]} intensity={2} color="#a855f7" distance={10} />
              
              <group position={[0, -0.6, 0]}>
                 <Robot />
              </group>
              
              <EffectComposer>
                <Bloom intensity={2.5} luminanceThreshold={1.1} mipmapBlur />
              </EffectComposer>
            </Canvas>
          </div>
        </div>
      </section>
      
      {/* ABOUT SECTION */}
      <section id="about" className="section">
        <div className="container">
          <div className="glass-effect" style={{ padding: '48px' }}>
            <h2 className="section-title" style={{ marginBottom: '24px' }}>About Me</h2>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p>Hello! I am <strong>Ishan Srivastava</strong>, a pre-final year undergraduate pursuing a B.Tech in <strong>Data Science and Artificial Intelligence</strong> at <span style={{ color: 'var(--accent)' }}>IIIT Dharwad</span>.</p>
              <p>Technically, I specialize in <strong>Agentic AI</strong> and <strong>Frontend Development</strong>. I don't just train models; I build complete ecosystems around them. Whether it's architecting multi-agent retail systems like <em>Nexora</em> or fine-tuning LLMs for medical diagnostics in <em>ArogyAI</em>, I love the challenge of making AI "act" rather than just "speak."</p>
              <p>Beyond code, I am a firm believer in community and storytelling. As the Vice President of the Microsoft Student Ambassador Club and the AI/ML Team Lead at the Open Source Code Club, I actively mentor peers and organize tech events. I also explore my creative side as a member of Inmotion (Filmography) and Iridescence (Photography), where I learn that the best engineering, like art, requires a unique perspective.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title text-center">Technical Expertise</h2>
          <div className="skills-grid">
            <SkillCard icon={<Code2 size={32} />} title="Languages" skills={['Python', 'C++', 'JavaScript', 'SQL', 'LaTeX']} />
            <SkillCard icon={<Brain size={32} />} title="AI & DL" skills={['PyTorch', 'TensorFlow', 'NeRF', 'LLMs', 'LangGraph']} />
            <SkillCard icon={<Globe size={32} />} title="Web Stack" skills={['React.js', 'FastAPI', 'AWS', 'Docker', 'Tailwind']} />
            <SkillCard icon={<Database size={32} />} title="Tools" skills={['Git', 'VS Code', 'PyCharm', 'Streamlit', 'Hugging Face']} />
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
             <h2 className="section-title" style={{ margin: 0 }}>Featured Projects</h2>
             <span style={{ color: 'var(--text-secondary)' }}>/// 2024 - 2025</span>
          </div>
          <div className="project-grid">
            <ProjectCard title="Nexora Retail Agent" description="A multi-agent retail concierge orchestrating specialized workers for catalog, inventory, and sales using LangGraph and React." tags={['Agentic AI', 'LangGraph', 'FastAPI']} link="https://github.com/Ishan2364/NEXORA" />
            <ProjectCard title="Dialectica" description="Host a debate between AIs assign them roles, their personality and get info about both side of a topic " tags={['Agentic AI', 'LangGraph', 'GrokAI']} link="https://github.com/Ishan2364/Dialectica-DebateAI-" />
            <ProjectCard title="StayPredict" description="Employee attrition prediction system using Stacking Ensemble (XGBoost, SVM, Random Forest) with SHAP explainability." tags={['Ensemble ML', 'XGBoost', 'SHAP']} link="https://github.com/Ishan2364/StayPredictML" />
            <ProjectCard title="Inquiro News Bot" description="Real-time news analytics dashboard integrating Reddit & Google News APIs with Hugging Face Transformers for sentiment analysis." tags={['NLP', 'PRAW', 'React.js']} link="https://github.com/Ishan2364/Inquiro-News-Bot" />
            <ProjectCard title="Heart Disease Prediction" description="Medical risk assessment model using Logistic Regression and Random Forest, optimized with Hugging Face Transformers." tags={['Healthcare', 'Scikit-Learn', 'Research']} link="https://github.com/Ishan2364/Heart_Disease_Prediction_Model" />
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="section">
        <div className="container hero-grid" style={{ alignItems: 'start' }}>
            <div>
                <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Briefcase size={32} color="var(--accent)" /> Research
                </h2>
                <TimelineCard title="Research Intern (Deep Learning)" subtitle="IIIT Dharwad (Prof. Pavan Kumar C)" date="Autumn 2025" description="Exploring Deep Learning-based 2D-to-3D image conversion techniques. Analyzing advancements in depth estimation and NeRF for efficiency." icon={<Brain size={20} />} />
                <TimelineCard title="Research Intern (NLP)" subtitle="IIT BHU (Prof. Anil Kumar Singh)" date="Summer 2025" description="Conducted research on Named Entity Recognition (NER) for Indic languages. Fine-tuned LLMs and participated in FIRE benchmarking efforts." icon={<Terminal size={20} />} />
            </div>
            <div>
                <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <GraduationCap size={32} color="var(--accent)" /> Education
                </h2>
                <TimelineCard title="B.Tech in DSAI" subtitle="IIIT Dharwad" date="2023 - 2027" description="CGPA: 8.4. Specializing in Data Science and AI. Vice President of Microsoft Student Ambassadors." icon={<GraduationCap size={20} />} />
                 <TimelineCard title="Higher Secondary (XII)" subtitle="Sunbeam English School" date="2022" description="Percentage: 88.6%. CBSE Board." icon={<GraduationCap size={20} />} />
            </div>
        </div>
      </section>

      {/* --- NEW SECTION: POSITIONS OF RESPONSIBILITY --- */}
      <section className="section">
        <div className="container">
            <h2 className="section-title text-center">Leadership & Community</h2>
            <div className="project-grid" style={{ marginTop: '40px' }}>
                <LeadershipCard 
                    role="Vice President" 
                    org="Microsoft Student Ambassadors (MSA) - IIIT Dharwad" 
                    icon={<Users size={28} />} 
                    color="6, 182, 212" // Cyan
                />
                <LeadershipCard 
                    role="AI/ML Team Lead" 
                    org="Open Source Code Club - IIIT Dharwad" 
                    icon={<Terminal size={28} />} 
                    color="168, 85, 247" // Purple
                />
                <LeadershipCard 
                    role="Member" 
                    org="Inmotion (Filmography Club)" 
                    icon={<Video size={28} />} 
                    color="234, 88, 12" // Orange
                />
                <LeadershipCard 
                    role="Member" 
                    org="Iridescence (Photography Club)" 
                    icon={<Aperture size={28} />} 
                    color="236, 72, 153" // Pink
                />
            </div>
        </div>
      </section>



      {/* --- NEW SECTION: HACKATHONS --- */}
      <section className="section">
        <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Competitions & Hackathons</h2>
                <span style={{ color: 'var(--accent)' }}></span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AchievementCard 
                    title="EY Techathon 6.0" 
                    result="Selected for Round 2 (Ongoing)" 
                    date="Present" 
                    icon={<Zap size={24} />}
                    statusColor="#10b981" // Green for ongoing success
                />
                 <AchievementCard 
                    title="Udbhav Inter-IIIT Hackathon" 
                    result="Qualified for Round 2" 
                    date="Nov 2025" 
                    icon={<Code2 size={24} />}
                />
                <AchievementCard 
                    title="Microsoft Triwizardathon" 
                    result="Qualified for Round 2" 
                    date="Aug 2025" 
                    icon={<Target size={24} />}
                />
                <AchievementCard 
                    title="Google Agentic AI Hackathon" 
                    result="Selected for In-Person Round (Waitlist)" 
                    date="July 2025" 
                    icon={<Trophy size={24} />}
                />
            </div>
        </div>
      </section>

      {/* ALMA MATER */}
      <section className="section">
        <div className="container">
            <h2 className="section-title text-center font-heading">Alma Mater</h2>
            
            <div className="project-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                
                {/* IIIT DHARWAD CARD */}
                <a href="https://iiitdwd.ac.in/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} className="project-card glass-effect alma-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                        <div>
                            <div style={{ color: 'var(--accent)', marginBottom: '8px' }}>
                                <School size={32} />
                            </div>
                            <h3 className="font-heading" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
                                IIIT Dharwad
                            </h3>
                            <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '1rem', marginTop: '4px' }}>
                                B.Tech in Data Science & AI
                            </p>
                        </div>
                        <ExternalLink size={20} color="var(--text-secondary)" style={{ opacity: 0.6 }} />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                        <span className="meta-tag">
                            <Calendar size={14} /> 2023 - 2027
                        </span>
                        <span className="meta-tag">
                            <MapPin size={14} /> Dharwad, Karnataka
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        An Institute of National Importance. Specializing in advanced <strong style={{ color: 'var(--text-primary)' }}>Agentic AI</strong> and <strong style={{ color: 'var(--text-primary)' }}>Deep Learning</strong> research. Active contributor to the open-source community and technical societies.
                    </p>
                </a>

                {/* SUNBEAM SCHOOL CARD */}
                <a href="https://www.sunbeamschools.com/school/bhagwanpur/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }} className="project-card glass-effect alma-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                        <div>
                            <div style={{ color: 'var(--accent)', marginBottom: '8px' }}>
                                <Award size={32} />
                            </div>
                            <h3 className="font-heading" style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
                                Sunbeam English School
                            </h3>
                            <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '1rem', marginTop: '4px' }}>
                                Higher Secondary (CBSE)
                            </p>
                        </div>
                        <ExternalLink size={20} color="var(--text-secondary)" style={{ opacity: 0.6 }} />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                        <span className="meta-tag">
                            <Calendar size={14} /> Class of 2022
                        </span>
                        <span className="meta-tag">
                            <MapPin size={14} /> Varanasi, Uttar Pradesh
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        A premier educational institution known for academic excellence. Secured <strong style={{ color: 'var(--text-primary)' }}>88.6%</strong> in finals. Built a strong foundation in Mathematics and Computer Science that drives my engineering career today.
                    </p>
                </a>

            </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section text-center">
        <div className="container">
            
            {/* Main Contact Card */}
            <div className="glass-effect" style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 40px', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'var(--accent)', opacity: '0.15', filter: 'blur(100px)', borderRadius: '50%', pointerEvents: 'none' }}></div>
                <h2 className="font-heading" style={{ fontSize: '3.5rem', marginBottom: '24px', color: 'var(--text-primary)', fontWeight: 800, letterSpacing: '-1px' }}>
                    Let's work together.
                </h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: '1.6' }}>
                    Creating intelligent agents and scalable systems. Whether you have a project in mind or just want to say hi, feel free to reach out!
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
                    <a href="mailto:helloishan23@gmail.com" className="btn primary" style={{ padding: '16px 40px', fontSize: '1.1rem', borderRadius: '50px' }}>
                        <Mail size={22} /> Say Hello
                    </a>
                    <a href="https://github.com/Ishan2364" className="btn outline" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '50px' }}>
                        <Github size={22} /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/ishan-srivastava-976993288/" className="btn outline" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '50px' }}>
                        <Linkedin size={22} /> LinkedIn
                    </a>
                </div>
            </div>

{/* NEW CREATIVE CORNER */}
      <CreativeGallery />
      
            {/* Footer Info */}
            <footer style={{ marginTop: '80px', color: 'var(--text-secondary)', fontSize: '0.95rem', opacity: 0.7 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <p style={{ margin: 0 }}>© {new Date().getFullYear()} Ishan Srivastava</p>
                    <span style={{ width: '4px', height: '4px', background: 'currentColor', borderRadius: '50%' }}></span>
                    <p style={{ margin: 0 }}>Crafted with React & Three.js</p>
                </div>
            </footer>
        </div>
      </section>


    </div>
  );
};

export default Portfolio;