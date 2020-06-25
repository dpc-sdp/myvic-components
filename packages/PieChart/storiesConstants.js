import _merge from 'lodash.merge'

export const pieChartTemplate = `
<div style="width: 400px; height: 400px">
  <pie-chart :title="title" :data="data" :showLegend="showLegend" :dataFormat="dataFormat" />
</div>
`
export const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [22, 20, 12, 10, 13, 39, 23, 12, 5, 7, 9, 4]
    }
  ]
}

export const dualChartData = _merge({}, chartData)
dualChartData.datasets.push({
  label: 'Dataset 2',
  data: [35, 14, 11, 42, 12, 46]
})
