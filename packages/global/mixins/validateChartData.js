import utils from '../utils/charts'

const validateChartData = {
  created: function () {
    try {
      utils.validateData(this.data)
      this.gotError = false
    } catch (error) {
      this.handleError(error)
    }
  },
  watch: {
    data: function () {
      try {
        utils.validateData(this.data)
        this.gotError = false
      } catch (error) {
        this.handleError(error)
      }
    }
  }
}

export default validateChartData
