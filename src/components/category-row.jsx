import React from 'react'


export default function CategoryRow({ categories, selectedSubject }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {categories.map((category) => (
        <button
          key={category.type}
          variant="outline"
          className="w-full dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700"
          onClick={() => window.open(category.pdf, '_blank')}
        >
          {category.type}
        </button>
      ))}
    </div>
  )
}

