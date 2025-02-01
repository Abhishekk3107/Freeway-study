import { Footer, Navbar, AboutHeroSection, DeveloperProfile, Calltoaction } from "../components";
import { useState, useEffect } from "react";
import ourvision from "../assets/ourvision.svg";
import { teamMembers } from "../constant";
import { BookOpen, Search, PenTool, Users, Laptop } from 'lucide-react';

export const offers = [
    {
        icon: <BookOpen className="h-6 w-6" />,
        title: "Free Study Materials",
        description: "Access a wide range of study materials and resources at no cost."
    },
    {
        icon: <Search className="h-6 w-6" />,
        title: "Easy Navigation",
        description: "User-friendly interface with powerful search functionality."
    },
    {
        icon: <PenTool className="h-6 w-6" />,
        title: "Interactive Learning",
        description: "Engage with quizzes and assessments to test your knowledge."
    },
    {
        icon: <Users className="h-6 w-6" />,
        title: "Community Support",
        description: "Join discussions and forums to solve doubts and share knowledge."
    },
    {
        icon: <Laptop className="h-6 w-6" />,
        title: "Learn Anywhere",
        description: "Access your study materials on any device, anytime, anywhere."
    }
];


export default function About() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
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
            <head>
                <title>About Freeway Study - Unlock Your Learning Potential</title>
                <meta name="description" content="Discover Freeway Study's mission to make education accessible for everyone. Explore free study materials, interactive tools, and a thriving learning community!" />
                <meta name="keywords" content="Freeway Study, online learning, free education, study materials, interactive learning, student support" />
                <meta name="author" content="Freeway Study Team" />
                <meta property="og:title" content="About Freeway Study - Unlock Your Learning Potential" />
                <meta property="og:description" content="Join Freeway Study for top-notch study materials, interactive tools, and a strong learning community." />
                <meta property="og:image" content={ourvision} />
                <meta property="og:url" content="https://yourwebsite.com/about" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="robots" content="index, follow" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "EducationalOrganization",
                        "name": "Freeway Study",
                        "url": "https://yourwebsite.com/about",
                        "logo": "https://yourwebsite.com/logo.png",
                        "description": "A platform providing free educational resources, study materials, and community support for learners worldwide.",
                        "sameAs": [
                            "https://www.facebook.com/freewaystudy",
                            "https://twitter.com/freewaystudy",
                            "https://www.instagram.com/freewaystudy"
                        ]
                    })}
                </script>
            </head>


            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className="container mx-auto max-w-full">
                <AboutHeroSection />

                <section className="mb-16 bg-[#F5F2EB] dark:bg-gray-900 p-10">
                    <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-white">What We Offer</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {offers.map((offer, index) => (
                            <FeatureItem
                                icon={offer.icon}
                                key={index}
                                title={offer.title}
                                description={offer.description}
                                className='text-left'
                            />
                        ))}
                    </div>
                </section>

                {/* Vision */}
                <section className="mb-16 px-4">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2 text-start">
                            <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white text-center">🌍 Our Vision: Changing the Future of Learning</h2>
                            <p className="text-lg text-gray-700 mb-4 dark:text-gray-300">
                                Freeway Study envisions a world where education knows no boundaries. We're committed to:
                            </p>
                            <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-400 space-y-2">
                                <li>Bridging the education gap by providing equal access to quality learning resources</li>
                                <li>Empowering self-learners to take control of their educational journey</li>
                                <li>Building a global community of lifelong learners who support and inspire each other</li>
                            </ul>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src={ourvision}
                                alt="Our vision for education"
                                width={400}
                                height={200}
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="mb-16 px-4 bg-[#F5F2EB] dark:bg-gray-900 p-10">
                    <h2 className="text-3xl dark:text-white text-black font-semibold mb-8">🚀 The Minds Behind Freeway Study</h2>
                    <p className="text-lg text-gray-800 dark:text-gray-400 mb-8">
                        Freeway Study was born from a passion for education and technology. Our team consists of educators,
                        developers, and innovators who believe in the power of accessible learning. We're dedicated to
                        creating a platform that not only provides information but also inspires curiosity and fosters
                        a love for learning.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                        {teamMembers.map((teamMember, index) => (
                            <DeveloperProfile
                                key={index}
                                name={teamMember.name}
                                role={teamMember.role}
                                image={teamMember.image}
                                linkedin={teamMember.linkedin}
                            />
                        ))}

                    </div>
                </section>

                <section>
                    <Calltoaction />
                </section>
            </div>
        </>

    )
}

function FeatureItem({ icon, title, description }) {
    return (
        <div className="flex items-start space-x-3 text-gray-900 dark:text-gray-300 text-start">
            <div className="flex-shrink-0 mt-1">{icon}</div>
            <div>
                <h3 className="text-xl font-medium mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    )
}


