import axios from 'axios'

// const GEOSERVER_URL = 'https://gis-app-cdn.prod.myvictoria.vic.gov.au/geoserver'
const GEOSERVER_URL = 'https://gis-app.dev.myvictoria.vic.gov.au/geoserver'
const SERVICE_REQUEST = 'myvic/ows?service=WFS&version=1.0.0&outputFormat=application%2Fjson&request=GetFeature&typeName=myvic:covid_area_search'
const REQUEST = `${GEOSERVER_URL}/${SERVICE_REQUEST}`

const fetchData = async () => {
  const { data } = await axios.get(REQUEST)
  return data
}

const flagDescription = flag => {
  switch (flag) {
    case '1':
      return 'METRO'
    case '2':
      return 'REGIONAL'
    case '3':
      return 'FULL ADDRESS NEEDED'
    default:
      return ''
  }
}

export const getAreas = async () => {
  const rawData = await fetchData()
  const areas = rawData.features.filter(f => f.properties.name).map(f => ({
    id: f.properties.id,
    name: f.properties.type === 'suburb' ? `${f.properties.name}, ${f.properties.postcode}` : f.properties.name,
    description: f.properties.type,
    postcode: f.properties.postcode,
    flag: f.properties.flag,
    tag: flagDescription(f.properties.flag)
  }))
  return areas
}

export const isInsideMetroArea = async (lng, lat) => {
  const path = `myvic/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=myvic%3Acovid_metro_area_4326&outputFormat=application%2Fjson&srsName=EPSG:4326&cql_filter=INTERSECTS(geom,%20POINT%20(${lng}%20${lat}))&propertyName=name`
  const result = await axios.get(`${GEOSERVER_URL}/${path}`)
  if (result.data) {
    return result.data.totalFeatures > 0 // 0 = outside metro
  }
  return false
}
