import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // Import for SEO
import { Navbar, Features, HeroSection, ResourcesForSection, NumberCrunchSection, UserReviewsSection } from "../components";
import { reviews } from "../constant";

function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || (!savedTheme && prefersDarkMode)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* 🔹 SEO: Metadata & Structured Data */}
      <Helmet>
        <title>Freeway Study | Your Ultimate Resource Hub</title>
        <meta name="description" content="Access CCSU syllabus, handwritten notes, previous year questions (PYQs), solutions, and video playlists—all in one place!" />
        <meta name="keywords" content="CCSU syllabus, BCA notes, university study resources, previous year questions, handwritten notes, PYQ solutions, exam preparation" />
        <meta name="author" content="Freeway Study" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for Social Media Sharing */}
        <meta property="og:title" content="Freeway Study | Your Ultimate Resource Hub" />
        <meta property="og:description" content="Download syllabus, handwritten notes, previous year questions, solutions, and best YouTube video playlists for CCSU university courses." />
        <meta property="og:image" content="https://freeway-study.vercel.app/preview-image.jpg" />
        <meta property="og:url" content="https://freeway-study.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Freeway Study | Your Ultimate Resource Hub" />
        <meta name="twitter:description" content="Download syllabus, handwritten notes, previous year questions, solutions, and best YouTube video playlists for CCSU university courses." />
        <meta name="twitter:image" content="https://freeway-study.vercel.app/preview-image.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://freeway-study.vercel.app" />

        {/* JSON-LD Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Freeway Study",
            "url": "https://freeway-study.vercel.app",
            "logo": "https://freeway-study.vercel.app/logo.png",
            "description": "Your one-stop destination for CCSU university study resources, including syllabus, notes, previous year questions, and solutions.",
            "sameAs": [
              "https://www.facebook.com/yourpage",
              "https://www.twitter.com/yourhandle",
              "https://www.linkedin.com/company/yourcompany"
            ]
          })}
        </script>
      </Helmet>

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <HeroSection isDarkMode={darkMode} />
      <ResourcesForSection isDarkMode={darkMode} />
      <NumberCrunchSection isDarkMode={darkMode} />
      <Features isDarkMode={darkMode} />
      <UserReviewsSection reviews={reviews} />
    </>
  );
}

export default Home;
