import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

// --- SKILL CARD ---
export const SkillCard = ({ icon, title, skills }) => (
  <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:bg-slate-900/60 backdrop-blur-sm">
    <div className="text-blue-400 mb-4 bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-xl">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span key={index} className="text-xs font-medium text-slate-400 bg-white/5 px-3 py-1.5 rounded-full">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

// --- PROJECT CARD ---
export const ProjectCard = ({ title, description, tags, color, link }) => {
  const colorVariants = {
    blue: 'hover:border-blue-500/50',
    emerald: 'hover:border-emerald-500/50',
    violet: 'hover:border-violet-500/50',
    amber: 'hover:border-amber-500/50',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`group p-8 rounded-3xl bg-slate-900/40 border border-white/5 transition-all duration-300 ${colorVariants[color]} relative overflow-hidden backdrop-blur-sm`}
    >
      <a 
        href={link}
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-0 right-0 p-6 opacity-60 hover:opacity-100 hover:text-blue-400 transition-all text-slate-500 z-20 cursor-pointer"
        title="View Code on GitHub"
      >
        <ExternalLink size={24} />
      </a>
      
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 mb-6 leading-relaxed">{description}</p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, i) => (
          <span key={i} className="text-xs font-medium text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-white/5">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// --- TIMELINE CARD (NEW!) ---
// Used for Experience and Education
export const TimelineCard = ({ title, subtitle, date, description, icon }) => (
  <div className="flex gap-6 relative group">
    {/* Line connector */}
    <div className="hidden md:flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-slate-900 border border-blue-500/30 flex items-center justify-center text-blue-400 z-10 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div className="h-full w-px bg-white/10 my-2"></div>
    </div>
    
    <div className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all flex-1 mb-8 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
         <h3 className="text-xl font-bold text-white">{title}</h3>
         <div className="flex items-center gap-2 text-sm text-slate-500 bg-white/5 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
            <Calendar size={14} />
            <span>{date}</span>
         </div>
      </div>
      <div className="text-blue-400 font-medium mb-4">{subtitle}</div>
      <p className="text-slate-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  </div>
);

// --- SOCIAL BUTTON ---
export const SocialButton = ({ href, icon, label }) => (
  <a 
    href={href}
    target="_blank"             
    rel="noopener noreferrer"   
    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-white font-medium transition-all border border-white/5 hover:border-white/20"
  >
    {icon}
    <span>{label}</span>
  </a>
);