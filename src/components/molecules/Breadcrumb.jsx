import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Text from '@/components/atoms/Text'

const Breadcrumb = ({ currentModule, modules }) => {
  const moduleIndex = currentModule ? modules.findIndex(m => m.id === currentModule.id) + 1 : null
  const currentModuleTitle = currentModule?.title || 'Welcome'
  const currentModulePath = moduleIndex ? `Module ${moduleIndex}` : 'Getting Started'

  return (
    <div className="flex items-center space-x-2 text-sm">
      <ApperIcon name="Home" className="w-4 h-4 text-surface-400" />
      <Text className="text-surface-400">/</Text>
      <Text className="text-surface-600">
        {currentModulePath}
      </Text>
      <Text className="text-surface-400">/</Text>
      <Text className="text-surface-900 font-medium">
        {currentModuleTitle}
      </Text>
    </div>
  )
}

export default Breadcrumb