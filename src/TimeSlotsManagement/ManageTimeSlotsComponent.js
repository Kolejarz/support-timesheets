import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Calendar from '../CalendarComponent/CalendarComponent'
import MonthSelector from './MonthSelectorComponent'
import SelectedTimeSlots from './SelectedTimeSlotsComponent'
import ManageTimeSlotsForm from './ManageTimeSlotsFormComponent'

function ManageTimeSlots() {
    const [selectedDate, setSelectedDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toDateString())
    const [days, setDays] = useState([])
    const selectedDays = days.filter(day => day.selected).map(day => day.date)

    const dayTypes = [
        { dayType: "workday", className: "success" },
        { dayType: "weekend", className: "warning" },
        { dayType: "holiday", className: "primary" },
        { dayType: "disabled", className: "danger" }
    ]

    const calendarCellOnClickHandler = (dayNumber) => {
        const daysCopy = days.slice()
        const selectedDay = daysCopy.find(day => day.date.getDate() === dayNumber)
        const currentState = daysCopy[daysCopy.indexOf(selectedDay)].selected
        daysCopy[daysCopy.indexOf(selectedDay)].selected = !currentState
        setDays(daysCopy)
    }

    const setTimeSlot = (slot) => {
        const daysCopy = days.slice()

        if (slot !== "clear") {
            let startTime, endTime, className = 0
            switch (slot) {
                case "workday": startTime = 8; endTime = 21; className = "success"; break;
                case "weekend": startTime = 8; endTime = 21; className = "warning"; break;
                case "holiday": startTime = 9; endTime = 20; className = "primary"; break;
                case "disabled": startTime = 0; endTime = 0; className = "danger"; break;
                default: className = "light"; break;
            }

            daysCopy.filter((days) => days.selected === true).forEach((day) => {
                day.startTime = startTime
                day.endTime = endTime
                day.text = day.startTime ? `${day.startTime}:00-${day.endTime}:00` : "N/A"
                day.className = `table-${className}`
                day.textClassName = className
            })
        }

        daysCopy.filter((days) => days.selected === true).forEach((day) => day.selected = false)
        setDays(daysCopy)
    }

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

                if (timeSlot.date.getDay() === 0 || timeSlot.date.getDay() === 6) {
                    timeSlot.dayType = "weekend"
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
                    selected: false
                }

                switch (timeSlot.dayType) {
                    case "workday": day.className = "table-success"; day.textClassName = "success"; break;
                    case "weekend": day.className = "table-warning"; day.textClassName = "warning"; break;
                    default: day.className = "table-info"; day.textClassName = "info"; break;
                }

                return day
            })

            setDays(days)
        })
    }, [selectedDate])

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
                </Col>
                <Col className={"col-3"}>
                    <ManageTimeSlotsForm setTimeSlot={setTimeSlot} />
                    <SelectedTimeSlots selectedDays={selectedDays} />
                </Col>
            </Row>
        </Container>
    )
}

export default ManageTimeSlots