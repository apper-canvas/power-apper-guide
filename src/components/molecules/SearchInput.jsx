import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'

const SearchInput = ({ searchQuery, setSearchQuery, searchResults, onResultClick }) => {
  return (
    <div className="relative">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search course content..."
        icon={ApperIcon} // Pass ApperIcon component as a prop
        iconName="Search" // Pass the specific icon name
      />
      
      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-surface-200 rounded-lg shadow-card z-50 max-h-64 overflow-y-auto"
          >
            {searchResults.map((result) => (
              <Button
                key={result.id}
                onClick={() => onResultClick(result)}
                className="w-full p-3 text-left hover:bg-surface-50 border-b border-surface-100 last:border-b-0"
                variant="ghost"
              >
                <div className="flex flex-col items-start">
                  <Text as="h4" className="font-medium text-sm text-surface-900">{result.title}</Text>
                  <Text className="text-xs text-surface-500 mt-1 line-clamp-2">{result.description}</Text>
                </div>
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchInput