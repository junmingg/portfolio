import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  // Held false until the loading screen dismisses, so the hero's entrance and
  // terminal type-out play in full view rather than behind the overlay.
  const [ready, setReady] = useState(false);

  return (
    <div className="relative">
      <LoadingScreen onDone={() => setReady(true)} />
      <Navbar />
      <main className="relative z-[2]">
        <Hero ready={ready} />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
