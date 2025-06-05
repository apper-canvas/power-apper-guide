import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Text from '@/components/atoms/Text'
import ProgressBar from '@/components/atoms/ProgressBar'

const ModuleListItem = ({ module, index, isCurrent, isCompleted, progress, onClick }) => {
  const moduleProgress = progress.find(p => p.moduleId === module.id)?.percentComplete || 0

  return (
    <motion.button
      key={module.id}
      onClick={() => onClick(module)}
      className={`w-full p-3 rounded-lg mb-2 text-left transition-all duration-200 hover:bg-surface-50 group ${
        isCurrent 
          ? 'bg-primary text-white shadow-card' 
          : 'text-surface-700 hover:text-surface-900'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {isCompleted ? (
            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              <ApperIcon name="Check" className="w-4 h-4 text-white" />
            </div>
          ) : (
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              isCurrent 
                ? 'border-white bg-white/20' 
                : 'border-surface-300 group-hover:border-primary'
            }`}>
              <Text className={`text-xs font-medium ${
                isCurrent 
                  ? 'text-white' 
                  : 'text-surface-600 group-hover:text-primary'
              }`}>
                {index + 1}
              </Text>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <Text as="h3" className={`font-medium text-sm leading-tight truncate ${
            isCurrent ? 'text-white' : ''
          }`}>
            {module.title}
          </Text>
          <Text className={`text-xs mt-1 opacity-75 ${
            isCurrent ? 'text-white' : 'text-surface-500'
          }`}>
            {module.estimatedTime}
          </Text>
        </div>
      </div>
      
      {moduleProgress > 0 && !isCompleted && (
        <div className="mt-2">
          <ProgressBar 
            progress={moduleProgress} 
            className={isCurrent ? 'bg-white/20' : 'bg-surface-200'}
            barClassName={isCurrent ? 'bg-white' : 'bg-primary'}
            animated={false}
          />
        </div>
      )}
    </motion.button>
  )
}

export default ModuleListItem