import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import DebatePractice from './pages/DebatePractice'
import LearningPath from './pages/LearningPath'
import Profile from './pages/Profile'
import Welcome from './pages/Welcome'
import './App.css'

// Simple user context for demo purposes
export interface User {
  id: number
  username: string
  email: string
  age_group: string
  current_level: number
  total_points: number
  badges: string[]
}

export const UserContext = React.createContext<{
  user: User | null
  setUser: (user: User | null) => void
}>({
  user: null,
  setUser: () => {}
})

function App() {
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="min-h-screen bg-black bg-opacity-20">
          {user ? (
            <>
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/practice" element={<DebatePractice />} />
                  <Route path="/learn" element={<LearningPath />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </>
          ) : (
            <Welcome />
          )}
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default App