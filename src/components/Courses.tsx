import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Users, Clock, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  students: string;
  rating: number;
  price: string;
  level: string;
  topics: string[];
}

const Courses = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  // Featured course for demo
  const featuredCourse: Course = {
    id: "react-mastery",
    title: "Complete React Mastery: From Zero to Production",
    description: "Master React.js with this comprehensive course covering everything from basics to advanced patterns, state management, testing, and deployment strategies.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    duration: "40+ hours",
    students: "2,500+",
    rating: 4.9,
    price: "$99",
    level: "Beginner to Advanced",
    topics: ["React Hooks", "Context API", "Redux Toolkit", "Testing", "Performance", "Deployment"]
  };

  const upcomingCourses = [
    {
      title: "Node.js Backend Development",
      description: "Build scalable backend applications with Node.js, Express, and MongoDB",
      status: "Coming Soon",
      estimatedLaunch: "Q2 2024"
    },
    {
      title: "Full-Stack TypeScript",
      description: "End-to-end TypeScript development with React, Node.js, and PostgreSQL",
      status: "In Development",
      estimatedLaunch: "Q3 2024"
    }
  ];

  return (
    <section id="courses" className="py-20 px-6 bg-muted/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Courses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive programming courses designed to take you from beginner to expert
          </p>
        </motion.div>

        {/* Featured Course */}
        <motion.div
          className="glass-card mb-16 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Course Image */}
            <div className="relative">
              <img
                src={featuredCourse.thumbnail}
                alt={featuredCourse.title}
                className="w-full h-64 lg:h-full object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Featured Course
              </div>
            </div>

            {/* Course Details */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">{featuredCourse.level}</span>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm ml-1">{featuredCourse.rating}</span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  {featuredCourse.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {featuredCourse.description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {featuredCourse.duration}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {featuredCourse.students} enrolled
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-2" />
                    20+ Projects
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-6">
                  <p className="text-sm font-medium mb-3">What you'll learn:</p>
                  <div className="flex flex-wrap gap-2">
                    {featuredCourse.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-primary">{featuredCourse.price}</span>
                  <span className="text-muted-foreground ml-2 line-through">$199</span>
                </div>
                <Button
                  size="lg"
                  onClick={() => navigate('/course/react-mastery')}
                  className="glass-card bg-primary/90 hover:bg-primary text-primary-foreground glow-border"
                >
                  View Course
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Courses */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Coming Soon</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingCourses.map((course, index) => (
              <motion.div
                key={course.title}
                className="glass-card text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <h4 className="text-xl font-bold mb-3">{course.title}</h4>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-secondary/20 text-secondary px-3 py-1 rounded-full">
                    {course.status}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {course.estimatedLaunch}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;