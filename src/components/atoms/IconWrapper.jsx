import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const IconWrapper = ({ name, iconClassName = '', wrapperClassName = '', children }) => {
  return (
    <div className={`flex items-center justify-center ${wrapperClassName}`}>
      <ApperIcon name={name} className={iconClassName} />
      {children}
    </div>
  )
}

export default IconWrapper