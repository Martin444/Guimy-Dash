import React from 'react'
import Grid from '@material-ui/core/Grid'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import { withStyles } from '@material-ui/core/styles'
import InputWrapper from './InputWrapper'

const RadioWrapper = ({
  label,
  id,
  error,
  isRequired = false,
  onChange,
  items = [],
  value,
  name,
  classes,
  disabled = false,
  direction = `row`,
  align = `left`,
  type = ``,
  md = 12,
  xs = 12,
  marginTop = true,
  ...rest
}) => {
  let nextValue = value === null ? `` : value
  if (name !== `zona_id` && nextValue !== ``) {
    nextValue = value === `0` || value === `false` ? `false` : `true`
  }
  return (
    <InputWrapper
      label={label}
      error={error}
      isRequired={isRequired}
      align={align}
      type={type}
      md={md}
      xs={xs}
      disabled={disabled}
      withPadding={true}
      {...rest}
    >
      <RadioGroup
        aria-label={name}
        name={name}
        value={nextValue}
        className={marginTop ? classes.marginTop : ``}
        onChange={({ target: { value, name } }) =>
          onChange({ name, value, id })
        }
        id={id}
      >
        <Grid container direction={direction}>
          {items.map(({ value: itemValue, label: itemLabel }, i) => (
            <Grid
              key={`${name}-${i}-${itemLabel}`}
              item
              className={classes.marginRight}
            >
              <FormControlLabel
                disabled={disabled}
                key={`${name}-${i}-${itemLabel}`}
                value={itemValue}
                control={
                  <Radio
                    checked={itemValue === nextValue}
                    classes={{ checked: classes.checked }}
                  />
                }
                label={itemLabel}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </InputWrapper>
  )
}

const styles = ({ spacing, palette: { success } }) => ({
  checked: {
    '& svg': {
      fill: success.main,
    },
  },
  margin: {
    marginLeft: spacing(1),
  },
  marginRight: {
    marginRight: spacing(2),
  },
  marginTop: {
    marginTop: spacing(1),
  },
})

export default withStyles(styles)(RadioWrapper)
