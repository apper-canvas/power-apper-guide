import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'

const ModuleCompletionCard = ({ isCompleted, onCompleteModule }) => {
  return (
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
          <Heading level={3} className="text-lg font-semibold text-surface-900">Interactive Examples</Heading>
          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
            Coming Soon
          </span>
        </div>
        <Text className="text-surface-600 mb-4">
          Soon you'll be able to try live prompts and see Apper build apps in real-time! 
          This feature launches next month.
        </Text>
        <Button 
          disabled 
          className="px-4 py-2 bg-surface-200 text-surface-500 rounded-lg font-medium cursor-not-allowed"
          variant="disabled"
        >
          <Text>Try Live Examples (In Development)</Text>
        </Button>
      </div>

      {/* Completion Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-surface-50 rounded-xl border border-surface-200">
        <div className="text-center sm:text-left">
          <Heading level={3} className="font-semibold text-surface-900 mb-1">
            {isCompleted ? "Module Completed! 🎉" : "Ready to continue?"}
          </Heading>
          <Text className="text-surface-600 text-sm">
            {isCompleted 
              ? "Great job! Move on to the next module when you're ready."
              : "Mark this module as complete when you've finished reading."
            }
          </Text>
        </div>
        
        <div className="flex space-x-3">
          {!isCompleted && (
            <Button
              onClick={onCompleteModule}
              variant="secondary"
              size="lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="CheckCircle" className="w-5 h-5" />
              <span>Mark Complete</span>
            </Button>
          )}
          
          <Button 
            variant="outline"
            size="lg"
            className="px-6 py-3 border border-surface-200 text-surface-700 rounded-lg font-medium hover:bg-surface-100 transition-colors"
          >
            <ApperIcon name="MessageCircle" className="w-5 h-5" />
            <span>Quiz (Coming Soon)</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ModuleCompletionCard