import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, MessageCircle, Mail, MapPin, Check, ArrowRight, Radio, Satellite } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="relative pt-36 md:pt-44 pb-16 px-6 md:px-10 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="text-[11px] font-mono text-success/60 tracking-[0.2em] uppercase">Open Channel</span>
            </div>
            <h1 className="text-[clamp(44px,7vw,72px)] font-extrabold text-soft-white leading-[0.95] tracking-[-0.03em] mb-6">
              Establish
              <br />
              <span className="gradient-brand-text">Transmission</span>
            </h1>
            <p className="text-text-muted text-[16px] max-w-[500px] leading-relaxed font-mono">
              Initiate contact. All channels monitored. Response time: under 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-32 md:pb-40 px-6 md:px-10 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="p-10 border border-success/20 bg-void/60 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-success/20 bg-success/5 flex items-center justify-center">
                    <Check size={28} className="text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-soft-white mb-3">Transmission Received</h2>
                  <p className="text-text-muted text-[15px] leading-relaxed max-w-[400px] mx-auto font-mono">
                    Signal acknowledged. Our command center will analyze and respond within 24–48 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-mono text-orbital-blue/60 tracking-wider uppercase mb-2">
                        Identifier *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 bg-void/60 border border-border-subtle text-soft-white placeholder:text-text-muted/40 focus:border-orbital-blue/50 focus:outline-none focus:shadow-[0_0_0_3px_rgba(27,111,232,0.15)] transition-all duration-200 text-[15px] font-mono"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[11px] font-mono text-orbital-blue/60 tracking-wider uppercase mb-2">
                        Comm Channel *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-3.5 bg-void/60 border border-border-subtle text-soft-white placeholder:text-text-muted/40 focus:border-orbital-blue/50 focus:outline-none focus:shadow-[0_0_0_3px_rgba(27,111,232,0.15)] transition-all duration-200 text-[15px] font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-[11px] font-mono text-orbital-blue/60 tracking-wider uppercase mb-2">
                      Secondary Channel
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+977 9800000000"
                      className="w-full px-4 py-3.5 bg-void/60 border border-border-subtle text-soft-white placeholder:text-text-muted/40 focus:border-orbital-blue/50 focus:outline-none focus:shadow-[0_0_0_3px_rgba(27,111,232,0.15)] transition-all duration-200 text-[15px] font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-[11px] font-mono text-orbital-blue/60 tracking-wider uppercase mb-2">
                      Mission Type *
                    </label>
                    <select
                      id="service"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3.5 bg-void/60 border border-border-subtle text-soft-white focus:border-orbital-blue/50 focus:outline-none focus:shadow-[0_0_0_3px_rgba(27,111,232,0.15)] transition-all duration-200 text-[15px] font-mono appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-void text-text-muted">Select mission type...</option>
                      <option value="web-development" className="bg-void text-soft-white">Web Development</option>
                      <option value="landing-page" className="bg-void text-soft-white">Landing Page Design</option>
                      <option value="digital-marketing" className="bg-void text-soft-white">Digital Marketing</option>
                      <option value="branding" className="bg-void text-soft-white">Brand Identity</option>
                      <option value="it-consulting" className="bg-void text-soft-white">IT Consulting</option>
                      <option value="other" className="bg-void text-soft-white">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[11px] font-mono text-orbital-blue/60 tracking-wider uppercase mb-2">
                      Mission Brief *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Describe your mission parameters, objectives, and timeline..."
                      className="w-full px-4 py-3.5 bg-void/60 border border-border-subtle text-soft-white placeholder:text-text-muted/40 focus:border-orbital-blue/50 focus:outline-none focus:shadow-[0_0_0_3px_rgba(27,111,232,0.15)] transition-all duration-200 text-[15px] font-mono resize-y min-h-[140px]"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      type="checkbox"
                      required
                      className="mt-0.5 w-5 h-5 rounded border-2 border-border-subtle bg-transparent checked:bg-orbital-blue checked:border-orbital-blue focus:outline-none focus:shadow-[0_0_0_3px_rgba(27,111,232,0.15)] cursor-pointer accent-orbital-blue"
                    />
                    <label htmlFor="consent" className="text-text-muted text-[13px] leading-relaxed cursor-pointer font-mono">
                      I authorize Orbital to establish contact regarding this transmission. Data handled per protocol.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group relative overflow-hidden px-6 py-4 rounded-lg bg-orbital-blue text-soft-white text-[15px] font-semibold transition-all duration-300 hover:shadow-[0_0_50px_rgba(27,111,232,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-soft-white/30 border-t-soft-white animate-spin" />
                        <span className="font-mono">Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Transmit</span>
                        <Radio size={16} className="relative z-10 group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-orbital-blue via-electric-cyan/30 to-orbital-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <div className="p-6 border border-border-subtle bg-void/60">
                  <div className="flex items-center gap-3 mb-3">
                    <Satellite size={16} className="text-orbital-blue/60" />
                    <span className="text-[11px] font-mono text-orbital-blue/60 tracking-wider uppercase">Schedule Link-Up</span>
                  </div>
                  <p className="text-text-muted text-sm mb-4 font-mono">
                    Select a slot on our calendar. Direct connection established.
                  </p>
                  <div className="p-6 border border-border-subtle bg-void/40 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-orbital-blue/20 bg-orbital-blue/5 flex items-center justify-center">
                      <span className="text-sm font-bold font-mono text-orbital-blue/40">C</span>
                    </div>
                    <p className="text-text-muted/40 text-xs font-mono">Calendly integration pending</p>
                  </div>
                </div>

                <div className="p-6 border border-border-subtle bg-void/60 space-y-4">
                  <span className="text-[11px] font-mono text-orbital-blue/60 tracking-wider uppercase">Alternative Channels</span>

                  <a
                    href="https://wa.me/9779800000000?text=Hi%2C+I%27m+interested+in+Orbital%27s+services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-border-subtle bg-void/40 hover:border-orbital-blue/30 hover:bg-midnight/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded border border-success/20 bg-success/5 flex items-center justify-center shrink-0 group-hover:border-success/30 transition-all">
                      <MessageCircle size={18} className="text-success/60" />
                    </div>
                    <div className="text-left">
                      <p className="text-soft-white text-sm font-medium">WhatsApp</p>
                      <p className="text-text-muted/60 text-xs font-mono">Instant response channel</p>
                    </div>
                  </a>

                  <a
                    href="mailto:hello@orbital.agency"
                    className="flex items-center gap-4 p-4 border border-border-subtle bg-void/40 hover:border-orbital-blue/30 hover:bg-midnight/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded border border-orbital-blue/20 bg-orbital-blue/5 flex items-center justify-center shrink-0 group-hover:border-orbital-blue/30 transition-all">
                      <Mail size={18} className="text-orbital-blue/60" />
                    </div>
                    <div className="text-left">
                      <p className="text-soft-white text-sm font-medium">Email</p>
                      <p className="text-text-muted/60 text-xs font-mono">hello@orbital.agency</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 border border-border-subtle bg-void/40">
                    <div className="w-10 h-10 rounded border border-electric-cyan/20 bg-electric-cyan/5 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-electric-cyan/60" />
                    </div>
                    <div className="text-left">
                      <p className="text-soft-white text-sm font-medium">Ground Station</p>
                      <p className="text-text-muted/60 text-xs font-mono">Kathmandu, Nepal — Global Operations</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-border-subtle bg-void/60">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                    </span>
                    <span className="text-[11px] font-mono text-success/60 tracking-wider uppercase">Response SLA</span>
                  </div>
                  <p className="text-text-muted text-sm font-mono">
                    All transmissions acknowledged within 24–48 hours. No automated responses. Direct human contact only.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}