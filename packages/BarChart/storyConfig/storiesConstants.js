import _merge from 'lodash.merge'
import { getRandomArray } from '@dpc-sdp/myvic-global/utils/randomData'

export const barChartTemplate = `
<div style='width: 400px; height: 400px'>
  <bar-chart :title='title' :direction='direction' :data='data' :axesTitles='axesTitles' :showLegend='showLegend' :dataFormat='dataFormat' />
</div>
`

export const stackedBarChartTemplate = `
<div style='width: 400px; height: 400px'>
  <bar-chart :title='title' :direction='direction' :data='data' :stacked='stacked' :showLegend='showLegend' :dataFormat='dataFormat' />
</div>
`

export const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Dataset 1',
      data: getRandomArray(6, 0, 50)
    }
  ]
}

export const dualChartData = _merge({}, chartData)
dualChartData.datasets.push({
  label: 'Dataset 2',
  data: getRandomArray(6, 0, 50)
})

export const maxChartData = _merge({}, dualChartData)
for (var i = 3; i <= 12; i++) {
  maxChartData.datasets.push({
    label: `Dataset ${i}`,
    data: getRandomArray(6, 0, 50)
  })
}

let annotationChartLabels = []
for (i = 5; i <= 23; i++) {
  const leadingZero = (number) => number < 10 ? '0' : ''
  annotationChartLabels.push(`20${leadingZero(i)}${i}-${leadingZero(i + 1)}${i + 1}`)
}
export const annotationChartData = {
  labels: annotationChartLabels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [8, 9, 9, 47, 49, 55, 60, 7, 8, 9, 45, 55, 60, 52, 58, 69, 63, 60, 65]
    }
  ]
}

let annotationChartColors = []
let annotationChartHoverColors = []
for (i = 5; i <= 23; i++) {
  annotationChartColors.push(i < 20 ? '#f5333f' : '#737679')
  annotationChartHoverColors.push(i < 20 ? '#f7666f' : '#abacae')
}
export const annotationChartCustomStyles = [
  {
    backgroundColor: annotationChartColors,
    hoverBackgroundColor: annotationChartHoverColors
  }
]
