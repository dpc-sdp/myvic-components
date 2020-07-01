import styles from '@dpc-sdp/yourvic-global/styles/export.scss'
import _merge from 'lodash.merge'
import constants from '@dpc-sdp/yourvic-global/constants/charts'
import utils from '@dpc-sdp/yourvic-global/utils/charts'

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
    borderColor: styles.strokeLine1,
    pointBackgroundColor: styles.strokeLine1,
    hoverBorderColor: styles.strokeLine1HoverLight
  },
  secondaryDataset: {
    borderColor: styles.strokeLine2,
    pointBackgroundColor: styles.strokeLine2,
    hoverBorderColor: styles.strokeLine2HoverLight
  },
  tertiaryDataset: {
    borderColor: styles.strokeLine3,
    pointBackgroundColor: styles.strokeLine3,
    hoverBorderColor: styles.strokeLine3HoverLight
  },
  quaternaryDataset: {
    borderColor: styles.strokeLine4,
    pointBackgroundColor: styles.strokeLine4,
    hoverBorderColor: styles.strokeLine4HoverLight
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
      maxTicksLimit: 8,
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
  getTooltips: (dataFormat) => {
    const labelSettings = {
      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex]
          const value = tooltipItem.yLabel
          if (data.datasets.length === 1) {
            return utils.labelValue(value, dataFormat)
          } else {
            return `${dataset.label}: ${utils.labelValue(value, dataFormat)}`
          }
        }
      }
    }
    return _merge({}, constants.tooltips, labelSettings)
  }
}
