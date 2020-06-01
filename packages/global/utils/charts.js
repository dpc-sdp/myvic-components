import constants from '../constants/charts'
import validations from './validations'

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
  },
  getStyleArray: (styles, varName, length) => {
    const array = []
    for (var i = 1; i <= length; i++) {
      array.push(styles[`${varName}${i}`])
    }
    return array
  },
  validateData: (data) => {
    validations.validateDatasetsExist(data)
    validations.validateLabelsExist(data)
    validations.validateValueIsArray(data.labels, 'labels')
    validations.validateValueIsArray(data.datasets, 'datasets')
    data.datasets.forEach(dataset => {
      validations.validateDataset(dataset)
    })
  },
  validateTreeMapData: (data) => {
    validations.validateTreeMapDataIsArray(data)
  }
}
