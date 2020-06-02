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
  methods: {
    interceptError (error) {
      this.gotError = true
      this.error = error
    }
  },
  errorCaptured (error) {
    if (this.active) {
      this.interceptError(error)
      return false
    } else {
      return true
    }
  }
}

export default catchError
