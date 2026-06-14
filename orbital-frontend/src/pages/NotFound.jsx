import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Radio } from 'lucide-react';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center max-w-[500px]">
        <div className="relative mb-10 mx-auto w-24 h-24">
          <motion.div
            className="absolute inset-0 rounded-full border border-orbital-blue/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-electric-cyan/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-orbital-blue/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Radio size={24} className="text-orbital-blue/40" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-mono text-error/60 tracking-[0.2em] uppercase">Signal Lost</span>
        </motion.div>

        <motion.h1
          className="text-[clamp(80px,15vw,140px)] font-extrabold text-soft-white leading-none mt-4 mb-4 tracking-[-0.03em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-text-muted/60 text-[16px] font-mono mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          This transmission destination does not exist.
        </motion.p>

        <motion.p
          className="text-text-muted/40 text-[13px] font-mono mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The signal has drifted beyond known space. Return to command center.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            to="/"
            className="group relative overflow-hidden px-8 py-4 rounded-lg bg-orbital-blue text-soft-white text-[15px] font-semibold transition-all duration-300 hover:shadow-[0_0_50px_rgba(27,111,232,0.4)] inline-flex items-center gap-2"
          >
            <span className="relative z-10">Return to Command</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-orbital-blue via-electric-cyan/30 to-orbital-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}