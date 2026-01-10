import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Film, Aperture, Play, X, MapPin, Calendar } from 'lucide-react';

import ChoptaValley from "../assets/IMG_6247.JPG";
import MumbaiAirportT2 from "../assets/IMG_0609.jpg";
import Campus from "../assets/IMG_8197.jpg";
import GokarnaSunset from "../assets/IMG_1532.jpg";
import YanaCaves from "../assets/IMG_1498.jpg";
import Landour from "../assets/IMG_5983.jpg";
import CaboDeRama from "../assets/IMG_9158.JPG";
import SunsetCampus from "../assets/IMG_8914.jpg";
import Waterfall from "../assets/IMG_7030.jpg";

// --- DATA ---
const galleryItems = [
  {
    id: 1,
    title: "Chopta Valley",
    category: "Photography",
    date: "April 2025",
    location: "Chopta Valley , Uttarakhand",
    image: ChoptaValley,
    size: "wide",
    details: "Captured in Chopta Valley ."
  },
  {
    id: 2,
    title: "Christmas decorations at Mumbai Airport T2",
    category: "Photography",
    date: "Jan 2025",
    location: "Mumbai Airport T2",
    image: MumbaiAirportT2,
    size: "tall",
    details: "A long exposure shot of the Christmas decorations at Mumbai Airport T2. The colorful lights and festive atmosphere made for a perfect holiday photo."
  },
  {
    id: 3,
    title: "Campus Life",
    category: "Photography",
    date: "Sep 2025",
    location: "Dharwad",
    image: Campus,
    size: "normal",
    details: "A candid shot capturing the essence of campus life during a rainy evening. The vibrant greenery and Dark Blue Sky."
  },
  {
    id: 4,
    title: "Gokarna Sunset",
    category: "Photography",
    date: "April 2024",
    location: "Kudle Beach View Point, Gokarna, Karnataka",
    image: GokarnaSunset,
    size: "normal",
    details: "Epic sunset over the Arabian Sea in Kudle Beach View Point, Gokarna."
  },
  {
    id: 6,
    title: "Landour",
    category: "Photography",
    date: "April 2025",
    location: "Landour, Uttarakhand",
    image: Landour,
    size: "wide",
    details: "A long exposure shot of the Christmas decorations at Mumbai Airport T2. The colorful lights and festive atmosphere made for a perfect holiday photo."
  },
  {
    id: 7,
    title: "Campus Life",
    category: "Photography",
    date: "Sep 2025",
    location: "Dharwad",
    image: Campus,
    size: "tall",
    details: "A candid shot capturing the essence of campus life during a rainy evening. The vibrant greenery and Dark Blue Sky."
  },
  {
    id: 5,
    title: "Yana Caves",
    category: "Photography",
    date: "Oct 2024",
    location: "Gokarna , Karnataka",
    image: YanaCaves,
    size: "normal",
    details: "Shot during our way towards Yana Caves from Gokarna. The unique rock formations and lush greenery made for a stunning composition."
  },
  {
    id: 8,
    title: "CaboDerama Beach",
    category: "Photography",
    date: "Oct 2025",
    location: "CaboDeRama Beach, Goa",
    image: CaboDeRama,
    size: "normal",
    details: "Rainy Weather at CaboDeRama Beach, one of the most beautiful beaches in Goa."
  },
  {
    id: 9,
    title: "Sunset in Campus",
    category: "Photography",
    date: "Sept 2025",
    location: "IIIT Dharwad Campus",
    image: SunsetCampus,
    size: "wide",
    details: "Wonderful Sunset in IIIT Dharwad Campus. The Orange hues and serene environment created a perfect moment to capture."
  },
  {
    id: 10,
    title: "Sathoddi Waterfall",
    category: "Photography",
    date: "Feb 2024",
    location: "Sathoddi Waterfall, Karnataka",
    image: Waterfall,
    size: "normal",
    details: "Sathoddi Waterfall, one of the most beautiful waterfalls in Karnataka."
  }
];

const CreativeGallery = () => {
  const [selectedId, setSelectedId] = useState(null);
  const selectedItem = galleryItems.find((item) => item.id === selectedId);

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div>
            <h2 className="section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Aperture size={32} color="var(--accent)" /> Creative Corner
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '600px' }}>
              Exploring the intersection of technology and art through the lens.
            </p>
          </div>
          <div className="gallery-badge"></div>
        </div>

        {/* Grid */}
        <div className="bento-grid">
          {galleryItems.map((item) => (
            <motion.div
              key={item.id}
              className={`gallery-item ${item.size}`}
              layoutId={`card-container-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div className="gallery-image-wrapper">
                <motion.img 
                    src={item.image} 
                    alt={item.title} 
                    layoutId={`card-image-${item.id}`} 
                />
                <div className="gallery-overlay">
                  <div className="gallery-text">
                    <span className="gallery-category">{item.category}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="gallery-icon">
                    {item.category === 'Cinematography' ? <Film size={20} /> : <Camera size={20} />}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* --- LIGHTBOX MODAL (Cinema Mode) --- */}
        <AnimatePresence>
          {selectedId && selectedItem && (
            <>
              <motion.div
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
              />

              <div className="modal-wrapper">
                <motion.div
                  className="modal-card"
                  layoutId={`card-container-${selectedId}`}
                >
                  {/* Close Button */}
                  <button className="modal-close-btn" onClick={() => setSelectedId(null)}>
                    <X size={24} />
                  </button>

                  {/* Image Container */}
                  <div className="modal-image-container">
                    {/* Blurred Background Effect */}
                    <div 
                        className="modal-blur-bg" 
                        style={{ backgroundImage: `url(${selectedItem.image})` }} 
                    />
                    
                    {/* Main Image */}
                    <motion.img 
                        src={selectedItem.image} 
                        alt={selectedItem.title}
                        layoutId={`card-image-${selectedId}`}
                        className="modal-main-image"
                    />
                  </div>

                  {/* Content Half */}
                  <motion.div 
                    className="modal-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="modal-category-badge">
                        {selectedItem.category}
                    </div>

                    {/* FIXED: Explicit White/Gray colors for Cinema Mode */}
                    <h2 className="font-heading" style={{ fontSize: '2rem', marginBottom: '16px', marginTop: '16px', color: '#ffffff' }}>
                        {selectedItem.title}
                    </h2>
                    
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', color: '#a1a1aa', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={16} color="var(--accent)" /> {selectedItem.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={16} color="var(--accent)" /> {selectedItem.location}
                        </span>
                    </div>

                    <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#e4e4e7' }}>
                        {selectedItem.details}
                    </p>

                    <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '8px' }}>
                       <span className="modal-tag">Iphone 14</span>
                       <span className="modal-tag">Scenic</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        /* --- BENTO GRID STYLES --- */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-auto-rows: 250px;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .wide { grid-column: span 2; }
          .tall { grid-row: span 2; }
        }
        .gallery-item {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: var(--card-bg);
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
        }
        .gallery-image-wrapper { width: 100%; height: 100%; position: relative; }
        .gallery-image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
        .gallery-overlay {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          display: flex; align-items: flex-end; justify-content: space-between;
          opacity: 0; transform: translateY(20px); transition: all 0.3s ease;
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; transform: translateY(0); }
        .gallery-category { font-size: 0.8rem; color: var(--accent); text-transform: uppercase; font-weight: 700; }
        .gallery-text h3 { margin: 4px 0 0 0; color: white; font-size: 1.2rem; }
        .gallery-icon { color: white; background: rgba(255,255,255,0.2); padding: 8px; border-radius: 50%; backdrop-filter: blur(4px); }
        .gallery-badge {
            display: flex; align-items: center; gap: 8px; padding: 8px 16px;
            background: rgba(var(--accent-rgb), 0.1); color: var(--accent);
            border-radius: 20px; font-weight: 600; border: 1px solid rgba(var(--accent-rgb), 0.2);
        }

        /* --- MODAL STYLES (Fixed for Cinema Mode) --- */
        .modal-backdrop {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.9); /* Dark backdrop */
            z-index: 1000;
            backdrop-filter: blur(8px);
        }
        .modal-wrapper {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            display: flex; align-items: center; justify-content: center;
            z-index: 1001;
            padding: 20px;
            pointer-events: none;
        }
        .modal-card {
            pointer-events: auto;
            background: #18181b; /* FIXED: Always Dark Gray (Zinc-900) */
            width: 100%;
            max-width: 950px;
            max-height: 85vh;
            border-radius: 24px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            position: relative;
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        @media (min-width: 768px) {
            .modal-card { flex-direction: row; height: 600px; }
        }

        .modal-image-container {
            flex: 1.5;
            position: relative;
            background: #000;
            height: 350px;
            display: flex; align-items: center; justify-content: center;
            overflow: hidden;
        }
        @media (min-width: 768px) {
            .modal-image-container { height: 100%; }
        }

        /* FIXED: Added CSS for the blur background effect */
        .modal-blur-bg {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-size: cover;
            background-position: center;
            filter: blur(20px);
            opacity: 0.4;
            transform: scale(1.2);
        }

        .modal-main-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            max-height: 100%;
            position: relative;
            z-index: 2;
            box-shadow: 0 0 30px rgba(0,0,0,0.5);
        }

        .modal-content {
            flex: 1;
            padding: 40px;
            display: flex; flex-direction: column;
            overflow-y: auto;
            background: #18181b; /* FIXED: Always Dark */
            border-left: 1px solid rgba(255,255,255,0.05);
        }

        .modal-close-btn {
            position: absolute; top: 20px; right: 20px; z-index: 10;
            background: rgba(0,0,0,0.5);
            color: white;
            border: 1px solid rgba(255,255,255,0.1);
            width: 40px; height: 40px; border-radius: 50%;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            transition: all 0.2s ease;
        }
        .modal-close-btn:hover {
            background: var(--accent);
            border-color: var(--accent);
        }

        .modal-category-badge {
            position: absolute; top: 20px; left: 20px;
            background: var(--accent);
            color: black;
            padding: 6px 12px;
            border-radius: 20px;
            font-weight: 700; font-size: 0.8rem; text-transform: uppercase;
            z-index: 5;
        }

        .modal-tag {
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.85rem;
            border: 1px solid rgba(255,255,255,0.2);
            color: #d4d4d8;
            font-weight: 500;
        }
      `}</style>
    </section>
  );
};

export default CreativeGallery;

