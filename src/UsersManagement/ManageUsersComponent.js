import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UsersForm from './UsersFormComponents'
import UsersTable from './UsersTableComponent'

function ManageUsers() {
    const [usersList, setUsersList] = useState([])
    const [selectedUserId, setSelectedUserId] = useState(0)

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Kolejarz/effective-spoon/master/users.json')
            .then(results => results.json())
            .then(data => {
                setUsersList(data);
            });
    }, []);

    function saveUser(user) {
        console.log(user)
        if (!user) return
        const oldUser = usersList.find(u => u.id === user.id)
        if (oldUser) {
            const newList = usersList.slice()
            const indexOfUser = newList.indexOf(oldUser)
            newList[indexOfUser] = user
            setUsersList(newList)
        }
        else {
            user.id = usersList.length + 1
            setUsersList(usersList.concat(user))
        }
        setSelectedUserId(0)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <UsersTable
                        users={usersList}
                        selectedUserId={selectedUserId}
                        setSelectedUser={(id) => setSelectedUserId(id)} />
                </Col>
                <Col>
                    <UsersForm
                        selectedUserId={selectedUserId}
                        userDetails={usersList.find(user => user.id === selectedUserId)}
                        setSelectedUser={(id) => setSelectedUserId(id)}
                        saveUser={saveUser} />
                </Col>
            </Row>
        </Container>
    )
}

export default ManageUsers;