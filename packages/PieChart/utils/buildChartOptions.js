import styles from '@dpc-sdp/myvic-global/styles/export.scss'
import _merge from 'lodash.merge'
import constants from '@dpc-sdp/myvic-global/constants/charts'
import utils from '@dpc-sdp/myvic-global/utils/charts'

const settings = {
  dataset: {
    borderAlign: 'inner',
    borderWidth: 1,
    hoverBorderWidth: 0,
    borderColor: '#fff',
    hoverBorderColor: '#fff',
    fill: true
  },
  primaryDataset: {
    backgroundColor: utils.getStyleArray(styles, 'fillPie', 12),
    hoverBackgroundColor: utils.getStyleArray(styles, 'fillPieHover', 12)
  },
  secondaryDataset: {
    backgroundColor: utils.getStyleArray(styles, 'fillPie', 12),
    hoverBackgroundColor: utils.getStyleArray(styles, 'fillPieHover', 12)
  },
  tertiaryDataset: {
    backgroundColor: utils.getStyleArray(styles, 'fillPie', 12),
    hoverBackgroundColor: utils.getStyleArray(styles, 'fillPieHover', 12)
  },
  quaternaryDataset: {
    backgroundColor: utils.getStyleArray(styles, 'fillPie', 12),
    hoverBackgroundColor: utils.getStyleArray(styles, 'fillPieHover', 12)
  }
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
          var dataItem = dataset.data[tooltipItem.index]
          return utils.labelValue(dataItem, dataFormat)
        },
        title: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem[0].datasetIndex]
          if (data.datasets.length === 1) {
            return data.labels[tooltipItem[0].index]
          } else {
            return dataset.label
          }
        }
      }
    }
    return _merge({}, constants.tooltips, labelSettings)
  }
}
