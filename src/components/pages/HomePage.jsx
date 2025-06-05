import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import moduleService from '@/services/api/moduleService'
import progressService from '@/services/api/progressService'
import bookmarkService from '@/services/api/bookmarkService'

import Sidebar from '@/components/organisms/Sidebar'
import MainHeader from '@/components/organisms/MainHeader'
import CourseContent from '@/components/organisms/CourseContent'
import ModuleOverview from '@/components/organisms/ModuleOverview'
import ModuleCompletionCard from '@/components/organisms/ModuleCompletionCard'
import BookmarksPanel from '@/components/organisms/BookmarksPanel'
import Text from '@/components/atoms/Text'
import Heading from '@/components/atoms/Heading'

const HomePage = () => {
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
  const [showQuickActions, setShowQuickActions] = useState(false)


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

  const isSectionBookmarked = (sectionTitle) => {
    return bookmarks.some(b => 
      b.moduleId === currentModule?.id && b.sectionTitle === sectionTitle
    )
  }

  const handleSearchResultClick = (module) => {
    setCurrentModule(module)
    setSearchQuery("")
  }

  const handleStartModule = () => {
    if (modules.length > 0) {
      setCurrentModule(modules[0])
    }
  }

  // Parse module content into sections
  const sections = currentModule?.content ? 
    currentModule.content.split('\n\n').filter(section => section.trim()) : 
    ['Welcome to ApperGuide! Select a module from the sidebar to begin learning.']


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
          <Heading level={2} className="text-xl font-semibold text-surface-900 mb-2">Oops! Something went wrong</Heading>
          <Text className="text-surface-600">{error}</Text>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-surface-50">
      <Sidebar
        modules={modules}
        progress={progress}
        overallProgress={overallProgress}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        currentModule={currentModule}
        setCurrentModule={setCurrentModule}
        isModuleCompleted={isModuleCompleted}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <MainHeader
          currentModule={currentModule}
          modules={modules}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          onSearchResultClick={handleSearchResultClick}
          bookmarksPanelOpen={bookmarksPanelOpen}
          setBookmarksPanelOpen={setBookmarksPanelOpen}
          overallProgress={overallProgress}
        />

        <div className="flex-1 overflow-auto">
          {currentModule ? (
            <>
              <CourseContent 
                currentModule={currentModule}
                sections={sections}
                onBookmarkToggle={(sectionTitle) => handleBookmarkToggle(currentModule.id, sectionTitle)}
                isBookmarked={isSectionBookmarked}
                isCompleted={isModuleCompleted(currentModule.id)}
              />
              <ModuleCompletionCard 
                isCompleted={isModuleCompleted(currentModule.id)}
                onCompleteModule={() => handleModuleComplete(currentModule.id)}
              />
            </>
          ) : (
            <ModuleOverview 
              onStartModule={handleStartModule}
              showQuickActions={showQuickActions}
              setShowQuickActions={setShowQuickActions}
            />
          )}
        </div>
      </div>

      <BookmarksPanel
        isOpen={bookmarksPanelOpen}
        onClose={() => setBookmarksPanelOpen(false)}
        bookmarks={bookmarks}
        modules={modules}
        onBookmarkClick={(module) => {
          if (module) {
            setCurrentModule(module)
            setBookmarksPanelOpen(false)
          }
        }}
      />
    </div>
  )
}

export default HomePage