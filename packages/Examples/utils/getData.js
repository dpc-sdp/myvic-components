import {
  fetchData,
  createLegendValuesRequestUrl,
  createOwsRequestUrl,
  myVictoriaRotatingColours,
  myVictoriaLayerStops,
  buildMyVictoriaMapboxStyle
} from '@dpc-sdp/myvic-global/utils/geoserver_requests'

export const LEGEND_TITLES = {
  'data-block-1': 'Median personal income per week',
  'data-block-2': 'Personal income growth',
  'data-block-3': 'Median household income per week',
  'data-block-4': 'Household income growth'
}

export const MAP_LAYERS = {
  'data-block-1': 'income_personal',
  'data-block-2': 'income_personal_growth',
  'data-block-3': 'income_household',
  'data-block-4': 'income_household_growth'
}

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

export const getDemographicData = async (area) => {
  const request = createOwsRequestUrl(area.id, area.description, 'demographics')
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

export const getGeneralIncomeData = async (area) => {
  const request = createOwsRequestUrl(area.id, area.description, 'demographics')
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

export const getLegendData = async (layer, areaType) => {
  const request = createLegendValuesRequestUrl(layer, areaType)
  const rawData = await fetchData(request)
  let data = {}
  let valuePrefix = ''
  let valueSuffix = ''
  if (layer.endsWith('growth')) {
    valueSuffix = '%'
  } else {
    valuePrefix = '$'
  }
  if (rawData.features.length) {
    const feature = rawData.features[0]
    data = {
      low: valuePrefix + feature.properties.low + valueSuffix,
      high: valuePrefix + feature.properties.high + valueSuffix
    }
  }
  return data
}

export const getIncomeData = async (area) => {
  const request = createOwsRequestUrl(area.id, area.description, 'income')
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
      }
    }
  }
  return data
}

export const getMapboxStyle = async () => {
  return buildMyVictoriaMapboxStyle(
    myVictoriaRotatingColours.blue,
    myVictoriaLayerStops.income_personal_lga,
    'median_total_personal_income_weekly',
    'income_lga_map')
}
