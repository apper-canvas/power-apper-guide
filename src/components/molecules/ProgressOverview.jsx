import React from 'react'
import ProgressBar from '@/components/atoms/ProgressBar'
import Text from '@/components/atoms/Text'

const ProgressOverview = ({ overallProgress }) => {
  return (
    <div className="p-4 border-b border-surface-200">
      <div className="flex items-center justify-between mb-2">
        <Text className="text-sm font-medium text-surface-700">Overall Progress</Text>
        <Text className="text-sm font-bold text-primary">{overallProgress}%</Text>
      </div>
      <ProgressBar progress={overallProgress} />
    </div>
  )
}

export default ProgressOverview