import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

// --- STYLE HELPERS ---
const getGlassClass = (isDark) => 
  isDark 
    ? "bg-slate-900/60 border-white/10 text-slate-300" // Dark Mode Glass
    : "bg-white/60 border-slate-200 text-slate-700 shadow-lg shadow-blue-500/5"; // Light Mode Glass

const getBadgeClass = (isDark) =>
  isDark
    ? "bg-white/5 text-slate-300 border-white/5"
    : "bg-blue-100/50 text-blue-700 border-blue-200";

// --- SKILL CARD ---
export const SkillCard = ({ icon, title, skills, isDark }) => (
  <div className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 ${getGlassClass(isDark)}`}>
    <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-xl ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
      {icon}
    </div>
    <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span key={index} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getBadgeClass(isDark)}`}>
          {skill}
        </span>
      ))}
    </div>
  </div>
);

// --- PROJECT CARD ---
export const ProjectCard = ({ title, description, tags, link, isDark }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`group p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden backdrop-blur-md ${getGlassClass(isDark)} hover:border-blue-500/50`}
  >
    <a 
      href={link}
      target="_blank" 
      rel="noopener noreferrer"
      className="absolute top-6 right-6 opacity-60 hover:opacity-100 hover:text-blue-500 transition-all cursor-pointer"
    >
      <ExternalLink size={24} />
    </a>
    
    <h3 className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
    <p className={`mb-6 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{description}</p>
    
    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map((tag, i) => (
        <span key={i} className={`text-xs font-medium px-3 py-1 rounded-full border ${getBadgeClass(isDark)}`}>
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

// --- TIMELINE CARD ---
export const TimelineCard = ({ title, subtitle, date, description, icon, isDark }) => (
  <div className="flex gap-6 relative group">
    <div className="hidden md:flex flex-col items-center">
      <div className={`w-12 h-12 rounded-full border flex items-center justify-center z-10 transition-colors duration-300 ${isDark ? "bg-slate-900 border-blue-500/30 text-blue-400 group-hover:bg-blue-500 group-hover:text-white" : "bg-white border-blue-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"}`}>
        {icon}
      </div>
      <div className={`h-full w-px my-2 ${isDark ? "bg-white/10" : "bg-slate-200"}`}></div>
    </div>
    
    <div className={`p-6 rounded-2xl border transition-all flex-1 mb-8 backdrop-blur-md ${getGlassClass(isDark)}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
         <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
         <div className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full w-fit mt-2 md:mt-0 ${getBadgeClass(isDark)}`}>
            <Calendar size={14} />
            <span>{date}</span>
         </div>
      </div>
      <div className={`font-medium mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>{subtitle}</div>
      <p className={`leading-relaxed text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
        {description}
      </p>
    </div>
  </div>
);

// --- SOCIAL BUTTON ---
export const SocialButton = ({ href, icon, label, isDark }) => (
  <a 
    href={href}
    target="_blank"             
    rel="noopener noreferrer"   
    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all border ${isDark ? "bg-white/5 hover:bg-white/10 border-white/5 text-white" : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm"}`}
  >
    {icon}
    <span>{label}</span>
  </a>
);