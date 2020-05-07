import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import MonthSelector from '../TimeSlotsManagement/MonthSelectorComponent'
import Calendar from '../CalendarComponent/CalendarComponent';

const SupportGeneration = () => {
    const [selectedDate, setSelectedDate] = useState((new Date(new Date().getFullYear(), new Date().getMonth(), 1).toDateString()))
    const [days, setDays] = useState([])

    const generate = () => {
        const daysResponse = [...Array(31).keys()].map(day => {
            let date = new Date(selectedDate)
            if (Math.random() > 0.11) {
                let x = new Date(date.getFullYear(), date.getMonth(), day + 1)
                return {
                    date: x,
                    text: ["rlewandowski", "kglik", "aboruc"][Math.floor(Math.random() * 3)],
                    className: "table-success",
                    textClassName: x.getDay() % 6 ? "success" : "warning"
                }
            }
            else {
                return {
                    date: new Date(date.getFullYear(), date.getMonth(), day + 1),
                    text: "N/A",
                    className: "table-danger",
                    textClassName: "danger"
                }
            }
        })
        setDays(daysResponse)
    }

    useEffect(() => {
        setDays([])
        fetch('https://github.com/Kolejarz', { mode: "no-cors" }).then((response) => {
            generate()
        })
    }, [selectedDate])

    return (
        <Container>
            <Row className="mb-3">
                <h2 className="mr-3">Support calendar for: </h2>
                <MonthSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <div className="ml-3 my-auto"><Button onClick={generate}>GENERATE</Button></div>
            </Row>
            <Row>
                <Calendar
                    selectedDate={selectedDate}
                    days={days}
                    onClickHandler={() => { }} />
            </Row>
        </Container>
    )
}

export default SupportGeneration;