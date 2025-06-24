import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import {
  MessageCircle,
  Clock,
  Target,
  Brain,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Star,
  Trophy,
  ArrowRight,
  Lightbulb,
  Users,
  RotateCcw
} from 'lucide-react'
import { UserContext } from '../App'

interface AIFeedback {
  overall_score: number
  strengths: string[]
  improvements: string[]
  logical_fallacies: Array<{
    type: string
    description: string
    suggestion: string
  }>
  argument_structure: {
    has_clear_claim: boolean
    includes_evidence: boolean
    shows_reasoning: boolean
    structure_score: number
  }
  suggestions: string[]
}

const DebatePractice: React.FC = () => {
  const { user } = useContext(UserContext)
  const [currentStep, setCurrentStep] = useState<'topic' | 'position' | 'argument' | 'feedback'>('topic')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedPosition, setSelectedPosition] = useState<'for' | 'against' | ''>('')
  const [argument, setArgument] = useState('')
  const [feedback, setFeedback] = useState<AIFeedback | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const debateTopics = [
    {
      id: 'climate',
      title: 'Climate Change Action',
      description: 'Should governments prioritize economic growth over environmental protection?',
      difficulty: 'Intermediate',
      category: 'Environment'
    },
    {
      id: 'social_media',
      title: 'Social Media Regulation',
      description: 'Should social media platforms be regulated by government?',
      difficulty: 'Beginner',
      category: 'Technology'
    },
    {
      id: 'education',
      title: 'Online vs Traditional Education',
      description: 'Is online education more effective than traditional classroom learning?',
      difficulty: 'Intermediate',
      category: 'Education'
    },
    {
      id: 'privacy',
      title: 'Privacy vs Security',
      description: 'Should governments have access to private communications for security purposes?',
      difficulty: 'Advanced',
      category: 'Civil Rights'
    }
  ]

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId)
    setCurrentStep('position')
  }

  const handlePositionSelect = (position: 'for' | 'against') => {
    setSelectedPosition(position)
    setCurrentStep('argument')
  }

  const handleArgumentSubmit = async () => {
    if (!argument.trim()) return

    setIsLoading(true)
    
    // Simulate API call to backend
    setTimeout(() => {
      const mockFeedback: AIFeedback = {
        overall_score: Math.floor(Math.random() * 30) + 70, // 70-100
        strengths: [
          argument.length > 100 ? "Well-developed argument with good detail" : "Clear position stated",
          argument.includes('because') || argument.includes('since') ? "Good use of reasoning words" : "Straightforward presentation"
        ],
        improvements: [
          !argument.includes('study') && !argument.includes('research') ? "Include specific evidence or statistics" : "",
          argument.length < 50 ? "Expand your argument with more supporting details" : "",
          !argument.includes('however') && !argument.includes('although') ? "Consider addressing counterarguments" : ""
        ].filter(Boolean),
        logical_fallacies: argument.toLowerCase().includes('everyone') ? [{
          type: "Appeal to Common Belief",
          description: "Using popularity as evidence for truth",
          suggestion: "Replace 'everyone knows' with specific evidence or expert opinions"
        }] : [],
        argument_structure: {
          has_clear_claim: argument.length > 20,
          includes_evidence: argument.includes('study') || argument.includes('research') || argument.includes('data'),
          shows_reasoning: argument.includes('because') || argument.includes('therefore') || argument.includes('since'),
          structure_score: 2
        },
        suggestions: [
          "Try using the Claim-Evidence-Warrant structure",
          "Consider what the opposing side might say",
          "Use specific examples to strengthen your points"
        ]
      }
      
      setFeedback(mockFeedback)
      setIsLoading(false)
      setCurrentStep('feedback')
      
      if (mockFeedback.overall_score >= 85) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000)
      }
    }, 2000)
  }

  const handleRestart = () => {
    setCurrentStep('topic')
    setSelectedTopic('')
    setSelectedPosition('')
    setArgument('')
    setFeedback(null)
    setShowConfetti(false)
  }

  const selectedTopicData = debateTopics.find(t => t.id === selectedTopic)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Debate Practice</h1>
        <p className="text-gray-300 text-lg">
          Sharpen your argumentation skills with AI-powered feedback
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-4">
          {[
            { key: 'topic', label: 'Topic', icon: MessageCircle },
            { key: 'position', label: 'Position', icon: Target },
            { key: 'argument', label: 'Argument', icon: Brain },
            { key: 'feedback', label: 'Feedback', icon: Star }
          ].map((step, index) => {
            const isActive = currentStep === step.key
            const isCompleted = ['topic', 'position', 'argument', 'feedback'].indexOf(currentStep) > index
            
            return (
              <React.Fragment key={step.key}>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-purple-500 text-white' : 
                  isCompleted ? 'bg-green-500 text-white' : 
                  'bg-gray-700 text-gray-300'
                }`}>
                  <step.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
                {index < 3 && (
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentStep === 'topic' && (
          <motion.div
            key="topic"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Choose Your Debate Topic
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {debateTopics.map((topic) => (
                <motion.div
                  key={topic.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleTopicSelect(topic.id)}
                  className="p-4 bg-white bg-opacity-5 rounded-lg border border-gray-600 hover:border-purple-500 cursor-pointer transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                    <span className={`badge text-xs ${
                      topic.difficulty === 'Beginner' ? 'badge-success' :
                      topic.difficulty === 'Intermediate' ? 'badge-warning' :
                      'badge-primary'
                    }`}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{topic.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-300">{topic.category}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 'position' && selectedTopicData && (
          <motion.div
            key="position"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Position</h2>
              <div className="badge badge-primary mb-4">{selectedTopicData.title}</div>
              <p className="text-gray-300">{selectedTopicData.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => handlePositionSelect('for')}
                className="p-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg cursor-pointer hover:from-green-600 hover:to-blue-600 transition-all duration-300"
              >
                <div className="text-center">
                  <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Argue FOR</h3>
                  <p className="text-green-100 text-sm">
                    Support the statement and provide reasons why it's beneficial
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => handlePositionSelect('against')}
                className="p-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg cursor-pointer hover:from-red-600 hover:to-pink-600 transition-all duration-300"
              >
                <div className="text-center">
                  <XCircle className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Argue AGAINST</h3>
                  <p className="text-red-100 text-sm">
                    Challenge the statement and explain why it's problematic
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentStep === 'argument' && selectedTopicData && (
          <motion.div
            key="argument"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Present Your Argument</h2>
              <div className="flex justify-center items-center space-x-2 mb-4">
                <span className="badge badge-primary">{selectedTopicData.title}</span>
                <span className={`badge ${selectedPosition === 'for' ? 'badge-success' : 'text-red-300 border-red-500'}`}>
                  {selectedPosition === 'for' ? 'FOR' : 'AGAINST'}
                </span>
              </div>
              <p className="text-gray-300">{selectedTopicData.description}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Pro Tip:</h4>
                    <p className="text-blue-200 text-sm">
                      Use the Claim-Evidence-Warrant structure: State your position, provide evidence, and explain how the evidence supports your claim.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Argument (minimum 50 words)
                </label>
                <textarea
                  value={argument}
                  onChange={(e) => setArgument(e.target.value)}
                  className="w-full h-40 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder={`Write your ${selectedPosition === 'for' ? 'supporting' : 'opposing'} argument here...`}
                />
                <div className="text-right text-sm text-gray-400 mt-1">
                  {argument.length} characters
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentStep('position')}
                  className="btn-secondary"
                >
                  Back
                </button>
                <button
                  onClick={handleArgumentSubmit}
                  disabled={argument.length < 50 || isLoading}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Get AI Feedback</span>
                      <Brain className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'feedback' && feedback && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Score Overview */}
            <div className="card text-center">
              <div className="mb-4">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  feedback.overall_score >= 85 ? 'bg-green-500' :
                  feedback.overall_score >= 70 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}>
                  <span className="text-3xl font-bold text-white">{feedback.overall_score}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {feedback.overall_score >= 85 ? 'Excellent Work!' :
                   feedback.overall_score >= 70 ? 'Good Effort!' :
                   'Keep Practicing!'}
                </h2>
                <p className="text-gray-300">
                  {feedback.overall_score >= 85 ? 'Your argument shows strong structure and reasoning!' :
                   feedback.overall_score >= 70 ? 'You\'re on the right track with some areas for improvement.' :
                   'This is a great start - let\'s work on strengthening your argument.'}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="card">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Strengths</span>
                </h3>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="card">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span>Areas for Improvement</span>
                </h3>
                <ul className="space-y-2">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <ArrowRight className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Logical Fallacies */}
            {feedback.logical_fallacies.length > 0 && (
              <div className="card">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span>Logical Fallacies Detected</span>
                </h3>
                <div className="space-y-3">
                  {feedback.logical_fallacies.map((fallacy, index) => (
                    <div key={index} className="bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg p-4">
                      <h4 className="font-semibold text-red-300 mb-1">{fallacy.type}</h4>
                      <p className="text-gray-300 text-sm mb-2">{fallacy.description}</p>
                      <p className="text-red-200 text-sm">
                        <strong>Suggestion:</strong> {fallacy.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Structure Analysis */}
            <div className="card">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>Argument Structure</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    feedback.argument_structure.has_clear_claim ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    {feedback.argument_structure.has_clear_claim ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <XCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-white">Clear Claim</div>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    feedback.argument_structure.includes_evidence ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    {feedback.argument_structure.includes_evidence ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <XCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-white">Evidence</div>
                </div>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    feedback.argument_structure.shows_reasoning ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    {feedback.argument_structure.shows_reasoning ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <XCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-white">Reasoning</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleRestart}
                className="btn-secondary flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Another Topic</span>
              </button>
              <button
                onClick={() => setCurrentStep('argument')}
                className="btn-primary flex-1"
              >
                Revise Argument
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DebatePractice