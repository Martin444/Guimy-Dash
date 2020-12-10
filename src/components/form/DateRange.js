import React from 'react'
import Select from './Select'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const yearItems = [
  { label: `2010`, value: 2010 },
  { label: `2011`, value: 2011 },
  { label: `2012`, value: 2012 },
  { label: `2013`, value: 2013 },
  { label: `2014`, value: 2014 },
  { label: `2015`, value: 2015 },
  { label: `2016`, value: 2016 },
  { label: `2017`, value: 2017 },
  { label: `2018`, value: 2018 },
  { label: `2019`, value: 2019 },
  { label: `2020`, value: 2020 },
]

const monthsItems = [
  { label: `Enero`, value: 1 },
  { label: `Febrero`, value: 2 },
  { label: `Marzo`, value: 3 },
  { label: `Abril`, value: 4 },
  { label: `Mayo`, value: 5 },
  { label: `Junio`, value: 6 },
  { label: `Julio`, value: 7 },
  { label: `Agosto`, value: 8 },
  { label: `Septiembre`, value: 9 },
  { label: `Octubre`, value: 10 },
  { label: `Noviembre`, value: 11 },
  { label: `Diciembre`, value: 12 },
]

const useStyles = makeStyles(({ spacing }) => ({
  select1: {
    paddingRight: spacing(1),
  },
  select2: {
    paddingLeft: spacing(1),
  },
  rootSelect: {
    padding: 0,
    background: `white`,
    paddingRight: `${spacing(1)}px !important`,
    '&:focus': {
      background: `white !important`,
    },
  },
}))

function DateRange({ mode = `multiple`, ...rest }) {
  const { select1, select2, rootSelect } = useStyles()
  return (
    <Grid container>
      <Grid item xs={6} className={select1}>
        <Select
          items={yearItems}
          value={rest.value.year}
          onChange={entry => {
            entry.id = rest.id
            rest.onChange(entry)
          }}
          name="year"
          variant="filled"
          classes={{ root: rootSelect }}
        />
      </Grid>
      <Grid item xs={6} className={select2}>
        <Select
          mode={mode}
          items={monthsItems}
          value={rest.value.months}
          onChange={entry => {
            entry.id = rest.id
            rest.onChange(entry)
          }}
          name="months"
          variant="filled"
          classes={{ root: rootSelect }}
        />
      </Grid>
    </Grid>
  )
}

export default DateRange
