import React from 'react'

const Text = ({ children, className = '', as: Component = 'p' }) => {
  return (
    <Component className={`${className}`}>
      {children}
    </Component>
  )
}

export default Text