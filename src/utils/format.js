import numeral from 'numeral';

export const formatNumber = (value) => {
  return numeral(value).format('0,0.[00]').split(',').join(' ');
}

export const formatVolume = (value, percent) => {
  return `${formatNumber(value)} USD (${numeral(percent).format('0.00')}%)`
}
