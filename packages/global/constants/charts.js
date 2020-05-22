import styles from '../styles/export.scss'

export default {
  title: {
    fontSize: 13,
    fontFamily: "'Vic-Bold', 'sans-serif'",
    fontStyle: 'bold',
    fontColor: styles.titleColor
  },
  legend: {
    position: 'bottom',
    align: 'start',
    labels: {
      boxWidth: 14,
      fontSize: 13,
      fontFamily: "'Vic-Medium', 'sans-serif'",
      fontColor: styles.legendLabelColor
    }
  },
  tooltips: {
    mode: 'nearest',
    displayColors: false,
    backgroundColor: 'white',
    borderColor: styles.gridLineColor,
    borderWidth: 1,
    cornerRadius: 2,
    xPadding: 10,
    yPadding: 15,
    titleFontFamily: "'Vic-Regular', 'sans-serif'",
    titleFontSize: 12,
    titleFontColor: styles.tooltipText,
    titleAlign: 'center',
    bodyFontFamily: "'Vic-Semibold', 'sans-serif'",
    bodyFontSize: 12,
    bodyFontColor: styles.tooltipText,
    bodyAlign: 'center'
  },
  labelFormats: {
    normal: 'normal',
    percentage: 'percentage',
    dollar: 'dollar',
    thousandDollar: 'thousandDollar'
  },
  datasetOrder: ['primary', 'secondary', 'tertiary', 'quaternary']
}
