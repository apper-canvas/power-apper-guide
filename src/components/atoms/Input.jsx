import React from 'react'

const Input = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  className = '',
  icon: IconComponent
}) => {
  return (
    <div className="relative">
      {IconComponent && (
        <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-400" />
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`pr-4 py-2 w-full bg-surface-50 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${IconComponent ? 'pl-10' : 'pl-4'} ${className}`}
      />
    </div>
  )
}

export default Input