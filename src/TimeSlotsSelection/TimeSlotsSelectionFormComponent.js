import React from 'react'
import { Button } from 'react-bootstrap'

const TimeSlotsSelectionForm = ({ setAvailability, clearSelection }) => {
    return (
        <div>
            <Button
                onClick={() => setAvailability("available")}
                className="my-2 btn-success"
                block>AVAILABLE</Button>
            <Button
                onClick={() => setAvailability("ifNeeded")}
                className="my-2 btn-warning"
                block>IF NEEDED</Button>
            <Button
                onClick={() => setAvailability("notAvailable")}
                className="my-2 btn-danger"
                block>NOT AVAILABLE</Button>
            <Button
                onClick={() => clearSelection()}
                className="my-2 btn-light"
                block>CLEAR SELECTION</Button>
        </div>)
}

export default TimeSlotsSelectionForm;