import React from 'react'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'

const CodeBlock = ({ title = 'Example', code }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Code copied to clipboard!')
  }

  return (
    <div className="mt-6">
      <div className="bg-surface-800 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-3 bg-surface-700">
          <span className="text-surface-300 text-sm font-medium">{title}</span>
          <button
            onClick={() => copyToClipboard(code)}
            className="text-surface-300 hover:text-white transition-colors"
          >
            <ApperIcon name="Copy" className="w-4 h-4" />
          </button>
        </div>
        <pre className="code-highlight">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock