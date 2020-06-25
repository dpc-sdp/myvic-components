import styles from '@dpc-sdp/yourvic-global/styles/export.scss'
import _merge from 'lodash.merge'
import constants from '@dpc-sdp/yourvic-global/constants/charts'
import utils from '@dpc-sdp/yourvic-global/utils/charts'

const settings = {
  scaleFactor: 1.05,
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
      color: styles.gridLineColorLight,
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

const findMaxLabel = (max, dataFormat) => {
  let candidate = Math.ceil(max * settings.scaleFactor)
  if (dataFormat === constants.labelFormats.percentage && Math.abs(candidate - 100) <= 10) return 100
  return candidate
}

const scaleAxis = (axis, data, dataFormat) => {
  let max = getMaxDataValue(data)
  let maxLabel = findMaxLabel(max, dataFormat)
  return _merge({}, axis, { ticks: { suggestedMax: maxLabel } })
}

const labelAxis = (axis, style) => {
  return _merge({}, axis, { ticks: { callback: (value) => utils.labelValue(value, style) } })
}

const buildAxes = (isPrimary, data, dataFormat) => {
  let axis = settings[isPrimary ? 'primaryAxis' : 'secondaryAxis']
  if (isPrimary) {
    axis = scaleAxis(axis, data, dataFormat)
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
  getTooltips: (direction, dataFormat) => {
    const labelSettings = {
      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex]
          const value = direction === 'horizontal' ? tooltipItem.xLabel : tooltipItem.yLabel
          return `${dataset.label}: ${utils.labelValue(value, dataFormat)}`
        }
      }
    }
    return _merge({}, constants.tooltips, labelSettings)
  },
  getPlugin: (dataFormat) => {
    const dataFormatSettings = {
      datalabels: {
        formatter: (value) => utils.labelValue(value, dataFormat)
      }
    }
    return _merge({}, settings.plugin, dataFormatSettings)
  }
}
