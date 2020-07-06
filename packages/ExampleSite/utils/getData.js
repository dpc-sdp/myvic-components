import axios from 'axios'
import labourStats from './labourForceStats'

const ABS_DATA_BASE_URL = 'http://stat.data.abs.gov.au/sdmx-json/data/'
const ARRIVALS_DATA_URL = ABS_DATA_BASE_URL + 'ABS_OAD_COUNTRY/06.TOTAL.10.M/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017'
const POPULATION_IN_URL = ABS_DATA_BASE_URL + 'POPULATION_CLOCK_FY/1+3+6.2.Q/all?detail=Full&dimensionAtObservation=AllDimensions'
const POPULATION_OUT_URL = ABS_DATA_BASE_URL + 'POPULATION_CLOCK_FY/2+4+7.2.Q/all?detail=Full&dimensionAtObservation=AllDimensions'
const PROPERTY_PRICES_URL = ABS_DATA_BASE_URL + 'RES_PROP_INDEX/1.2+1.2GMEL.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017'
const CPI_URL = ABS_DATA_BASE_URL + 'CPI/1.2.20001+20002+20003+97565.10+20.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093697.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_MEAT_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093911.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_CEREAL_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093912.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_METAL_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093918.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_CCB_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093916.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_TRANSPORT_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093920.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'

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

const sortByXCharacter = (x) => {
  return (a, b) => {
    return a.slice(x, x + 1) < b.slice(x, x + 1)
  }
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

const getBlockDataFromSdmxJson = async (url, description) => {
  const rawData = await fetchData(url)
  let data = {}
  data.title = String(rawData.dataSets[0].observations['0:0:0:0'][0])
  data.description = description
  data.trend = rawData.dataSets[0].observations['1:0:0:0'][0] > 0 ? 'up' : 'down'
  return data
}

const convertChartToTreeMap = (chartData) => {
  const treeMapData = []
  for (const [i, v] of chartData.labels.entries()) {
    treeMapData.push({
      value: chartData.datasets[0].data[i],
      label: v
    })
  }
  return treeMapData
}

export const getArrivalsData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    ARRIVALS_DATA_URL, 4, 'name', sortByLastCharacter, 0, ''
  )
  chartData.title = 'Monthly Visitors to Australia'
  return chartData
}

export const getCpiData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    CPI_URL, 2, 'name', sortByXCharacter(4), 0, ''
  )
  const treeMapData = convertChartToTreeMap(chartData)
  return treeMapData
}

export const getIncomingPopulationData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    POPULATION_IN_URL, 0, 'name', sortByXCharacter(0), 0, ''
  )
  chartData.title = 'Population Clock for Victoria by Incoming Sources'
  return chartData
}

export const getOutgoingPopulationData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    POPULATION_OUT_URL, 0, 'name', sortByXCharacter(0), 0, ''
  )
  chartData.title = 'Population Clock for Victoria by Outgoing Sources'
  return chartData
}

export const getEpiData = async () => {
  const blockData = await getBlockDataFromSdmxJson(
    EPI_URL, 'Export Price Index (General)'
  )
  return blockData
}

export const getEpiMeatData = async () => {
  const blockData = await getBlockDataFromSdmxJson(
    EPI_MEAT_URL, 'Meat and meat preparations'
  )
  return blockData
}

export const getEpiCerealData = async () => {
  const blockData = await getBlockDataFromSdmxJson(
    EPI_CEREAL_URL, 'Cereal grains and cereal preparations'
  )
  return blockData
}

export const getEpiMetalData = async () => {
  const blockData = await getBlockDataFromSdmxJson(
    EPI_METAL_URL, 'Metals - excluding monetary gold'
  )
  return blockData
}

export const getEpiCcbData = async () => {
  const blockData = await getBlockDataFromSdmxJson(
    EPI_CCB_URL, 'Coal, coke and briquettes'
  )
  return blockData
}

export const getEpiTransportData = async () => {
  const blockData = await getBlockDataFromSdmxJson(
    EPI_TRANSPORT_URL, 'Transport equipment'
  )
  return blockData
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
    title: 'Residential Property Price Index for Greater Melbourne',
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
