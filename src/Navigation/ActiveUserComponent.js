import React from 'react'
import {Form, Button} from 'react-bootstrap'

function ActiveUser(props) {
    const currentUser = props.currentUser
    const setCurrentUser = props.setCurrentUser
    const setActiveTab = props.setActiveTab

    const logout = () => {
        setCurrentUser("");
        setActiveTab("")
    }

    return (
        <Form inline>
            <span className="font-weight-bold">{currentUser.username}</span>
            <Button variant="outline-danger" className="ml-2" onClick={logout}>Logout</Button>
        </Form>
    )
}

export default ActiveUser;