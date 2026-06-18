import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { values } from '../data/content';
import CommandPersonnel from '../components/three/CommandPersonnelScene';
import { ArrowRight, Target, Handshake, Lightbulb, Eye, Shield, Zap } from 'lucide-react';

const valueIcons = [Target, Handshake, Lightbulb, Shield];

export default function About() {
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orbital-blue opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orbital-blue" />
              </span>
              <span className="text-[11px] font-mono text-orbital-blue/60 tracking-[0.2em] uppercase">Command Dossier</span>
            </div>
            <h1 className="text-[clamp(44px,7vw,72px)] font-extrabold text-soft-white leading-[0.95] tracking-[-0.03em] mb-6">
              The Architects
              <br />
              <span className="gradient-brand-text">Behind The Systems</span>
            </h1>
            <p className="text-text-muted text-[16px] max-w-[500px] leading-relaxed font-mono">
              Orbital exists because most digital agencies build websites. We build infrastructure that transforms how businesses operate.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 px-6 md:px-10 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-orbital-blue/40" />
                <span className="text-[11px] font-mono text-orbital-blue/60 tracking-[0.15em] uppercase">Directive</span>
              </div>
              <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-soft-white mb-6">Mission</h2>
              <p className="text-text-muted text-[16px] leading-relaxed mb-4">
                Bridge the gap between ambitious businesses and world-class technology infrastructure. Too many companies operate with suboptimal digital systems because they lack access to precision engineering.
              </p>
              <p className="text-text-muted text-[16px] leading-relaxed">
                Orbital deploys enterprise-grade systems at accessible velocity — with zero compromise on quality, security, or performance.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-electric-cyan/40" />
                <span className="text-[11px] font-mono text-electric-cyan/60 tracking-[0.15em] uppercase">Trajectory</span>
              </div>
              <h2 className="text-[clamp(28px,4vw,40px)] font-bold text-soft-white mb-6">Vision</h2>
              <p className="text-text-muted text-[16px] leading-relaxed mb-4">
                A world where every business, regardless of location or scale, has access to the same caliber of digital infrastructure as Fortune 500 enterprises.
              </p>
              <p className="text-text-muted text-[16px] leading-relaxed">
                We're building Orbital to be the definitive technology partner for ambitious companies — not just for websites, but for complete digital ecosystems that generate measurable business outcomes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/5 to-transparent" />
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-orbital-blue/40" />
              <span className="text-[11px] font-mono text-orbital-blue/60 tracking-[0.15em] uppercase">Core Principles</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-soft-white">Operating Parameters</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => {
              const Icon = valueIcons[i] || Shield;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group p-8 border border-border-subtle bg-void/60 hover:bg-midnight/20 transition-all duration-500"
                >
                  <div className="w-9 h-9 rounded border border-orbital-blue/20 bg-orbital-blue/5 flex items-center justify-center mb-5 group-hover:border-orbital-blue/40 transition-all duration-500">
                    <Icon size={17} className="text-orbital-blue/50 group-hover:text-orbital-blue transition-colors duration-500" />
                  </div>
                  <span className="text-[10px] font-mono text-orbital-blue/30 tracking-[0.15em] uppercase block mb-2">
                    PARAM 0{i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-soft-white mb-3">{value.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CommandPersonnel />

      <section className="relative py-32 md:py-40 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,111,232,0.06)_0%,transparent_70%)]" />
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-mono text-electric-cyan/60 tracking-[0.2em] uppercase">Join The Fleet</span>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-soft-white mt-4 mb-4">
              Ready to
              <br />
              <span className="gradient-brand-text">Establish Contact</span>
            </h2>
            <p className="text-text-muted text-[16px] max-w-[450px] mx-auto mb-8 font-mono">
              Open a direct channel. Let's discuss how we can deploy systems that transform your operations.
            </p>
            <Link
              to="/contact"
              className="group relative overflow-hidden px-8 py-4 rounded-lg bg-orbital-blue text-soft-white text-[15px] font-semibold transition-all duration-300 hover:shadow-[0_0_50px_rgba(27,111,232,0.4)] inline-flex items-center gap-2"
            >
              <span className="relative z-10">Open Channel</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-orbital-blue via-electric-cyan/30 to-orbital-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}