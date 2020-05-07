import React, { useState, useEffect } from 'react'
import { CardDeck } from 'react-bootstrap'
import HoursSummaryCard from './HoursSummaryCardComponent';

const HoursSummary = ({selectedDate}) => {
    const [cards, setCards] = useState([])

    const [hoursColorMapping] = useState([
        { hoursType: "workday", color: "success" },
        { hoursType: "weekend", color: "warning" },
        { hoursType: "holiday", color: "primary" }
    ])

    useEffect(() => {
        setCards([])
        fetch('https://github.com/Kolejarz', { mode: "no-cors" }).then((response) => {
            const apiResponse = `{"hoursSummary":[{"hoursType":"workday","hoursCount":${Math.floor(Math.random() * 20 + 6)}},{"hoursType":"weekend","hoursCount":${Math.floor(Math.random() * 10 + 6)}},{"hoursType":"holiday","hoursCount":${Math.floor(Math.random() * 5 + 6)}}]}`
            let result = JSON.parse(apiResponse)
            const cards = result.hoursSummary.map((hours) => {
                let card = {
                    hoursType: hours.hoursType,
                    hoursCount: hours.hoursCount,
                    color: hoursColorMapping.find(x => x.hoursType === hours.hoursType).color
                }

                return card
            })

            setCards(cards)
        })
    }, [hoursColorMapping, selectedDate])

    return (
        <CardDeck>
            {cards.map(card =>
                <HoursSummaryCard
                    key={card.hoursType}
                    hoursType={card.hoursType}
                    hoursCount={card.hoursCount}
                    color={card.color} />)}
        </CardDeck>
    )
}

export default HoursSummary;