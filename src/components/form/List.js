import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(
  ({ fontSizes, fontWeights, spacing, palette }) => ({
    label: {
      fontSize: fontSizes[0],
      color: `#48566A`,
    },
    typo: {
      fontSize: `12px`,
      color: `#48566A`,
      cursor: `pointer`,
    },
    typoParent: {
      marginLeft: spacing(2),
    },
    selected: {
      fontWeight: fontWeights[2],
    },
    wrapper: {
      maxHeight: `12rem`,
      minHeight: `12rem`,
      overflow: `hidden`,
      overflowY: `scroll`,
      width: `auto`,
      background: `#deeffc`,
      padding: spacing(1),
    },
    wrapperContainer: {
      marginBottom: spacing(2),
    },
    button: {
      color: palette.error.main,
      cursor: `pointer`,
      fontSize: `12px`,
      '&:hover': {
        textDecoration: `underline`,
      },
    },
  }),
)

function Items({ items, setSelected, selected }) {
  const classes = useStyles()
  return items.map(({ label, value }, i) => (
    <Typography
      key={`${i}-${label}`}
      className={`${classes.typo} ${
        selected === value ? classes.selected : ``
      }`}
      onClick={() => setSelected(value)}
    >
      {label}
    </Typography>
  ))
}

function CategoryItems({ items }) {
  const classes = useStyles()
  if (items.length === 0) {
    return null
  }
  const regionsArray = items.map(({ nom_reg }) => nom_reg)
  const uniqueRegions = [...new Set(regionsArray)]
  const nextItems = []
  uniqueRegions.forEach(region => {
    const comunasByRegion = items.filter(({ nom_reg }) => nom_reg === region)
    nextItems.push({ [region]: comunasByRegion })
  })
  return nextItems.map((region, i) => {
    const regionName = Object.keys(region)[0]
    const comunas = region[regionName]
    return (
      <React.Fragment key={`${i}-${region}`}>
        <Typography className={classes.typo}>{regionName}</Typography>
        {comunas.map(({ label, value }, j) => (
          <Typography
            key={`${j}-${value}`}
            className={`${classes.typo} ${classes.typoParent}`}
          >
            {label}
          </Typography>
        ))}
      </React.Fragment>
    )
  })
}

function List({
  items = [],
  label = `Regiones seleccionadas`,
  name,
  md = 6,
  sm = 12,
  selected = ``,
  setSelected,
  removeAll,
  parentItems = null,
}) {
  const classes = useStyles()
  const propsItems = {
    items,
    selected,
    setSelected,
  }
  return (
    <Grid item md={md} sm={sm} className={classes.wrapperContainer}>
      <Grid container item justify="space-between">
        <Typography
          className={classes.label}
        >{`${label} (${items.length})`}</Typography>
        <Typography className={classes.button} onClick={() => removeAll(name)}>
          Borrar Selección
        </Typography>
      </Grid>
      <Grid className={classes.wrapper}>
        {parentItems ? (
          <CategoryItems {...propsItems} parentItems={parentItems} />
        ) : (
          <Items {...propsItems} />
        )}
      </Grid>
    </Grid>
  )
}

export default List
