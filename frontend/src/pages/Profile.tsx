import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Trophy,
  Target,
  Star,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Edit3,
  Settings,
  Download
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { UserContext } from '../App'

const Profile: React.FC = () => {
  const { user } = useContext(UserContext)

  // Mock data for charts
  const performanceData = [
    { date: '2024-01-01', score: 65 },
    { date: '2024-01-02', score: 70 },
    { date: '2024-01-03', score: 68 },
    { date: '2024-01-04', score: 75 },
    { date: '2024-01-05', score: 80 },
    { date: '2024-01-06', score: 85 },
    { date: '2024-01-07', score: 88 },
  ]

  const skillsData = [
    { skill: 'Argumentation', level: 85 },
    { skill: 'Logical Reasoning', level: 78 },
    { skill: 'Rebuttal', level: 72 },
    { skill: 'Evidence Use', level: 80 },
    { skill: 'Presentation', level: 75 },
  ]

  const achievements = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Complete your first debate practice',
      icon: '🎯',
      earned: true,
      earnedDate: '2024-01-01'
    },
    {
      id: 2,
      name: 'Debate Novice',
      description: 'Complete 5 debate practices',
      icon: '🗣️',
      earned: true,
      earnedDate: '2024-01-05'
    },
    {
      id: 3,
      name: 'Logic Master',
      description: 'Identify 10 logical fallacies correctly',
      icon: '🧠',
      earned: true,
      earnedDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'Persuasion Pro',
      description: 'Score 90+ on 3 consecutive debates',
      icon: '⚡',
      earned: false,
      progress: 66
    },
    {
      id: 5,
      name: 'Marathon Debater',
      description: 'Complete 50 debate practices',
      icon: '🏃',
      earned: false,
      progress: 24
    },
    {
      id: 6,
      name: 'Community Helper',
      description: 'Help 10 other students',
      icon: '🤝',
      earned: false,
      progress: 0
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'debate',
      title: 'Climate Change Discussion',
      score: 85,
      date: '2024-01-15',
      position: 'Pro'
    },
    {
      id: 2,
      type: 'lesson',
      title: 'Logical Fallacies Module',
      completed: true,
      date: '2024-01-14'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Logic Master Badge',
      date: '2024-01-10'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-300 text-lg">
          Track your progress and achievements
        </p>
      </motion.div>

      {/* Profile Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Edit3 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
                <p className="text-gray-300">{user?.email}</p>
                <p className="text-sm text-purple-300 capitalize">{user?.age_group} Level</p>
              </div>
              <button className="btn-secondary mt-4 sm:mt-0 flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{user?.current_level}</div>
                <div className="text-sm text-gray-300">Current Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{user?.total_points}</div>
                <div className="text-sm text-gray-300">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-gray-300">Debates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">78%</div>
                <div className="text-sm text-gray-300">Avg Score</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance Analytics */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span>Performance Trend</span>
          </h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span>Skill Breakdown</span>
          </h3>
          
          <div className="space-y-4">
            {skillsData.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm font-medium">{skill.skill}</span>
                  <span className="text-gray-300 text-sm">{skill.level}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span>Achievements</span>
          </h3>
          <span className="text-sm text-gray-300">
            {achievements.filter(a => a.earned).length} of {achievements.length} earned
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                achievement.earned
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400 text-white'
                  : 'bg-gray-700 border-gray-600 text-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{achievement.name}</h4>
                  <p className="text-sm opacity-90 mb-2">{achievement.description}</p>
                  
                  {achievement.earned ? (
                    <div className="text-xs opacity-75">
                      Earned on {achievement.earnedDate}
                    </div>
                  ) : achievement.progress !== undefined ? (
                    <div>
                      <div className="text-xs mb-1">{achievement.progress}% complete</div>
                      <div className="w-full bg-gray-600 rounded-full h-1">
                        <div 
                          className="bg-white rounded-full h-1" 
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs opacity-75">Not started</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-purple-400" />
          <span>Recent Activity</span>
        </h3>

        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 bg-white bg-opacity-5 rounded-lg">
              {activity.type === 'debate' && (
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
              )}
              {activity.type === 'lesson' && (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              )}
              {activity.type === 'achievement' && (
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
              )}

              <div className="flex-1">
                <div className="font-medium text-white">{activity.title}</div>
                <div className="text-sm text-gray-300">{activity.date}</div>
              </div>

              {activity.score && (
                <div className="badge badge-primary">{activity.score}%</div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Export Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card text-center"
      >
        <h3 className="text-xl font-semibold text-white mb-2">Export Your Progress</h3>
        <p className="text-gray-300 mb-4">
          Download a comprehensive report of your learning journey
        </p>
        <button className="btn-primary flex items-center space-x-2 mx-auto">
          <Download className="w-4 h-4" />
          <span>Download Report</span>
        </button>
      </motion.div>
    </div>
  )
}

export default Profile