import styles from '@dpc-sdp/yourvic-global/styles/export.scss'
import _merge from 'lodash.merge'
import constants from '@dpc-sdp/yourvic-global/constants/charts'
import utils from '@dpc-sdp/yourvic-global/utils/charts'

const settings = {
  dataset: {
    spacing: 1,
    fontColor: styles.tooltipText,
    fontFamily: "'Vic-Semibold', 'sans-serif'",
    backgroundColor: styles.treeMapFillDefault,
    hoverBackgroundColor: styles.treeMapFillDefaultHover
  }
}

export default {
  getChartData: (data, key, label) => {
    const dataset = _merge({}, settings.dataset, {
      tree: data,
      key,
      groups: [label]
    })
    return {
      datasets: [ dataset ]
    }
  },
  getTitle: (title) => {
    return _merge({}, constants.title, {
      display: !!title,
      text: title
    })
  },
  getTooltips: (dataFormat) => {
    const labelSettings = {
      callbacks: {
        // use label callback to return the desired label
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex]
          var dataItem = dataset.data[tooltipItem.index]
          return utils.labelValue(dataItem.v, dataFormat)
        },
        title: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem[0].datasetIndex]
          var dataItem = dataset.data[tooltipItem[0].index]
          return dataItem.g
        }
      }
    }
    return _merge({}, constants.tooltips, labelSettings)
  }
}
