import React from 'react'
import { Table } from 'react-bootstrap'
import CalendarCell from './CalendarCell'

function Calendar(props) {
    const selectedMonth = new Date(props.selectedDate)
    const headers = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    function getWeeks() {
        const firstDayOfMonth = (selectedMonth.getDay() - 1) >= 0 ? (selectedMonth.getDay() - 1) : 6
        const numberOfDays = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0).getDate()

        const days = [...Array(firstDayOfMonth).fill(0)].concat([...Array(numberOfDays).keys()].map(i => i + 1));
        const weeks = []
        for (let i = 0; i < days.length / 7; i++) {
            let week = days.slice(i * 7, i * 7 + 7)
            week = week.length === 7 ? week : week.concat(...Array(7 - week.length).fill(0));
            weeks.push(week.map((dayNumber, index) => {
                const day = props.days.find(day => day.date.getDate() === dayNumber)
                if (day) {
                    return (
                        <CalendarCell
                            key={index}
                            dayNumber={day.date.getDate()}
                            text={day.text}
                            textClassName={day.textClassName}
                            className={day.selected ? "table-dark" : day.className}
                            onClickHandler={props.onClickHandler}
                        />
                    )
                }
                else {
                    return <td key={index} className="table-secondary"></td>
                }
            }))
        }

        return weeks.map((week, index) => <tr className={""} key={index}>{week}</tr>);
    }

    return (
        <Table bordered>
            <thead><tr>{headers.map(header => <th style={{ 'width': '14.28%' }} key={header}>{header}</th>)}</tr></thead>
            <tbody>{getWeeks()}</tbody>
        </Table>
    )
}

export default Calendar;