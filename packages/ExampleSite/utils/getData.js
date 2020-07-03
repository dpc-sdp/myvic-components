import axios from 'axios'
import labourStats from './labourForceStats'

const ABS_DATA_BASE_URL = 'http://stat.data.abs.gov.au/sdmx-json/data/'
const ARRIVALS_DATA_URL = ABS_DATA_BASE_URL + 'ABS_OAD_COUNTRY/06.TOTAL.10.M/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017'
const POPULATION_IN_URL = ABS_DATA_BASE_URL + 'POPULATION_CLOCK_FY/1+3+6.2.Q/all?detail=Full&dimensionAtObservation=AllDimensions'
const POPULATION_OUT_URL = ABS_DATA_BASE_URL + 'POPULATION_CLOCK_FY/2+4+7.2.Q/all?detail=Full&dimensionAtObservation=AllDimensions'
const PROPERTY_PRICES_URL = ABS_DATA_BASE_URL + 'RES_PROP_INDEX/1.2+1.2GMEL.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017'

const PEDESTRIAN_URL = 'https://data.melbourne.vic.gov.au/resource/b2ak-trbp.json'
// const LABOUR_FORCE_URL = 'https://api.vic.gov.au/abs/v1.0/labour-force-statistics?region=VICTORIA&data_item=LABOUR_FORCE&age=15_AND_OVER&sex=MALES%26FEMALES&adjustment_type=ORIGINAL&start_period=2009-01'

// const DEVELOPER_VIC_API_KEY = '9093ae01-2a0c-4b13-b935-3457723535b6'

const fetchData = async (request, apiKey) => {
  const options = {}
  if (apiKey) {
    options.headers = {
      apiKey: apiKey
    }
  }
  const { data } = await axios.get(request, options)
  return data
}

const sortByFirstCharacter = (a, b) => {
  return a.slice(0) < b.slice(0)
}

const sortByLastCharacter = (a, b) => {
  return a.slice(-1) < b.slice(-1)
}

const buildChartDataFromSdmxJson = async (
  url, // the URL of the sdmx-json dataset
  labelObservationIndex, // the index number of the observation that will provide the chart labels
  labelAttr, // the attribute to use for the label - can be 'id' or 'name'
  sortFunc, // how to sort the observations
  chartValuesObservationIndex, // the index number of the observation that will provide the chart values
  datasetName // name for the dataset (may show up in chart legend depending on chart type)
) => {
  const rawData = await fetchData(url)
  let data = {}
  const labelObservation = rawData.structure.dimensions.observation[labelObservationIndex]
  const labels = labelObservation.values.map(x => x[labelAttr])
  const observations = rawData.dataSets[0].observations
  const keys = Object.keys(observations)
  keys.sort(sortFunc)
  const chartValues = keys.map(x => observations[x][chartValuesObservationIndex])
  data = {
    labels: labels,
    datasets: [
      {
        label: datasetName,
        data: chartValues
      }
    ]
  }
  return data
}

export const getArrivalsData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    ARRIVALS_DATA_URL, 4, 'name', sortByLastCharacter, 0, ''
  )
  chartData.title = 'Monthly Visitors to Australia'
  return chartData
}

export const getIncomingPopulationData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    POPULATION_IN_URL, 0, 'name', sortByFirstCharacter, 0, ''
  )
  chartData.title = 'Population Clock for Victoria by Incoming Sources'
  return chartData
}

export const getOutgoingPopulationData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    POPULATION_OUT_URL, 0, 'name', sortByFirstCharacter, 0, ''
  )
  chartData.title = 'Population Clock for Victoria by Outgoing Sources'
  return chartData
}

export const getPropertyPricesData = async () => {
  const rawData = await fetchData(PROPERTY_PRICES_URL)
  let data = {}
  const labelObservation = rawData.structure.dimensions.observation[4]
  const labels = labelObservation.values.map(x => x.name)
  const observations = rawData.dataSets[0].observations
  const keys = Object.keys(observations)

  const establishedHousesValues = keys.filter(x => x[2] === '0').sort(sortByLastCharacter)
  const attachedDwellingsValues = keys.filter(x => x[2] === '1').sort(sortByLastCharacter)

  const establishedHousesDataset = {
    label: 'Established Houses',
    data: establishedHousesValues.map(x => observations[x][0])
  }
  const attachedDwellingsDataset = {
    label: 'Attached Dwellings',
    data: attachedDwellingsValues.map(x => observations[x][0])
  }

  data = {
    labels: labels,
    datasets: [establishedHousesDataset, attachedDwellingsDataset]
  }
  return data
}

export const getPedestrianData = async () => {
  const rawData = await fetchData(PEDESTRIAN_URL)
  let data = rawData

  return data
}

export const getLabourForceData = async () => {
  // const rawData = await fetchData(LABOUR_FORCE_URL, DEVELOPER_VIC_API_KEY)
  const rawData = labourStats
  let data = {}
  const maleData = rawData.filter(x => x['sex_description'] === 'Males')
  const femaleData = rawData.filter(x => x['sex_description'] === 'Females')
  const labels = maleData.map(x => x['observation_month'])

  const maleDataset = {
    label: 'Males',
    data: maleData.map(x => Number(x['observation_value']))
  }
  const femaleDataset = {
    label: 'Females',
    data: femaleData.map(x => Number(x['observation_value']))
  }

  data = {
    title: 'Labour Force by Sex',
    labels: labels,
    datasets: [maleDataset, femaleDataset]
  }
  return data
}
