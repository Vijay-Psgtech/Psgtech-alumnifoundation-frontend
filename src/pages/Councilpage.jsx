import React, { useState } from "react";
import { motion } from "framer-motion";
import { Council } from "../content/data/CouncilData";

const CouncilPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  // Group council members by role
  const groupedCouncil = Council.reduce((acc, member) => {
    if (!acc[member.role]) {
      acc[member.role] = [];
    }
    acc[member.role].push(member);
    return acc;
  }, {});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -12,
      boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const roleColors = {
    "Governing Council": {
      bg: "from-emerald-50 to-teal-50",
      border: "border-emerald-300",
      badge: "bg-emerald-100 text-emerald-700",
      accent: "from-emerald-600 to-teal-600",
      light: "bg-emerald-50",
    },
    "Academic Council": {
      bg: "from-blue-50 to-cyan-50",
      border: "border-blue-300",
      badge: "bg-blue-100 text-blue-700",
      accent: "from-blue-600 to-cyan-600",
      light: "bg-blue-50",
    },
    "Administrative Council": {
      bg: "from-amber-50 to-orange-50",
      border: "border-amber-300",
      badge: "bg-amber-100 text-amber-700",
      accent: "from-amber-600 to-orange-600",
      light: "bg-amber-50",
    },
    "Student Welfare Council": {
      bg: "from-rose-50 to-pink-50",
      border: "border-rose-300",
      badge: "bg-rose-100 text-rose-700",
      accent: "from-rose-600 to-pink-600",
      light: "bg-rose-50",
    },
  };

  const getRoleColor = (role) => roleColors[role] || roleColors["Governing Council"];

  return (
    <section className="relative min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden py-20 md:py-32">
      {/* Enhanced Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-br from-emerald-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-linear-to-tr from-blue-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-linear-to-b from-amber-500/10 to-transparent rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-linear-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold text-emerald-300">Leadership & Vision</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Council Members
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Distinguished leaders and experts guiding PSG Tech's excellence through strategic governance and mentorship
          </motion.p>
        </motion.div>

        {/* Council Sections by Role */}
        {Object.entries(groupedCouncil).map(([role, members], sectionIndex) => {
          const colors = getRoleColor(role);
          return (
            <motion.div
              key={role}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-28"
            >
              {/* Section Header */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <div className={`h-1 w-16 bg-linear-to-r ${colors.accent} rounded-full`} />
                  <h2 className={`text-3xl md:text-4xl font-bold bg-linear-to-r ${colors.accent} bg-clip-text text-transparent`}>
                    {role}
                  </h2>
                  <span className="ml-auto px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold">
                    {members.length} Members
                  </span>
                </div>
                <p className="text-slate-400 text-lg max-w-2xl">
                  {role === "Governing Council" && "Strategic leaders shaping institutional vision and growth"}
                  {role === "Academic Council" && "Educational experts driving curriculum excellence and research"}
                  {role === "Administrative Council" && "Operational leaders ensuring quality and effectiveness"}
                  {role === "Student Welfare Council" && "Advocates for holistic student development and support"}
                </p>
              </div>

              {/* Members Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className="group h-full"
                  >
                    <div className={`relative h-full rounded-2xl overflow-hidden backdrop-blur-sm border-2 ${colors.border} bg-linear-to-b from-slate-800/50 to-slate-900/50 hover:border-opacity-100 transition-all duration-500 shadow-xl`}>
                      {/* Image Container */}
                      <motion.div
                        variants={imageVariants}
                        className="relative h-64 md:h-72 w-full overflow-hidden bg-linear-to-br from-slate-700 to-slate-800"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      </motion.div>

                      {/* Content Section */}
                      <div className={`p-6 md:p-8 bg-linear-to-b ${colors.bg}`}>
                        {/* Role Badge */}
                        <div className="mb-4">
                          <span className={`inline-block px-3 py-1.5 ${colors.badge} text-xs font-bold rounded-lg tracking-wide`}>
                            {member.title}
                          </span>
                        </div>

                        {/* Name */}
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 leading-tight">
                          {member.name}
                        </h3>

                        {/* Year/Note */}
                        {member.batch && (
                          <p className={`text-sm font-semibold bg-linear-to-r ${colors.accent} bg-clip-text text-transparent mb-4`}>
                            {member.batch}
                          </p>
                        )}

                        {/* Bio */}
                        <p className="text-slate-700 text-sm leading-relaxed mb-6 line-clamp-3">
                          {member.bio}
                        </p>

                        {/* Decorative Divider */}
                        <div className="pt-4 border-t border-slate-300/30">
                          <div className={`h-1 w-12 rounded-full bg-linear-to-r ${colors.accent}`} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Impact Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 relative"
        >
          <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 bg-linear-to-br from-slate-800/50 via-slate-900/50 to-slate-950 p-8 md:p-16 backdrop-blur-xl">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-teal-500/5 -z-10" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <motion.h3
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-6 bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
              >
                Collective Wisdom, Shared Vision
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-300 leading-relaxed font-light mb-8"
              >
                Our council members represent decades of combined excellence in academia, industry, and institutional leadership. Their dedication and mentorship form the foundation of PSG Tech's commitment to fostering innovation, integrity, and excellence in engineering education.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 justify-center"
              >
                <div className="px-6 py-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold">
                  15+ Council Members
                </div>
                <div className="px-6 py-3 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-300 font-semibold">
                  4 Strategic Councils
                </div>
                <div className="px-6 py-3 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 font-semibold">
                  Decades of Experience
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CouncilPage;