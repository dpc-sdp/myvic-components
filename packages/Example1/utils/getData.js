import axios from 'axios'

const GEOSERVER_URL = 'https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver'
const SERVICE_REQUEST = 'myvic/ows?service=WFS&version=1.0.0&outputFormat=application%2Fjson&request=GetFeature'
const BASE_REQUEST = `${GEOSERVER_URL}/${SERVICE_REQUEST}`

const fetchData = async (request) => {
  const { data } = await axios.get(request)
  return data
}

const createRequestUrl = (areaId, areaType) => {
  let requestPart
  if (areaType === 'suburb') {
    requestPart = `&typeName=myvic:demographics_${areaType}&CQL_FILTER=ssc_code='${areaId}'`
  } else if (areaType === 'lga') {
    requestPart = `&typeName=myvic:demographics_${areaType}&CQL_FILTER=${areaType}_code='${areaId}'`
  } else if (areaType === 'region') {
    requestPart = `&typeName=myvic:demographics_rgn&CQL_FILTER=rgn_code='${areaId}'`
  }
  const request = BASE_REQUEST + requestPart
  return request
}

export const getDemographicData = async (area) => {
  const request = createRequestUrl(area.id, area.description)
  const rawData = await fetchData(request)
  let data = {}
  if (rawData.features.length) {
    const feature = rawData.features[0]
    data = {
      totalPopulation: feature.properties.total_population,
      populationGrowth: feature.properties.population_growth,
      familyTotalPercent: feature.properties.family_total_percent,
      groupOfPeoplePercent: feature.properties.group_of_people_percent,
      singlePersonPercent: feature.properties.single_person_percent
    }
  }
  return data
}

export const commarize = function (number) {
  if (number > 99999) {
    const units = ['k', 'm', 'b', 't']
    // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
    const unit = Math.floor(((number).toFixed(0).length - 1) / 3) * 3
    // Calculate the remainder
    let num = (number / ('1e' + unit))
    if (!(num % 1)) {
      num = num.toFixed(0)
    } else {
      num = num.toFixed(1)
    }

    const unitname = units[Math.floor(unit / 3) - 1]
    return num + unitname
  }
  // return formatted original number
  return number.toLocaleString()
}

export const commarizeSimple = function (num) {
  if (typeof num !== 'number') return num
  num = parseFloat(num)
  if (num % 1) {
    num = num.toFixed(2)
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
