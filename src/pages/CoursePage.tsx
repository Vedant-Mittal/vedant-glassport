import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, FileText, ExternalLink, BookOpen, Menu, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { courseData } from '@/data/courseData';

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentLecture, setCurrentLecture] = useState<any>(null);
  const [completedLectures, setCompletedLectures] = useState<Set<string>>(new Set());
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['introduction']));

  const course = courseData[courseId as keyof typeof courseData];

  useEffect(() => {
    if (!course) {
      navigate('/');
      return;
    }

    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`course-progress-${courseId}`);
    if (savedProgress) {
      setCompletedLectures(new Set(JSON.parse(savedProgress)));
    }

    // Set first lecture as current if none selected
    if (!currentLecture && course.chapters.length > 0) {
      setCurrentLecture(course.chapters[0].lectures[0]);
    }
  }, [course, courseId, navigate, currentLecture]);

  if (!course) {
    return null;
  }

  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const markAsCompleted = (lectureId: string) => {
    const newCompleted = new Set(completedLectures);
    newCompleted.add(lectureId);
    setCompletedLectures(newCompleted);
    localStorage.setItem(`course-progress-${courseId}`, JSON.stringify(Array.from(newCompleted)));
  };

  const getNextLecture = () => {
    if (!currentLecture) return null;
    
    for (let i = 0; i < course.chapters.length; i++) {
      const chapter = course.chapters[i];
      const lectureIndex = chapter.lectures.findIndex(l => l.id === currentLecture.id);
      
      if (lectureIndex !== -1) {
        // If not last lecture in chapter, return next lecture
        if (lectureIndex < chapter.lectures.length - 1) {
          return chapter.lectures[lectureIndex + 1];
        }
        // If last lecture in chapter, return first lecture of next chapter
        if (i < course.chapters.length - 1) {
          return course.chapters[i + 1].lectures[0];
        }
      }
    }
    return null;
  };

  const getPreviousLecture = () => {
    if (!currentLecture) return null;
    
    for (let i = 0; i < course.chapters.length; i++) {
      const chapter = course.chapters[i];
      const lectureIndex = chapter.lectures.findIndex(l => l.id === currentLecture.id);
      
      if (lectureIndex !== -1) {
        // If not first lecture in chapter, return previous lecture
        if (lectureIndex > 0) {
          return chapter.lectures[lectureIndex - 1];
        }
        // If first lecture in chapter, return last lecture of previous chapter
        if (i > 0) {
          const prevChapter = course.chapters[i - 1];
          return prevChapter.lectures[prevChapter.lectures.length - 1];
        }
      }
    }
    return null;
  };

  const totalLectures = course.chapters.reduce((total, chapter) => total + chapter.lectures.length, 0);
  const progressPercentage = (completedLectures.size / totalLectures) * 100;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-80 glass border-r border-border flex flex-col fixed lg:relative h-screen z-50"
          >
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-bold text-lg text-primary truncate">{course.title}</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress</span>
                  <span>{completedLectures.size}/{totalLectures}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {course.chapters.map((chapter) => (
                <div key={chapter.id} className="mb-4">
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full text-left p-3 glass-card hover:glow-border transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{chapter.title}</span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          expandedChapters.has(chapter.id) ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedChapters.has(chapter.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 mt-2 space-y-1">
                          {chapter.lectures.map((lecture) => (
                            <button
                              key={lecture.id}
                              onClick={() => setCurrentLecture(lecture)}
                              className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 ${
                                currentLecture?.id === lecture.id
                                  ? 'bg-primary/20 text-primary glow-border'
                                  : 'hover:bg-muted/50'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {completedLectures.has(lecture.id) ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Play className="h-3 w-3" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium truncate">{lecture.title}</div>
                                <div className="text-muted-foreground">{lecture.duration}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="glass border-b border-border p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {currentLecture ? (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{currentLecture.title}</h1>
                <p className="text-muted-foreground">Duration: {currentLecture.duration}</p>
              </div>

              <Tabs defaultValue="video" className="w-full">
                <TabsList className="glass-card p-1">
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Resources
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="video" className="mt-6">
                  <div className="glass-card p-6">
                    <div className="aspect-video bg-black rounded-lg mb-4">
                      <iframe
                        src={`https://www.youtube.com/embed/${currentLecture.videoId}`}
                        title={currentLecture.title}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <Button
                      onClick={() => markAsCompleted(currentLecture.id)}
                      disabled={completedLectures.has(currentLecture.id)}
                      className="glass-card bg-primary/90 hover:bg-primary text-primary-foreground"
                    >
                      {completedLectures.has(currentLecture.id) ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Completed
                        </>
                      ) : (
                        'Mark as Complete'
                      )}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="mt-6">
                  <div className="glass-card p-6">
                    <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          Lecture notes for "{currentLecture.title}"
                        </p>
                        <a
                          href={currentLecture.notesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 glass-card glow-border text-primary hover:bg-primary/10 transition-colors"
                        >
                          Download PDF
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="mt-6">
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
                    <div className="space-y-3">
                      {currentLecture.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 glass-card hover:glow-border transition-all duration-200 group"
                        >
                          <span className="font-medium group-hover:text-primary transition-colors">
                            {resource.title}
                          </span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a lecture to begin</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        {currentLecture && (
          <footer className="glass border-t border-border p-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <Button
                variant="outline"
                onClick={() => {
                  const prev = getPreviousLecture();
                  if (prev) setCurrentLecture(prev);
                }}
                disabled={!getPreviousLecture()}
                className="glass-card"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Lecture {completedLectures.size + 1} of {totalLectures}
                </p>
              </div>

              <Button
                onClick={() => {
                  const next = getNextLecture();
                  if (next) setCurrentLecture(next);
                }}
                disabled={!getNextLecture()}
                className="glass-card bg-primary/90 hover:bg-primary text-primary-foreground"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </footer>
        )}
      </main>
    </div>
  );
};

export default CoursePage;