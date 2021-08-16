import axios from 'axios'

const GEOSERVER_URL = 'https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver'
const SERVICE_REQUEST = 'myvic/ows?service=WFS&version=1.0.0&outputFormat=application%2Fjson&request=GetFeature&typeName=myvic:site_search'
const REQUEST = `${GEOSERVER_URL}/${SERVICE_REQUEST}`

const fetchData = async () => {
  const { data } = await axios.get(REQUEST)
  return data
}

const patchAreas = (areas) => {
  areas.forEach(x => {
    if (x.name === 'Rosebud West') {
      x.name = 'Capel Sound'
    }
  })
  return areas
}

export const getAreas = async (noLgaOrRegion) => {
  const rawData = await fetchData()
  let areas = rawData.features.filter(f => f.properties.name).map(f => (
    {
      id: f.properties.id,
      name: f.properties.name,
      description: f.properties.type,
      postcode: f.properties.postcode
    }
  ))
  if (noLgaOrRegion) {
    areas = areas.filter(f => !['lga', 'region'].includes(f.description))
  }
  return patchAreas(areas)
}
