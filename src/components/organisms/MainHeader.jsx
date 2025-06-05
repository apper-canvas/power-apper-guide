import React from 'react'
import ApperIcon from '@/components/ApperIcon'
import Breadcrumb from '@/components/molecules/Breadcrumb'
import SearchInput from '@/components/molecules/SearchInput'
import ToggleButton from '@/components/atoms/ToggleButton'
import Text from '@/components/atoms/Text'
import Badge from '@/components/atoms/Badge'

const MainHeader = ({ 
  currentModule, 
  modules, 
  searchQuery, 
  setSearchQuery, 
  searchResults, 
  onSearchResultClick, 
  bookmarksPanelOpen, 
  setBookmarksPanelOpen, 
  overallProgress 
}) => {
  return (
    <header className="bg-white border-b border-surface-200 p-4 shadow-soft">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <Breadcrumb currentModule={currentModule} modules={modules} />

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <SearchInput 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            onResultClick={onSearchResultClick}
          />

          {/* Bookmarks Toggle */}
          <ToggleButton
            onClick={() => setBookmarksPanelOpen(!bookmarksPanelOpen)}
            iconName="Bookmark"
            isActive={bookmarksPanelOpen}
            activeClassName="bg-primary text-white"
            inactiveClassName="text-surface-600 hover:text-surface-900 hover:bg-surface-100"
          />

          {/* Progress Badge */}
          <Badge className="bg-surface-100 text-surface-700">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-soft" />
            <Text className="text-sm font-medium">
              {overallProgress}% Complete
            </Text>
          </Badge>
        </div>
      </div>
    </header>
  )
}

export default MainHeader