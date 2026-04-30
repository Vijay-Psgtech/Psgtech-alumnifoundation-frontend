// frontend/src/pages/ContactUsPage.jsx
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import usePageTitle from "../hooks/usePageTitle";

const ContactUsPage = () => {
  usePageTitle("Contact Us");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      // ✅ Validate form
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      try {
        // TODO: Connect to backend email service
        // For now, just simulate submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } catch (err) {
        setError("Failed to send message. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [formData],
  );

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "alumni@psgtech.ac.in",
      link: "mailto:alumni@psgtech.ac.in",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "0422 2572177 (Ext: 4474)",
      link: "tel:+914222572177",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Coimbatore, Tamil Nadu, India",
      link: "#",
    },
  ];

  return (
    <section className="px-6 py-16 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 mb-6 bg-blue-100 border border-blue-300 rounded-full text-sm font-semibold text-blue-700">
              📧 Get in Touch
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Contact Us
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Have questions about the foundation? We'd love to hear from you.
            Reach out and let's connect.
          </motion.p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6 }}
              >
                <a href={info.link} className="block group">
                  <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center border border-slate-200 hover:border-blue-400">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                      <Icon
                        size={28}
                        className="text-blue-600 group-hover:text-white transition-colors duration-300"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {info.title}
                    </h3>

                    <p className="text-slate-600 group-hover:text-blue-600 transition-colors duration-300">
                      {info.content}
                    </p>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact Form & Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Send us a Message
              </h2>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg text-green-800"
                >
                  ✓ Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-800"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Message subject"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Your message here..."
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Have any questions about the PSG Tech Alumni Foundation? Our
                team is ready to help. Whether you're interested in donating,
                connecting with fellow alumni, or learning more about our
                initiatives, we'd love to hear from you.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Fill out the form and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Office Hours
              </h3>
              <div className="space-y-3 text-slate-700">
                <p>
                  <strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM IST
                </p>
                <p>
                  <strong>Saturday:</strong> 10:00 AM - 2:00 PM IST
                </p>
                <p>
                  <strong>Sunday:</strong> Closed
                </p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-8 border border-purple-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Emergency Contact
              </h3>
              <p className="text-slate-700 mb-2">
                For urgent matters, please call our main office directly:
              </p>
              <p className="text-2xl font-bold text-purple-600">0422 2572177</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUsPage;
