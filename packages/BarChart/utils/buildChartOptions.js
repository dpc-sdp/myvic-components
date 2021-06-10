import styles from '@dpc-sdp/myvic-global/styles/stylesExport.js'
import _merge from 'lodash.merge'
import constants from '@dpc-sdp/myvic-global/constants/charts'
import utils from '@dpc-sdp/myvic-global/utils/charts'

const settings = {
  scaleFactor: 1.06,
  dataset: {
    barPercentage: 0.8
  },
  primaryAxis: {
    id: 'primary',
    scaleLabel: {
      display: true,
      labelString: '',
      fontFamily: "'Vic-Medium', 'sans-serif'",
      fontColor: styles.gridLabelColor
    },
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
    id: 'secondary',
    scaleLabel: {
      display: true,
      labelString: '',
      fontFamily: "'Vic-Medium', 'sans-serif'",
      fontColor: styles.gridLabelColor
    },
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

const scaleAxis = (axis, data, dataFormat, scaleLimits) => {
  let max = getMaxDataValue(data)
  let maxLabel = findMaxLabel(max, dataFormat)
  return _merge({}, axis, { ticks: { suggestedMax: maxLabel } }, { ticks: { ...scaleLimits } })
}

const labelAxis = (axis, style) => {
  return _merge({}, axis, { ticks: { callback: (value) => utils.labelValue(value, style) } })
}

const buildAxes = (isPrimary, data, axesTitles, dataFormat, stacked, scaleLimits) => {
  let axis = settings[isPrimary ? 'primaryAxis' : 'secondaryAxis']
  axis = utils.setAxisTitle(axis, isPrimary, axesTitles)
  axis = _merge({}, axis, { stacked: stacked })
  if (isPrimary) {
    axis = scaleAxis(axis, data, dataFormat, scaleLimits)
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
        backgroundColor: styles[`fill${index + 1}`],
        hoverBackgroundColor: styles[`fillHover${index + 1}`]
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
  getAxes: (dimension, chartDirection, data, axesTitles, dataFormat, stacked, scaleLimits) => {
    let isPrimary
    if (chartDirection === 'horizontal') {
      isPrimary = dimension === 'x'
    } else {
      isPrimary = dimension === 'y'
    }
    return buildAxes(isPrimary, data, axesTitles, dataFormat, stacked, scaleLimits)
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
          if (data.datasets.length === 1) {
            return utils.labelValue(value, dataFormat)
          } else {
            return `${dataset.label}: ${utils.labelValue(value, dataFormat)}`
          }
        }
      }
    }
    return _merge({}, constants.tooltips, labelSettings)
  },
  getPlugin: (dataFormat, showDataLabels, stacked) => {
    const dataFormatSettings = {
      datalabels: {
        formatter: (value) => utils.labelValue(value, dataFormat),
        display: showDataLabels && !stacked // no data labels for stacked bar chart
      }
    }
    return _merge({}, settings.plugin, dataFormatSettings)
  }
}
