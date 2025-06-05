import React from 'react'

const Heading = ({ level = 1, children, className = '' }) => {
  const Tag = `h${level}`
  const baseClasses = 'font-semibold text-surface-900'

  const levelClasses = {
    1: 'text-3xl lg:text-4xl font-bold',
    2: 'text-xl',
    3: 'text-lg',
    4: 'text-base',
  }

  return (
    <Tag className={`${baseClasses} ${levelClasses[level]} ${className}`}>
      {children}
    </Tag>
  )
}

export default Heading