import _merge from 'lodash.merge'
import { getRandomInt, getRandomArray } from '@dpc-sdp/myvic-global/utils/randomData'

export const lineChartTemplate = `
<div style="width: 400px; height: 400px">
  <line-chart :title="title" :data="data" :showLegend="showLegend" :dataFormat="dataFormat" />
</div>
`
export const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Dataset 1',
      data: getRandomArray(12, 10, 60)
    }
  ]
}

export const multiChartData = _merge({}, chartData)
multiChartData.datasets.push({
  label: 'Dataset 2',
  data: getRandomArray(12, 10, 40)
})
multiChartData.datasets.push({
  label: 'Dataset 3',
  data: getRandomArray(12, 200, 360)
})
multiChartData.datasets.push({
  label: 'Dataset 4',
  data: getRandomArray(12, 100, 450)
})

export const maxChartData = _merge({}, multiChartData)
for (var i = 5; i <= 12; i++) {
  maxChartData.datasets.push({
    label: `Dataset ${i}`,
    data: getRandomArray(12, getRandomInt(0, 100), getRandomInt(105, 650))
  })
}
