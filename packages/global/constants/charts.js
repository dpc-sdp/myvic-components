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
    displayColors: true,
    backgroundColor: 'white',
    borderColor: '#53565a88', // styles.tooltipBorder,
    borderWidth: 1,
    cornerRadius: 2,
    xPadding: 10,
    yPadding: 15,
    titleFontFamily: "'Vic-Regular', 'sans-serif'",
    titleFontSize: 12,
    titleFontColor: '#011a3c', // styles.tooltipText,
    titleAlign: 'center',
    bodyFontFamily: "'Vic-Bold', 'sans-serif'",
    bodyFontSize: 12,
    bodyFontColor: '#011a3c', // styles.tooltipText,
    bodyAlign: 'center'
  },
  labelFormats: {
    normal: 'normal',
    percentage: 'percentage',
    thousand: 'thousand',
    dollar: 'dollar',
    thousandDollar: 'thousandDollar'
  },
  datasetOrder: ['primary', 'secondary', 'tertiary', 'quaternary']
}
