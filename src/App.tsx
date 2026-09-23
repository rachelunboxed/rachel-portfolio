import About from './components/About';
import AISection from './components/AISection';
import CareerTimeline from './components/CareerTimeline';
import CaseStudies from './components/CaseStudies';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Philosophy from './components/Philosophy';
import ProductProcess from './components/ProductProcess';
import ResumeCTA from './components/ResumeCTA';
import Skills from './components/Skills';
import TrustStrip from './components/TrustStrip';
import WhatIBring from './components/WhatIBring';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <CareerTimeline />
        <WhatIBring />
        <Skills />
        <CaseStudies />
        <ProductProcess />
        <AISection />
        <Certifications />
        <Philosophy />
        <ResumeCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
