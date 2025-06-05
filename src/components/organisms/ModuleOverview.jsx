import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import Button from '@/components/atoms/Button'
import IconWrapper from '@/components/atoms/IconWrapper'
import QuickActionsPanel from '@/components/organisms/QuickActionsPanel'

const ModuleOverview = ({ onStartModule, showQuickActions, setShowQuickActions }) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
        >
          <IconWrapper
            name="PlayCircle"
            wrapperClassName="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6"
            iconClassName="w-10 h-10 text-white"
          />
        </motion.div>
        
        <Heading level={2} className="text-2xl font-bold text-surface-900 mb-4">Ready to Start Learning?</Heading>
        <Text className="text-surface-600 mb-6">
          Choose a module from the sidebar to begin your journey with Apper. 
          Our comprehensive guide will take you from beginner to expert!
        </Text>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={onStartModule}
            variant="primary"
            size="lg"
          >
            <ApperIcon name="BookOpen" className="w-5 h-5" />
            <span>Start with Module 1</span>
          </Button>
          <Button 
            onClick={() => setShowQuickActions(!showQuickActions)}
            variant="outline"
            size="lg"
          >
            <ApperIcon name="Zap" className="w-5 h-5" />
            <span>Quick Actions</span>
          </Button>
        </div>

        <AnimatePresence>
          {showQuickActions && <QuickActionsPanel />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ModuleOverview