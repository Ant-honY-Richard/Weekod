import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Technologies from "@/components/sections/Technologies";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Team from "@/components/sections/Team";
import CallToAction from "@/components/sections/CallToAction";
import Contact from "@/components/sections/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Technologies />
      <Portfolio />
      <Testimonials />
      <Team />
      <CallToAction />
      <Contact />
    </>
  );
};

export default Home;
