import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const ToggleButton = ({ 
  onClick, 
  iconName, 
  isActive, 
  activeClassName = 'bg-primary text-white', 
  inactiveClassName = 'text-surface-600 hover:text-surface-900 hover:bg-surface-100',
  className = '',
  buttonSize = 'md'
}) => {
  return (
    <Button
      onClick={onClick}
      className={`p-2 rounded-lg ${isActive ? activeClassName : inactiveClassName} ${className}`}
      size={buttonSize}
      variant="ghost" // Override default primary variant
    >
      <ApperIcon name={iconName} className="w-5 h-5" />
    </Button>
  )
}

export default ToggleButton