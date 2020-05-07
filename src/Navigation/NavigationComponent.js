import React from 'react'
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap'
import LoginControl from './LoginControlComponent'

function Navigation(props) {
    const currentUser = props.currentUser
    const setCurrentUser = props.setCurrentUser
    const activeTab = props.activeTab
    const setActiveTab = props.setActiveTab

    const tabs = [
        { text: "Calendar", route: "calendar", admin: false },
        { text: "Summary", route: "summary", admin: false },
        { text: "Manage users", route: "users", admin: true },
        { text: "Manage time slots", route: "slots", admin: true },
        { text: "Generate support", route: "support", admin: true}
    ]

    const tabsList = tabs
        .filter((tab) => currentUser && (currentUser?.admin || !tab.admin))
        .map((tab, index) => (
            <Nav.Item key={index} className={activeTab?.route === tab.route ? "font-weight-bold" : ""}>
                <Nav.Link onClick={() => setActiveTab(tab)}>{tab.text}</Nav.Link>
            </Nav.Item>
        ))

    return (
        <Navbar bg="light">
            <NavbarBrand>Support Timesheets</NavbarBrand>
            <Navbar.Toggle />
            {tabsList}
            <Nav className="mr-auto" />
            <LoginControl currentUser={currentUser} setCurrentUser={setCurrentUser} setActiveTab={setActiveTab} />
        </Navbar>
    )
}

export default Navigation;