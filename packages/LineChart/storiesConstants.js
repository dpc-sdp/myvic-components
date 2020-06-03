import _merge from 'lodash.merge'

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
      data: [22, 20, 12, 10, 13, 39, 40, 41, 52, 52, 54, 58]
    }
  ]
}

export const multiChartData = _merge({}, chartData)
multiChartData.datasets.push({
  label: 'Dataset 2',
  data: [35, 14, 11, 42, 12, 46, 40, 20, 17, 44, 17, 36]
})
multiChartData.datasets.push({
  label: 'Dataset 3',
  data: [353, 214, 211, 242, 212, 246, 240, 220, 127, 244, 127, 326]
})
multiChartData.datasets.push({
  label: 'Dataset 4',
  data: [135, 114, 111, 142, 112, 146, 140, 210, 117, 414, 117, 136]
})
