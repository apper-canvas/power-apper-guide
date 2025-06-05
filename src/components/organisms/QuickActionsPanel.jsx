import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'

const QuickActionsPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6 p-4 bg-surface-50 rounded-lg border border-surface-200"
    >
      <Heading level={3} className="font-semibold text-surface-900 mb-3">Coming Soon</Heading>
      <div className="space-y-2 text-sm text-surface-600">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Video" className="w-4 h-4" />
          <Text>Video tutorials - Launching next week</Text>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Download" className="w-4 h-4" />
          <Text>Download PDF guides - In development</Text>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Users" className="w-4 h-4" />
          <Text>Community forum - Coming in v2.0</Text>
        </div>
      </div>
    </motion.div>
  )
}

export default QuickActionsPanel