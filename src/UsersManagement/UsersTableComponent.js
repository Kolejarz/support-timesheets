import React from 'react'
import Table from 'react-bootstrap/Table'
import UsersTableRow from './UsersTableRowComponent'

function UsersTable(props) {
    const users = props.users
    const selectedUserId = props.selectedUserId
    const usersTable = users.map((user) =>
        <UsersTableRow
            userData={user}
            active={user.id === selectedUserId}
            key={user.id}
            onClick={() => props.setSelectedUser(user.id)} />
    )

    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Active</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {usersTable}
                </tbody>
            </Table>
        </div>
    )
}

export default UsersTable;