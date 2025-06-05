import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'

const TipSection = ({ title, content, iconName = "Lightbulb" }) => {
  return (
    <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
      <div className="flex items-start space-x-3">
        <ApperIcon name={iconName} className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <Heading level={4} className="font-medium text-surface-900 mb-1">{title}</Heading>
          <Text className="text-surface-700 text-sm">{content}</Text>
        </div>
      </div>
    </div>
  )
}

export default TipSection