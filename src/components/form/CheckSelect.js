import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Select from './Select'
import Input from './TextInput'

const useStyles = makeStyles(({ palette, spacing }) => ({
  checked: {
    '& svg': {
      fill: palette.success.main,
    },
  },
  root: {
    fontSize: `18px`,
  },
  wrapper: {
    marginBottom: spacing(1),
  },
  inputText: {
    paddingRight: spacing(1),
  },
}))

const CheckSelect = ({
  label,
  error,
  isRequired = false,
  isValid,
  onChange,
  value,
  name,
  type = `selectCheck`,
  disabled = false,
  align = `left`,
  fullWidth = false,
  md = 12,
  xs = 12,
  callbacks = null,
  id,
  className = {},
  justify = `flex-start`,
  positionLabel = `right`,
  items = [],
  textValue = null,
  isRequiredLabel,
  checkValue = false,
  mode = null,
  tooltipTitle = ``, // Títilo a mostrar en el tooltip para indicar ayuda o acción
  ...rest
}) => {
  const classes = useStyles()
  const isOtro = textValue !== null
  const getDefaultData = () => {
    let toChange = {
      name,
      type,
      value: [],
      checkValue: false,
      isRequired: false,
      isValid: false,
    }
    if (isOtro) {
      toChange = {
        ...toChange,
        textValue: ``,
      }
    }
    return toChange
  }
  const onChangeCheck = ({ target: { checked } }) => {
    let toChange = getDefaultData()
    toChange = {
      ...toChange,
      checkValue: checked,
      isRequired: checked,
      isValid: !checked,
    }
    onChange(toChange)
  }
  const onChangeText = ({ value: valueInEvent }) => {
    let toChange = getDefaultData()
    toChange = {
      ...toChange,
      value,
      isRequired,
      checkValue,
      textValue: valueInEvent,
      isValid,
    }
    onChange(toChange)
  }
  //AL HACER CLICK EN QUE NO REQUIERE NINGUNO,
  //SE DESHABILITA O HABILITA EL CAMPO
  useEffect(() => {
    if (disabled) {
      onChange(getDefaultData())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  const isModeDisabled = mode === `show` || mode === `approveReject`

  return (
    <Grid container item md={md} xs={xs} className={classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item md={isOtro ? 3 : 9} container>
          <Checkbox
            disabled={isModeDisabled ? true : disabled}
            checked={checkValue}
            onChange={onChangeCheck}
            name={name}
            className={classes.root}
            classes={{
              checked: classes.checked,
            }}
          />
          <Typography color="primary">{label}</Typography>
        </Grid>
        {isOtro && (
          <Grid item md={6} className={classes.inputText}>
            <Input
              marginBottom={false}
              name={`${name}-input`}
              withPadding={false}
              value={textValue}
              disabled={isModeDisabled ? true : !checkValue}
              onChange={onChangeText}
              isRequired={isModeDisabled ? false : checkValue}
              isRequiredLabel={false}
            />
          </Grid>
        )}
        <Tooltip
          placement="top"
          title={tooltipTitle}
          key={`tooltip_${name}`}
          open={checkValue && value.length === 0}
        >
          <Grid item md={3}>
            <Select
              marginBottom={false}
              name={name}
              value={value}
              items={items}
              disabled={isModeDisabled ? true : !checkValue}
              onChange={onChange}
              mode="multiple"
              withPadding={false}
              isValid={isValid && value.length > 0}
              isRequired={isRequired}
              isRequiredLabel={isRequiredLabel}
            />
          </Grid>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default CheckSelect
