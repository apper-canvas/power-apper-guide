import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Text from '@/components/atoms/Text'

const EmptyState = ({ iconName, title, description, children, iconClassName = '', wrapperClassName = '' }) => {
  return (
    <div className={`text-center py-8 ${wrapperClassName}`}>
      {iconName && (
        <ApperIcon name={iconName} className={`w-12 h-12 text-surface-300 mx-auto mb-4 ${iconClassName}`} />
      )}
      {title && <Text className="text-surface-500">{title}</Text>}
      {description && <Text className="text-xs text-surface-400 mt-1">{description}</Text>}
      {children}
    </div>
  )
}

export default EmptyState