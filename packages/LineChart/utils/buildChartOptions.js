import styles from '../../global/styles/export.scss'
import _merge from 'lodash.merge'
import constants from '../../global/constants/charts'
import utils from '../../global/utils/charts'

const settings = {
  dataset: {
    borderJoinStyle: 'miter',
    borderWidth: 2,
    hoverBorderWidth: 4,
    fill: false,
    lineTension: 0,
    pointBorderWidth: 1,
    pointHitRadius: 15,
    pointHoverBorderWidth: 8,
    pointHoverRadius: 5,
    pointRadius: 4
  },
  primaryDataset: {
    borderColor: styles.fillDefault,
    pointBackgroundColor: styles.fillDefault,
    hoverBorderColor: styles.fillDefaultHoverLight
  },
  secondaryDataset: {
    borderColor: styles.fillSecondary,
    pointBackgroundColor: styles.fillSecondary,
    hoverBorderColor: styles.fillSecondaryHoverLight
  },
  tertiaryDataset: {
    borderColor: styles.fillTertiary,
    pointBackgroundColor: styles.fillTertiary,
    hoverBorderColor: styles.fillTertiaryHoverLight
  },
  quaternaryDataset: {
    borderColor: styles.fillQuaternary,
    pointBackgroundColor: styles.fillQuaternary,
    hoverBorderColor: styles.fillQuaternaryHoverLight
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
      display: true,
      drawOnChartArea: false,
      offsetGridLines: true,
      drawTicks: true
    },
    ticks: {
      padding: 5,
      fontFamily: "'Vic-Medium', 'sans-serif'",
      fontSize: 13,
      fontColor: styles.gridLabelColor
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
  return _merge({}, axis, { ticks: { callback: (value) => utils.labelValue(value, style) } })
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
  getTitle: (title) => {
    return _merge({}, constants.title, {
      display: !!title,
      text: title
    })
  },
  getAxes: (dimension, chartDirection, data, dataFormat) => {
    let isPrimary
    if (chartDirection === 'horizontal') {
      isPrimary = dimension === 'x'
    } else {
      isPrimary = dimension === 'y'
    }
    return buildAxes(isPrimary, data, dataFormat)
  },
  getLegend: (show) => {
    return _merge({}, constants.legend, {
      display: show
    })
  },
  getTooltips: (direction, data, dataFormat) => {
    const labelSettings = {
      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem) {
          const value = direction === 'horizontal' ? tooltipItem.xLabel : tooltipItem.yLabel
          return utils.labelValue(value, dataFormat)
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
    return _merge({}, constants.tooltips, labelSettings)
  }
}
