import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { generateRandomKey } from 'utils'

const styles = makeStyles(theme => ({
  container: {
    width: `auto`,
  },
  prev: {
    padding: theme.spacing(0),
    marginLeft: theme.spacing(0.5),
  },
  count: {
    fontSize: theme.fontSize[0],
    color: theme.palette.gray[3],
  },
  pageBase: {
    borderRadius: `50%`,
    textAlign: `center`,
    transition: `.3s`,
    cursor: `pointer`,
    height: 23,
    width: 23,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  currentPage: {
    color: theme.palette.success.main,
    background: `#007BFF26`,
    fontWeight: theme.fontWeight[3],
  },
  page: {
    '&:hover': {
      background: theme.palette.gray[2],
    },
  },
  wrapper: {
    paddingBottom: theme.spacing(1),
  },
}))

export default function Pagination({
  className = ``,
  currentPage: currentPageProp,
  last,
  onChange,
}) {
  const classes = styles()
  const lastPage = parseInt(last)
  const currentPage = parseInt(currentPageProp)

  function goToPage(page) {
    return () => (page !== currentPage ? onChange(page) : null)
  }

  function pageNumbers() {
    const delta = 5
    const left = currentPage - delta
    const right = currentPage + delta + 1
    let pageNumbers = []

    pageNumbers = Array.from({ length: lastPage }, (v, k) => k + 1).filter(
      i => i && i >= left && i < right,
    )
    return pageNumbers
  }

  return (
    <Grid container justify="space-between" alignItems="center" className={classes.wrapper}>
      <Typography
        variant="body1"
        className={classes.count}
      >{`Página ${currentPage} de ${lastPage}`}</Typography>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={`${classes.container} ${className}`}
      >
        {currentPage > 1 && (
          <IconButton onClick={goToPage(currentPage - 1)} className={classes.prev}>
            <ChevronLeft />
          </IconButton>
        )}
        {pageNumbers().map(number => (
          <Typography
            className={`${classes.pageBase} ${
              number === currentPage ? classes.currentPage : classes.page
            }`}
            key={generateRandomKey(`page-${number}`)}
            variant="body2"
            onClick={goToPage(number)}
          >
            {number}
          </Typography>
        ))}
        {currentPage !== lastPage && (
          <IconButton onClick={goToPage(currentPage + 1)} className={classes.prev}>
            <ChevronRight />
          </IconButton>
        )}
      </Grid>
    </Grid>
  )
}
