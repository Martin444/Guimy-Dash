import moment from 'moment'

export const capitalize = s => {
  if (typeof s !== `string`) return ``
  s = s
    .toLowerCase()
    .split(` `)
    .map(item => {
      return item.replace(/^./, l => l.toUpperCase())
    })
  return s.join(` `)
}

export const formatThousand = value => {
  const nfObject = new Intl.NumberFormat(`en-US`)
  value = nfObject.format(value)
  return value.replace(/,/g, `.`)
}

export function formatTimestamp(timestamp, format = `DD-MM-YYYY`) {
  return new moment(timestamp).format(format)
}
