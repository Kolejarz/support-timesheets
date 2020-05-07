import React from 'react'
import { Card } from 'react-bootstrap'

const HoursSummaryCard = ({ hoursType, hoursCount, color }) => {
    return (
        <Card border={color} className={`text-${color} text-center`}>
            <Card.Header>
                <h4>{hoursType.toUpperCase()}S</h4>
            </Card.Header>
            <Card.Body>
                <h1><strong>{hoursCount}</strong></h1>
            </Card.Body>
        </Card>
    )
}

export default HoursSummaryCard