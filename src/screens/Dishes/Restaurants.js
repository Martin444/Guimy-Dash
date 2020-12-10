import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import {
  Button
} from 'components'
import {
  StoreMallDirectory as StoreMallDirectoryIcon,
} from '@material-ui/icons'
import { stylesRestaurant as styles } from './styles'

const initialListSucursals = [
  {
    id: 1,
    icon: <StoreMallDirectoryIcon />,
    text: `Miraflores de Piura 1`,
    active: false,
  },
  {
    id: 2,
    icon: <StoreMallDirectoryIcon />,
    text: `Miraflores de Piura 2`,
    active: false,
  },
  {
    id: 3,
    icon: <StoreMallDirectoryIcon />,
    text: `Miraflores de Piura 3`,
    active: false,
  },
]

function Restaurants() {
  const classes = styles()
  const [listSucursals, setListSucursals] = useState(initialListSucursals)

  const onClickSucursal = indexSucursal => {
    const dataListSucursals = listSucursals.map((sucursal, index) => {
      sucursal.active = false

      if (indexSucursal === index) {
        sucursal.active = !sucursal.active
      }

      return sucursal
    })
    setListSucursals(dataListSucursals)
  }

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {listSucursals.map((sucursal, index) => {
        return (
          <Grid
            item
            xs={12}
            sm={5}
            md={3}
            className={`${classes.boxSucursal} ${sucursal.active ? classes.boxSucursalActive : ``}`}
            key={`${index} ${sucursal.text}`}
          >
            <Button
              variant="contained"
              className={`${classes.buttonSucursal} ${sucursal.active ? classes.buttonSucursalActive : ``}`}
              onClick={() => onClickSucursal(index)}
            >
              {sucursal.icon}
            </Button>
            <Typography className={classes.textSucursal}>
              {sucursal.text}
            </Typography>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Restaurants
