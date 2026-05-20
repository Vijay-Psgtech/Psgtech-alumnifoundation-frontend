import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImagePlus } from "lucide-react";

const galleryCategories = [
  "All",
  "Initiatives",
  "Workshops",
  "Scholarships",
  "Museum",
  "Events"
];

const galleryItems = [
  { id: 1, category: "Initiatives", title: "Research Excellence Center", image: "🔬", desc: "State-of-the-art research facility" },
  { id: 2, category: "Scholarships", title: "Scholar Felicitation", image: "🎓", desc: "Celebrating our scholarship recipients" },
  { id: 3, category: "Workshops", title: "Faculty Development Program", image: "📚", desc: "Professional development session" },
  { id: 4, category: "Museum", title: "Science & Tech Exhibition", image: "🏛️", desc: "PSG GRD Museum interactive exhibit" },
  { id: 5, category: "Events", title: "Alumni Networking Meet", image: "👥", desc: "Annual alumni gathering" },
  { id: 6, category: "Initiatives", title: "Capacity Building Session", image: "💼", desc: "Industry experts training students" },
  { id: 7, category: "Workshops", title: "Seminar on Innovation", image: "🚀", desc: "Promoting innovation and R&D" },
  { id: 8, category: "Museum", title: "Interactive Learning Zone", image: "⚡", desc: "Students exploring technology" },
  { id: 9, category: "Scholarships", title: "Merit Award Ceremony", image: "🏆", desc: "Honoring academic excellence" },
  { id: 10, category: "Events", title: "Foundation Day Celebration", image: "🎉", desc: "Annual foundation celebration" },
  { id: 11, category: "Initiatives", title: "Industry Collaboration", image: "🤝", desc: "Partnership with leading companies" },
  { id: 12, category: "Workshops", title: "Leadership Workshop", image: "👨‍💼", desc: "Developing future leaders" }
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        
        .gallery-hero {
          background: linear-gradient(165deg, #0a0e1a 0%, #0d1428 100%);
          padding: 120px 24px;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        
        .gallery-hero::before {
          content: '';
          position: absolute;
          top: -150px;
          right: -150px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .gallery-inner {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        
        .gallery-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .gallery-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(201, 168, 76, 0.65);
          margin-bottom: 20px;
        }
        
        .gallery-eyebrow::before,
        .gallery-eyebrow::after {
          content: '';
          width: 32px;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(201, 168, 76, 0.4), rgba(201, 168, 76, 0.1));
        }
        
        .gallery-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 6vw, 72px);
          font-weight: 800;
          color: #f2ede3;
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin-bottom: 24px;
        }
        
        .gallery-h1 em {
          font-style: italic;
          background: linear-gradient(130deg, #c9a84c, #f0d870);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gallery-sub {
          font-size: 16px;
          font-weight: 300;
          color: rgba(200, 215, 240, 0.5);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.75;
        }
        
        .gallery-filters {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 60px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(201, 168, 76, 0.1);
          border-radius: 12px;
        }
        
        .filter-btn {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 6px;
          color: rgba(200, 215, 240, 0.7);
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
          background: rgba(201, 168, 76, 0.2);
          border-color: rgba(201, 168, 76, 0.5);
          color: #e8c560;
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }
        
        .gallery-card {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(201, 168, 76, 0.15);
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .gallery-card:hover {
          border-color: rgba(201, 168, 76, 0.35);
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(201, 168, 76, 0.15);
        }
        
        .gallery-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.5), transparent);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        
        .gallery-card:hover::before {
          opacity: 1;
        }
        
        .gallery-image {
          font-size: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          transition: transform 0.35s ease;
        }
        
        .gallery-card:hover .gallery-image {
          transform: scale(1.1);
        }
        
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201, 168, 76, 0.1), rgba(201, 168, 76, 0.05));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        
        .overlay-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #f2ede3;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        
        .overlay-category {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(201, 168, 76, 0.8);
        }
        
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        
        .modal-content {
          background: rgba(8, 11, 24, 0.98);
          border: 1px solid rgba(201, 168, 76, 0.2);
          border-radius: 14px;
          padding: 40px;
          max-width: 600px;
          width: 90vw;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: rgba(200, 215, 240, 0.6);
          cursor: pointer;
          transition: color 0.25s ease;
        }
        
        .modal-close:hover {
          color: #c9a84c;
        }
        
        .modal-image {
          font-size: 120px;
          margin-bottom: 24px;
        }
        
        .modal-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #f2ede3;
          margin-bottom: 12px;
          text-align: center;
          line-height: 1.2;
        }
        
        .modal-category {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(201, 168, 76, 0.8);
          margin-bottom: 16px;
        }
        
        .modal-desc {
          font-size: 14px;
          color: rgba(200, 215, 240, 0.7);
          text-align: center;
          line-height: 1.7;
        }
        
        @media (max-width: 820px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          .gallery-filters {
            padding: 16px;
          }
          .modal-content {
            padding: 24px;
          }
        }
      `}</style>

      <section className="gallery-hero">
        <div className="gallery-inner">
          <motion.div 
            className="gallery-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="gallery-eyebrow">Visual Moments</div>
            <h1 className="gallery-h1">
              Our Journey in <em>Pictures</em>
            </h1>
            <p className="gallery-sub">
              Explore moments from our foundation initiatives, scholarship programs, workshops, and alumni engagement activities.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="gallery-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {galleryCategories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            className="gallery-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            layout
          >
            <AnimatePresence>
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className="gallery-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="gallery-image">{item.image}</div>
                  <div className="gallery-overlay">
                    <div className="overlay-category">{item.category}</div>
                    <div className="overlay-title">{item.title}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                textAlign: 'center', 
                padding: '60px 20px', 
                color: 'rgba(200, 215, 240, 0.5)' 
              }}
            >
              <ImagePlus 
                size={48} 
                style={{ margin: '0 auto 20px', opacity: 0.3 }} 
              />
              <p style={{ fontSize: '16px' }}>
                No images in this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedItem(null)}
              >
                <X size={24} />
              </button>
              <div className="modal-image">{selectedItem.image}</div>
              <div className="modal-category">{selectedItem.category}</div>
              <h3 className="modal-title">{selectedItem.title}</h3>
              <p className="modal-desc">{selectedItem.desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;