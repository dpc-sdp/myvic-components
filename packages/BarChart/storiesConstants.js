import _merge from 'lodash.merge'
import { getRandomArray } from '@dpc-sdp/myvic-global/utils/randomData'

export const barChartTemplate = `
<div style='width: 400px; height: 400px'>
  <bar-chart :title='title' :direction='direction' :data='data' :showLegend='showLegend' :dataFormat='dataFormat' />
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

export const annotation = {
  annotations: [
    {
      'type': 'box',
      xScaleID: 'secondary',
      yScaleID: 'primary',
      'yMin': 24,
      'yMax': 25,
      'xMin': -0.5,
      'xMax': 2.5,
      'borderWidth': 1,
      'backgroundColor': 'rgba(200,60,60,0.25)',
      'borderColor': 'rgba(200,60,60,0.25)'
    },
    {
      'type': 'box',
      xScaleID: 'secondary',
      yScaleID: 'primary',
      'yMin': 27,
      'yMax': 28,
      'xMin': 2.5,
      'xMax': 5.5,
      'borderWidth': 1,
      'backgroundColor': 'rgba(200,60,60,0.25)',
      'borderColor': 'rgba(200,60,60,0.25)'
    },
    {
      'type': 'box',
      xScaleID: 'secondary',
      yScaleID: 'primary',
      'yMin': 28,
      'yMax': 50,
      'xMin': 0.5,
      'xMax': 0.5,
      'borderWidth': 1,
      'backgroundColor': '#666',
      'borderColor': '#666'
    },
    {
      'type': 'box',
      xScaleID: 'secondary',
      yScaleID: 'primary',
      'yMin': 31,
      'yMax': 54,
      'xMin': 3.5,
      'xMax': 3.5,
      'borderWidth': 1,
      'backgroundColor': '#666',
      'borderColor': '#666'
    },
    {
      'type': 'line',
      'mode': 'vertical',
      scaleID: 'secondary',
      'value': 1,
      'borderColor': 'rgba(0,0,0,0)',
      'borderWidth': 0,
      'label': {
        // Background color of label, default below
        backgroundColor: 'rgba(0,0,0,0)',

        // Font family of text, inherits from global
        fontFamily: 'sans-serif',

        // Font size of text, inherits from global
        fontSize: 12,

        // Font style of text, default below
        fontStyle: 'bold',

        // Font color of text, default below
        fontColor: 'rgba(200,60,60,0.85)',

        // Padding of label to add left/right, default below
        xPadding: 6,

        // Padding of label to add top/bottom, default below
        yPadding: 6,

        // Radius of label rectangle, default below
        cornerRadius: 6,

        // Anchor position of label on line, can be one of: top, bottom, left, right, center. Default below.
        position: 'top',

        // Adjustment along x-axis (left-right) of label relative to above number (can be negative)
        // For horizontal lines positioned left or right, negative values move
        // the label toward the edge, and positive values toward the center.
        xAdjust: -5,

        // Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
        // For vertical lines positioned top or bottom, negative values move
        // the label toward the edge, and positive values toward the center.
        yAdjust: 55,

        // Whether the label is enabled and should be displayed
        enabled: true,

        // Text to display in label - default is null. Provide an array to display values on a new line
        content: 'Test label 1',

        // Rotation of label, in degrees, default is 0
        rotation: 90
      }
    },
    {
      'type': 'line',
      'mode': 'vertical',
      scaleID: 'secondary',
      'value': 4,
      'borderColor': 'rgba(0,0,0,0)',
      'borderWidth': 0,
      'label': {
        // Background color of label, default below
        backgroundColor: 'rgba(0,0,0,0)',

        // Font family of text, inherits from global
        fontFamily: 'sans-serif',

        // Font size of text, inherits from global
        fontSize: 12,

        // Font style of text, default below
        fontStyle: 'bold',

        // Font color of text, default below
        fontColor: 'rgba(200,60,60,0.85)',

        // Padding of label to add left/right, default below
        xPadding: 6,

        // Padding of label to add top/bottom, default below
        yPadding: 6,

        // Radius of label rectangle, default below
        cornerRadius: 6,

        // Anchor position of label on line, can be one of: top, bottom, left, right, center. Default below.
        position: 'top',

        // Adjustment along x-axis (left-right) of label relative to above number (can be negative)
        // For horizontal lines positioned left or right, negative values move
        // the label toward the edge, and positive values toward the center.
        xAdjust: -5,

        // Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
        // For vertical lines positioned top or bottom, negative values move
        // the label toward the edge, and positive values toward the center.
        yAdjust: 35,

        // Whether the label is enabled and should be displayed
        enabled: true,

        // Text to display in label - default is null. Provide an array to display values on a new line
        content: 'Test label 2',

        // Rotation of label, in degrees, default is 0
        rotation: 90
      }
    }
  ]
}
