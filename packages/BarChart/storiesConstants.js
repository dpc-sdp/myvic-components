import _merge from 'lodash.merge'
import { getRandomArray } from '@dpc-sdp/myvic-global/utils/randomData'

export const barChartTemplate = `
<div style="width: 400px; height: 400px">
  <bar-chart :title="title" :direction="direction" :data="data" :showLegend="showLegend" :dataFormat="dataFormat" />
</div>
`

export const stackedBarChartTemplate = `
<div style="width: 400px; height: 400px">
  <bar-chart :title="title" :direction="direction" :data="data" :stacked="stacked" :showLegend="showLegend" :dataFormat="dataFormat" />
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
