import axios from 'axios'

const ARCGIS_SERVER_URL = 'https://geo.mapshare.vic.gov.au/arcgis'
const SERVICE_REQUEST = 'rest/services/Geocoder/VMAddressEZIAdd/GeocodeServer/suggest?f=json&text='
const REQUEST = `${ARCGIS_SERVER_URL}/${SERVICE_REQUEST}`

const fetchData = async (request) => {
  const response = await axios.get(request)
  return response
}

export const getAddresses = async (query) => {
  const response = await fetchData(REQUEST + query)
  const addresses = response.data.suggestions.map(x => (
    {
      name: x.text.toLowerCase()
    }
  ))
  return addresses
}
