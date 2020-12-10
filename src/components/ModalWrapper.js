import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

const useStyles = makeStyles(
  ({ spacing, palette, breakpoints, shadows, fontSizes, fontWeights }) => ({
    paper: {
      position: `absolute`,
      maxWidth: `600px`,
      width: `100%`,
      overflowX: `hidden`,
      maxHeight: `100vh`,
      backgroundColor: palette.background.paper,
      boxShadow: shadows[5],
      padding: spacing(5),
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      [breakpoints.down(`sm`)]: {
        width: `100%`,
        maxWidth: `100% !important`,
        height: `100%`,
      },
      '&:focus': {
        outline: `none`,
      },
    },
    formContainer: {
      margin: spacing(1, 0),
    },
    button: {
      marginTop: `1em`,
      background: `none`,
      color: `#042E48`,
      marginLeft: spacing(1),
      '&:hover': {
        color: `#042E48`,
        background: `none`,
      },
      [breakpoints.down(`sm`)]: {
        width: `100%`,
      },
    },
    error: {
      color: `#f5222d`,
      fontSize: `0.8em`,
    },
    icon: {
      position: `absolute`,
      right: 16,
      top: 8,
      height: 30,
      width: 30,
      fill: palette.primary.main,
      '&:hover': {
        cursor: `pointer`,
      },
    },
    buttonWrapper: {
      [breakpoints.down(`sm`)]: {
        paddingRight: `1em`,
        width: `100%`,
      },
    },
    buttonWrapperModal: {
      alignItems: `center`,
      justifyContent: `center`,
      width: `100%`,
      marginTop: spacing(3),
    },
    buttonModal: {
      marginLeft: spacing(4),
      width: `15em`,
      background: `#fead4c`,
      marginBottom: `0.5em`,
      [breakpoints.down(`xs`)]: {
        marginLeft: 0,
      },
    },
    buttonCancelModal: {
      color: `#FFF`,
      background: `#7F8FA4`,
      minWidth: `8em`,
      marginLeft: `0.5em`,
      marginBottom: `0.5em`,
    },
    modalSubtitle: {
      color: palette.primary.main,
      fontSize: `1.6rem`,
    },
    loading: {
      minHeight: `20rem`,
    },
    desactivationTitle: {
      paddingBottom: 10,
      borderBottom: `1px solid #7F8FA4`,
      fontSize: fontSizes[2],
      fontWeight: fontWeights[2],
      width: `100%`,
      textAlign: `left`,
    },
  }),
)

export default function ModalWrapper({
  title,
  subTitle = ``,
  titleType = `h2`,
  titleClass = null,
  onClose,
  onCancel = undefined,
  onAccept,
  maxWidth = `600px`,
  maxHeight = `auto`,
  onAcceptText = `Aceptar`,
  onCancelText = `Cancelar`,
  withButtons = true,
  children = null,
  alignItems = `flex-start`,
  loading = false,
  withClose = true,
  justifyTitle = `center`,
  isDisabledOnAccept = false,
  buttonColorAccept = `primary`,
}) {
  const classes = useStyles()
  return (
    <Modal open={true} disableBackdropClick disableEscapeKeyDown>
      <Paper className={classes.paper} style={{ maxWidth, maxHeight }}>
        {loading ? (
          <Grid
            className={classes.loading}
            item
            container
            xs={12}
            justify="center"
            alignItems="center"
          >
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          <Grid container direction="column">
            <Grid
              item
              className={classes.sections}
              container
              direction="column"
              alignItems={alignItems}
              justify={justifyTitle}
            >
              <Typography
                variant={titleType}
                component={titleType}
                align="center"
                style={{ width: `100%` }}
                className={titleClass ? classes[titleClass] : ``}
              >
                {title}
              </Typography>
              {subTitle && <Typography className={classes.modalSubtitle}>{subTitle}</Typography>}
            </Grid>
            {withClose && <CloseRoundedIcon onClick={onClose} className={classes.icon} />}
            <Grid container className={classes.formContainer} spacing={1}>
              <React.Fragment>
                {children}
                {withButtons && (
                  <Grid container className={classes.buttonWrapperModal}>
                    {onCancel && (
                      <Button
                        className={classes.buttonCancelModal}
                        onClick={onCancel ? onCancel : onClose}
                        variant="contained"
                        color="secondary"
                      >
                        {onCancelText}
                      </Button>
                    )}
                    <Button
                      className={buttonColorAccept === `primary` ? classes.buttonModal : classes.buttonCancelModal}
                      onClick={onAccept}
                      disabled={isDisabledOnAccept}
                      variant="contained"
                      color={buttonColorAccept}
                    >
                      {onAcceptText}
                    </Button>
                  </Grid>
                )}
              </React.Fragment>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Modal>
  )
}
