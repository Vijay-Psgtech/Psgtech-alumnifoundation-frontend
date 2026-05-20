// frontend/src/pages/PatronsPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Patrons } from "../content/data/PatronsData";

const PatronsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="px-6 py-16 md:py-28 bg-linear-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 mb-6 bg-purple-100 border border-purple-300 rounded-full text-sm font-semibold text-purple-700">
              ✨ Our Patrons
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-orange-600">
              Visionary Patrons
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Meet the distinguished leaders and mentors who guide PSG Tech's mission and inspire generations of students.
          </motion.p>
        </motion.div>

        {/* Patrons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Patrons.map((patron, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Image Container */}
                <motion.div
                  variants={imageVariants}
                  className="relative h-80 overflow-hidden bg-linear-to-br from-slate-200 to-slate-300"
                >
                  <img
                    src={patron.image}
                    alt={patron.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      {patron.role}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {patron.name}
                  </h3>

                  {patron.note && (
                    <p className="text-sm text-purple-600 font-semibold mb-3">
                      {patron.note}
                    </p>
                  )}

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {patron.bio}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="w-8 h-1 rounded-full bg-linear-to-r from-purple-600 to-orange-600" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 p-8 md:p-12 rounded-2xl bg-linear-to-r from-purple-50 via-orange-50 to-purple-50 border-2 border-purple-200 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Guiding PSG Tech's Future
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed">
            Our patrons embody the spirit of excellence, innovation, and service that defines PSG Tech. Their unwavering support and mentorship have been instrumental in shaping the institution's legacy and vision for the future.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PatronsPage;