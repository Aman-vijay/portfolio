import { Mail, MapPin, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { CONTACT_INFO } from '../utils/urls';

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ from_name: '', reply_to: '', message: '' });

  // Typing animation for labels
  const typeText = (text: string, setter: (value: string) => void) => {
    let index = 0;
    const interval = setInterval(() => {
      setter(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  };

  const [nameLabel, setNameLabel] = useState('');
  const [emailLabel, setEmailLabel] = useState('');
  const [messageLabel, setMessageLabel] = useState('');

  useEffect(() => {
    typeText('Name', setNameLabel);
    typeText('Email', setEmailLabel);
    typeText('Message', setMessageLabel);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent successfully!', { style: { background: '#1a1a1a', color: '#00f3ff' } });
      formRef.current.reset();
      setFormData({ from_name: '', reply_to: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.', { style: { background: '#1a1a1a', color: '#ff4444' } });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className={`py-20 relative ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900'
      }`}
    >
      {/* Neon Tech Background */}
      <div
        className="absolute inset-0 opacity-15 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%2300f3ff' stroke-width='0.5' stroke-opacity='0.4'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%2300f3ff'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Subtle Neon Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent opacity-20 pointer-events-none" />

      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-mono text-center mb-16 text-white"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <span className="text-cyan-400">{'>'}</span> Get In Touch
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Contact Information */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <h3 className="text-2xl font-bold font-mono text-white">Let's talk about code.</h3>
            <p className="text-sm font-mono text-gray-300">
              Reach out for collaborations, opportunities, or a quick debug session.
            </p>

            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/70 border border-cyan-400/50 shadow-md">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-mono text-gray-400">Email</p>
                  <p className="font-medium font-mono text-cyan-400">{CONTACT_INFO.EMAIL}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/70 border border-cyan-400/50 shadow-md">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-mono text-gray-400">Location</p>
                  <p className="font-medium font-mono text-cyan-400">{CONTACT_INFO.LOCATION}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 p-6 rounded-lg border border-cyan-400/30 bg-black/70 shadow-lg"
            variants={fadeInUp}
          >
            <div className="relative">
              <label
                htmlFor="from_name"
                className="block text-sm font-mono text-cyan-400"
                style={{ textShadow: '0 0 5px rgba(0, 243, 255, 0.5)' }}
              >
                {nameLabel}
              </label>
              <input
                type="text"
                name="from_name"
                id="from_name"
                value={formData.from_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md shadow-sm p-3 bg-gray-800 border border-cyan-400/50 text-white font-mono focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="reply_to"
                className="block text-sm font-mono text-cyan-400"
                style={{ textShadow: '0 0 5px rgba(0, 243, 255, 0.5)' }}
              >
                {emailLabel}
              </label>
              <input
                type="email"
                name="reply_to"
                id="reply_to"
                value={formData.reply_to}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md shadow-sm p-3 bg-gray-800 border border-cyan-400/50 text-white font-mono focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="message"
                className="block text-sm font-mono text-cyan-400"
                style={{ textShadow: '0 0 5px rgba(0, 243, 255, 0.5)' }}
              >
                {messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md shadow-sm p-3 bg-gray-800 border border-cyan-400/50 text-white font-mono focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 px-8 py-3 rounded-sm font-mono text-sm uppercase tracking-wide text-cyan-400 border border-cyan-400 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-400 hover:text-black'
              } transition-colors relative overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="digital-signal">Transmitting...</span>
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
              {/* Digital Signal Effect on Submit */}
              {isSubmitting && (
                <div className="absolute inset-0 signal-wave" />
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>

      {/* Global Styles */}
      <style>
        {`
          @keyframes signal-wave {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateX(100%); opacity: 0; }
          }
          .signal-wave {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, transparent, #00f3ff 50%, transparent);
            animation: signal-wave 1.5s infinite linear;
          }
          .digital-signal {
            animation: glitch-flash 2s infinite;
          }
          @keyframes glitch-flash {
            0%, 100% { color: #00f3ff; text-shadow: 0 0 5px rgba(0, 243, 255, 0.8); }
            50% { color: #00c3ff; text-shadow: 0 0 10px rgba(0, 195, 255, 1); }
          }
          @media (max-width: 768px) {
            .signal-wave { animation-duration: 2s; }
          }
        `}
      </style>
    </section>
  );
};