import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLenis } from '../components/layout/LenisProvider';
import { ArrowRight, ArrowUpRight, Code2, TrendingUp, Zap, Globe } from 'lucide-react';
import { services, portfolio, process } from '../data/content';

const iconMap = { Code2, TrendingUp, Zap, Globe };

function Hero() {
  const [booted, setBooted] = useState(false);
  const [bootText, setBootText] = useState('');
  const fullBoot = 'ORBITAL COMMAND CENTER — SYSTEMS NOMINAL — ALL MODULES ONLINE';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setBootText(fullBoot.slice(0, i + 1));
      i++;
      if (i >= fullBoot.length) {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 600);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  if (!booted) {
    return (
      <section className="fixed inset-0 z-40 bg-void flex flex-col items-center justify-center">
        <div className="max-w-[700px] px-6 text-center">
          <motion.div
            className="w-2 h-2 rounded-full bg-orbital-blue mx-auto mb-8"
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-[11px] font-mono text-orbital-blue/60 tracking-[0.3em] uppercase mb-4">
            SYSTEM BOOT SEQUENCE
          </p>
          <p className="text-[13px] font-mono text-orbital-blue/40 leading-relaxed tracking-wide">
            {bootText}
            <span className="animate-pulse ml-0.5">▌</span>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-20">
      <div className="relative z-10 max-w-[1280px] mx-auto w-full pt-20">
        <div className="max-w-[800px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-orbital-blue/20 bg-orbital-blue/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="text-[11px] font-mono text-orbital-blue/80 tracking-[0.15em] uppercase">
                Systems Operational
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[clamp(48px,8vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] mb-6"
          >
            <span className="text-soft-white">Systems That</span>
            <br />
            <span className="gradient-brand-text">Orbit Your</span>
            <br />
            <span className="text-soft-white">Business</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-[17px] text-text-muted max-w-[520px] leading-relaxed mb-10 font-mono"
          >
            We engineer digital infrastructure that transforms how businesses operate. Precision-built systems for the next generation of ambitious companies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/contact"
              className="group relative overflow-hidden px-6 py-3.5 rounded-lg bg-orbital-blue text-soft-white text-[14px] font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(27,111,232,0.4)] inline-flex items-center gap-2 w-fit"
            >
              <span className="relative z-10">Initialize Contact</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-orbital-blue via-electric-cyan/20 to-orbital-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              to="/our-work"
              className="group px-6 py-3.5 rounded-lg border border-border-subtle text-soft-white/80 text-[14px] font-semibold transition-all duration-300 hover:border-orbital-blue/50 hover:text-soft-white hover:bg-orbital-blue/5 inline-flex items-center gap-2 w-fit"
            >
              View Mission Log
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-text-muted/40 tracking-[0.2em]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-6 bg-gradient-to-b from-orbital-blue/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

function MissionModules() {
  const featured = services.slice(0, 4);

  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-orbital-blue/40" />
            <span className="text-[11px] font-mono text-orbital-blue/60 tracking-[0.2em] uppercase">Active Modules</span>
          </div>
          <h2 className="text-[clamp(36px,5vw,56px)] font-bold text-soft-white leading-[1.1]">
            Mission-Critical
            <br />
            <span className="gradient-brand-text">Capabilities</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          {featured.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  to={`/services#${service.id}`}
                  className="group block p-8 md:p-10 border border-border-subtle bg-void/50 hover:bg-midnight/30 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orbital-blue/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 rounded border border-orbital-blue/20 bg-orbital-blue/5 flex items-center justify-center group-hover:border-orbital-blue/40 group-hover:bg-orbital-blue/10 transition-all duration-500">
                        <Icon size={18} className="text-orbital-blue/60 group-hover:text-orbital-blue transition-colors duration-500" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-orbital-blue/40 tracking-[0.15em] uppercase">
                          MOD 0{i + 1}
                        </span>
                        <h3 className="text-xl font-semibold text-soft-white group-hover:text-soft-white/90 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-text-muted text-[15px] leading-relaxed mb-4 group-hover:text-text-muted/80 transition-colors">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-orbital-blue/40 group-hover:text-orbital-blue/60 transition-colors">
                      <span>VIEW MODULE</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MissionLog() {
  const featured = portfolio.slice(0, 3);

  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 lg:px-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/10 to-transparent" />
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-electric-cyan/40" />
            <span className="text-[11px] font-mono text-electric-cyan/60 tracking-[0.2em] uppercase">Mission Log</span>
          </div>
          <h2 className="text-[clamp(36px,5vw,56px)] font-bold text-soft-white leading-[1.1]">
            Deployed
            <br />
            <span className="gradient-brand-text">Systems</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link to="/our-work" className="group block">
                <div className="relative aspect-[4/3] mb-6 rounded-lg overflow-hidden border border-border-subtle bg-midnight/30 group-hover:border-orbital-blue/30 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full border border-orbital-blue/20 bg-orbital-blue/5 flex items-center justify-center group-hover:border-orbital-blue/40 transition-all duration-500">
                        <span className="text-3xl font-bold text-orbital-blue/30 group-hover:text-orbital-blue/60 transition-colors">
                          {project.title[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-void/90 to-transparent">
                    <span className="text-[10px] font-mono text-electric-cyan/60 tracking-[0.15em] uppercase">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-soft-white mb-2 group-hover:text-soft-white/90 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2">{project.description}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-text-muted/40 group-hover:text-orbital-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-orbital-blue/40" />
            <span className="text-[11px] font-mono text-orbital-blue/60 tracking-[0.2em] uppercase">Protocol</span>
          </div>
          <h2 className="text-[clamp(36px,5vw,56px)] font-bold text-soft-white leading-[1.1]">
            Deployment
            <br />
            <span className="gradient-brand-text">Sequence</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border-subtle md:hidden" />
          <div className="hidden md:block absolute left-0 right-0 top-10 h-px bg-border-subtle">
            <motion.div
              className="h-full bg-gradient-to-r from-orbital-blue to-electric-cyan"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative pl-12 md:pl-0 md:pt-16"
              >
                <div className="absolute left-0 md:left-auto md:top-0 w-10 h-10 rounded-full border border-orbital-blue/30 bg-void flex items-center justify-center">
                  <span className="text-[11px] font-mono font-bold text-orbital-blue/60">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-soft-white mb-3">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Transmission() {
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 lg:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,111,232,0.08)_0%,transparent_70%)]" />
      <div className="max-w-[1280px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[11px] font-mono text-electric-cyan/60 tracking-[0.2em] uppercase">Open Channel</span>
          <h2 className="text-[clamp(40px,6vw,64px)] font-bold text-soft-white mt-4 mb-6 leading-[1.1]">
            Ready to
            <br />
            <span className="gradient-brand-text">Establish Link</span>
          </h2>
          <p className="text-text-muted text-[16px] max-w-[480px] mx-auto mb-10 font-mono">
            Initiate a transmission. Our command center will respond within 24 hours.
          </p>
          <Link
            to="/contact"
            className="group relative overflow-hidden px-8 py-4 rounded-lg bg-orbital-blue text-soft-white text-[15px] font-semibold transition-all duration-300 hover:shadow-[0_0_50px_rgba(27,111,232,0.4)] inline-flex items-center gap-2"
          >
            <span className="relative z-10">Open Transmission</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-orbital-blue via-electric-cyan/30 to-orbital-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <MissionModules />
      <MissionLog />
      <ProcessTimeline />
      <Transmission />
    </motion.div>
  );
}