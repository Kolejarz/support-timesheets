import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import HoursSummary from './HoursSummaryComponent';
import Calendar from '../CalendarComponent/CalendarComponent';
import MonthSelector from '../TimeSlotsManagement/MonthSelectorComponent';

const Summary = () => {
    const [selectedDate, setSelectedDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toDateString())
    const [days, setDays] = useState([])

    useEffect(() => {
        const getResponse = () => {
            const firstDayOfMonth = new Date(selectedDate)
            const lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0).getDate()

            const timeSlots = [...Array(lastDayOfMonth).keys()].map(dayNumber => {
                let timeSlot = {
                    date: new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), dayNumber + 1)
                }

                timeSlot.startTime = 8
                timeSlot.endTime = 21

                if (Math.random() > 0.6) {
                    if (timeSlot.date.getDay() === 0 || timeSlot.date.getDay() === 6) {
                        timeSlot.dayType = "weekend"
                    }
                    else {
                        timeSlot.dayType = "workday"
                    }
                }

                return timeSlot
            })

            return timeSlots
        }
        setDays([])
        fetch('https://github.com/Kolejarz', { mode: "no-cors" }).then((response) => {
            const days = getResponse().map(timeSlot => {
                let day = {
                    date: timeSlot.date,
                    text: `${timeSlot.startTime}:00-${timeSlot.endTime}:00`,
                    selected: false
                }

                switch (timeSlot.dayType) {
                    case "workday": day.className = "table-success"; day.textClassName = "success"; break;
                    case "weekend": day.className = "table-warning"; day.textClassName = "warning"; break;
                    case "holiday": day.className = "table-primary"; day.textClassName = "primary"; break;
                    default: day.className = "table-secondary"; day.textClassName = "secondary"; break;
                }

                return day
            })

            setDays(days)
        })
    }, [selectedDate])

    return (
        <Container>
            <Row className="mb-3">
                    <h2 className="text-center mr-3">My support hours for </h2><MonthSelector setSelectedDate={setSelectedDate} />
            </Row>
            <Row>
                <Col>
                    <HoursSummary selectedDate={selectedDate}/>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Calendar
                        days={days}
                        selectedDate={selectedDate}
                        onClickHandler={() => { }} />
                </Col>
            </Row>
        </Container>
    )
}

export default Summary;