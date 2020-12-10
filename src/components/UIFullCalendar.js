import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
//import "@fullcalendar/core/main.css"
import "@fullcalendar/daygrid/main.css"

/*
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ spacing }) => ({
  fullCalendar: {
    height: `10em`,
  },
}))
*/

function UIFullCalendar({
  initialView= `dayGridMonth`,
  headerToolbar = false,
  height = 400,
  initialDate,
  events = [],
  locale = `es`,
}) {
  console.log(initialDate)
  //const classes = useStyles()
  return (
    <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView={initialView}
      headerToolbar={headerToolbar}
      height={height}
      initialDate={initialDate}
      events={events}
      locale={locale}
    />
  )
}

export default UIFullCalendar
