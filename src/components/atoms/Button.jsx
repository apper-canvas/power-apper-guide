import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  whileHover,
  whileTap
}) => {
  const baseClasses = "flex items-center space-x-2 rounded-lg font-medium transition-colors duration-200"
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-card",
    secondary: "bg-secondary text-white hover:bg-secondary-dark shadow-card",
    outline: "border border-surface-200 text-surface-700 hover:bg-surface-50",
    ghost: "text-surface-600 hover:text-surface-900 hover:bg-surface-100",
    accent: "bg-accent text-white hover:bg-accent-dark",
    disabled: "bg-surface-200 text-surface-500 cursor-not-allowed"
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  }

  const selectedVariantClass = disabled ? variantClasses.disabled : variantClasses[variant]
  const selectedSizeClass = sizeClasses[size]

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${selectedVariantClass} ${selectedSizeClass} ${className}`}
      disabled={disabled}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </motion.button>
  )
}

export default Button