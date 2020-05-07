import React from 'react'
import ActiveUser from './ActiveUserComponent'
import UserSelection from './UserSelectionComponent'

function LoginControl(props) {
    const currentUser = props.currentUser
    const setCurrentUser = props.setCurrentUser
    const setActiveTab = props.setActiveTab

    if (currentUser) return <ActiveUser currentUser={currentUser} setCurrentUser={setCurrentUser} setActiveTab={setActiveTab} />
    else return <UserSelection setCurrentUser={setCurrentUser} setActiveTab={setActiveTab} />
}

export default LoginControl;