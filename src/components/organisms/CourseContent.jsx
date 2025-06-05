import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Heading from '@/components/atoms/Heading'
import Text from '@/components/atoms/Text'
import ToggleButton from '@/components/atoms/ToggleButton'
import Card from '@/components/atoms/Card'
import CodeBlock from '@/components/molecules/CodeBlock'
import TipSection from '@/components/molecules/TipSection'

const CourseContent = ({ 
  currentModule, 
  sections, 
  onBookmarkToggle, 
  isBookmarked, 
  isCompleted 
}) => {
  // Sample code examples for different modules
  const codeExamples = {
    1: `// Simple Apper prompt example
"Create a booking app for a hair salon with:
- Calendar view for appointments  
- Customer contact form
- Service selection dropdown
- Price calculator"`,
    2: `// Improving your prompt with ChatGPT
"Help me write a detailed prompt for Apper to create a project management tool. I need:
- Task creation and assignment
- Progress tracking  
- Team collaboration features
- File attachment system
- Deadline notifications"`,
    5: `// Talking to Apper AI Assistant
"Add a login page with Google authentication"
"Make the submit button save data to database"
"Change the color scheme to blue and white"
"Add a confirmation email after signup"`
  }

  const moduleIndex = parseInt(currentModule.id) || 1

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-8">
      {/* Module Header */}
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Module {moduleIndex}
              </span>
              {isCompleted && (
                <div className="flex items-center space-x-1 text-secondary">
                  <ApperIcon name="CheckCircle" className="w-5 h-5" />
                  <Text className="text-sm font-medium">Completed</Text>
                </div>
              )}
            </div>
            <Heading level={1} className="text-3xl lg:text-4xl font-bold text-surface-900 mb-2">
              {currentModule.title}
            </Heading>
            <Text className="text-surface-600 text-lg">{currentModule.description}</Text>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Text className="text-sm text-surface-500 bg-surface-100 px-3 py-1 rounded-full">
              <ApperIcon name="Clock" className="w-4 h-4 inline mr-1" />
              {currentModule.estimatedTime}
            </Text>
            <ToggleButton
              onClick={() => onBookmarkToggle(currentModule.title)}
              iconName="Bookmark"
              isActive={isBookmarked(currentModule.title)}
              activeClassName="bg-accent text-white"
              inactiveClassName="text-surface-400 hover:text-accent hover:bg-accent/10"
            />
          </div>
        </div>
      </motion.header>

      {/* Module Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="prose prose-surface max-w-none"
          >
            <Card>
              <div className="flex justify-between items-start mb-4">
                <Heading level={3} className="text-xl font-semibold text-surface-900">
                  Section {index + 1}
                </Heading>
                <ToggleButton
                  onClick={() => onBookmarkToggle(`Section ${index + 1}`)}
                  iconName="Bookmark"
                  isActive={isBookmarked(`Section ${index + 1}`)}
                  activeClassName="text-accent"
                  inactiveClassName="text-surface-300 hover:text-accent"
                  buttonSize="sm"
                  className="p-1"
                />
              </div>
              
              <Text className="text-surface-700 leading-relaxed whitespace-pre-line">
                {section}
              </Text>
              
              {/* Code Examples */}
              {codeExamples[moduleIndex] && index === 1 && (
                <CodeBlock code={codeExamples[moduleIndex]} />
              )}
              
              {/* Tips and Highlights */}
              {index === 0 && (
                <TipSection 
                  title="Pro Tip"
                  content="Take your time with each section. The concepts build on each other, so understanding the basics will make advanced topics much easier!"
                />
              )}
            </Card>
          </motion.section>
        ))}
      </div>
    </div>
  )
}

export default CourseContent