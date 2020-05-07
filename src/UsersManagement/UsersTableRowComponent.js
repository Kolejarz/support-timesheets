import React from 'react'

function UsersTableRow(props) {
    const userData = props.userData
    const active = props.active

    return (
        <tr className={active ? "table-primary" : ""} onClick={props.onClick}>
            <td>{userData.id}</td>
            <td>{userData.username}</td>
            <td>{userData.active ? "✔" : ""}</td>
            <td>{userData.admin ? "✔" : ""}</td>
        </tr>
    )
}

export default UsersTableRow;