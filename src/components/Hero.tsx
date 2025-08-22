import { motion } from 'framer-motion';
import { ArrowDown, FileText, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-[50vh] flex items-center justify-center relative bg-background">
      {/* Content */}
      <div className="text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Learn Tech, <span className="text-primary">One Saturday</span>
            <br />
            <span className="text-primary">Blog</span> at a Time
          </h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Master technology and entrepreneurship with our weekend blog series. 
            Saturday Tech tutorials for beginners, Sunday Deep Dives for advanced strategies.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('articles')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <FileText className="mr-2 h-5 w-5" />
              Read Latest Post
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('courses')}
              className="border-primary text-primary hover:bg-primary/10"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Explore Courses
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;