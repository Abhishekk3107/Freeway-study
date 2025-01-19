import React from 'react'
import { useState, useEffect } from 'react';
import {Navbar, Features, HeroSection, ResourcesForSection, NumberCrunchSection,UserReviewsSection } from '../components'
import { reviews } from "../constant";


function Home() {

    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        const savedTheme = localStorage.getItem('theme')

        if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
            setDarkMode(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)

        

    }




    return (
        <>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <HeroSection isDarkMode={darkMode} />
            <ResourcesForSection isDarkMode={darkMode} />
            <NumberCrunchSection isDarkMode={darkMode} />
            <Features isDarkMode={darkMode} />
            <UserReviewsSection reviews={reviews}/>
        </>
    )
}

export default Home