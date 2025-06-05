import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = ({ 
  currentModule, 
  onModuleComplete, 
  onBookmarkToggle, 
  isCompleted,
  bookmarks = []
}) => {
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [codeBlocks, setCodeBlocks] = useState([])

  // Sample code examples for different modules
  const codeExamples = {
    1: `// Simple Apper prompt example
"Create a booking app for a hair salon with:
- Calendar view for appointments  
- Customer contact form
- Service selection dropdown
- Price calculator"`,
    2: `// Improving your prompt with ChatGPT
"Help me write a detailed prompt for Apper to create a project management tool. I need:
- Task creation and assignment
- Progress tracking  
- Team collaboration features
- File attachment system
- Deadline notifications"`,
    5: `// Talking to Apper AI Assistant
"Add a login page with Google authentication"
"Make the submit button save data to database"
"Change the color scheme to blue and white"
"Add a confirmation email after signup"`
  }

  // Simulate reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parse module content into sections
  const sections = currentModule?.content ? 
    currentModule.content.split('\n\n').filter(section => section.trim()) : 
    ['Welcome to ApperGuide! Select a module from the sidebar to begin learning.']

  const handleCompleteModule = () => {
    if (currentModule && !isCompleted) {
      onModuleComplete(currentModule.id)
      
      // Confetti animation
      const confetti = document.createElement('div')
      confetti.innerHTML = '🎉'
      confetti.className = 'fixed top-1/2 left-1/2 text-4xl animate-confetti z-50'
      document.body.appendChild(confetti)
      setTimeout(() => document.body.removeChild(confetti), 600)
    }
  }

  const handleBookmark = (sectionTitle) => {
    if (currentModule) {
      onBookmarkToggle(currentModule.id, sectionTitle)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Code copied to clipboard!')
  }

  const isBookmarked = (sectionTitle) => {
    return bookmarks.some(b => 
      b.moduleId === currentModule?.id && b.sectionTitle === sectionTitle
    )
  }

  if (!currentModule) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
              <ApperIcon name="PlayCircle" className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <h2 className="text-2xl font-bold text-surface-900 mb-4">Ready to Start Learning?</h2>
          <p className="text-surface-600 mb-6">
            Choose a module from the sidebar to begin your journey with Apper. 
            Our comprehensive guide will take you from beginner to expert!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-card">
              <span className="flex items-center space-x-2">
                <ApperIcon name="BookOpen" className="w-5 h-5" />
                <span>Start with Module 1</span>
              </span>
            </button>
            <button 
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="px-6 py-3 border border-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-50 transition-colors"
            >
              <span className="flex items-center space-x-2">
                <ApperIcon name="Zap" className="w-5 h-5" />
                <span>Quick Actions</span>
              </span>
            </button>
          </div>

          <AnimatePresence>
            {showQuickActions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-surface-50 rounded-lg border border-surface-200"
              >
                <h3 className="font-semibold text-surface-900 mb-3">Coming Soon</h3>
                <div className="space-y-2 text-sm text-surface-600">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Video" className="w-4 h-4" />
                    <span>Video tutorials - Launching next week</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Download" className="w-4 h-4" />
                    <span>Download PDF guides - In development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Users" className="w-4 h-4" />
                    <span>Community forum - Coming in v2.0</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  const moduleIndex = parseInt(currentModule.id) || 1

  return (
    <div className="flex-1 bg-white">
      {/* Reading Progress Bar */}
      <div className="h-1 bg-surface-100">
        <motion.div 
          className="reading-progress"
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto p-6 lg:p-8">
        {/* Module Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  Module {moduleIndex}
                </span>
                {isCompleted && (
                  <div className="flex items-center space-x-1 text-secondary">
                    <ApperIcon name="CheckCircle" className="w-5 h-5" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-surface-900 mb-2">
                {currentModule.title}
              </h1>
              <p className="text-surface-600 text-lg">{currentModule.description}</p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <span className="text-sm text-surface-500 bg-surface-100 px-3 py-1 rounded-full">
                <ApperIcon name="Clock" className="w-4 h-4 inline mr-1" />
                {currentModule.estimatedTime}
              </span>
              <button
                onClick={() => handleBookmark(currentModule.title)}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked(currentModule.title)
                    ? 'bg-accent text-white' 
                    : 'text-surface-400 hover:text-accent hover:bg-accent/10'
                }`}
              >
                <ApperIcon name="Bookmark" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Module Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="prose prose-surface max-w-none"
            >
              <div className="bg-white rounded-xl border border-surface-200 p-6 shadow-soft hover:shadow-card transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-surface-900">
                    Section {index + 1}
                  </h3>
                  <button
                    onClick={() => handleBookmark(`Section ${index + 1}`)}
                    className={`p-1 rounded transition-colors ${
                      isBookmarked(`Section ${index + 1}`)
                        ? 'text-accent' 
                        : 'text-surface-300 hover:text-accent'
                    }`}
                  >
                    <ApperIcon name="Bookmark" className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-surface-700 leading-relaxed whitespace-pre-line">
                  {section}
                </div>
                
                {/* Code Examples */}
                {codeExamples[moduleIndex] && index === 1 && (
                  <div className="mt-6">
                    <div className="bg-surface-800 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-3 bg-surface-700">
                        <span className="text-surface-300 text-sm font-medium">Example</span>
                        <button
                          onClick={() => copyToClipboard(codeExamples[moduleIndex])}
                          className="text-surface-300 hover:text-white transition-colors"
                        >
                          <ApperIcon name="Copy" className="w-4 h-4" />
                        </button>
                      </div>
                      <pre className="code-highlight">
                        <code>{codeExamples[moduleIndex]}</code>
                      </pre>
                    </div>
                  </div>
                )}
                
                {/* Tips and Highlights */}
                {index === 0 && (
                  <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <ApperIcon name="Lightbulb" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-surface-900 mb-1">Pro Tip</h4>
                        <p className="text-surface-700 text-sm">
                          Take your time with each section. The concepts build on each other, 
                          so understanding the basics will make advanced topics much easier!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Interactive Elements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 space-y-6"
        >
          {/* Placeholder Interactive Examples */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <ApperIcon name="Play" className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-surface-900">Interactive Examples</h3>
              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                Coming Soon
              </span>
            </div>
            <p className="text-surface-600 mb-4">
              Soon you'll be able to try live prompts and see Apper build apps in real-time! 
              This feature launches next month.
            </p>
            <button 
              disabled 
              className="px-4 py-2 bg-surface-200 text-surface-500 rounded-lg font-medium cursor-not-allowed"
            >
              Try Live Examples (In Development)
            </button>
          </div>

          {/* Completion Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-surface-50 rounded-xl border border-surface-200">
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-surface-900 mb-1">
                {isCompleted ? "Module Completed! 🎉" : "Ready to continue?"}
              </h3>
              <p className="text-surface-600 text-sm">
                {isCompleted 
                  ? "Great job! Move on to the next module when you're ready."
                  : "Mark this module as complete when you've finished reading."
                }
              </p>
            </div>
            
            <div className="flex space-x-3">
              {!isCompleted && (
                <motion.button
                  onClick={handleCompleteModule}
                  className="px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary-dark transition-colors shadow-card"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center space-x-2">
                    <ApperIcon name="CheckCircle" className="w-5 h-5" />
                    <span>Mark Complete</span>
                  </span>
                </motion.button>
              )}
              
              <button className="px-6 py-3 border border-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-100 transition-colors">
                <span className="flex items-center space-x-2">
                  <ApperIcon name="MessageCircle" className="w-5 h-5" />
                  <span>Quiz (Coming Soon)</span>
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MainFeature