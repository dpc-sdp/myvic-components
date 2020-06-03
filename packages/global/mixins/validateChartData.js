// This mixin depends on the catchError mixin to work properly

import utils from '../utils/charts'

const validateChartData = {
  created: function () {
    try {
      utils.validateData(this.data)
      this.gotError = false
    } catch (error) {
      this.interceptError(error)
    }
  },
  watch: {
    data: function () {
      try {
        utils.validateData(this.data)
        this.gotError = false
      } catch (error) {
        this.interceptError(error)
      }
    }
  }
}

export default validateChartData
