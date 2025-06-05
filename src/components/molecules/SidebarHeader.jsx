import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import IconWrapper from '@/components/atoms/IconWrapper'

const SidebarHeader = ({ collapsed }) => {
  return (
    <div className="p-4 border-b border-surface-200">
      <div className="flex items-center space-x-3">
        <IconWrapper 
          name="GraduationCap" 
          wrapperClassName="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg" 
          iconClassName="w-5 h-5 text-white" 
        />
        {!collapsed && (
          <div>
            <Heading level={4} className="font-bold text-surface-900">ApperGuide</Heading>
            <Text className="text-xs text-surface-500">v2.1</Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarHeader