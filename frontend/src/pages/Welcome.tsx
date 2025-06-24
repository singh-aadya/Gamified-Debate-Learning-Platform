import React, { useState, useContext } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Trophy, 
  Brain, 
  Target,
  ChevronRight,
  Star
} from 'lucide-react'
import { UserContext } from '../App'

const Welcome: React.FC = () => {
  const { setUser } = useContext(UserContext)
  const [showRegistration, setShowRegistration] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age_group: 'middle'
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, this would make an API call
    // For demo purposes, we'll create a mock user
    const mockUser = {
      id: 1,
      username: formData.username,
      email: formData.email,
      age_group: formData.age_group,
      current_level: 1,
      total_points: 0,
      badges: []
    }
    
    setUser(mockUser)
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Feedback",
      description: "Get instant, personalized feedback on your arguments with advanced AI analysis"
    },
    {
      icon: Trophy,
      title: "Gamified Learning",
      description: "Earn points, unlock badges, and compete with friends as you improve your skills"
    },
    {
      icon: Target,
      title: "Progressive Difficulty",
      description: "Start with basics and advance through 5 challenging levels at your own pace"
    },
    {
      icon: Users,
      title: "Age-Appropriate Content",
      description: "Tailored content for elementary, middle school, high school, and college students"
    }
  ]

  if (showRegistration) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-md w-full"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Join DebateMaster</h2>
            <p className="text-gray-300">Start your debate learning journey today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Age Group
              </label>
              <select
                value={formData.age_group}
                onChange={(e) => setFormData({...formData, age_group: e.target.value})}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="elementary">Elementary (Ages 8-11)</option>
                <option value="middle">Middle School (Ages 12-14)</option>
                <option value="high">High School (Ages 15-18)</option>
                <option value="college">College Level (18+)</option>
              </select>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowRegistration(false)}
                className="flex-1 btn-secondary"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary"
              >
                Start Learning
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="float-animation mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 pulse-glow">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Master the Art of{' '}
            <span className="text-gradient">Debate</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Transform your argumentation skills with our AI-powered, gamified learning platform. 
            From logical reasoning to persuasive speaking, become a confident debater through 
            interactive challenges and personalized feedback.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRegistration(true)}
              className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-3"
            >
              Watch Demo
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-gray-300">Students Learning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Schools Using</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-300">Improvement Rate</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose DebateMaster?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology with proven educational methods 
            to create the most effective debate learning experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              className="card hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="card text-center max-w-2xl mx-auto"
        >
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Become a Debate Champion?
          </h3>
          <p className="text-gray-300 mb-6">
            Join thousands of students who have already improved their critical thinking 
            and communication skills with DebateMaster.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRegistration(true)}
            className="btn-primary text-lg px-8 py-3"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default Welcome