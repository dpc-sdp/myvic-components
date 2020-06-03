import utils from '../../../packages/global/utils/validations'

describe('validateDatasetsExist', () => {
  const data = { 'datasets': [] }
  const invalidData = {}
  test('passes validation', () => {
    expect(utils.validateDatasetsExist(data)).toBeUndefined()
  })
  test('fails validation', () => {
    expect(() => utils.validateDatasetsExist(invalidData)).toThrow(utils.DataError)
  })
})

describe('validateLabelsExist', () => {
  const data = { 'labels': [] }
  const invalidData = {}
  test('passes validation', () => {
    expect(utils.validateLabelsExist(data)).toBeUndefined()
  })
  test('fails validation', () => {
    expect(() => utils.validateLabelsExist(invalidData)).toThrow(utils.DataError)
  })
})

describe('validateValueIsArray', () => {
  const data = { 'labels': [] }
  const invalidData = { 'labels': 'invalidValue' }
  test('passes validation', () => {
    expect(utils.validateValueIsArray(data.labels, 'labels')).toBeUndefined()
  })
  test('fails validation', () => {
    expect(() => utils.validateValueIsArray(invalidData.labels, 'labels')).toThrow(utils.DataError)
  })
})

describe('validateDataset', () => {
  const dataset = { 'data': [10, 20] }
  const invalidDataset1 = {}
  const invalidDataset2 = { data: 'invalid data' }
  const invalidDataset3 = { data: ['10', '20'] }
  test('passes validation', () => {
    expect(utils.validateDataset(dataset)).toBeUndefined()
  })
  test('fails validation', () => {
    expect(() => utils.validateDataset(invalidDataset1)).toThrow(utils.DataError)
    expect(() => utils.validateDataset(invalidDataset2)).toThrow(utils.DataError)
    expect(() => utils.validateDataset(invalidDataset3)).toThrow(utils.DataError)
  })
})

describe('validateTreeMapDataIsArray', () => {
  const data = [{}, {}]
  const invalidData = {}
  test('passes validation', () => {
    expect(utils.validateTreeMapDataIsArray(data)).toBeUndefined()
  })
  test('fails validation', () => {
    expect(() => utils.validateTreeMapDataIsArray(invalidData)).toThrow(utils.DataError)
  })
})
