import { createOwsRequestUrl, fetchData } from '@dpc-sdp/yourvic-global/utils/geoserver_requests'

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
