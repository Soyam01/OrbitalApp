import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../data/content';
import { ArrowRight, Code2, TrendingUp, Zap, ShoppingCart, Palette, Lightbulb, Check, ArrowUpRight } from 'lucide-react';

const iconMap = { Code2, TrendingUp, Zap, ShoppingCart, Palette, Lightbulb };

const categories = ['Build', 'Grow'];

export default function Services() {
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
              <span className="text-[11px] font-mono text-orbital-blue/60 tracking-[0.2em] uppercase">Module Registry</span>
            </div>
            <h1 className="text-[clamp(44px,7vw,72px)] font-extrabold text-soft-white leading-[0.95] tracking-[-0.03em] mb-6">
              Active
              <br />
              <span className="gradient-brand-text">Systems</span>
            </h1>
            <p className="text-text-muted text-[16px] max-w-[500px] leading-relaxed font-mono">
              Each module is a precision-engineered system designed for a specific mission. Deploy individually or as an integrated fleet.
            </p>
          </motion.div>
        </div>
      </section>

      {categories.map((category) => {
        const categoryServices = services.filter((s) => s.category === category);
        return (
          <section key={category} className="relative py-16 md:py-24 px-6 md:px-10 lg:px-20">
            <div className="max-w-[1280px] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-6 h-px bg-electric-cyan/40" />
                  <span className="text-[11px] font-mono text-electric-cyan/60 tracking-[0.15em] uppercase">
                    {category === 'Build' ? 'Infrastructure' : 'Propulsion'}
                  </span>
                </div>
                <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-soft-white">
                  {category === 'Build' ? 'Engineering Systems' : 'Growth Systems'}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-subtle/20">
                {categoryServices.map((service, i) => {
                  const Icon = iconMap[service.icon] || Code2;
                  return (
                    <motion.div
                      key={service.id}
                      id={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="group bg-void/60 p-8 md:p-10 hover:bg-midnight/20 transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orbital-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-9 h-9 rounded border border-orbital-blue/20 bg-orbital-blue/5 flex items-center justify-center group-hover:border-orbital-blue/40 transition-all duration-500">
                            <Icon size={17} className="text-orbital-blue/50 group-hover:text-orbital-blue transition-colors duration-500" />
                          </div>
                          <span className="text-[10px] font-mono text-orbital-blue/30 tracking-[0.15em] uppercase">
                            SYS 0{i + 1}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-soft-white mb-3">{service.title}</h3>
                        <p className="text-text-muted text-[14px] leading-relaxed mb-5">{service.description}</p>
                        <div className="space-y-2.5 mb-5">
                          {service.deliverables.map((d) => (
                            <div key={d} className="flex items-start gap-2.5">
                              <Check size={14} className="text-electric-cyan/60 mt-0.5 shrink-0" />
                              <span className="text-text-muted text-[13px]">{d}</span>
                            </div>
                          ))}
                        </div>
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1.5 text-[12px] font-mono text-orbital-blue/40 group-hover:text-orbital-blue/60 transition-colors"
                        >
                          DEPLOY
                          <ArrowUpRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <section className="relative py-32 md:py-40 px-6 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,111,232,0.06)_0%,transparent_70%)]" />
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-mono text-electric-cyan/60 tracking-[0.2em] uppercase">Uncertain</span>
            <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-soft-white mt-4 mb-4">
              System Configuration
              <br />
              <span className="gradient-brand-text">Unclear?</span>
            </h2>
            <p className="text-text-muted text-[16px] max-w-[450px] mx-auto mb-8 font-mono">
              Open a direct channel. We'll analyze your requirements and recommend the optimal system configuration.
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