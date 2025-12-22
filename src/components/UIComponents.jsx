import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

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

export const ProjectCard = ({ title, description, tags, color }) => {
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
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500">
        <ExternalLink size={20} />
      </div>
      
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

export const SocialButton = ({ href, icon, label }) => (
  <a 
    href={href}
    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-white font-medium transition-all border border-white/5 hover:border-white/20"
  >
    {icon}
    <span>{label}</span>
  </a>
);