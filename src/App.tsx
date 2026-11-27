import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import Profile from './sections/Profile';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Loisirs from './sections/Loisirs';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import SceneTransition from './components/SceneTransition';
import useMood from './hooks/useMood';

export default function App() {
  useMood();
  return (
    // reducedMotion="user" : animations coupées si le visiteur l'a demandé dans son système
    <MotionConfig reducedMotion="user">
      <a href="#profil" className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-lg bg-ink px-4 py-2 text-paper focus-visible:translate-y-0">
        Aller au contenu
      </a>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SceneTransition>
          <Profile />
        </SceneTransition>
        <SceneTransition>
          <Experience />
        </SceneTransition>
        <SceneTransition>
          <Projects />
        </SceneTransition>
        <SceneTransition>
          <Skills />
        </SceneTransition>
        <SceneTransition>
          <Education />
        </SceneTransition>
        <SceneTransition>
          <Loisirs />
        </SceneTransition>
        <SceneTransition>
          <Contact />
        </SceneTransition>
      </main>
      <Footer />
    </MotionConfig>
  );
}
