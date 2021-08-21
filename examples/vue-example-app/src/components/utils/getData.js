import axios from 'axios'
import sensors from './sensors'

const ABS_DATA_BASE_URL = 'https://proxy.production.myvic-components.sdp2.sdp.vic.gov.au/abs/sdmx-json/data/'
const ARRIVALS_DATA_URL = ABS_DATA_BASE_URL + 'ABS_OAD_COUNTRY/06.TOTAL.10.M/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017'
const POPULATION_IN_URL = ABS_DATA_BASE_URL + 'POPULATION_CLOCK_FY/1+3+6.2.Q/all?detail=Full&dimensionAtObservation=AllDimensions'
const POPULATION_OUT_URL = ABS_DATA_BASE_URL + 'POPULATION_CLOCK_FY/2+4+7.2.Q/all?detail=Full&dimensionAtObservation=AllDimensions'
const PROPERTY_PRICES_URL = ABS_DATA_BASE_URL + 'RES_PROP_INDEX/1.2+1.2GMEL.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2017'
const CPI_URL = ABS_DATA_BASE_URL + 'CPI/1.2.10001+40089+40088+40087+30027.10.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093697.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_MEAT_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093911.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_CEREAL_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093912.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_METAL_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093918.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_CCB_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093916.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'
const EPI_TRANSPORT_URL = ABS_DATA_BASE_URL + 'ITPI_EXPORT/1+2.8093920.Q/all?detail=Full&dimensionAtObservation=AllDimensions&startPeriod=2020'

const PEDESTRIAN_URL = 'https://data.melbourne.vic.gov.au/resource/d6mv-s43h.json'
const LABOUR_FORCE_URL = 'https://api.vic.gov.au/abs/v1.0/labour-force-statistics?region=VICTORIA&data_item=LABOUR_FORCE&age=15_AND_OVER&adjustment_type=ORIGINAL&start_period=2009-01'
const DEVELOPER_VIC_API_KEY = 'e06367ba-4e38-4843-91ad-b81d51c84057'

const LABOUR_FORCE_SLICE_START = 108

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

const sortByXPosition = (x) => {
  return (a, b) => {
    let aValues = a.split(':')
    let bValues = b.split(':')
    return Number(aValues[x]) - Number(bValues[x])
  }
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

const getMostRecentCountForSensor = (sensorId, obs) => {
  for (let x of obs) {
    if (x['sensor_id'] === sensorId) {
      return x['total_of_directions'] || '0'
    }
  }
  return '0'
}

export const getArrivalsData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    ARRIVALS_DATA_URL, 4, 'name', sortByXPosition(4), 0, ''
  )
  chartData.title = 'Monthly Visitors to Australia'
  return chartData
}

export const getCpiData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    CPI_URL, 2, 'name', sortByXPosition(2), 0, ''
  )
  const treeMapData = convertChartToTreeMap(chartData)
  return treeMapData
}

export const getIncomingPopulationData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    POPULATION_IN_URL, 0, 'name', sortByXPosition(0), 0, ''
  )
  chartData.title = 'Population Clock for Victoria by Incoming Sources'
  return chartData
}

export const getOutgoingPopulationData = async () => {
  const chartData = await buildChartDataFromSdmxJson(
    POPULATION_OUT_URL, 0, 'name', sortByXPosition(0), 0, ''
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
  const establishedHousesValues = keys.filter(x => x[2] === '0').sort(sortByXPosition(4))
  const attachedDwellingsValues = keys.filter(x => x[2] === '1').sort(sortByXPosition(4))
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
  const observations = {}
  Object.keys(sensors).forEach(x => {
    observations[x] = getMostRecentCountForSensor(x, rawData)
  })
  const features = []
  Object.keys(sensors).forEach(x => {
    features.push({
      'type': 'Feature',
      'id': x,
      'properties': {
        'name': sensors[x]['sensor_name'],
        'description': sensors[x]['sensor_description'] || sensors[x]['sensor_name'],
        'pedestrianCount': observations[x]
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [Number(sensors[x]['longitude']), Number(sensors[x]['latitude'])]
      }
    })
  })
  const data = {
    'type': 'FeatureCollection',
    'features': features
  }
  return data
}

const sliceData = (data) => {
  return data.slice(LABOUR_FORCE_SLICE_START, -1)
}

export const getLabourForceData = async () => {
  const rawData = await fetchData(LABOUR_FORCE_URL, DEVELOPER_VIC_API_KEY)
  let data = {}
  const maleData = rawData.labour_force_statistics.filter(x => x['sex_description'] === 'Males')
  const femaleData = rawData.labour_force_statistics.filter(x => x['sex_description'] === 'Females')
  const labels = sliceData(maleData.map(x => x['observation_month']))

  const maleDataset = {
    label: 'Males',
    data: sliceData(maleData.map(x => Math.floor(Number(x['observation_value']))))
  }
  const femaleDataset = {
    label: 'Females',
    data: sliceData(femaleData.map(x => Math.floor(Number(x['observation_value']))))
  }

  data = {
    title: 'Labour Force by Sex',
    labels: labels,
    datasets: [maleDataset, femaleDataset]
  }
  return data
}
