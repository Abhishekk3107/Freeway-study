import { Navbar , Sidebar} from "./Components";
import React, { useState, useEffect } from 'react';
import { Dashboard, Resources, LatestNews, Notification, Feedbacks,Profile } from './Sections'

function Main() {
    const [activeComponent, setActiveComponent] = useState("Dashboard");

    const renderComponent = () => {
        switch (activeComponent) {
            case "Dashboard":
                return <Dashboard />;

            case "Resources":
                return <Resources setActiveComponent={setActiveComponent} />;

            case "Feedbacks":
                return <Feedbacks setActiveComponent={setActiveComponent} />;

            case "Latest News":
                return (
                    <LatestNews
                        setActiveComponent={setActiveComponent}
                    />
                );

            case "Notification":
                return <Notification />;
            case "Profile":
                return <Profile setActiveComponent={setActiveComponent} />;
    

            default:
                return <></>;
        }
    };

    return (
        <>
            <div className="flex overflow-hidden h-screen">
                {/* Sidebar */}
                <div className="lg:w-[20%] w-[10%] flex-shrink-0 bg-white">
                    <Sidebar
                        activeComponent={activeComponent}
                        setActiveComponent={setActiveComponent}
                    />
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-gray-200 overflow-y-auto">
                    <Navbar />
                    <div className="pt-8 bg-gray-200 min-h-screen">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
