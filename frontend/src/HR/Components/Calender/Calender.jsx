import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const MyCalendar = () => {
	const [events, setEvents] = useState([
		{
			title: 'Meeting with Client',
			start: new Date(2024, 3, 10, 10, 0),
			end: new Date(2024, 3, 10, 12, 0)
		},
		{
			title: 'Team Lunch',
			start: new Date(2024, 3, 15, 12, 0),
			end: new Date(2024, 3, 15, 14, 0)
		}
	])

	const handleSelect = ({ start, end }) => {
		const title = window.prompt('New Event name')
		if (title) {
			setEvents([
				...events,
				{
					title,
					start,
					end
				}
			])
		}
	}

	return (
		<div style={{ height: 500, zIndex: 0 }}>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				selectable
				onSelectSlot={handleSelect}
				style={{
					margin: 'auto',
					maxWidth: 1000,
					backgroundColor: 'white',
					zIndex: 0
				}}
			/>
		</div>
	)
}

export default MyCalendar
