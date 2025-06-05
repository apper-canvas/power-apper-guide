import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import moduleService from '../services/api/moduleService'
import progressService from '../services/api/progressService'
import bookmarkService from '../services/api/bookmarkService'

const Home = () => {
  const [modules, setModules] = useState([])
  const [progress, setProgress] = useState([])
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentModule, setCurrentModule] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [bookmarksPanelOpen, setBookmarksPanelOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [overallProgress, setOverallProgress] = useState(0)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [modulesData, progressData, bookmarksData] = await Promise.all([
          moduleService.getAll(),
          progressService.getAll(),
          bookmarkService.getAll()
        ])
        
        setModules(modulesData || [])
        setProgress(progressData || [])
        setBookmarks(bookmarksData || [])
        
        // Set first module as current if none selected
        if (modulesData?.length > 0 && !currentModule) {
          setCurrentModule(modulesData[0])
        }
        
        // Calculate overall progress
        const completed = progressData?.filter(p => p.completed)?.length || 0
        const total = modulesData?.length || 1
        setOverallProgress(Math.round((completed / total) * 100))
        
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load course data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = modules.filter(module => 
        module.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.content?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, modules])

  const handleModuleComplete = async (moduleId) => {
    try {
      const existingProgress = progress.find(p => p.moduleId === moduleId)
      
      if (existingProgress) {
        const updated = await progressService.update(existingProgress.id, {
          ...existingProgress,
          completed: true,
          completedAt: new Date().toISOString(),
          percentComplete: 100
        })
        
        setProgress(prev => 
          prev.map(p => p.id === existingProgress.id ? updated : p)
        )
      } else {
        const newProgress = await progressService.create({
          moduleId,
          completed: true,
          completedAt: new Date().toISOString(),
          percentComplete: 100
        })
        
        setProgress(prev => [...prev, newProgress])
      }
      
      // Update overall progress
      const newCompleted = progress.filter(p => p.completed).length + 1
      const newOverallProgress = Math.round((newCompleted / modules.length) * 100)
      setOverallProgress(newOverallProgress)
      
      toast.success("Module completed! 🎉")
      
      // Confetti effect if all modules completed
      if (newOverallProgress === 100) {
        toast.success("Congratulations! You've completed the entire course! 🎊")
      }
      
    } catch (err) {
      toast.error("Failed to save progress")
    }
  }

  const handleBookmarkToggle = async (moduleId, sectionTitle) => {
    try {
      const existingBookmark = bookmarks.find(b => 
        b.moduleId === moduleId && b.sectionTitle === sectionTitle
      )
      
      if (existingBookmark) {
        await bookmarkService.delete(existingBookmark.id)
        setBookmarks(prev => prev.filter(b => b.id !== existingBookmark.id))
        toast.success("Bookmark removed")
      } else {
        const newBookmark = await bookmarkService.create({
          moduleId,
          sectionTitle,
          createdAt: new Date().toISOString(),
          notes: ""
        })
        setBookmarks(prev => [...prev, newBookmark])
        toast.success("Section bookmarked!")
      }
    } catch (err) {
      toast.error("Failed to update bookmark")
    }
  }

  const isModuleCompleted = (moduleId) => {
    return progress.some(p => p.moduleId === moduleId && p.completed)
  }

  const getModuleProgress = (moduleId) => {
    const moduleProgress = progress.find(p => p.moduleId === moduleId)
    return moduleProgress?.percentComplete || 0
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <ApperIcon name="AlertTriangle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-surface-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-surface-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-surface-50">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarCollapsed ? 64 : 280 }}
        className="bg-white border-r border-surface-200 flex flex-col shadow-soft"
      >
        {/* Logo Header */}
        <div className="p-4 border-b border-surface-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="GraduationCap" className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="font-bold text-surface-900">ApperGuide</h1>
                <p className="text-xs text-surface-500">v2.1</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Overview */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-surface-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-surface-700">Overall Progress</span>
              <span className="text-sm font-bold text-primary">{overallProgress}%</span>
            </div>
            <div className="w-full bg-surface-200 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Module List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="p-2">
            {modules.map((module, index) => (
              <motion.button
                key={module.id}
                onClick={() => setCurrentModule(module)}
                className={`w-full p-3 rounded-lg mb-2 text-left transition-all duration-200 hover:bg-surface-50 group ${
                  currentModule?.id === module.id 
                    ? 'bg-primary text-white shadow-card' 
                    : 'text-surface-700 hover:text-surface-900'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {isModuleCompleted(module.id) ? (
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                        <ApperIcon name="Check" className="w-4 h-4 text-white" />
                      </div>
                    ) : (
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        currentModule?.id === module.id 
                          ? 'border-white bg-white/20' 
                          : 'border-surface-300 group-hover:border-primary'
                      }`}>
                        <span className={`text-xs font-medium ${
                          currentModule?.id === module.id 
                            ? 'text-white' 
                            : 'text-surface-600 group-hover:text-primary'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {!sidebarCollapsed && (
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium text-sm leading-tight truncate ${
                        currentModule?.id === module.id ? 'text-white' : ''
                      }`}>
                        {module.title}
                      </h3>
                      <p className={`text-xs mt-1 opacity-75 ${
                        currentModule?.id === module.id ? 'text-white' : 'text-surface-500'
                      }`}>
                        {module.estimatedTime}
                      </p>
                    </div>
                  )}
                </div>
                
                {!sidebarCollapsed && getModuleProgress(module.id) > 0 && !isModuleCompleted(module.id) && (
                  <div className="mt-2">
                    <div className={`w-full rounded-full h-1 ${
                      currentModule?.id === module.id ? 'bg-white/20' : 'bg-surface-200'
                    }`}>
                      <div 
                        className={`h-1 rounded-full transition-all duration-300 ${
                          currentModule?.id === module.id ? 'bg-white' : 'bg-primary'
                        }`}
                        style={{ width: `${getModuleProgress(module.id)}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sidebar Toggle */}
        <div className="p-4 border-t border-surface-200">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full p-2 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100 transition-colors"
          >
            <ApperIcon 
              name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} 
              className="w-5 h-5 mx-auto" 
            />
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-surface-200 p-4 shadow-soft">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm">
              <ApperIcon name="Home" className="w-4 h-4 text-surface-400" />
              <span className="text-surface-400">/</span>
              <span className="text-surface-600">
                {currentModule ? `Module ${modules.findIndex(m => m.id === currentModule.id) + 1}` : 'Getting Started'}
              </span>
              <span className="text-surface-400">/</span>
              <span className="text-surface-900 font-medium">
                {currentModule?.title || 'Welcome'}
              </span>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <div className="relative">
                  <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search course content..."
                    className="pl-10 pr-4 py-2 w-64 bg-surface-50 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                
                {/* Search Results */}
                <AnimatePresence>
                  {searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-surface-200 rounded-lg shadow-card z-50 max-h-64 overflow-y-auto"
                    >
                      {searchResults.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => {
                            setCurrentModule(result)
                            setSearchQuery("")
                          }}
                          className="w-full p-3 text-left hover:bg-surface-50 border-b border-surface-100 last:border-b-0"
                        >
                          <h4 className="font-medium text-sm text-surface-900">{result.title}</h4>
                          <p className="text-xs text-surface-500 mt-1 line-clamp-2">
                            {result.description}
                          </p>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bookmarks Toggle */}
              <button
                onClick={() => setBookmarksPanelOpen(!bookmarksPanelOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  bookmarksPanelOpen 
                    ? 'bg-primary text-white' 
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                }`}
              >
                <ApperIcon name="Bookmark" className="w-5 h-5" />
              </button>

              {/* Progress Badge */}
              <div className="flex items-center space-x-2 bg-surface-100 rounded-lg px-3 py-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-soft" />
                <span className="text-sm font-medium text-surface-700">
                  {overallProgress}% Complete
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Feature Component */}
        <div className="flex-1 overflow-auto">
          <MainFeature 
            currentModule={currentModule}
            onModuleComplete={handleModuleComplete}
            onBookmarkToggle={handleBookmarkToggle}
            isCompleted={currentModule ? isModuleCompleted(currentModule.id) : false}
            bookmarks={bookmarks}
          />
        </div>
      </div>

      {/* Bookmarks Panel */}
      <AnimatePresence>
        {bookmarksPanelOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-80 bg-white border-l border-surface-200 shadow-card"
          >
            <div className="p-4 border-b border-surface-200">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-surface-900">Bookmarks</h2>
                <button
                  onClick={() => setBookmarksPanelOpen(false)}
                  className="p-1 rounded text-surface-400 hover:text-surface-600"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3 overflow-y-auto max-h-full">
              {bookmarks.length === 0 ? (
                <div className="text-center py-8">
                  <ApperIcon name="BookmarkPlus" className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                  <p className="text-surface-500">No bookmarks yet</p>
                  <p className="text-xs text-surface-400 mt-1">
                    Click bookmark icons to save sections
                  </p>
                </div>
              ) : (
                bookmarks.map((bookmark) => {
                  const module = modules.find(m => m.id === bookmark.moduleId)
                  return (
                    <motion.div
                      key={bookmark.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-surface-50 rounded-lg border border-surface-200"
                    >
                      <h4 className="font-medium text-sm text-surface-900 mb-1">
                        {bookmark.sectionTitle}
                      </h4>
                      <p className="text-xs text-surface-500 mb-2">
                        {module?.title}
                      </p>
                      <button
                        onClick={() => {
                          if (module) {
                            setCurrentModule(module)
                            setBookmarksPanelOpen(false)
                          }
                        }}
                        className="text-xs text-primary hover:text-primary-dark font-medium"
                      >
                        Go to section →
                      </button>
                    </motion.div>
                  )
                })
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home