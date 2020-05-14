import styles from '../../core/styles/export.scss'
import _merge from 'lodash.merge'

const settings = {
	primaryAxis: {
		gridLines: {
			display: true,
			lineWidth: 1,
			color: styles.gridLineColor,
			drawTicks: false,
			drawBorder: false
		},
		ticks: {
			beginAtZero: true,
			maxTicksLimit: 5,
			padding: 10,
			fontFamily: "'Vic-Medium', 'sans-serif'",
			fontSize: 13,
			fontColor: styles.gridLabelColor
		}
	},
	secondaryAxis: {
		gridLines: {
			display: false
		},
		ticks: {
			padding: 5,
			fontFamily: "'Vic-Medium', 'sans-serif'",
			fontSize: 13,
			fontColor: styles.gridLabelColor
		}
	}
}

const getMaxDataValue = (data) => {
	let max = 0
	let newMax
	for (let dataset of data.datasets) {
		newMax = Math.max(...dataset.data)
		if (newMax > max) max = newMax
	}
	return max
}

const findMaxLabel = (max) => {
	let candidate = Math.ceil(max*1.1)
	if (Math.abs(candidate - 100) <= 10) return 100
	return candidate
}

const scaleAxis = (axis, data) => {
	let max = getMaxDataValue(data)
	let maxLabel = findMaxLabel(max)
	return _merge({}, axis, { ticks: { suggestedMax: maxLabel } })
}

export default {
	getTitle: (title) => ({
		display: !!title,
		fontSize: 13,
		fontFamily: "'Vic', 'sans-serif'",
		fontStyle: 'bold',
		fontColor: styles.titleColor,
		text: title
	}),
	getXAxes: (direction, data) => {
		let axis = settings[direction === 'horizontal' ? 'primaryAxis' : 'secondaryAxis']
		if (direction === 'horizontal')
			axis = scaleAxis(axis, data)
		return [axis]
	},
	getYAxes: (direction, data) => {
		let axis = settings[direction === 'vertical' ? 'primaryAxis' : 'secondaryAxis']
		if (direction === 'vertical')
			axis = scaleAxis(axis, data)
		return [axis]
	},
	getLegend: (show) => ({
		display: show,
		position: 'bottom',
		align: 'start',
		labels: {
			boxWidth: 14,
			fontSize: 12,
			fontFamily: "'Vic', 'sans-serif'",
			fontColor: styles.legendLabelColor
		}
	})
}
