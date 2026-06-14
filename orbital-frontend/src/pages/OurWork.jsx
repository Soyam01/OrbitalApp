import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { portfolio } from '../data/content';
import { ArrowRight, ArrowUpRight, ExternalLink, Filter } from 'lucide-react';

const filters = ['All', 'Web', 'Branding', 'Automation'];

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? portfolio
    : portfolio.filter((p) => p.category === activeFilter);

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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-cyan" />
              </span>
              <span className="text-[11px] font-mono text-electric-cyan/60 tracking-[0.2em] uppercase">Mission Archive</span>
            </div>
            <h1 className="text-[clamp(44px,7vw,72px)] font-extrabold text-soft-white leading-[0.95] tracking-[-0.03em] mb-6">
              Deployed
              <br />
              <span className="gradient-brand-text">Missions</span>
            </h1>
            <p className="text-text-muted text-[16px] max-w-[500px] leading-relaxed font-mono">
              Each mission represents a system successfully deployed into production. Results verified, performance recorded.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-32 md:pb-40 px-6 md:px-10 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-16 flex-wrap"
          >
            <Filter size={14} className="text-text-muted/40" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded text-[12px] font-mono tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-orbital-blue/15 text-orbital-blue border border-orbital-blue/30'
                    : 'text-text-muted/50 hover:text-soft-white/70 border border-transparent hover:border-border-subtle'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className="group relative">
                    <div className="relative aspect-[4/3] mb-6 rounded-lg overflow-hidden border border-border-subtle bg-midnight/20 group-hover:border-orbital-blue/20 transition-all duration-500">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full border border-orbital-blue/15 bg-orbital-blue/5 flex items-center justify-center group-hover:border-orbital-blue/30 transition-all duration-500">
                            <span className="text-4xl font-bold text-orbital-blue/20 group-hover:text-orbital-blue/50 transition-colors duration-500">
                              {project.title[0]}
                            </span>
                          </div>
                          <p className="text-text-muted/30 text-sm font-mono">{project.title}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-void/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <span className="inline-block self-start px-2.5 py-1 rounded text-[10px] font-mono bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan/80 tracking-wider uppercase mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-semibold text-soft-white mb-2">{project.title}</h3>
                        <p className="text-text-muted text-sm leading-relaxed mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-mono bg-orbital-blue/10 border border-orbital-blue/20 text-orbital-blue/70">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] font-mono text-success/60 mb-3">
                          {project.results.map((r) => (
                            <span key={r}>{r}</span>
                          ))}
                        </div>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-orbital-blue/60 hover:text-orbital-blue transition-colors"
                        >
                          VIEW SYSTEM
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-text-muted/50 text-lg font-mono mb-4">No missions in this classification.</p>
              <Link to="/contact" className="text-[12px] font-mono text-orbital-blue/60 hover:text-orbital-blue transition-colors">
                COMMISSION A MISSION →
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative py-32 md:py-40 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,111,232,0.06)_0%,transparent_70%)]" />
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-mono text-electric-cyan/60 tracking-[0.2em] uppercase">Commission</span>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-soft-white mt-4 mb-4">
              Your Mission
              <br />
              <span className="gradient-brand-text">Starts Here</span>
            </h2>
            <p className="text-text-muted text-[16px] max-w-[450px] mx-auto mb-8 font-mono">
              Submit a mission brief. Our team will analyze, strategize, and deploy.
            </p>
            <Link
              to="/contact"
              className="group relative overflow-hidden px-8 py-4 rounded-lg bg-orbital-blue text-soft-white text-[15px] font-semibold transition-all duration-300 hover:shadow-[0_0_50px_rgba(27,111,232,0.4)] inline-flex items-center gap-2"
            >
              <span className="relative z-10">Submit Mission Brief</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-orbital-blue via-electric-cyan/30 to-orbital-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}