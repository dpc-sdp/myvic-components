import styles from '@dpc-sdp/myvic-global/styles/stylesExport.js'
import _merge from 'lodash.merge'
import constants from '@dpc-sdp/myvic-global/constants/charts'
import utils from '@dpc-sdp/myvic-global/utils/charts'

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
  primaryAxis: {
    id: 'primary',
    scaleLabel: {
      display: false,
      labelString: '',
      fontFamily: "'Vic-Medium', 'sans-serif'",
      fontColor: styles.gridLabelColor
    },
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
    id: 'secondary',
    scaleLabel: {
      display: false,
      labelString: '',
      fontFamily: "'Vic-Medium', 'sans-serif'",
      fontColor: styles.gridLabelColor
    },
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

const scaleAxis = (axis, data, scaleLimits) => {
  let max = getMaxDataValue(data)
  let maxLabel = findMaxLabel(max)
  return _merge({}, axis, { ticks: { suggestedMax: maxLabel } }, { ticks: { ...scaleLimits } })
}

const labelAxis = (axis, style) => {
  return _merge({}, axis, { ticks: { callback: (value) => utils.labelValue(value, style) } })
}

const buildAxes = (isPrimary, data, axesTitles, dataFormat, scaleLimits) => {
  let axis = settings[isPrimary ? 'primaryAxis' : 'secondaryAxis']
  axis = utils.setAxisTitle(axis, isPrimary, axesTitles)
  if (isPrimary) {
    axis = scaleAxis(axis, data, scaleLimits)
    axis = labelAxis(axis, dataFormat)
  }
  return [axis]
}

export default {
  getDatasetSettings: (data, customDatasetStyles) => {
    const datasetSettings = []
    for (const [index, value] of data.datasets.entries()) {
      let customDatasetColors = (customDatasetStyles && customDatasetStyles[index]) || {}
      let colorSettings = {
        borderColor: styles[`fill${index + 1}`],
        pointBackgroundColor: styles[`fill${index + 1}`],
        hoverBorderColor: styles[`fillHover${index + 1}`] + '33'
      }
      colorSettings = _merge({}, colorSettings, customDatasetColors)
      let finalSettings = _merge({}, value, settings.dataset, colorSettings)
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
  getAxes: (dimension, chartDirection, data, axesTitles, dataFormat, scaleLimits) => {
    let isPrimary
    if (chartDirection === 'horizontal') {
      isPrimary = dimension === 'x'
    } else {
      isPrimary = dimension === 'y'
    }
    return buildAxes(isPrimary, data, axesTitles, dataFormat, scaleLimits)
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
