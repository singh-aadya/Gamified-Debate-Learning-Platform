import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  BookOpen, 
  Target, 
  User, 
  Trophy,
  Star,
  LogOut
} from 'lucide-react'
import { UserContext } from '../App'

const Navigation: React.FC = () => {
  const { user, setUser } = useContext(UserContext)
  const location = useLocation()

  const handleLogout = () => {
    setUser(null)
  }

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
    { path: '/practice', icon: Target, label: 'Practice' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <nav className="glass-dark sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">DebateMaster</h1>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-purple-500 bg-opacity-20 text-purple-300' 
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden md:block">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold">{user?.total_points || 0}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-white">
              <span className="hidden md:block">Level {user?.current_level || 1}</span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation