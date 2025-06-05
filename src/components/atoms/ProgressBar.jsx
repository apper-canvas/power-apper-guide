import React from 'react'
import { motion } from 'framer-motion'

const ProgressBar = ({ progress, className = '', barClassName = '', animated = true }) => {
  return (
    <div className={`w-full bg-surface-200 rounded-full h-2 ${className}`}>
      {animated ? (
        <motion.div 
          className={`bg-gradient-to-r from-primary to-secondary h-2 rounded-full ${barClassName}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ) : (
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${barClassName}`}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  )
}

export default ProgressBar