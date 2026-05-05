// frontend/src/pages/ObjectivesPage.jsx
import React, { use } from "react";
import { motion } from "framer-motion";
import { objectivesList, principles } from "../content/data/ObjectivesData.js";
import usePageTitle from "../hooks/usePageTitle.jsx";

const ObjectivesPage = () => {
  usePageTitle("Objectives");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="px-6 py-16 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -z-10" />

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
            <span className="inline-block px-4 py-2 mb-6 bg-green-100 border border-green-300 rounded-full text-sm font-semibold text-green-700">
              🎯 Our Mission
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
              Strategic Objectives
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
          >
            The PSG Tech Alumni Association is committed to advancing education,
            supporting students, and fostering research excellence.
          </motion.p>
        </motion.div>

        {/* Objectives Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {objectivesList.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div
                  className={`relative h-full rounded-2xl p-8 bg-gradient-to-br ${objective.lightColor} border-2 border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-500 overflow-hidden`}
                >
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${objective.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${objective.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <Icon size={28} className="text-white" />
                    </motion.div>

                    {/* Title */}
                    <h3
                      className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${objective.color}`}
                    >
                      {objective.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-700 leading-relaxed text-base">
                      {objective.description}
                    </p>

                    {/* Bottom Accent */}
                    <div className="pt-4 mt-6 border-t-2 border-slate-200 group-hover:border-slate-300 transition-colors duration-300">
                      <div
                        className={`w-8 h-1 rounded-full bg-gradient-to-r ${objective.color}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Principles Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Guiding Principles
            </h2>
            <p className="text-slate-600 text-lg">
              Core values that guide our work
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 6 }}
                className="flex gap-4 p-6 bg-white rounded-xl border-l-4 border-green-500 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100">
                    <span className="text-2xl">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {principle.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-green-50 via-teal-50 to-green-50 border-2 border-green-200 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Creating Lasting Impact
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
            Through focused objectives and unwavering principles, the PSG Tech
            Alumni Association works to strengthen PSG Tech's academic
            excellence, support deserving students, and create a vibrant alumni
            community that makes a meaningful difference in the world.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ObjectivesPage;
