import React from 'react'

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl border border-surface-200 p-6 shadow-soft hover:shadow-card transition-shadow ${className}`}>
      {children}
    </div>
  )
}

export default Card