import constants from '../constants/charts'

export default {
  labelValue: (value, style) => {
    switch (style) {
      case constants.labelFormats.percentage:
        return `${value}%`
      case constants.labelFormats.dollar:
        return `$${value}`
      case constants.labelFormats.thousandDollar:
        return `$${value}k`
      default:
        return value
    }
  }
}
