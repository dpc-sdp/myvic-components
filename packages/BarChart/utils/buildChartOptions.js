import styles from '../../global/styles/export.scss'
import _merge from 'lodash.merge'
import constants from '../../global/constants/charts'

const settings = {
  dataset: {
    barPercentage: 0.8
  },
  primaryDataset: {
    backgroundColor: styles.fillDefault,
    hoverBackgroundColor: styles.fillDefaultHover
  },
  secondaryDataset: {
    backgroundColor: styles.fillSecondary,
    hoverBackgroundColor: styles.fillSecondaryHover
  },
  tertiaryDataset: {
    backgroundColor: styles.fillTertiary,
    hoverBackgroundColor: styles.fillTertiaryHover
  },
  quaternaryDataset: {
    backgroundColor: styles.fillQuaternary,
    hoverBackgroundColor: styles.fillQuaternaryHover
  },
  primaryAxis: {
    gridLines: {
      display: true,
      lineWidth: 1,
      color: styles.gridLineColor,
      drawTicks: false,
      drawBorder: false
    },
    ticks: {
      beginAtZero: true,
      maxTicksLimit: 5,
      padding: 10,
      fontFamily: "'Vic-Medium', 'sans-serif'",
      fontSize: 13,
      fontColor: styles.gridLabelColor
    }
  },
  secondaryAxis: {
    gridLines: {
      display: false
    },
    ticks: {
      padding: 5,
      fontFamily: "'Vic-Medium', 'sans-serif'",
      fontSize: 13,
      fontColor: styles.gridLabelColor
    }
  },
  tooltips: {
    mode: 'nearest',
    displayColors: false,
    backgroundColor: 'white',
    borderColor: styles.gridLineColor,
    borderWidth: 1,
    cornerRadius: 2,
    xPadding: 10,
    yPadding: 15,
    titleFontFamily: "'Vic-Regular', 'sans-serif'",
    titleFontSize: 12,
    titleFontColor: styles.tooltipText,
    titleAlign: 'center',
    bodyFontFamily: "'Vic-Semibold', 'sans-serif'",
    bodyFontSize: 12,
    bodyFontColor: styles.tooltipText,
    bodyAlign: 'center'
  },
  plugin: {
    datalabels: {
      anchor: 'end',
      align: 'end',
      color: styles.gridLabelColor,
      font: {
        size: 10,
        family: "'Vic-Bold', 'sans-serif'",
        weight: 700
      }
    }
  }
}

const getMaxDataValue = (data) => {
  let max = 0
  let newMax
  for (let dataset of data.datasets) {
    newMax = Math.max(...dataset.data)
    if (newMax > max) max = newMax
  }
  return max
}

const findMaxLabel = (max) => {
  let candidate = Math.ceil(max * 1.1)
  if (Math.abs(candidate - 100) <= 10) return 100
  return candidate
}

const scaleAxis = (axis, data) => {
  let max = getMaxDataValue(data)
  let maxLabel = findMaxLabel(max)
  return _merge({}, axis, { ticks: { suggestedMax: maxLabel } })
}

const labelAxis = (axis, style) => {
  return _merge({}, axis, { ticks: { callback: (value) => labelValue(value, style) } })
}

const labelValue = (value, style) => {
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

const buildAxes = (isPrimary, data, dataFormat) => {
  let axis = settings[isPrimary ? 'primaryAxis' : 'secondaryAxis']
  if (isPrimary) {
    axis = scaleAxis(axis, data)
    axis = labelAxis(axis, dataFormat)
  }
  return [axis]
}

export default {
  getDatasetSettings: (data) => {
    const datasetSettings = []
    for (const [index, value] of data.datasets.entries()) {
      let datasetType = constants.datasetOrder[index]
      let finalSettings = _merge({}, value, settings.dataset, settings[datasetType + 'Dataset'])
      datasetSettings.push(finalSettings)
    }
    return datasetSettings
  },
  getTitle: (title) => ({
    display: !!title,
    fontSize: 13,
    fontFamily: "'Vic-Bold', 'sans-serif'",
    fontStyle: 'bold',
    fontColor: styles.titleColor,
    text: title
  }),
  getAxes: (dimension, chartDirection, data, dataFormat) => {
    let isPrimary
    if (chartDirection === 'horizontal') {
      isPrimary = dimension === 'x'
    } else {
      isPrimary = dimension === 'y'
    }
    return buildAxes(isPrimary, data, dataFormat)
  },
  getXAxes: (direction, data, dataFormat) => {
    let axis = settings[direction === 'horizontal' ? 'primaryAxis' : 'secondaryAxis']
    if (direction === 'horizontal') {
      axis = scaleAxis(axis, data)
    }
    axis = labelAxis(axis, dataFormat)
    return [axis]
  },
  getYAxes: (direction, data, dataFormat) => {
    let axis = settings[direction === 'vertical' ? 'primaryAxis' : 'secondaryAxis']
    if (direction === 'vertical') {
      axis = scaleAxis(axis, data)
    }
    axis = labelAxis(axis, dataFormat)
    return [axis]
  },
  // TODO: this might later need to be moved to the global package if it's similar across charts (see comment on story MYVIC-72)
  getLegend: (show) => ({
    display: show,
    position: 'bottom',
    align: 'start',
    labels: {
      boxWidth: 14,
      fontSize: 13,
      fontFamily: "'Vic-Medium', 'sans-serif'",
      fontColor: styles.legendLabelColor
    }
  }),
  // TODO: this might later need to be moved to the global package if it's similar across charts (see comment on story MYVIC-72)
  getTooltips: (direction, data, dataFormat) => {
    const labelSettings = {
      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem) {
          const value = direction === 'horizontal' ? tooltipItem.xLabel : tooltipItem.yLabel
          return labelValue(value, dataFormat)
        },
        title: function (tooltipItem) {
          if (data.datasets.length === 1) {
            return tooltipItem[0].label
          } else {
            return data.datasets[tooltipItem[0].datasetIndex].label
          }
        }
      }
    }
    return _merge({}, settings.tooltips, labelSettings)
  },
  getPlugin: (dataFormat) => {
    const dataFormatSettings = {
      datalabels: {
        formatter: (value) => labelValue(value, dataFormat)
      }
    }
    return _merge({}, settings.plugin, dataFormatSettings)
  }
}
