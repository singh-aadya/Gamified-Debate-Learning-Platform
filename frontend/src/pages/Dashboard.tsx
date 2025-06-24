import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Trophy,
  Target,
  BookOpen,
  TrendingUp,
  Star,
  Award,
  Clock,
  Users,
  ChevronRight,
  Zap,
  Brain
} from 'lucide-react'
import { UserContext } from '../App'

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext)

  // Mock data for demonstration
  const recentActivity = [
    {
      id: 1,
      type: 'practice',
      title: 'Climate Change Debate',
      score: 85,
      time: '2 hours ago',
      position: 'Pro'
    },
    {
      id: 2,
      type: 'lesson',
      title: 'Logical Fallacies',
      completed: true,
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'First Debate Badge',
      time: '2 days ago'
    }
  ]

  const quickStats = [
    {
      label: 'Debates Completed',
      value: '12',
      icon: Target,
      color: 'from-blue-500 to-purple-500'
    },
    {
      label: 'Average Score',
      value: '78%',
      icon: TrendingUp,
      color: 'from-green-500 to-blue-500'
    },
    {
      label: 'Lessons Done',
      value: '8/15',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Current Streak',
      value: '5 days',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const achievements = [
    { name: 'First Steps', icon: '🎯', unlocked: true },
    { name: 'Debate Novice', icon: '🗣️', unlocked: true },
    { name: 'Logic Master', icon: '🧠', unlocked: false },
    { name: 'Persuasion Pro', icon: '⚡', unlocked: false }
  ]

  const nextLevelProgress = ((user?.total_points || 0) / (user?.current_level || 1 * 100)) * 100

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {user?.username}! 🎉
        </h1>
        <p className="text-gray-300 text-lg">
          Ready to sharpen your debate skills today?
        </p>
      </motion.div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Level {user?.current_level}</h3>
              <p className="text-gray-300">Intermediate Debater</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{user?.total_points}</div>
            <div className="text-sm text-gray-300">Total Points</div>
          </div>
        </div>
        
        <div className="progress-bar mb-2">
          <div 
            className="progress-fill" 
            style={{ width: `${Math.min(nextLevelProgress, 100)}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-300">
          <span>Level {user?.current_level}</span>
          <span>{Math.round(100 - nextLevelProgress)} points to next level</span>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="card hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Quick Actions</span>
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/practice"
                className="group p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <Brain className="w-6 h-6 text-white" />
                  <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-semibold text-white mb-1">Start Debate Practice</h4>
                <p className="text-purple-100 text-sm">Practice with AI feedback</p>
              </Link>

              <Link
                to="/learn"
                className="group p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="w-6 h-6 text-white" />
                  <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-semibold text-white mb-1">Continue Learning</h4>
                <p className="text-green-100 text-sm">Next: Rebuttal Techniques</p>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Recent Activity</span>
            </h3>
            
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-white bg-opacity-5 rounded-lg">
                  {activity.type === 'practice' && (
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {activity.type === 'lesson' && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                  )}
                  {activity.type === 'achievement' && (
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="text-white font-medium">{activity.title}</div>
                    <div className="text-sm text-gray-300">{activity.time}</div>
                  </div>
                  
                  {activity.score && (
                    <div className="badge badge-primary">{activity.score}%</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          {/* Achievements */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Achievements</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-center transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className="text-xs font-medium">{achievement.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Daily Challenge</span>
            </h3>
            
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-white mb-2">Fallacy Detective</h4>
              <p className="text-gray-300 text-sm mb-4">
                Identify 3 logical fallacies in sample arguments
              </p>
              <button className="btn-primary w-full text-sm">
                Start Challenge
              </button>
            </div>
          </div>

          {/* Study Streak */}
          <div className="card">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Study Streak</span>
            </h3>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">5</div>
              <p className="text-gray-300 text-sm mb-4">Days in a row!</p>
              
              <div className="flex justify-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div
                    key={day}
                    className={`w-6 h-6 rounded-full ${
                      day <= 5 ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  ></div>
                ))}
              </div>
              
              <p className="text-xs text-gray-400">
                Keep it up! 2 more days for a weekly badge
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard