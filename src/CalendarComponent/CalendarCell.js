import React from 'react'

const CalendarCell = ({ dayNumber, className, text, textClassName, onClickHandler }) => {

    return (
        <td
            style={{ userSelect: 'none', cursor: 'pointer' }}
            className={className}
            onClick={() => onClickHandler(dayNumber)}>
            {dayNumber}<br />
            <small><span className={`badge badge-pill badge-${textClassName} m-1`}>{text}</span></small>
        </td>
    )
}

export default CalendarCell;