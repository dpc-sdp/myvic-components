import axios from 'axios'

const GEOSERVER_URL = 'https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver'
const SERVICE_REQUEST = 'myvic/ows?service=WFS&version=1.0.0&outputFormat=application%2Fjson&request=GetFeature'
const BASE_REQUEST = `${GEOSERVER_URL}/${SERVICE_REQUEST}`

const WFS_REQUEST = 'myvic/wfs?SERVICE=wfs&VERSION=1.0.0&REQUEST=GetFeature'
const BASE_WFS_REQUEST = `${GEOSERVER_URL}/${WFS_REQUEST}`

const labels = {
  personalIncome: [
    'Negative/Nil',
    '$1 - $299',
    '$300 - $399',
    '$400 - $799',
    '$800 - $999',
    '$1000 - $1249',
    '$1250 - $1499',
    '$1500 - $1999',
    '$2000 plus'
  ],
  householdIncome: [
    'Negative/Nil',
    '$1 - $299',
    '$300 - $399',
    '$400 - $799',
    '$800 - $999',
    '$1000 - $1249',
    '$1250 - $1499',
    '$1500 - $1999',
    '$2000 - $2499',
    '$2500 - $2999',
    '$3000 - $3499',
    '$3500 - $3999',
    '$4000 plus'
  ]
}

export const createWfsRequestUrl = (areaId, areaType) => {
  let requestPart
  if (areaType === 'suburb') {
    requestPart = `&typeName=myvic:${areaType}&SRSNAME=EPSG:3857&OUTPUTFORMAT=application/json&CQL_FILTER=ssc_code='${areaId}'`
  } else if (areaType === 'lga') {
    requestPart = `&typeName=myvic:${areaType}&SRSNAME=EPSG:3857&OUTPUTFORMAT=application/json&CQL_FILTER=${areaType}_code='${areaId}'`
  } else if (areaType === 'region') {
    requestPart = `&typeName=myvic:rgn&SRSNAME=EPSG:3857&OUTPUTFORMAT=application/json&CQL_FILTER=rgn_code='${areaId}'`
  }
  const request = BASE_WFS_REQUEST + requestPart
  return request
}

const fetchData = async (request) => {
  const { data } = await axios.get(request)
  return data
}

const createRequestUrl = (areaId, areaType, dataType) => {
  let requestPart
  if (areaType === 'suburb') {
    requestPart = `&typeName=myvic:${dataType}_${areaType}&CQL_FILTER=ssc_code='${areaId}'`
  } else if (areaType === 'lga') {
    requestPart = `&typeName=myvic:${dataType}_${areaType}&CQL_FILTER=${areaType}_code='${areaId}'`
  } else if (areaType === 'region') {
    requestPart = `&typeName=myvic:${dataType}_rgn&CQL_FILTER=rgn_code='${areaId}'`
  }
  const request = BASE_REQUEST + requestPart
  return request
}

export const getDemographicData = async (area) => {
  const request = createRequestUrl(area.id, area.description, 'demographics')
  const rawData = await fetchData(request)
  let data = {}
  if (rawData.features.length) {
    const feature = rawData.features[0]
    data = {
      medianPersonalIncomeWeekly: feature.properties.median_personal_income_weekly,
      medianPersonalIncomeWeeklyGrowth: feature.properties.median_personal_income_weekly_growth,
      medianHouseholdIncomeWeekly: feature.properties.median_household_income_weekly,
      medianHouseholdIncomeWeeklyGrowth: feature.properties.median_household_income_weekly_growth
    }
  }
  return data
}

export const getIncomeData = async (area) => {
  const request = createRequestUrl(area.id, area.description, 'income')
  const rawData = await fetchData(request)
  let data = {}
  if (rawData.features.length) {
    const feature = rawData.features[0]
    const properties = feature.properties
    const personalIncome2016Data = [
      properties.persons_negative_nil_income_percent,
      properties.persons_1_299_percent,
      properties.persons_300_399_percent,
      properties.persons_400_799_percent,
      properties.persons_800_999_percent,
      properties.persons_1000_1249_percent,
      properties.persons_1250_1499_percent,
      properties.persons_1500_1999_percent,
      properties.persons_2000_or_more_percent
    ]
    const personalIncome2011Data = [
      properties.persons_negative_nil_income_percent_2011,
      properties.persons_1_299_percent_2011,
      properties.persons_300_399_percent_2011,
      properties.persons_400_799_percent_2011,
      properties.persons_800_999_percent_2011,
      properties.persons_1000_1249_percent_2011,
      properties.persons_1250_1499_percent_2011,
      properties.persons_1500_1999_percent_2011,
      properties.persons_2000_or_more_percent_2011
    ]
    const householdIncome2016Data = [
      properties.family_negative_nil_income_percent,
      properties.family_1_299_percent,
      properties.family_300_399_percent,
      properties.family_400_799_percent,
      properties.family_800_999_percent,
      properties.family_1000_1249_percent,
      properties.family_1250_1499_percent,
      properties.family_1500_1999_percent,
      properties.family_2000_2499_percent,
      properties.family_2500_2999_percent,
      properties.family_3000_3499_percent,
      properties.family_3500_3999_percent,
      properties.family_4000_or_more_percent
    ]
    const householdIncome2011Data = [
      properties.family_negative_nil_income_percent_2011,
      properties.family_1_299_percent_2011,
      properties.family_300_399_percent_2011,
      properties.family_400_799_percent_2011,
      properties.family_800_999_percent_2011,
      properties.family_1000_1249_percent_2011,
      properties.family_1250_1499_percent_2011,
      properties.family_1500_1999_percent_2011,
      properties.family_2000_2499_percent_2011,
      properties.family_2500_2999_percent_2011,
      properties.family_3000_3499_percent_2011,
      properties.family_3500_3999_percent_2011,
      properties.family_4000_or_more_percent_2011
    ]
    data = {
      'data-block-1': {
        title: 'Weekly personal income',
        labels: labels.personalIncome,
        datasets: [
          {
            label: '',
            data: personalIncome2016Data
          }
        ]
      },
      'data-block-2': {
        title: 'Weekly personal income between 2011 and 2016',
        labels: labels.personalIncome,
        datasets: [
          {
            label: '2016',
            data: personalIncome2016Data
          },
          {
            label: '2011',
            data: personalIncome2011Data
          }
        ]
      },
      'data-block-3': {
        title: 'Weekly household income',
        labels: labels.householdIncome,
        datasets: [
          {
            label: '',
            data: householdIncome2016Data
          }
        ]
      },
      'data-block-4': {
        title: 'Weekly household income between 2011 and 2016',
        labels: labels.householdIncome,
        datasets: [
          {
            label: '2016',
            data: householdIncome2016Data
          },
          {
            label: '2011',
            data: householdIncome2011Data
          }
        ]
      },
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
