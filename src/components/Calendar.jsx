import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})
const MyCalendar = (props) => (
    <div>
        <Calendar
            localizer={localizer}
            // events={myEventsList}
            events={props.events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
        />
    </div>
)

export function Meeting() {
    const [events, setEvents] = useState([]);


    return (
        <>
            <h1>Meeting</h1>
            <div style={{ height: '95vh' }}>
                <Calendar events={myEventsList} />
            </div>
        </>
    );
}


