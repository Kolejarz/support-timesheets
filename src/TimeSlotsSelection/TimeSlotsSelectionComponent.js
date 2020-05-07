import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MonthSelector from '../TimeSlotsManagement/MonthSelectorComponent'
import Calendar from '../CalendarComponent/CalendarComponent'
import TimeSlotsSelectionForm from './TimeSlotsSelectionFormComponent'

const TimeSlotsSelection = () => {
    const [selectedDate, setSelectedDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toDateString())
    const [days, setDays] = useState([])
    const [dayTypes] = useState([
        { dayType: "workday", className: "success" },
        { dayType: "weekend", className: "warning" },
        { dayType: "holiday", className: "primary" },
        { dayType: "disabled", className: "danger" }
    ])
    const [choices] = useState([
        { choice: "available", className: "success" },
        { choice: "ifNeeded", className: "warning" },
        { choice: "notAvailable", className: "danger" }
    ])

    const calendarCellOnClickHandler = (dayNumber) => {
        const daysCopy = days.slice()
        const selectedDay = daysCopy.find(day => day.date.getDate() === dayNumber)
        const currentState = daysCopy[daysCopy.indexOf(selectedDay)].selected
        daysCopy[daysCopy.indexOf(selectedDay)].selected = !currentState
        setDays(daysCopy)
    }

    const setAvailability = (choice) => {
        const daysCopy = days.slice()
        daysCopy.filter(day => day.selected).forEach(day => {
            day.className = "table-" + choices.find(entry => choice === entry.choice).className
            day.selected = false
        })
        setDays(daysCopy)
    }

    const clearSelection = () => {
        const daysCopy = days.slice()
        daysCopy.forEach(day => day.selected = false)
        setDays(daysCopy)
    }

    useEffect(() => {
        const getResponse = () => {
            const firstDayOfMonth = new Date(selectedDate)
            const lastDayOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0).getDate()

            const timeSlots = [...Array(lastDayOfMonth).keys()].map(dayNumber => {
                let timeSlot = {
                    date: new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), dayNumber + 1),
                    choice: "notAvailable"
                }

                timeSlot.startTime = 8
                timeSlot.endTime = 21

                if (timeSlot.date.getDay() === 0 || timeSlot.date.getDay() === 6) {
                    timeSlot.dayType = "weekend"
                }
                else if (timeSlot.date.getDate() === 11) {
                    timeSlot.dayType = "holiday"
                }
                else {
                    timeSlot.dayType = "workday"
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
                    selected: false,
                    choice: "notAvailable"
                }

                day.className = "table-" + choices.find(entry => day.choice === entry.choice).className

                switch (timeSlot.dayType) {
                    case "workday": day.textClassName = "success"; break;
                    case "weekend": day.textClassName = "warning"; break;
                    case "holiday": day.textClassName = "primary"; break;
                    default: day.textClassName = "light"; break;
                }

                return day
            })

            setDays(days)
        })
    }, [selectedDate, choices])

    return (
        <Container>
            <Row>
                <Col className={"col-4"}>
                    <MonthSelector
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate} />
                </Col>
            </Row>
            <Row className={"my-2"}>
                <Col className={"col-9"}>
                    <Calendar
                        selectedDate={selectedDate}
                        days={days}
                        onClickHandler={calendarCellOnClickHandler} />
                    {dayTypes.map(({ dayType, className }) =>
                        <span key={dayType} className={`badge badge-pill badge-${className} m-1`}>{dayType.toUpperCase()}</span>)}
                </Col>
                <Col className={"col-3"}>
                    <TimeSlotsSelectionForm
                        setAvailability={setAvailability}
                        clearSelection={clearSelection} />
                </Col>
            </Row>
        </Container>
    )
}

export default TimeSlotsSelection;