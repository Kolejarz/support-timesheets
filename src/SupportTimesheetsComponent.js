import React, { useState } from 'react'
import Navigation from './Navigation/NavigationComponent'
import Content from './Views/ContentComponent'

function SupportTimesheets() {
    const [currentUser, setCurrentUser] = useState(null)
    const [activeTab, setActiveTab] = useState(null)

    return (
        <div>
            <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} activeTab={activeTab} setActiveTab={setActiveTab} />
            <Content activeTab={activeTab} />
        </div>
    )
}

export default SupportTimesheets;