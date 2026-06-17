import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '../layout/LenisProvider';

const navItems = [
  { id: 'services', label: 'Modules', path: '/services' },
  { id: 'work', label: 'Missions', path: '/our-work' },
  { id: 'about', label: 'Command', path: '/about' },
  { id: 'contact', label: 'Contact', path: '/contact' },
];

export default function HUD() {
  const [active, setActive] = useState(false);
  const [time, setTime] = useState('');
  const location = useLocation();
  const lenis = useLenis();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!lenis) return;
    const unsub = lenis.on('scroll', ({ scroll, limit }) => {
      setScrollProgress(Math.min(scroll / limit, 1));
    });
    return () => unsub();
  }, [lenis]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 8) + ' UTC');
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orbital-blue/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orbital-blue/30 to-transparent" />
          <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orbital-blue/20 to-transparent" />
          <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orbital-blue/20 to-transparent" />

          <div className="absolute top-2 left-4 flex items-center gap-4">
            <span className="text-[10px] font-mono text-orbital-blue/60 tracking-[0.2em] uppercase">
              ORBITAL CMD v2.4
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] font-mono text-text-muted/50">{time}</span>
          </div>

          <div className="absolute top-2 right-4 flex items-center gap-4">
            <span className="text-[10px] font-mono text-text-muted/50">SYS ONLINE</span>
            <span className="text-[10px] font-mono text-orbital-blue/60">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-auto">
            <nav className="flex items-center gap-1 bg-void/80 backdrop-blur-xl border border-border-subtle rounded-full px-2 py-1.5">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all duration-300 ${
                  location.pathname === '/'
                    ? 'bg-orbital-blue/20 text-orbital-blue'
                    : 'text-text-muted/60 hover:text-soft-white/80'
                }`}
              >
                Home
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-orbital-blue/20 text-orbital-blue'
                      : 'text-text-muted/60 hover:text-soft-white/80'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-3 left-4">
            <span className="text-[10px] font-mono text-text-muted/40">
              {location.pathname === '/' ? 'SYS:ORBIT' : `SYS:${location.pathname.replace('/', '').toUpperCase()}`}
            </span>
          </div>

          <div className="absolute bottom-3 right-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-text-muted/40">STATUS</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                <span className="w-1.5 h-1.5 rounded-full bg-orbital-blue/50" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}