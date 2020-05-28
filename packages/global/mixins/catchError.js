const catchError = {
  data: function () {
    return {
      gotError: false,
      error: null
    }
  },
  props: {
    active: {
      type: Boolean,
      default: true
    }
  },
  errorCaptured (error) {
    console.log(error)
    if (this.active) {
      this.gotError = true
      this.error = error
      return false
    } else {
      return true
    }
  }
}

export default catchError
