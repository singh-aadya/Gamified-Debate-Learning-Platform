import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle,
  Lock,
  Play,
  Star,
  Clock,
  Users,
  Trophy,
  Target,
  Brain,
  Lightbulb,
  ArrowRight
} from 'lucide-react'
import { UserContext } from '../App'

const LearningPath: React.FC = () => {
  const { user } = useContext(UserContext)

  const learningModules = [
    {
      id: 1,
      title: "Debate Fundamentals",
      description: "Master the basic concepts and structure of debates",
      lessons: [
        { id: 1, title: "What is Debate?", duration: "10 min", completed: true },
        { id: 2, title: "Types of Debate Formats", duration: "15 min", completed: true },
        { id: 3, title: "Roles and Responsibilities", duration: "12 min", completed: false },
        { id: 4, title: "Time Management", duration: "8 min", completed: false }
      ],
      progress: 50,
      difficulty: "Beginner",
      unlocked: true,
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Argument Construction",
      description: "Learn to build compelling, logical arguments",
      lessons: [
        { id: 1, title: "Claim-Evidence-Warrant Structure", duration: "20 min", completed: false },
        { id: 2, title: "Types of Evidence", duration: "18 min", completed: false },
        { id: 3, title: "Logical Reasoning", duration: "22 min", completed: false },
        { id: 4, title: "Strengthening Your Case", duration: "15 min", completed: false }
      ],
      progress: 0,
      difficulty: "Intermediate",
      unlocked: true,
      icon: Brain,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Logical Fallacies",
      description: "Identify and avoid common reasoning errors",
      lessons: [
        { id: 1, title: "What Are Logical Fallacies?", duration: "12 min", completed: false },
        { id: 2, title: "Ad Hominem & Strawman", duration: "16 min", completed: false },
        { id: 3, title: "False Dichotomy & Slippery Slope", duration: "14 min", completed: false },
        { id: 4, title: "Appeal Fallacies", duration: "18 min", completed: false }
      ],
      progress: 0,
      difficulty: "Intermediate",
      unlocked: false,
      icon: Target,
      color: "from-red-500 to-orange-500"
    },
    {
      id: 4,
      title: "Rebuttal Techniques",
      description: "Master the art of counter-argumentation",
      lessons: [
        { id: 1, title: "Understanding Rebuttals", duration: "15 min", completed: false },
        { id: 2, title: "The DARE Method", duration: "20 min", completed: false },
        { id: 3, title: "Attacking Evidence", duration: "18 min", completed: false },
        { id: 4, title: "Comparative Analysis", duration: "25 min", completed: false }
      ],
      progress: 0,
      difficulty: "Advanced",
      unlocked: false,
      icon: Trophy,
      color: "from-yellow-500 to-green-500"
    },
    {
      id: 5,
      title: "Advanced Techniques",
      description: "Sophisticated strategies for competitive debate",
      lessons: [
        { id: 1, title: "Strategic Thinking", duration: "30 min", completed: false },
        { id: 2, title: "Cross-Examination Skills", duration: "25 min", completed: false },
        { id: 3, title: "Flowing and Note-Taking", duration: "20 min", completed: false },
        { id: 4, title: "Closing Arguments", duration: "22 min", completed: false }
      ],
      progress: 0,
      difficulty: "Expert",
      unlocked: false,
      icon: Star,
      color: "from-indigo-500 to-purple-500"
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'badge-success'
      case 'Intermediate': return 'badge-warning'
      case 'Advanced': return 'badge-primary'
      case 'Expert': return 'text-purple-300 border-purple-500'
      default: return 'badge-primary'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Learning Path</h1>
        <p className="text-gray-300 text-lg">
          Master debate skills through our structured learning modules
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white">Overall Progress</h3>
            <p className="text-gray-300">Level {user?.current_level} • {user?.total_points} points earned</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">10%</div>
            <div className="text-sm text-gray-300">Complete</div>
          </div>
        </div>
        
        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width: '10%' }}></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-sm text-gray-300">Modules</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">2</div>
            <div className="text-sm text-gray-300">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">1.5</div>
            <div className="text-sm text-gray-300">Hours Studied</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-sm text-gray-300">Skills Unlocked</div>
          </div>
        </div>
      </motion.div>

      {/* Learning Modules */}
      <div className="space-y-6">
        {learningModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className={`card ${!module.unlocked ? 'opacity-60' : ''}`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
              {/* Module Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center flex-shrink-0 mb-4 lg:mb-0`}>
                {module.unlocked ? (
                  <module.icon className="w-8 h-8 text-white" />
                ) : (
                  <Lock className="w-8 h-8 text-white" />
                )}
              </div>

              {/* Module Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white mb-1 sm:mb-0">{module.title}</h3>
                  <span className={`badge ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4">{module.description}</p>
                
                {module.unlocked && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">Progress</span>
                      <span className="text-sm text-white font-semibold">{module.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${module.progress}%` }}></div>
                    </div>
                  </div>
                )}

                {/* Lessons */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                        module.unlocked 
                          ? lesson.completed
                            ? 'bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30'
                            : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
                          : 'bg-gray-800 cursor-not-allowed'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        lesson.completed 
                          ? 'bg-green-500' 
                          : module.unlocked 
                            ? 'bg-gray-600' 
                            : 'bg-gray-700'
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : module.unlocked ? (
                          <Play className="w-4 h-4 text-white" />
                        ) : (
                          <Lock className="w-4 h-4 text-white" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-medium text-white text-sm">{lesson.title}</div>
                        <div className="flex items-center space-x-2 text-xs text-gray-300">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 mt-4 lg:mt-0">
                {module.unlocked ? (
                  <button className="btn-primary flex items-center space-x-2">
                    <span>{module.progress > 0 ? 'Continue' : 'Start'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="text-center">
                    <Lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-400">
                      Complete previous modules to unlock
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Study Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <span>Study Tips</span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Stay Consistent</h4>
              <p className="text-gray-300 text-sm">
                Study for 15-20 minutes daily rather than cramming for hours
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Practice Actively</h4>
              <p className="text-gray-300 text-sm">
                Apply what you learn immediately through debate exercises
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Join Discussions</h4>
              <p className="text-gray-300 text-sm">
                Engage with other learners in our community forums
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Reflect & Review</h4>
              <p className="text-gray-300 text-sm">
                Take notes and review key concepts regularly
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LearningPath