import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { LenisProvider } from './components/layout/LenisProvider';
import HUD from './components/ui/HUD';
import Scene from './components/three/Scene';
import OrbitalSystem from './components/three/OrbitalSystem';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const OurWork = lazy(() => import('./pages/OurWork'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function BootSequence() {
  return (
    <div className="fixed inset-0 z-[100] bg-void flex items-center justify-center">
      <div className="text-center">
        <div className="w-1 h-1 rounded-full bg-orbital-blue animate-pulse mx-auto mb-4" />
        <p className="text-[10px] font-mono text-orbital-blue/60 tracking-[0.3em] uppercase">
          Initializing Systems
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <LenisProvider>
      <Scene>
        <OrbitalSystem />
      </Scene>

      <div className="relative z-10">
        <Suspense fallback={<BootSequence />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/our-work" element={<OurWork />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>

      <HUD />
    </LenisProvider>
  );
}