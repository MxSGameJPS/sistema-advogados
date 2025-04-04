"use client";

import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Team from "./components/Team";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { animateOnScroll } from "./utils/animations";

export default function Home() {
  useEffect(() => {
    // Inicializar animações on scroll
    const cleanup = animateOnScroll();

    return cleanup;
  }, []);

  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <Team />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
