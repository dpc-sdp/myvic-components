import axios from 'axios'

const GEOSERVER_URL = 'https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver'
const SERVICE_REQUEST = 'myvic/ows?service=WFS&version=1.0.0&outputFormat=application%2Fjson&request=GetFeature&typeName=myvic:site_search'
const REQUEST = `${GEOSERVER_URL}/${SERVICE_REQUEST}`

const fetchData = async () => {
  const { data } = await axios.get(REQUEST)
  return data
}

export const getAreas = async () => {
  const rawData = await fetchData()
  const areas = rawData.features.filter(f => f.properties.name).map(f => (
    {
      name: f.properties.name,
      description: f.properties.type
    }
  ))
  return areas
}
