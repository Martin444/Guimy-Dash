/* eslint-disable complexity */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
//TODO: Cómo puedo hacerlo sin tener cycle
// eslint-disable-next-line import/no-cycle
import CheckboxWrapper from './Checkbox'

const styles = ({
  spacing,
  breakpoints,
  fontSizes,
  palette: { gray, error, primary },
  fontWeights,
}) => ({
  requiredDot: {
    color: `#0B2D48`,
    fontSize: `1em`,
    marginLeft: 2,
    top: 0,
  },
  opcional: {
    fontSize: `1.4rem`,
    fontFamily: `Roboto`,
    fontWeigth: 100,
    fontStyle: `italic`,
    marginLeft: 6,
  },
  paddingRight: {
    paddingRight: spacing(1),
    textAlign: `right`,
    [breakpoints.down(`sm`)]: {
      textAlign: `left`,
    },
  },
  wrapperInput: {
    position: `relative`,
  },
  error: {
    textAlign: `right`,
    color: error.main,
    lineHeight: `1.6em`,
    fontSize: `1.4em`,
    position: `absolute`,
    right: 0,
  },
  errorColor: {
    color: error.main,
  },
  checkbox: {
    color: gray.main,
    marginTop: `5px`,
  },
  positionLabelWrapper: {
    flexDirection: `row-reverse`,
    flexWrap: `nowrap`,
    alignItems: `center`,
    marginBottom: spacing(1),
  },
  postitionLeftLabelWrapper: {
    flexWrap: `nowrap`,
    alignItems: `center`,
  },
  marginRight: {
    marginRight: spacing(1),
  },
  positionLabelWrapperPadding: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
  },
  positionLabel: {
    flexBasis: `auto`,
  },
  subLabel: {
    fontSize: fontSizes[0],
    lineHeight: `1rem`,
    fontWeight: fontWeights[0],
    fontStyle: `italic`,
    marginBottom: spacing(1),
    marginTop: spacing(1),
  },
  customWidth: {
    width: 150,
  },
  check: {
    margin: 0,
    padding: 0,
    justifyContent: `flex-start`,
  },
  label: {
    fontSize: fontSizes[0],
    //textTransform: 'capitalize',
  },
  borderTop: {
    borderTop: `1px solid ${gray.main}`,
    paddingTop: spacing(3),
  },
  marginBottom: {
    marginBottom: spacing(3),
  },
  loaderIcon: {
    height: `28px !important`,
    width: `28px !important`,
    color: primary.dark,
  },
})
const Label = ({
  children,
  error, // Puede ser boolean o string
  label,
  isRequiredLabel = true,
  subLabel = ``,
  isRequired = false,
  classes,
  disabled = false,
  positionLabel = `left`,
  customWidth = false,
  xs,
  md,
  check = null,
  haveCheck = false,
  callbacks,
  withPadding = false,
  flexDirection = `row`,
  justify = ``,
  borderTop = false,
  footer = ``,
  footerRight = false,
  marginBottom = true,
  variant = `standard`,
  loading = false,
  alignContent = `flex-start`,
  classNames: parentClassNames = {
    wrapper: ``,
    container: ``,
    inputs: ``,
  },
  ...rest
}) => {
  return (
    <Grid
      item
      xs={xs}
      md={md}
      container
      direction="row"
      alignContent={alignContent}
      style={variant === `outlined` ? { alignSelf: `flex-end` } : {}}
      className={`${error ? `has-warning` : ``} ${
        borderTop ? classes.borderTop : ``
      } ${marginBottom ? classes.marginBottom : ``} ${
        parentClassNames.wrapper
      }`}
    >
      <React.Fragment>
        <Grid
          container
          xs={12}
          item
          className={`
          ${
            positionLabel === `right`
              ? classes.positionLabelWrapper
              : positionLabel === `inlineLeft`
              ? classes.postitionLeftLabelWrapper
              : ``
          } ${haveCheck ? classes.check : ``}${
            withPadding ? classes.positionLabelWrapperPadding : ``
          } ${parentClassNames.container}`}
          wrap={rest.type === `checkbox` ? `nowrap` : `wrap`}
          justify={
            justify
              ? justify
              : flexDirection === `column`
              ? `space-between`
              : `flex-start`
          }
          alignItems={flexDirection === `column` ? `center` : `flex-start`}
        >
          {variant === `standard` && (
            <Typography
              variant="h6"
              color="primary"
              className={`${error ? classes.errorColor : ``} ${classes.label} ${
                positionLabel === `inlineLeft` ? classes.marginRight : ``
              }`}
            >
              {label}
              {isRequired && isRequiredLabel && (
                <sup className={classes.requiredDot}>(*)</sup>
              )}
            </Typography>
          )}
          <Grid
            item
            xs={flexDirection === `column` ? 3 : 12}
            className={`${
              positionLabel === `right` ? classes.positionLabel : ``
            } ${parentClassNames.inputs} ${classes.wrapperInput} ${
              customWidth ? classes.customWidth : ``
            }`}
          >
            {subLabel && (
              <Typography variant="h6" className={classes.subLabel}>
                {subLabel}
              </Typography>
            )}
            {loading ? (
              <Grid container justify="center">
                <CircularProgress className={classes.loaderIcon} />
              </Grid>
            ) : (
              children
            )}
            {footer && (
              <Typography
                variant="h6"
                className={classes.subLabel}
                align={footerRight ? `right` : `left`}
              >
                {footer}
              </Typography>
            )}
            {check && (
              <CheckboxWrapper
                haveCheck={true}
                className={classes.check}
                callbacks={callbacks}
                {...check}
              />
            )}
            {isRequired && error && error.length > 0 && (
              <Typography className={classes.error}>{error}</Typography>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    </Grid>
  )
}

export default withStyles(styles)(Label)
