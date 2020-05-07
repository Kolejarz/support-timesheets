import React from 'react'
import { Row } from 'react-bootstrap'

const SelectedTimeSlots = (props) => {
    const selectedDays = props.selectedDays.map(day => {
        return <span key={day} className={"badge badge-pill badge-primary m-1"}>{day.toDateString().slice(0, 10)}</span>
    })

    return (
        <Row>
            {selectedDays}
        </Row>
    )
}

export default SelectedTimeSlots