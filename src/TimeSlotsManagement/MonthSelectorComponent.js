import React from 'react'
import { Form, FormControl } from 'react-bootstrap'

const MonthSelector = props => {
    const availableMonths = () => {
        const currentDate = new Date()
        const options = [-2, -1, 0, 1, 2, 3]

        return options.map(month => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + month, 1)
            return <option
                key={month}
                value={date.toDateString()}>{date.toLocaleString('en-US', { month: 'long' })} {date.toLocaleString('en-US', { year: 'numeric' })}</option>
        })
    }

    const handleOnChange = (e) => {
        const date = e.target.value
        props.setSelectedDate(date)
    }

    return (
        <Form inline>
            <FormControl as="select" onChange={handleOnChange} value={props.selectedDate}>
                {availableMonths()}
            </FormControl>
        </Form>
    )
}

export default MonthSelector