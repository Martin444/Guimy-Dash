import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Loader } from 'components'
import { generateRandomKey } from 'utils'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

const style = makeStyles(theme => ({
  cellWithLink: {
    cursor: `pointer`,
  },
  empty: {
    textAlign: `center`,
    width: `100%`,
    padding: theme.spacing(4, 0),
    fontSize: theme.fontSizes[2],
    fontWeight: theme.fontWeights[3],
  },
  textSection: {
    color: `#7F8FA4 !important`,
  },
  iconPlayArrow: {
    color: `#fead4c`,
  },
}))

export default function TableWrapper({
  loading = true,
  tableCells = [],
  tableBody = [],
  onAction = () => {},
  notHeader = true,
}) {
  const { push: pushHistory } = useHistory()
  const classes = style()

  function renderTableHeader() {
    return (
      <TableHead>
        <TableRow>
          {tableCells.map(tableCell => {
            const { dataIndex, label = ``, align = ``, width = undefined } = tableCell
            return (
              <TableCell
                key={generateRandomKey(`table-cell`, dataIndex)}
                align={align}
                style={{ width: width ? width : `auto` }}
                size="small"
              >
                {label}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )
  }

  function renderTableBody() {
    if (tableBody.length === 0) {
      return (
        <TableBody>
          <TableRow>
            <TableCell size="small" align="center">
              <Typography variant="h3" align="center" className={classes.empty}>
                !No existen registros!
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      )
    }
    return (
      <TableBody>
        {tableBody.map(row => {
          return (
            <Fragment key={generateRandomKey(`table-box`, row.id)}>
              {row.section && row.section.id === row.id && (
                <TableRow key={generateRandomKey(`table-row-section`, row.id)}>
                  <TableCell
                    key={generateRandomKey(`table-row-cell-section`, row.id)}
                    size="small"
                    colSpan={6}
                  >
                    <Typography className={classes.textSection} variant="body2">
                      {row.section.title}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              <TableRow
                key={generateRandomKey(`table-row`, row.id)}
              >
                {tableCells.map((tableCell, index) => {
                  const {
                    readFunction = null,
                    align = `left`,
                    width,
                    dataIndex,
                    component = null,
                    link = null,
                  } = tableCell
                  const cellValue = readFunction ? readFunction(row[dataIndex]) : row[dataIndex]
                  return (
                    <Fragment>
                      {index === 0 && (
                        <TableCell
                          key={generateRandomKey(`table-row-cell`, `icon-${row.id}`)}
                          size="small"
                          style={{ width: `0.1em` }}
                        >
                          <PlayArrowIcon  className={classes.iconPlayArrow} />
                        </TableCell>
                      )}
                      <TableCell
                        key={generateRandomKey(`table-row-cell`, `${dataIndex}-${row.id}`)}
                        align={align}
                        style={{ width: width ? width : `auto` }}
                        size="small"
                        className={link && classes.cellWithLink}
                        onClick={() => (link ? pushHistory(`${link}${row.id}`) : onAction)}
                      >
                        {component ? (
                          <Grid container justify="center">
                            {component(cellValue)}
                          </Grid>
                        ) : (
                          <Typography
                            variant="body2"
                          >
                            {cellValue}
                          </Typography>
                        )}
                      </TableCell>
                    </Fragment>
                  )
                })}
              </TableRow>
            </Fragment>
          )
        })}
      </TableBody>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        {!notHeader && renderTableHeader()}
        {!loading && renderTableBody()}
      </Table>
      {loading && <Loader />}
    </TableContainer>
  )
}
