import { Mail, MapPin, Send } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { fadeInUp, staggerContainer } from "../utils/animations";

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.success('Message sent successfully!');
      formRef.current.reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`py-20 transition-all ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 shadow-xl  text-gray-900'}`}>
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold">Let's talk about everything!</h3>
            <p className="text-gray-400">Feel free to reach out for collaborations, opportunities, or just a friendly chat.</p>

            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'}`}>
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium">shivamvj04@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                whileHover={{ x: 10 }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'}`}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-medium">India</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`space-y-6 p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            variants={fadeInUp}
          >
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <input
                type="text"
                name="from_name"
                id="from_name"
                required
                className={`mt-1 block w-full rounded-md shadow-sm p-3 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
              />
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                name="reply_to"
                id="reply_to"
                required
                className={`mt-1 block w-full rounded-md shadow-sm p-3 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
              />
            </div>

            <div>
              <label htmlFor="message" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className={`mt-1 block w-full rounded-md shadow-sm p-3 border ${darkMode ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 px-8 py-3 rounded-md transition-colors disabled:opacity-50 ${darkMode ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
