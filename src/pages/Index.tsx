import Hero from '@/components/Hero';
import About from '@/components/About';
import Articles from '@/components/Articles';
import Videos from '@/components/Videos';
import Courses from '@/components/Courses';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Articles />
      <Videos />
      <Courses />
      <Contact />
    </div>
  );
};

export default Index;
