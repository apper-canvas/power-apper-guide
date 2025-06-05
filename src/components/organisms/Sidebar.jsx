import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import SidebarHeader from '@/components/molecules/SidebarHeader'
import ProgressOverview from '@/components/molecules/ProgressOverview'
import ModuleListItem from '@/components/molecules/ModuleListItem'
import Button from '@/components/atoms/Button'

const Sidebar = ({ 
  modules, 
  progress, 
  overallProgress, 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  currentModule, 
  setCurrentModule,
  isModuleCompleted
}) => {
  return (
    <motion.aside 
      initial={false}
      animate={{ width: sidebarCollapsed ? 64 : 280 }}
      className="bg-white border-r border-surface-200 flex flex-col shadow-soft"
    >
      <SidebarHeader collapsed={sidebarCollapsed} />

      {!sidebarCollapsed && (
        <ProgressOverview overallProgress={overallProgress} />
      )}

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-2">
          {modules.map((module, index) => (
            <ModuleListItem
              key={module.id}
              module={module}
              index={index}
              isCurrent={currentModule?.id === module.id}
              isCompleted={isModuleCompleted(module.id)}
              progress={progress}
              onClick={setCurrentModule}
            />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-surface-200">
        <Button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full p-2 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100 transition-colors"
          variant="ghost"
          size="md"
        >
          <ApperIcon 
            name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} 
            className="w-5 h-5 mx-auto" 
          />
        </Button>
      </div>
    </motion.aside>
  )
}

export default Sidebar