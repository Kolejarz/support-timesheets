import React, { useState, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap';

function UsersForm(props) {
    const setSelectedUser = props.setSelectedUser
    const [activeUser, setActiveUser] = useState(props.userDetails)

    useEffect(() => {
        setActiveUser(props.userDetails)
    }, [props.userDetails, props.selectedUserId])

    function updateUser(property, value) {
        const userCopy = JSON.parse(JSON.stringify(activeUser ?? {}))
        userCopy[property] = value
        setActiveUser(userCopy)
    }

    function save() {
        props.saveUser(activeUser)
        props.setSelectedUser(0)
        setActiveUser({})
    }

    return (
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={activeUser?.username || ""}
                    onChange={(e) => updateUser("username", e.target.value)} />
            </Form.Group>
            <Form.Row>
                <Col>
                    <Form.Group controlId="formBasicFirstname">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            value={activeUser?.firstname || ""}
                            onChange={(e) => updateUser("firstname", e.target.value)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formBasicLastname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            value={activeUser?.lastname || ""}
                            onChange={(e) => updateUser("lastname", e.target.value)} />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col xs={4}>
                    <Form.Group controlId="formBasicActive">
                        <Form.Switch
                            label="Active"
                            checked={activeUser?.active || false}
                            onChange={(e) => updateUser("active", e.target.checked)} />
                    </Form.Group>
                </Col>
                <Col xs={4}>
                    <Form.Group controlId="formBasicAdmin">
                        <Form.Switch
                            label="Admin access"
                            checked={activeUser?.admin || false}
                            onChange={(e) => updateUser("admin", e.target.checked)} />
                    </Form.Group>
                </Col>
            </Form.Row>
            {/*<Form.Group controlId="formBasicContractType">
                <Form.Label>Contract type</Form.Label>
                <Form.Check label="B2B" type="radio" name="contractType" />
                <Form.Check defaultChecked label="Employment Contract" type="radio" name="contractType" />
    </Form.Group>*/}
            <Button
                variant="outline-secondary"
                onClick={() => setSelectedUser(0)}>Cancel</Button>{' '}
            <Button
                variant="primary"
                onClick={save}>{activeUser?.id ? "Save changes" : "Add"}</Button>
        </Form>
    )
}

export default UsersForm;