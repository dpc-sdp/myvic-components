// Filters for adding extra process on a mapping value

// Create more filters if need.
module.exports = {
  dataDrivenComponent: (name) => {
    return {
      // TODO: we can add more configs here in the future.
      // So we can create dynamic chart instance based on dynamic data.
      name: name
    }
  }
}
