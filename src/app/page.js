import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Activity from "@/components/Activity";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Activity />
      <Projects />
      <Contact />
    </main>
  );
}