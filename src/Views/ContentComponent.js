import React from 'react'
import { Container } from 'react-bootstrap'
import ManageUsers from '../UsersManagement/ManageUsersComponent'
import ManageTimeSlots from '../TimeSlotsManagement/ManageTimeSlotsComponent'
import TimeSlotsSelection from '../TimeSlotsSelection/TimeSlotsSelectionComponent'
import Summary from '../SummaryComponent/SummaryComponent'
import SupportGeneration from '../SupportGenerationComponent/SupportGenerationComponent'

function Content(props) {
    const activeTab = props.activeTab

    let content;
    switch(activeTab?.route) {
        case "calendar": content = <TimeSlotsSelection />; break;
        case "summary": content = <Summary />; break;
        case "users": content = <ManageUsers />; break;
        case "slots": content = <ManageTimeSlots />; break;
        case "support": content = <SupportGeneration />; break;
        default: content = <h1 className="text-center">Select user from list to display navigation</h1>; break;
    }

    return (
        <Container className={"mt-5"}>
            {content}
        </Container>
    )
}

export default Content;