// frontend/src/pages/OfficeBearersPage.jsx
import React, { use } from "react";
import { motion } from "framer-motion";
import {
  President,
  VicePresidents,
} from "../content/data/OfficeBearersData.js";
import usePageTitle from "../hooks/usePageTitle";

const OfficeBearersPage = () => {
  usePageTitle("Office Bearers");
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="px-6 py-16 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl -z-10" />

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
            <span className="inline-block px-4 py-2 mb-6 bg-blue-100 border border-blue-300 rounded-full text-sm font-semibold text-blue-700">
              🎯 Leadership Team
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Office Bearers
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Meet the dedicated leaders steering the PSG Tech Alumni Foundation
            toward greater excellence and impact.
          </motion.p>
        </motion.div>

        {/* President Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <motion.div
              variants={imageVariants}
              className="md:flex-shrink-0 w-full md:w-64"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={President.image}
                  alt={President.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex-1">
              <div className="inline-block px-4 py-2 mb-6 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                {President.role}
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-3">
                {President.name}
              </h2>
              <p className="text-lg text-blue-600 font-semibold mb-4">
                {President.note}
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                {President.designation}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Foundation Leadership
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Vice Presidents Title */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Vice Presidents & Board Members
          </h2>
          <p className="text-slate-600">
            Exceptional leaders from academia and industry
          </p>
        </motion.div>

        {/* Vice Presidents Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {VicePresidents.map((vp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group"
            >
              <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500">
                {/* Image */}
                <motion.div
                  variants={imageVariants}
                  className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300"
                >
                  <img
                    src={vp.image}
                    alt={vp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-1 text-sm leading-tight">
                    {vp.name}
                  </h3>

                  <p className="text-xs text-blue-600 font-semibold mb-3 whitespace-pre-line leading-tight">
                    {vp.role}
                  </p>

                  <p className="text-xs text-slate-500">{vp.note}</p>

                  {/* Accent bar */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="w-4 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
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
          className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Driving Excellence & Impact
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed">
            Our office bearers bring diverse expertise from academia, industry,
            and philanthropy. Together, they champion the foundation's mission
            to support PSG Tech's continued growth and create lasting impact for
            future generations.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OfficeBearersPage;
