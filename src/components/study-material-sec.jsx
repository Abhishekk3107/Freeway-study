
import React, { useState } from 'react'
import CourseSubjectPopup from './course-subject-popup'
import CategoryRow from './category-row'

const studyMaterials = [
  { type: 'PYQ', pdf: '/path-to-pyq.pdf' },
  { type: 'Notes', pdf: '/path-to-notes.pdf' },
  { type: 'Books', pdf: '/path-to-books.pdf' },
  { type: 'Videos', pdf: '/path-to-videos.pdf' },
]

export default function StudyMaterialsSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('')

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject)
    setIsPopupOpen(false)
  }

  return (
    <section className="p-8 min-h-screen transition-colors duration-300 dark:bg-blue-900 bg-gray-100">
      <div className="max-w-4xl mx-auto mt-28">

        <div className="mb-8">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="w-full justify-between dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700"
          >
            {selectedSubject || 'Select Subject'}
            <span className="ml-2">▼</span>
          </button>
        </div>

        {selectedSubject && (
          <CategoryRow categories={studyMaterials} selectedSubject={selectedSubject} />
        )}

        <CourseSubjectPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubjectSelect={handleSubjectSelect}
        />
      </div>
    </section>
  )
}

