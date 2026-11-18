import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <TechStack />
      <Projects />
      <FAQ />
      <Contact />
    </>
  );
}
