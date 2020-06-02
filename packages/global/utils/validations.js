class DataError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DataError'
  }
}

const validateDataKeyExists = (dataset, datasetString) => {
  if (!dataset.data) {
    throw new DataError(`${datasetString} is invalid. The "data" property is missing`)
  }
}

const validateDataKeyIsArray = (dataset, datasetString) => {
  if (!Array.isArray(dataset.data)) {
    throw new DataError(`${datasetString} is invalid. The "data" property needs to be an array`)
  }
}

const validateDataKeyHasNumbers = (dataset, datasetString) => {
  if (dataset.data.some(v => typeof v !== 'number')) {
    throw new DataError(`${datasetString} is invalid. The "data" property should only contain numbers`)
  }
}

export default {
  DataError,
  validateDatasetsExist: (data) => {
    if (!data.datasets) {
      throw new DataError('No datasets provided. The data object needs to have a "datasets" property')
    }
  },

  validateLabelsExist: (data) => {
    if (!data.labels) {
      throw new DataError('No labels provided. The data object needs to have a "labels" property')
    }
  },

  validateValueIsArray: (value, propertyName) => {
    if (!Array.isArray(value)) {
      throw new DataError(`Provided ${propertyName} are invalid. The "${propertyName}" property needs to be an array`)
    }
  },

  validateDataset: (dataset) => {
    const datasetString = dataset.label ? `The ${String(dataset.label)} dataset` : 'One of the datasets'
    validateDataKeyExists(dataset, datasetString)
    validateDataKeyIsArray(dataset, datasetString)
    validateDataKeyHasNumbers(dataset, datasetString)
  },

  validateTreeMapDataIsArray: (data) => {
    if (!Array.isArray(data)) {
      throw new DataError('Provided data is invalid. It should be an array of objects')
    }
  }
}
