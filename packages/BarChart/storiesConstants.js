import _merge from 'lodash.merge'

export const barChartTemplate = `
<div style="width: 400px">
  <bar-chart :title="title" :direction="direction" :data="data" :showLegend="showLegend" :dataFormat="dataFormat" />
</div>
`
export const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [40, 20, 12, 52, 10, 39]
    }
  ]
}

export const dualChartData = _merge({}, chartData)
dualChartData.datasets.push({
  label: 'Dataset 2',
  data: [35, 14, 11, 42, 12, 46]
})
