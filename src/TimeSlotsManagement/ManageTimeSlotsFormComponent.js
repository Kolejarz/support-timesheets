import React from 'react'
import { Button } from 'react-bootstrap'

const ManageTimeSlotsForm = (props) => {

    return (
        <div>
            <Button
                onClick={() => props.setTimeSlot("workday")}
                className="my-2 btn-success"
                block>WORKDAY</Button>
            <Button
                onClick={() => props.setTimeSlot("weekend")}
                className="my-2 btn-warning"
                block>WEEKEND</Button>
            <Button
                onClick={() => props.setTimeSlot("holiday")}
                className="my-2 btn-primary"
                block>HOLIDAY</Button>
            <Button
                onClick={() => props.setTimeSlot("disabled")}
                className="my-2 btn-danger"
                block>DISABLED</Button>
            <Button
                onClick={() => props.setTimeSlot("clear")}
                className="my-2 btn-light"
                block>CLEAR SELECTION</Button>
        </div>
    )
}

export default ManageTimeSlotsForm