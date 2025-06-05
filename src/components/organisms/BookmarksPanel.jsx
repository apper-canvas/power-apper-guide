import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Heading from '@/components/atoms/Heading'
import Button from '@/components/atoms/Button'
import EmptyState from '@/components/molecules/EmptyState'
import Text from '@/components/atoms/Text'
import Card from '@/components/atoms/Card'

const BookmarksPanel = ({ isOpen, onClose, bookmarks, modules, onBookmarkClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-80 bg-white border-l border-surface-200 shadow-card"
        >
          <div className="p-4 border-b border-surface-200">
            <div className="flex items-center justify-between">
              <Heading level={2} className="font-semibold text-surface-900">Bookmarks</Heading>
              <Button
                onClick={onClose}
                className="p-1 rounded text-surface-400 hover:text-surface-600"
                variant="ghost"
                size="sm"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="p-4 space-y-3 overflow-y-auto max-h-full">
            {bookmarks.length === 0 ? (
              <EmptyState 
                iconName="BookmarkPlus" 
                title="No bookmarks yet" 
                description="Click bookmark icons to save sections" 
              />
            ) : (
              bookmarks.map((bookmark) => {
                const module = modules.find(m => m.id === bookmark.moduleId)
                return (
                  <motion.div
                    key={bookmark.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="p-3">
                      <Heading level={4} className="font-medium text-sm text-surface-900 mb-1">
                        {bookmark.sectionTitle}
                      </Heading>
                      <Text className="text-xs text-surface-500 mb-2">
                        {module?.title}
                      </Text>
                      <Button
                        onClick={() => onBookmarkClick(module)}
                        className="text-xs text-primary hover:text-primary-dark font-medium"
                        variant="ghost"
                        size="sm"
                      >
                        Go to section →
                      </Button>
                    </Card>
                  </motion.div>
                )
              })
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export default BookmarksPanel