import React, { useState, useEffect } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'

function UserSelection(props) {
    const setCurrentUser = props.setCurrentUser
    const [selectedUser, setSelectedUser] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Kolejarz/effective-spoon/master/users.json')
            .then(results => results.json())
            .then(data => {
                setUsers(data);
            });
    }, []);

    const usersList = users
        .filter(user => user.active)
        .sort((a, b) => a.firstname > b.firstname ? 1 : -1)
        .map((user) => <option key={user.id} value={user.username}>{user.admin ? '*' : ''}{user.firstname} {user.lastname}</option>)

    const selectUser = (e) => {
        setSelectedUser(e.target.value);
    }

    const performLogin = () => {
        const user = users.find(u => u.username === selectedUser)
        setCurrentUser(user)
    }

    return (
        <Form inline>
            <FormControl as="select" className="mr-sm-2" onChange={selectUser} value={selectedUser}>
                <option value=''></option>
                {usersList}
            </FormControl>
            <Button variant="outline-success" onClick={performLogin}>Login</Button>
        </Form>
    )
}

export default UserSelection;