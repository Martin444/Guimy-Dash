import moment from 'moment'
import { replacePhone } from './misc'

//Objeto con keys para validar inputs
//Retorna si es válido o no
//@boolean
export const validator = {
  //Any / Null ni undefined
  null: ({ value }) => {
    return value !== null && value !== undefined
  },
  date: ({ value }) => value && !moment(value).isAfter(moment()),
  //String / que no esté vacio
  empty: ({ value }) => value && value.trim().length > 0,
  //Number / que sea un número y mayor a 0
  number: ({ value }) => !isNaN(value) && value > 0,
  //String / que sea un teléfono
  phone: ({ value }) => {
    const regex = /\D*([+56]\d[2-9])(\d{4})(\d{4})\D*/
    return value && regex.test(value.trim())
  },
  //String / que sea un email válido
  email: ({ value }) => {
    const regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    return value && regex.test(value.trim())
  },
  //String / min y max del string,
  //pasandole un atributo ranges
  //ranges: Number Array [min,max]
  range: ({ value, ranges }) => {
    const nextValue = replacePhone(value)
    return (
      nextValue && nextValue.length > ranges[0] && nextValue.length < ranges[1]
    )
  },
  //String / valida Money
  money: ({ value }) => {
    let nextValue = `${value}`.replace(/\$\s?|(\.*)/g, ``)
    nextValue = parseInt(nextValue, 10)
    return !isNaN(nextValue) && nextValue > 0
  },
  //Any / valida que sea distinto de -1 (Defecto/Seleccione)
  select: ({ value }) => value && value !== -1,
  //Array / Que no esté vacío
  arrayEmpty: ({ value }) => {
    return value.length > 0
  },
  //Boolean / si es True
  isTrue: ({ value }) => value,
  //Moment / si es menor que otra fecha
  //Recibe un Moment para comparar
  isTrueString: ({ value }) => value === `true`,
  greaterThanDate: ({ value, greaterThanDate }) =>
    moment(value).isSameOrAfter(greaterThanDate, `day`),
  passwordConfirmation: ({ value, passwordValue }) => value === passwordValue,
  //String / que sea un email válido
  coord: ({ value }) => {
    const regex = /^[-+]?[0-9]*\.?[0-9]+$/
    return value && regex.test(value.trim())
  },
  percentage: ({ value }) => {
    const nextValue = value ? value.replace(/[^0-9,]/g, ``) : ``
    const regex = /^100$|^[0-9]{1,2}$|^[0-9]{1,2},[0-9]{1,3}$/
    return regex.test(nextValue)
  },
  otroCheckSelect: ({ textValue }) => textValue && textValue.trim().length > 0,
}

// format money
export const formatter = {
  money: value => {
    let nextValue = `${value}`.replace(/\$\s?|(\.*)/g, ``)
    nextValue = parseInt(nextValue, 10)
    nextValue = nextValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `.`)
    return isNaN(nextValue) ? 0 : nextValue
  },
  age: value => {
    const nextValue = value.replace(/[^0-9]/g, ``)
    return nextValue.substr(0, 3)
  },
  number: value => {
    return value.replace(/[^0-9]/g, ``)
  },
  percentage: value => {
    return value.replace(/[^0-9,]/g, ``)
  },
}
